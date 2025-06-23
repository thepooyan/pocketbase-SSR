import { action, createAsync, json, query, reload, useAction } from "@solidjs/router";
import { getRequestEvent, Show } from "solid-js/web";
import { Button } from "~/components/ui/button";

const auth = query(async () => {
  "use server"
  const event = getRequestEvent()
  if (!event) return

  return json({
    isValid: event.locals.pb.authStore.isValid
  })
}, "me")

const logout = action(async () => {
  "use server"
  const event = getRequestEvent()
  if (!event) return
  event.locals.pb.authStore.clear()
  return reload({revalidate: "me"})
})

export default function Home() {
  const user = createAsync(() => auth())
  const l = useAction(logout)

  return (
    <>
      <Show when={user()?.isValid === true}>
        Welcome!
        <Button onclick={l}>Logout</Button>
      </Show>
      <br/>
      <Button as="A" href="/login">Login</Button>
    </>
  );
}
