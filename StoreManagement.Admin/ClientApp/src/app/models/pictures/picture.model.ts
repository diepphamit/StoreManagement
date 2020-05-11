export class Picture {
  public id: number;
  public productName: string;
  public imageUrl: string;

  constructor(id: number, productName?: string, imageUrl?: string) {
    this.id = id;
    this.productName = productName;
    this.imageUrl = imageUrl;
  }
}
