interface IDeliveryParams {
    type: string,
    address: string,
  }

export class Delivery {
  public type: string;
  public address: string;

  constructor ({ type, address }: IDeliveryParams) {
    this.type = type;
    this.address = address;
  }
}
