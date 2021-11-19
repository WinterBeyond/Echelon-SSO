import axios from "axios";
import AccessToken from "./types/AccessToken";
import UserData from "./types/UserData";
import Permissions from "./types/Permissions";

const BASE_DOMAIN = "https://sso.echelonservice.net";

/**
 * Returns access token for the
 * requesting user using their
 * authorization code.
 * 
 * @param clientid 
 * @param code 
 * @param secret 
 * @returns AccessToken
 */
export const GetAccessToken = async (clientid: string, code: string, secret: string): Promise<AccessToken> => {
    try {
        const response = await axios.post(`${BASE_DOMAIN}/api/v1/oauth/token`, { clientid, code, secret });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error ?? error.message;
    }
};

/**
 * Returns userdata if
 * oauth scope contains
 * `identify`
 * 
 * @param accessToken 
 * @returns UserData
 */
export const GetUserData = async (accessToken: string): Promise<UserData> => {
    try {
        const response = await axios.get(`${BASE_DOMAIN}/api/v1/user`, { headers: { Authorization: accessToken } });
        const { id, username, robloxID, discordID, verified, require2FA, requireU2F, role, terminated, selfTerminated, deleteDate } = response.data;
        const suspensionReason = response.data.suspended;
        const suspended = suspensionReason !== "";
        return { id, username, robloxID, discordID, verified, require2FA, requireU2F, role, suspended, suspensionReason, terminated, selfTerminated, deleteDate }
    } catch (error: any) {
        throw error.response?.data?.error ?? error.message;
    }
};

/**
 * Returns permission nodes
 * if oauth scope contains
 * `view.permissions`
 * 
 * @param accessToken 
 * @returns Permissions
 */
export const GetUserPermissions = async (accessToken: string): Promise<Permissions> => {
    try {
        const response = await axios.get(`${BASE_DOMAIN}/api/v1/user/permissions`, { headers: { Authorization: accessToken } });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error ?? error.message;
    }
};