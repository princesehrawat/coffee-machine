import CoffeeMachine from '../machine';
import '@babel/polyfill';

test('less ingredient test', () => {
  const outlets = 4;
  const coffeeMachine = new CoffeeMachine(
    outlets,
    'src/tests/less_integration.json',
  );

  return expect(coffeeMachine.PrepareBeverage('hot_tea')).rejects.toEqual(
    new Error("Can't prepare drink"),
  );
});
