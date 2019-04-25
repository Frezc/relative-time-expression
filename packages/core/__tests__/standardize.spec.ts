import { standardize } from "../src";

describe('encode', () => {
  it('format empty', () => {
    expect(standardize('')).toEqual('now');
  });

  it('remove unused space and number', () => {
    expect(standardize(' now   - 1   d /w')).toEqual('now-d/w');
  });

  it('add now', () => {
    expect(standardize('+d')).toEqual('now+d');
  });
})