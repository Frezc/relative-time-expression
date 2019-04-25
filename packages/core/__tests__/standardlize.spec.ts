import { standardlize } from "../src";

describe('encode', () => {
  it('format empty', () => {
    expect(standardlize('')).toEqual('now');
  });

  it('remove unused space and number', () => {
    expect(standardlize(' now   - 1   d /w')).toEqual('now-d/w');
  });

  it('add now', () => {
    expect(standardlize('+d')).toEqual('now+d');
  });
})