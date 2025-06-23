import { json, query } from "@solidjs/router"
import { AuthProviderInfo } from "pocketbase"
import { getRequestEvent } from "solid-js/web"

export const getAllProviders = query(async () => {
  "use server"
  const event = getRequestEvent()
  if (!event) throw new Error("no event")

  let methods = await event.locals.pb.collection("users").listAuthMethods()
  let providers = methods.oauth2.providers

  return json(providers, {revalidate: "nothing"})
}, "googleAuth")

export const continueWithProvider = (provider: AuthProviderInfo) => {
  let href = provider.authURL + "http://localhost:3000/ouathRedirect"
  localStorage.setItem("provider", JSON.stringify(provider));
  window.open(href)
}
