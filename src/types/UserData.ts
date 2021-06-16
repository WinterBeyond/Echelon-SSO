interface UserData {
    id: string;
    username: string;
    robloxID: string;
    discordID: string;
    verified: boolean;
    require2FA: boolean;
    requireU2F: boolean;
    role: string;
    suspended: boolean;
    suspendedReason: string;
}

export default UserData;