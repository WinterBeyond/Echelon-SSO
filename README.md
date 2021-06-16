# Echelon SSO
Utility module to easily perform OAuth & API requests to Echelon SSO.

## Examples
Obtaining an access token.
```JS
const SSO = require("echelon-sso");
const { clientid, secret } = process.env;

SSO.GetAccessToken(clientid, "some-code-from-redirect-uri", secret)
.then((accessToken) => {
    // Store access token in database for later usage
});
```

Obtaining user data.
```JS
const SSO = require("echelon-sso");

SSO.GetUserData("user-access-token")
.then((userdata) => {
    // Do something with userdata
});
```

Obtaining user permissions.
```JS
const SSO = require("echelon-sso");

SSO.GetUserPermissions("user-access-token")
.then((permissions) => {
    // Do something with permissions
});
```