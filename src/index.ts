import axios from "axios";
import AccessToken from "./types/AccessToken";
import UserData from "./types/UserData";
import Permissions from "./types/Permissions";

const BASE_DOMAIN = "https://sso.echelonservice.net";

/**
 * Returns access token and associated data
 * for the requesting user using their
 * authorization code.
 * 
 * @param clientid 
 * @param code 
 * @param secret 
 * @returns AccessToken
 */
export const GetAccessToken = (clientid: string, code: string, secret: string): Promise<AccessToken> => {
    return new Promise((resolve) => {
        axios.post(`${BASE_DOMAIN}/api/v1/oauth/token`, { clientid, code, secret })
        .then((response) => resolve(response.data))
        .catch((error) => {
            let message = error.message;
            if (error.response && error.response.data)
                error.response.data = error.response.data.error;
            console.error(`[ECHELON SSO] Unable to retrieve access token`, message);
        });
    });
};

/**
 * Returns userdata if your application
 * scope has access to identify.
 * 
 * @param accessToken 
 * @returns UserData
 */
export const GetUserData = (accessToken: string): Promise<UserData> => {
    return new Promise((resolve) => {
        axios.post(`${BASE_DOMAIN}/api/v1/user`, {}, { headers: { Authorization: accessToken } })
        .then((response) => {
            const { id, username, robloxID, discordID, verified, require2FA, requireU2F, role } = response.data;
            const suspendedReason = response.data.suspended;
            const suspended = suspendedReason !== "";
            resolve({ id, username, robloxID, discordID, verified, require2FA, requireU2F, role, suspended, suspendedReason });
        })
        .catch((error) => {
            let message = error.message;
            if (error.response && error.response.data)
                error.response.data = error.response.data.error;
            console.error(`[ECHELON SSO] Unable to retrieve user data`, message);
        });
    });
};

/**
 * Returns global & department permissions
 * depending on what oauth scopes your
 * application has access to.
 * 
 * @param accessToken 
 * @returns Permissions
 */
export const GetUserPermissions = (accessToken: string): Promise<Permissions> => {
    return new Promise((resolve) => {
        axios.post(`${BASE_DOMAIN}/api/v1/user/permissions`, {}, { headers: { Authorization: accessToken } })
        .then((response) => resolve(response.data))
        .catch((error) => {
            let message = error.message;
            if (error.response && error.response.data)
                error.response.data = error.response.data.error;
            console.error(`[ECHELON SSO] Unable to retrieve user permissions`, message);
        });
    });
};