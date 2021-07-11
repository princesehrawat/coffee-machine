import CoffeeMachine from './machine';
import { StoreBeverage, StoreIngredient } from './store';

process.on('unhandledRejection', (error) => {
  console.log(error?.toString());
});

const outlets = 4;
const coffeeMachine = new CoffeeMachine(outlets);

// To monitor the quality of ingredients at regular time
setInterval(coffeeMachine.MonitorIngredients, 20000);

// Add items in coffee machine

const ingredient = coffeeMachine.AddIngredient('hot_water', 50);
StoreIngredient(ingredient);

StoreIngredient(coffeeMachine.AddIngredient('CoffeePowder', 25));

// Add beverage
const beverage = coffeeMachine.AddBeverage('BlackCoffee', {
  Water: 10,
  CoffeePowder: 5,
});
StoreBeverage(beverage);

// Prepare beverage

coffeeMachine.PrepareBeverage('hot_tea');
coffeeMachine.PrepareBeverage('hot_tea');

coffeeMachine.PrepareBeverage('hot_tea');
coffeeMachine.PrepareBeverage('hot_tea');

coffeeMachine.PrepareBeverage('hot_tea');
coffeeMachine.PrepareBeverage('hot_tea');

setTimeout(coffeeMachine.PrepareBeverage, 10000, 'hot_tea');

setTimeout(coffeeMachine.PrepareBeverage, 20000, 'hot_tea');
