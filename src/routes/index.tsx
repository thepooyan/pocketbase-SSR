import { createAsync, json, query } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { Button } from "~/components/ui/button";

const auth = query(async () => {
  "use server"
  const event = getRequestEvent()
  if (!event) return
  console.log(event.locals.pb.authStore.isValid);
  console.log(event.locals.pb.authStore.token);
  console.log(event.locals.pb.authStore.record.id);
  return json({
    isValid: event.locals.pb.authStore.isValid
  })
}, "me")

export default function Home() {
  const user = createAsync(() => auth())
  console.log(user())
  return (
    <>
      <Button as="A" href="/login">Login</Button>
    </>
  );
}
