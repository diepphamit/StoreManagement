export class OrderForAdd {
    public id: string;
    public staffId: number;
    public customerId: number;
    public orderDate: string;
    public code: string;
    public totalprice: number;

    constructor(id?: string, staffId?: number, customerId?: number, orderDate?: string, code?: string, totalPrice?: number) {
        this.id = id;
        this.staffId = staffId;
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.code = code;
        this.totalprice = totalPrice;
    }
}
