import { CartEntity } from '../shared-entities/cart.entity';
import { DeleteResponce } from './delete-responce';
import { ExpressError } from '../shared-entities/error.entity';
import { OrderEntity } from '../shared-entities/order.entity';
import { ProductEntity } from '../shared-entities/product.entity';
import { UserEntity } from '../shared-entities/user.entity';
import { loginResponce } from './login-responce.entity';

type ResponseData = Array<ProductEntity> | ProductEntity
| CartEntity | OrderEntity | DeleteResponce | UserEntity | loginResponce;

interface InterfaceResponseDTO {
    data?: ResponseData,
    error?: ExpressError
}

export class ResponseDTO {
  public data: ResponseData | null;
  public error: Partial<Error> | null;

  constructor ({ data, error }: InterfaceResponseDTO) {
    this.data = data || null;
    this.error = error ? { message: error.message || 'An unexpected error occurred' } : null;
  }
}
export { loginResponce, DeleteResponce };

