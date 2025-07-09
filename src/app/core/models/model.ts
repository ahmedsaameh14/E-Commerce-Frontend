export interface IReg{
    name:string,
    email:string,
    password:string,
}

export interface IAuth{
    email:string,
    password:string
}

export interface ILoginRes{
    token:string,
    message:string,
}

export interface IUser{
    name:string,
    id:string,
    role:string,
}