export class PictureForEdit {
  public productId: number;
  public imageUrl: string;

  constructor(productId?: number, imageUrl?: string) {
    this.productId = productId;
    this.imageUrl = imageUrl;
  }
}
