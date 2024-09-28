interface IProductEntity {
    id: string;
    title: string;
    description: string;
    price: number;
}

export class ProductEntity {
  public id: string;
  public title: string;
  public description: string;
  public price: number;

  constructor ({ id, title, description, price }: IProductEntity) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = Number(price);
  }
}
