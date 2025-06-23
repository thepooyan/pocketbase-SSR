import { action, createAsync, json, query, redirect, useSubmission } from "@solidjs/router"
import { createEffect } from "solid-js"
import { getRequestEvent } from "solid-js/web"
import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"

const loginAction = action(async (formData:FormData)=> {
  "use server"

  let email = String(formData.get("email"))
  let pass = String(formData.get("pass"))
  let event = getRequestEvent()

  if (!email || !pass || event === undefined) return {ok: false}

  await event.locals.pb.collection("users").authWithPassword(email, pass);

  return redirect("/")
})

const getGoogleProvider = query(async () => {
  "use server"
  const event = getRequestEvent()
  if (!event) throw new Error("no event")
  let methods = await event.locals.pb.collection("users").listAuthMethods()
  let google = methods.oauth2.providers.find(p => p.name === "google")
  if (!google) throw new Error("google not set")
  return json(google, {revalidate: "nothing"})
},"googleAuth")

const login = () => {
  const googleProvider = createAsync(() => getGoogleProvider())

  const sub = useSubmission(loginAction)
  createEffect(() => {
    console.log(sub.result)
  })

  const googleAuth = () => {
    const provider = googleProvider()
    if (!provider) return
    let href = provider.authURL + "http://localhost:3000/googleRedirect"
    localStorage.setItem("provider", JSON.stringify(provider));
    window.open(href)
  }

  return (
    <>
      <form class=" m-auto w-2xl space-y-2 mt-10 " method="post" action={loginAction}>
        Email:
        <Input name="email"/>
        Password:
        <Input name="pass"/>
        <Button type="submit">Done</Button>
      </form>

      <Button onclick={googleAuth}>Continue with Google</Button>
    </>
  )
}

export default login
