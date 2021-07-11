/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import BeverageItem, { BeverageItemInterface } from './beverages';
import IngredientItem, { IngredientItemInterface } from './ingredients';
import { GetData, SetData } from './store';

interface CoffeeMachineInterface {
  [x: string]: any;
  outlets: number;
}

const prepareTime = 5000; // in ms
const THRESHOLD_QUANTITY = 20;

// After completion, state of that outlet will be released, and message will be displayed
function handleCompletion(
  outlet: number,
  beverageName: string,
  coffeeObj: CoffeeMachineInterface,
) {
  coffeeObj.setState(outlet, false);
  console.log(`Outlet #${outlet + 1} has finished preparing ${beverageName}`);
}

export default class CoffeeMachine implements CoffeeMachineInterface {
  outlets: number;

  configFile: string;

  private state: boolean[];

  private timeToPrepare = prepareTime;

  constructor(outlets: number, file = 'src/data.json') {
    this.outlets = outlets;
    this.state = new Array(outlets);
    this.configFile = file;
    // State is to maintain current state of all the outlets
    for (let i = 0; i < this.state.length; i += 1) {
      this.state[i] = false;
    }
  }

  setState = (outlet: number, state: boolean): void => {
    this.state[outlet] = state;
  };

  AddIngredient = (
    name: string,
    initialQuantity: number,
  ): IngredientItemInterface => new IngredientItem(name, initialQuantity);

  AddBeverage = (
    name: string,
    ingredients: Record<string, number>,
  ): BeverageItemInterface => new BeverageItem(name, ingredients);

  GetBeverageDetails = async (
    name: string,
  ): Promise<Record<string, number>> => {
    const data = await GetData(this.configFile);
    const beverages = data?.machine?.beverages;
    return beverages[name];
  };

  // To find the outlet that is free to prepare next beverage
  GetFreeOutlet = (): number => {
    for (let i = 0; i < this.state.length; i += 1) {
      if (!this.state[i]) {
        this.state[i] = true;
        return i;
      }
    }
    throw new Error('Cannot accept the order, All outlets are busy');
  };

  ConsumeIngredients = async (
    ingredients: Record<string, number>,
  ): Promise<void | Error> => {
    const data = await GetData(this.configFile);
    const allIngredients = data?.machine?.total_items_quantity;
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(ingredients)) {
      if (allIngredients[key] === undefined) {
        throw new Error("Can't prepare drink");
      }
      allIngredients[key] -= value;
      if (allIngredients[key] < 0) {
        throw new Error("Can't prepare drink");
      }
    }
    data.machine.total_items_quantity = allIngredients;
    await SetData(data);
  };

  PrepareBeverage = async (name: string): Promise<void> => {
    const beverageIngredients = await this.GetBeverageDetails(name);
    const outlet = this.GetFreeOutlet();
    await this.ConsumeIngredients(beverageIngredients);
    console.log(`Outlet #${outlet + 1} is preparing ${name}`);
    setTimeout(handleCompletion, this.timeToPrepare, outlet, name, this);
  };

  MonitorIngredients = async (): Promise<void> => {
    const data = await GetData(this.configFile);
    const allIngredients = data?.machine?.total_items_quantity;
    const insufficient = Object.keys(allIngredients).filter(
      (index) => allIngredients[index] < THRESHOLD_QUANTITY,
    );
    if (insufficient.length) {
      console.log(
        `These ingredients are low in quantity: ${insufficient.join(',')}`,
      );
    }
  };
}
