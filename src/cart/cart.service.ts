import { CartEntity, CartItemEntity } from "../shared-entities/cart.entity";
import { Delivery, ORDER_STATUS, OrderEntity, Payment } from "../shared-entities/order.entity";
import { DeleteResponce } from "../shared-entities/responce.entity";
import { CartDAL } from "./cart.repository";

class CartService {
    private cartDAL: CartDAL;

    constructor( cartDAL: CartDAL ) {
        this.cartDAL = cartDAL;
    }

    async getUserCart(userId: string): Promise<CartEntity> {
        let userCart = await this.cartDAL.requestUserCart(userId);
        
        if(!userCart) {
            userCart = await this.cartDAL.createUserCart(userId);
        }

        return new CartEntity({ ...userCart, items: userCart.items?.getItems()
            .map((item) => new CartItemEntity({...item, cartId: userCart.id}))});
    }

    async updateUserCart(userId: string, product: { productId: string, count: number }): Promise<CartEntity> {
        const updatedUserCart = await this.cartDAL.updateUserCart(userId, product);

        return new CartEntity({ ...updatedUserCart, items: updatedUserCart.items?.getItems()
            .map((item) => new CartItemEntity({...item, cartId: updatedUserCart.id}))});
    }

    async emptyUserCart(userId: string): Promise<DeleteResponce>{
        const updateUserCartResponce = await this.cartDAL.emptyUserCart(userId);

        return updateUserCartResponce;
    }

    async chackoutUserCart(userId: string, 
        { payment, delivery, comments, status }: { payment: Payment, delivery: Delivery, comments: string, status: ORDER_STATUS }): Promise<OrderEntity>{
        const userOrder = await this.cartDAL.chackoutUserCart(userId, payment, delivery, comments, status);
        
        if(userOrder) {
            await this.cartDAL.emptyUserCart(userId);
        }
        
        return new OrderEntity({...userOrder, items: userOrder.items.map((item) => new CartItemEntity({...item, cartId: userOrder.cartId}))});
    }
}

const cartDAL = new CartDAL();

export default new CartService(cartDAL);