import { action, createAsync, json, query } from "@solidjs/router";
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

const logout = async () => {
  "use server"
  const event = getRequestEvent()
  if (!event) return
  event.locals.pb.authStore.clear()
  event.response.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie())
}

export default function Home() {
  const user = createAsync(() => auth())
  console.log(user()?.isValid)
  return (
    <>
      <Show when={user()?.isValid === true}>
        Welcome!
        <Button onclick={logout}>Logout</Button>
      </Show>
      <br/>
      <Button as="A" href="/login">Login</Button>
    </>
  );
}
