# Echelon SSO
Utility module to easily perform OAuth & API requests to Echelon SSO.

## Examples
Obtaining an access token.
```JS
const SSO = require("echelon-sso");
const { clientid, secret } = process.env;

try {
    const accessTokenData = await SSO.GetAccessToken(clientid, "some-code-from-redirect-uri", secret);
    const accessToken = accessTokenData.accessToken;
    const expiry = accessTokenData.expiresIn;
    // Store access token in database for later usage
} catch (error) {
    console.error(error);
}
```

Obtaining user data.
```JS
const SSO = require("echelon-sso");

try {
    const userData = await SSO.GetUserData("user-access-token");
    // Do something with userdata
} catch (error) {
    console.error(error);
}
```

Obtaining user permissions.
```JS
const SSO = require("echelon-sso");

try {
    const permissions = await SSO.GetUserPermissions("user-access-token");
    const nodes = permissions.nodes;
    // Do something with permissions
} catch (error) {
    console.error(error);
}
```