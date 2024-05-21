import { Item } from './item';

export class Basket {
  items: Item[];
  totalSum: number;
  ccy: string;
  constructor() {
    this.items = [];
    this.totalSum = 0;
  }

  addItem(item: Item) {
    this.items.push(item);
    this.totalSum += item.price * item.quantity;
  }

  removeItem(item: Item) {
    this.items = this.items.filter((it) => it.name !== item.name);
    this.totalSum -= item.price * item.quantity;
    if (this.items.length == 0) this.ccy = '';
  }

  isNotEmpty() {
    return this.items.length > 0;
  }

  setCcy(ccy: string) {
    this.ccy = ccy;
  }
}
