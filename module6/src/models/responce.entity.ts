import { ProductEntity } from './product.entity';
import { CartEntity } from './cart.entity';
import { OrderEntity } from './order.entity';
import { ExpressError } from './error.entity';

interface InterfaceDeleteResponce {
  success: boolean;
}

export class DeleteResponce {
  public success: boolean;

  constructor({ success }: InterfaceDeleteResponce) {
    this.success = success;
  }
}

type ResponseData = Array<ProductEntity> | ProductEntity | CartEntity | OrderEntity | DeleteResponce;

interface InterfaceResponseDTO {
    data?: ResponseData,
    error?: ExpressError
}

export class ResponseDTO {
    public data: ResponseData | null;
    public error: Partial<Error> | null;
  
    constructor({ data, error }: InterfaceResponseDTO) {
      this.data = data || null;
      this.error = error ? { message: error.message || 'An unexpected error occurred' } : null;
    }
};