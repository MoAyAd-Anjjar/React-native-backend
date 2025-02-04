export interface ICartType{
        user_id: string;
        username: string;
        cartList: IProduct[];
    
}
export interface IProduct {
    productname: string;
    productprice: number;
    productdescrpiton: string;
    productimage: string;
    product_id: string;
    product_category: string;
    quantity?: number|any;
  }