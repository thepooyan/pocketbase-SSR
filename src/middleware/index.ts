import { createMiddleware } from "@solidjs/start/middleware";
import PocketBase from "pocketbase"

export default createMiddleware({
  onRequest: async (event) => {
    event.locals.pb = new PocketBase("http://127.0.0.1:8090");

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(
      event.request.headers.get("cookie") || "",
    );

    try {
      // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
      event.locals.pb.authStore.isValid &&
        (await event.locals.pb.collection("users").authRefresh());
    } catch (_) {
      // clear the auth store on failed refresh
      event.locals.pb.authStore.clear();
    }

  },
});
