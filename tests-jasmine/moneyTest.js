import { twoDecimalPlaces } from '../scripts/utils/money.js';

describe('test suit: format currency', () => {
  it('converts cents into dollars', () => {
    expect(twoDecimalPlaces(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(twoDecimalPlaces(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(twoDecimalPlaces(2000.5)).toEqual('20.01');
  });
});
