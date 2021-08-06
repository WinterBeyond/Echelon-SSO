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
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${BASE_DOMAIN}/api/v1/oauth/token`, { clientid, code, secret });
            return resolve(response.data);
        } catch (error) {
            return reject(error.response?.data?.error ?? error.message);
        }
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
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_DOMAIN}/api/v1/user`, { headers: { Authorization: accessToken } });
            const { id, username, robloxID, discordID, verified, require2FA, requireU2F, role, terminated, selfTerminated, deleteDate } = response.data;
            const suspendedReason = response.data.suspended;
            const suspended = suspendedReason !== "";
            return resolve({ id, username, robloxID, discordID, verified, require2FA, requireU2F, role, suspended, suspendedReason, terminated, selfTerminated, deleteDate });
        } catch (error) {
            return reject(error.response?.data?.error ?? error.message);
        }
    });
};

/**
 * Returns permission nodes
 * if oauth scope contains
 * `view.permissions`
 * 
 * @param accessToken 
 * @returns Permissions
 */
export const GetUserPermissions = (accessToken: string): Promise<Permissions> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_DOMAIN}/api/v1/user/permissions`, { headers: { Authorization: accessToken } });
            return resolve(response.data);
        } catch (error) {
            return reject(error.response?.data?.error ?? error.message);
        }
    });
};