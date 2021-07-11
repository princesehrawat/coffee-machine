/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import CoffeeMachine from '../machine';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';

test('No outlets available', () => {
  const outlets = 2;
  const coffeeMachine = new CoffeeMachine(outlets, 'src/tests/no_outlets.json');
  coffeeMachine.PrepareBeverage('hot_tea');
  coffeeMachine.PrepareBeverage('hot_tea');

  return expect(coffeeMachine.PrepareBeverage('hot_tea')).rejects.toEqual(
    new Error('Cannot accept the order, All outlets are busy'),
  );
});
