export class PictureToUpload {
  public file: File;
  public productId: number;

  constructor(file?: File, productId?: number) {
    this.file = file;
    this.productId = productId;
  }
}
