/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import fs from 'fs';
import BeverageItem from './beverages';
import IngredientItem from './ingredients';

// const file = 'src/data.json';

export function GetData(file = 'src/data.json') {
  const databuffer = fs.readFileSync(file);
  return JSON.parse(databuffer.toString());
}

export async function SetData(data: any, file = 'src/data.json') {
  await fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export async function StoreIngredient(
  item: IngredientItem,
  file = 'src/data.json',
) {
  const data = GetData(file);
  const ingredients = data?.machine?.total_items_quantity;
  if (ingredients[item.name] === undefined) {
    ingredients[item.name] = item.quantity;
  } else {
    ingredients[item.name] += item.quantity;
  }
  data.machine.total_items_quantity = ingredients;
  await SetData(data, file);
}

export async function StoreBeverage(
  item: BeverageItem,
  file = 'src/data.json',
) {
  const data = GetData(file);
  const beverages = data?.machine?.beverages;
  beverages[item.name] = item.ingredients;
  data.machine.beverages = beverages;
  await SetData(data, file);
}

export async function GetOutlets(): Promise<number> {
  const data = GetData();
  return data.machine.outlets.count_n;
}
