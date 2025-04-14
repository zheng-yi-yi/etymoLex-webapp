import { mapEnumToOptions } from '@abp/ng.core';

export enum MorphemeType {
  Root = 1,
  Prefix = 2,
  Suffix = 3,
}

export const morphemeTypeOptions = mapEnumToOptions(MorphemeType);
