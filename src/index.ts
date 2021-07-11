/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import CoffeeMachine from './machine';
import { StoreBeverage, StoreIngredient } from './store';

// Handle all the errors centrally
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

// Add a beverage
const beverage = coffeeMachine.AddBeverage('BlackCoffee', {
  Water: 10,
  CoffeePowder: 5,
});
StoreBeverage(beverage);

// Prepare beverages, due to the async behaviour of nodeJs, these tasks will run parallely

coffeeMachine.PrepareBeverage('hot_tea');
coffeeMachine.PrepareBeverage('hot_tea');

coffeeMachine.PrepareBeverage('hot_tea');
coffeeMachine.PrepareBeverage('hot_tea');

// For 4 outlets, below these functions will throw error
coffeeMachine.PrepareBeverage('hot_tea');
coffeeMachine.PrepareBeverage('hot_tea');

// Outlets will be free after a while and will be ready to prepare
setTimeout(coffeeMachine.PrepareBeverage, 10000, 'hot_tea');

setTimeout(coffeeMachine.PrepareBeverage, 20000, 'hot_tea');
