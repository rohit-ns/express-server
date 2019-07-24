let permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read : ['trainee', 'trainer'],
        write : ['trainer'],
        delete: [],
    }
};
function hasPermission(moduleName, role, permissionType) {
        const isAllowed = permissions[moduleName]["all"].includes(role)
                || permissions[moduleName][permissionType].includes(role);

        return isAllowed ? console.log("True") : console.log("False");
        
}
     
        hasPermission("getUsers","head-trainer","all")



   
   

