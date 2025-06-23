import RedirectHandler from "~/oauth/redirectHanlder"

const oauthRedirect = () => {
  return (
    <RedirectHandler>
      Authenticating...
      please wait. this might take a few moments...
    </RedirectHandler>
  )
}

export default oauthRedirect
