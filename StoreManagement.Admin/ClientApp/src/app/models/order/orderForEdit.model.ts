export class OrderForEdit {
    public id: string;
    public staffId: string;
    public customerId: string;
    public orderDate: string;
    public code: string;
    public totalprice: Number;

    constructor(id?: string, staffId?: string, customerId?: string, orderDate?: string, code?: string, totalPrice?: Number) {
        this.id = id;
        this.staffId = staffId;
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.code = code;
        this.totalprice = totalPrice;
    }
}
