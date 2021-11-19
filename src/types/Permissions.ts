interface Permission {
    identifier: string;
    value: number;
}

interface Permissions {
    permissions: Permission[];
}

export default Permissions;