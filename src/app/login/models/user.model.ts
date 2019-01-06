export class IUserModel {
      Id : number;
      Title  : string
      FirstName  : string
      LastName : string
      EmpId : string
      Phone : string
      Email : string
      DeptId? : number
      IsActive? : boolean
      token : string
}

export class IUserRoleModel
{
      Id : number 
      UserId : number
      RoleId :number
}

export class LoginDetails
{
      UserId : string
      Password : string
}
