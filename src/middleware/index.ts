import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: (event) => {
    console.log("Request received:", event.request.url);

    event.locals.startTime = Date.now();
  },
  onBeforeResponse: (event) => {
    const endTime = Date.now();
    const duration = endTime - event.locals.startTime;
    console.log(`Request took ${duration}ms`);
  },
});
