export class OrderProduct {
  public id: number;
  public staffId: number;
  public staffName: string;
  public customerId: number;
  public customerName: string;
  public orderDate: Date;
  public status: boolean;
  public code: number;
  public totalPrice: number;


  constructor(id?: number, staffId?: number, staffName?: string,
    customerId?: number, customerName?: string, orderDate?: Date,
    status?: boolean, code?: number, totalPrice?: number) {
    this.id = id;
    this.staffId = staffId;
    this.staffName = staffName;
    this.customerId = customerId;
    this.customerName = customerName;
    this.orderDate = orderDate;
    this.status = status;
    this.code = code;
    this.totalPrice = totalPrice;

  }
}
