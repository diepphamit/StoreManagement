export class Product {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public discount: number;
  public barcode: number;
  public supplierName: string;
  public categoryName: string;
  public pictures: any[];

  constructor(id: number, name?: string, description?: string, price?: number,
    discount?: number, barcode?: number, supplierName?: string, categoryName?: string, pictures?: any[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.discount = discount;
    this.barcode = barcode;
    this.supplierName = supplierName;
    this.categoryName = categoryName;
    this.pictures = pictures;
  }
}
