This is a working example of a Server side version of pocketbase.
the meta framework (solid js) uses an instance of pocketbase for authentication and as a database.
client never directly connects to pocketbase, instead client talks to server which is next to pocketbase, and returns the response, as a middleman.
authentication with email and password is easy, for the Oauth2 google is written as an example. manual code exchange is required.
