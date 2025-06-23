import { action, createAsync, redirect } from "@solidjs/router"
import { For, Show } from "solid-js"
import { getRequestEvent } from "solid-js/web"
import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { continueWithProvider, getAllProviders } from "~/oauth/OauthActions"

const loginAction = action(async (formData:FormData)=> {
  "use server"

  let email = String(formData.get("email"))
  let pass = String(formData.get("pass"))
  let event = getRequestEvent()

  if (!email || !pass || event === undefined) return {ok: false}

  await event.locals.pb.collection("users").authWithPassword(email, pass);

  return redirect("/")
})


const login = () => {
  const providers = createAsync(() => getAllProviders())

  return (
    <>
      <form class=" m-auto w-2xl space-y-2 mt-10 " method="post" action={loginAction}>
        Email:
        <Input name="email"/>
        Password:
        <Input name="pass"/>
        <Button type="submit">Done</Button>
      </form>

      <Show when={providers()}>
        <For each={providers()}>
          {p => <Button onclick={() => continueWithProvider(p)}>Continue with {p.displayName}</Button>}
        </For>
      </Show>
    </>
  )
}

export default login
