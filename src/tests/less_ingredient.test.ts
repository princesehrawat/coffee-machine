/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import CoffeeMachine from '../machine';
// eslint-disable-next-line import/no-extraneous-dependencies
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
