import { action, redirect, useAction, useSearchParams } from "@solidjs/router"
import { onMount } from "solid-js"
import { getRequestEvent } from "solid-js/web"

const folan = action(async (provider: string, code: any, codeVerifier: string, redirectUrl: string) => {
  "use server"
  const event = getRequestEvent()
  if (!event) return
  try {
    await event.locals.pb.collection("users").authWithOAuth2Code(provider, code, codeVerifier, redirectUrl)
  } catch(e) {
    console.log(e)
    return {ok: false}
  }
  throw redirect("/")
})

const oauthRedirect = () => {
  const action = useAction(folan)
  const [params, _] = useSearchParams()

  onMount(() => {
    const provider = JSON.parse(localStorage.getItem("provider") || "")
    if (provider.state !== params.state) throw new Error("State don't match")
    action(provider.name, params.code, provider.codeVerifier, "http://localhost:3000/googleRedirect")
  })

  return (
    <>Authenticating...</>
  )
}

export default oauthRedirect
