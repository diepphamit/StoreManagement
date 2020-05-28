export class OrderRevenue {
  datetime: Date;
  totalRevenue: number;

  constructor(datetime?: Date, totalRevenue?: number) {
    this.datetime = datetime;
    this.totalRevenue = totalRevenue;
  }
}
