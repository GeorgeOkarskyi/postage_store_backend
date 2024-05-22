interface ExpressErrorParams { 
  message: string, 
  status: number 
}


export class ExpressError extends Error {
    status: number;

    constructor({ message, status }: ExpressErrorParams) {
      super();
      this.message = message;
      this.status = status;
    }
}