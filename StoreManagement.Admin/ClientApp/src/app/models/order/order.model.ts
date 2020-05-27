export class Order {
  public id: string;
  public staffName: string;
  public customerName: string;
  public orderDate: Date;
  public code: string;
  public totalprice: Number;

  constructor(id?: string, staffName?: string, customerName?: string, orderDate?: Date, code?: string, totalPrice?: Number) {
      this.id = id;
      this.staffName = staffName;
      this.customerName = customerName;
      this.orderDate = orderDate;
      this.code = code;
      this.totalprice = totalPrice;
  }
}

export class OrderForList {
  public id: string;
  public staffName: string;
  public customerName: string;
  public orderDate: Date;
  public code: string;
  public totalprice: number;

  constructor(id?: string, staffName?: string, customerName?: string, orderDate?: Date, code?: string, totalPrice?: number) {
      this.id = id;
      this.staffName = staffName;
      this.customerName = customerName;
      this.orderDate = orderDate;
      this.code = code;
      this.totalprice = totalPrice;
  }
}
