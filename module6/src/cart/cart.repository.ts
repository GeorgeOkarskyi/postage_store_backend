import { CartEntity, CartItemEntity } from "../models/cart.entity";
import { ProductEntity } from '../models/product.entity';
import { ProductDAL } from '../products/products.repository';
import { DeleteResponce } from '../models/responce.entity';
import { ExpressError } from '../models/error.entity';
import { NO_ITEMS_IN_CART_FOUND_MESSAGE, ServerResponseCodes } from '../constants';
import { Delivery, ORDER_STATUS, OrderEntity, Payment } from '../models/order.entity';
import Cart from '../database/models/cart';
import CartItem, { ICartItem } from '../database/models/cartItem';
import Product from '../database/models/product';
import Order from '../database/models/order';
export class CartDAL {
    private productDAL: ProductDAL;

    constructor(productDAL: ProductDAL) {
        this.productDAL = productDAL;
    }

    async getUserCart(userId: string): Promise<CartEntity> {
        const cart = await Cart.findOne({userId}).lean();

        if(!cart) {
            return null;
        }

        const cartItemsResponce: ICartItem[] = await CartItem.find({cartId: cart._id});


        const cartItems = await Promise.all(cartItemsResponce
            .map(async ({productId, count}: ICartItem) => {
                const productResponce = await Product.findById(productId).lean();

                return new CartItemEntity({count: count, product: new ProductEntity({...productResponce, id: productResponce._id as string})});
            }
        ));

        const total = cartItems.reduce((acc, { product, count }) => {
            return acc + (product.price * count);
        }, 0);

        return new CartEntity({ ...cart, id: cart._id as string, items: cartItems, total});
    }

    async createUserCart(userId: string): Promise<CartEntity> {
        const newCart = new Cart({ userId: userId, isDeleted: false });

        const savedCart = (await newCart.save()).toObject();

        return new CartEntity({...savedCart, id: savedCart._id as string, items: []});
    }

    async updateUserCart(userId: string, product: { productId: string, count: number }): Promise<CartEntity> {
        const { id: userCartId } = await this.getUserCart(userId);

        if(!product.count){
            await CartItem.deleteOne({productId: product.productId})

            return await this.getUserCart(userId);
        }

        const isItemExistInCart = (await CartItem.find({ cartId: userCartId, productId: product.productId })).length;


        if(isItemExistInCart) {
            await CartItem.updateOne({ cartId: userCartId, productId: product.productId }, 
                { $set: { count: product.count } });
        } else {
            const cartItem = new CartItem({ cartId: userCartId, productId: product.productId, count: product.count});
            await cartItem.save();
        }

        return await this.getUserCart(userId);
    }

    async emptyUserCart(userId: string): Promise<DeleteResponce> {
        const userCart = await this.getUserCart(userId);

        const { deletedCount } = await CartItem.deleteMany({cartId: userCart.id}); 

        if(!deletedCount) {
            throw new ExpressError( {message: NO_ITEMS_IN_CART_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }

        return new DeleteResponce({ success: true });
    }

    async chackoutUserCart(userId: string, payment: Payment, delivery: Delivery, comments: string, status: ORDER_STATUS): Promise<OrderEntity>{
        const { id: cartId, items, total } = await this.getUserCart(userId);

        const newOrder = new Order({userId, 
            cartId, 
            items: items.map((item) => new CartItem({ cartId: cartId, productId: item.product.id, count: item.count})), 
            payment, 
            delivery, 
            comments, 
            status, 
            total});

        const newOrderResponse = (await newOrder.save()).toObject();

        await this.emptyUserCart(userId);

        return new OrderEntity({...newOrderResponse, items, id: newOrderResponse._id as string}) 
    }
}
