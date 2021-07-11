import CoffeeMachine from '../machine';
import '@babel/polyfill';
import { GetData, StoreIngredient } from '../store';

test('Add ingredient', () => {
  const outlets = 2;
  const configFile = 'src/tests/no_outlets.json';
  const previousData = GetData(configFile);
  const prevQuantity = previousData.machine.total_items_quantity.test_ingredient || 0;

  const coffeeMachine = new CoffeeMachine(outlets, configFile);
  StoreIngredient(
    coffeeMachine.AddIngredient('test_ingredient', 50),
    configFile,
  );

  const data = GetData(configFile);
  const newQuantity = data.machine.total_items_quantity.test_ingredient || 0;

  expect(newQuantity - prevQuantity).toBe(50);
});
