interface Permissions {
    globalPermission: GlobalPermission;
    departmentPermissions: Array<DepartmentPermission>;
}

interface GlobalPermission {
    nodes: Array<string>;
}

interface DepartmentPermission {
    department: string;
    nodes: Array<string>;
}

export default Permissions;