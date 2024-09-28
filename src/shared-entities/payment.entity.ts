interface IPaymentParams {
    type: string,
    address?: string,
    creditCard?: string,
}

export class Payment {
  public type: string;
  public address?: string;
  public creditCard?: string;

  constructor ({ type, address, creditCard }: IPaymentParams) {
    this.type = type;
    this.address = address;
    this.creditCard = creditCard;
  }
}
