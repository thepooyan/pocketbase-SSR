import { action, redirect, useAction, useSearchParams } from "@solidjs/router"
import { onMount, ParentProps } from "solid-js"
import { getRequestEvent } from "solid-js/web"

const confirmAction = action(async (provider: string, code: any, codeVerifier: string, redirectUrl: string) => {
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

const RedirectHandler = (props: ParentProps) => {
  const action = useAction(confirmAction)
  const [params, _] = useSearchParams()

  onMount(() => {
    const provider = JSON.parse(localStorage.getItem("provider") || "")
    if (provider.state !== params.state) throw new Error("State don't match")
    action(provider.name, params.code, provider.codeVerifier, import.meta.env.VITE_OAUTH_REDIRECT)
  })

  return (
    <>{props.children}</>
  )
}

export default RedirectHandler
