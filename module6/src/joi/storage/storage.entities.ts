interface ICartStorage {
    id: string,
    userId: string,
    isDeleted: boolean,
}

interface ICartItemStorage {
    id: string,
    cartId: string,
    productId: string,
    count: number
}

export class CartItemStorage {
    public id: string;
    public cartId: string;
    public productId: string;
    public count: number;

    constructor({id, cartId, productId, count}: ICartItemStorage) {
        this.id = id;
        this.cartId = cartId;
        this.productId = productId;
        this.count = count;
    }
}

export class CartStorage {
    public id: string;
    public userId: string;
    public isDeleted: boolean;

    constructor({id, userId, isDeleted}:ICartStorage) {
        this.id = id;
        this.userId = userId;
        this.isDeleted = isDeleted
    }
}