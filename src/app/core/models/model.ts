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

export interface IProduct{
    _id:string;
    name:string;
    price:number;
    desc:string;
    imgURL:string;
    stock:number;
}

export interface IProductsRes {
  page: number;
  limit: number;
  totalPages: number;
  totalResult: number;
  result: IProduct[];
}

export interface IProductRes {
  message: string,
  data: IProduct;
}

export interface IProductRelatedRes {
  message: string;
  data: IProduct[];
}