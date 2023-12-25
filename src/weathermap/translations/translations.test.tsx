/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { describe, expect } from "vitest";

import en from './en.json';
import fi from './fi.json';

const translations = [en, fi];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const compareKeysDeep = (obj1: any, obj2: any, parentKey?: string) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  let difference = null;
  if (keys1.length !== keys2.length) {
    difference = `Keys are not equal`;
  }

  expect(difference).toBe(null);

  keys1.forEach((key) => {
    if (typeof obj1[key] === 'object') {
      compareKeysDeep(
        obj1[key],
        obj2[key],
        parentKey ? `${parentKey}.${key}` : key,
      );
    }
  });
};

describe('Languages', () => {
  test('should have same keys', () => {
    // All translations should have same keys as english
    translations.slice(1).forEach((translation) => {
      compareKeysDeep(en, translation);
    });
  });
});
