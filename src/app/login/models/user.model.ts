export class IUserModel {
      Id : number;
      Title  : string
      FirstName  : string
      LastName : string
      EmpId : string
      Phone : string
      Email : string
      DeptId? : number
      RoleId :number
      IsActive? : boolean
      token : string
}

export class IUserRoleModel
{
      UserId : number
      RoleId : number
      MenuList : IMenuModel
      FunctionList  : IFunctionModel

}

// export class IRoleMenu
// {
//       Id : number
//       RoleId : number
//       MenuId :number  
// }
// export class IRoleFunction
// {
//       Id : number
//       RoleId : number
//       FunctionId :number
// }

export class IMenuModel
{
      Id : number
      MenuTitle : string 
      ParentMenuId : number
      MenuLink :string
      TemplateUrl  :string
      Controller  :string
      ControllerAs :string 
      IsDisabled : boolean
      IsStateRequired : boolean
      DisplayOrder : number
      Tag  : string

}

export class IFunctionModel
{
      Id : number
      FunctionCode : string
      FunctionName : string
      FunctionDescription : string

}

export class LoginDetails
{
      UserId : string
      Password : string
}
