let permissions={
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    delete: [],
    }
    }
    function hasPermission(moduleName, role, permissionType) {
        if (
        permissions[moduleName]["all"].includes(role) ||
        permissions[moduleName][permissionType].includes(role))
        {
        console.log("True");
        return ;
        } 
        else 
        {
        console.log("False");
       
        }}
     
        hasPermission("getUsers","head-trainer","all")



   
   

