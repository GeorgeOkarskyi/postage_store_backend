interface InterfaceDeleteResponce {
    success: boolean;
  }

export class DeleteResponce {
  public success: boolean;

  constructor ({ success }: InterfaceDeleteResponce) {
    this.success = success;
  }
}
