import {ColumnHolder} from './ColumnHolder';

describe('ColumnHolder', () => {
  let columnHolder: ColumnHolder;

  beforeEach(() => {
    const template: string[] = ['a', 'b', 'c', 'd', 'e'];
    columnHolder = new ColumnHolder(template);
  });

  it('should initially have columns matching the template', () => {
    const template: string[] = ['a', 'b', 'c', 'd', 'e'];
    expect(columnHolder.getFields()).toEqual(template);
  });

  it('should throw when trying to add fields outside the template', () => {
    const input = 'g';
    expect(() => {columnHolder.setFieldVisibility(input, true); }).toThrowError('There is no field with value g inside template: [ a,b,c,d,e ]');
  });

  it('should remove given letter from correct position (first)', () => {
    const input = 'a';
    const expected: string[] = ['b', 'c', 'd', 'e'];

    columnHolder.setFieldVisibility(input, false);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should remove given letter from correct position (middle)', () => {
    const input = 'c';
    const expected: string[] = ['a', 'b', 'd', 'e'];

    columnHolder.setFieldVisibility(input, false);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should remove given letter from correct position (last)', () => {
    const input = 'e';
    const expected: string[] = ['a', 'b', 'c', 'd'];

    columnHolder.setFieldVisibility(input, false);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should add given letter at correct position (last)', () => {
    const input = 'e';
    const expected: string[] = ['a', 'b', 'c', 'd', 'e'];

    columnHolder.setFieldVisibility(input, false);
    columnHolder.setFieldVisibility(input, true);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should add given letter at correct position (first)', () => {
    const input = 'a';
    const expected: string[] = ['a', 'b', 'c', 'd', 'e'];

    columnHolder.setFieldVisibility(input, false);
    columnHolder.setFieldVisibility(input, true);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should add given letter at correct position (middle)', () => {
    const input = 'c';
    const expected: string[] = ['a', 'b', 'c', 'd', 'e'];

    columnHolder.setFieldVisibility(input, false);
    columnHolder.setFieldVisibility(input, true);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should not add given letter twice', () => {
    const input = 'c';
    const expected: string[] = ['a', 'b', 'c', 'd', 'e'];

    columnHolder.setFieldVisibility(input, true);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should not remove given letter twice', () => {
    const input = 'c';
    const expected: string[] = ['a', 'b', 'd', 'e'];

    columnHolder.setFieldVisibility(input, false);
    columnHolder.setFieldVisibility(input, false);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should remove given letters correctly', () => {
    const expected: string[] = ['b', 'd', 'e'];

    columnHolder.setFieldVisibility('a', false);
    columnHolder.setFieldVisibility('c', false);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should add given letters correctly', () => {
    const expected: string[] = ['a', 'b', 'c', 'd', 'e'];

    columnHolder.setFieldVisibility('a', false);
    columnHolder.setFieldVisibility('c', false);
    columnHolder.setFieldVisibility('a', true);
    columnHolder.setFieldVisibility('c', true);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should add and remove given letters correctly', () => {
    const expected: string[] = ['a', 'b', 'd', 'e'];

    columnHolder.setFieldVisibility('a', false);
    columnHolder.setFieldVisibility('c', false);
    columnHolder.setFieldVisibility('a', true);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should remove all letters correctly', () => {
    const expected: string[] = [];

    columnHolder.setFieldVisibility('a', false);
    columnHolder.setFieldVisibility('b', false);
    columnHolder.setFieldVisibility('c', false);
    columnHolder.setFieldVisibility('d', false);
    columnHolder.setFieldVisibility('e', false);

    expect(columnHolder.getFields()).toEqual(expected);
  });

  it('should add all letters correctly', () => {
    const expected: string[] = ['a', 'b', 'c', 'd', 'e'];

    columnHolder.setFieldVisibility('a', false);
    columnHolder.setFieldVisibility('b', false);
    columnHolder.setFieldVisibility('c', false);
    columnHolder.setFieldVisibility('d', false);
    columnHolder.setFieldVisibility('e', false);

    columnHolder.setFieldVisibility('a', true);
    columnHolder.setFieldVisibility('b', true);
    columnHolder.setFieldVisibility('c', true);
    columnHolder.setFieldVisibility('d', true);
    columnHolder.setFieldVisibility('e', true);

    expect(columnHolder.getFields()).toEqual(expected);
  });
});
