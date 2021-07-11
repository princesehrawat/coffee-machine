export interface BeverageItemInterface {
  ingredients: Record<string, number>;
  name: string;
}

export default class BeverageItem implements BeverageItemInterface {
  name: string;

  ingredients: Record<string, number>;

  constructor(name: string, ingredients: Record<string, number>) {
    this.name = name;
    this.ingredients = ingredients;
  }
}
