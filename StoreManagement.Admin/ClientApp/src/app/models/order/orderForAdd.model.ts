export class OrderForAdd {
    public id: string;
    public staffId: Number;
    public customerId: Number;
    public orderDate: string;
    public code: string;
    public totalprice: Number;

    constructor(id?: string, staffId?: Number, customerId?: Number, orderDate?: string, code?: string, totalPrice?: Number) {
        this.id = id;
        this.staffId = staffId;
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.code = code;
        this.totalprice = totalPrice;
    }
}
