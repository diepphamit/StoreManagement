export class ProductForEdit {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public discount: number;
  public barcode: number;
  public supplierId: number;
  public categoryId: number;

  constructor(id: number, name?: string, description?: string, price?: number,
    discount?: number, barcode?: number, supplierId?: number, categoryId?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.discount = discount;
    this.barcode = barcode;
    this.supplierId = supplierId;
    this.categoryId = categoryId;
  }
}
