export interface IngredientItemInterface {
  name: string;
  quantity: number;
}

export default class IngredientItem implements IngredientItemInterface {
  name: string;

  quantity: number;

  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }
}
