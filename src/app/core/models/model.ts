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

    subCategory:string;
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

export interface PaginatedResult<T> {
  page: number;
  limit: number;
  totalPages: number;
  totalResult: number;
  result: T[];
}

export interface IProfile {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  isVerified: boolean;
  address: [];
}

export interface ICartResponse {
  _id?: string;
  productId: {
    _id: string;
    product_title: string;
    stock:number;
  };
  product_title?: string;
  userId: string;
  quantity: number;
  originalPrice: number;
  currentPrice: number;
  priceChanged?: boolean;
  removedAt: Date;
  isPurchased: boolean;
}


export interface IOrders {
  orderNumber:number;
  shippingData: {
    address: string[];
    phone: string;
  };
  _id: string;
  userId: {
    _id:string,
    email:string
  };
  products: [
    {
      productId: {
        _id?: string;
        name: string;
        imgURL: string;
        price: number;
        product_description: string;
        category_name: string;
        isActive: boolean;
        routeProduct: string;
      };
      quantity: number;
      price: number;
      _id?: string;
    }
  ];
  status: string;
  paymentMethod: string;
  createdAt:string
}
