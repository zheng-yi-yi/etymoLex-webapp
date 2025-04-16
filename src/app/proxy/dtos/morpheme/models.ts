import type { CreateUpdateNameObjectDto, GetNameObjectInput, NameObjectDto } from '../models';
import type { MorphemeType } from '../../enums/morpheme-type.enum';
import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateMorphemeDto extends CreateUpdateNameObjectDto {
  value?: string;
  type?: MorphemeType;
  originLanguage?: string;
  meaning?: string;
  examples: CreateUpdateMorphemeExampleDto[];
}

export interface CreateUpdateMorphemeExampleDto {
  word?: string;
  definition?: string;
  breakdown?: string;
}

export interface ExportMorphemeDto {
  value?: string;
  type?: MorphemeType;
  originLanguage?: string;
  meaning?: string;
  description?: string;
  examples: ExportMorphemeExampleDto[];
}

export interface ExportMorphemeExampleDto {
  word?: string;
  definition?: string;
  breakdown?: string;
}

export interface MorphemeDto extends NameObjectDto<string> {
  value?: string;
  type?: MorphemeType;
  originLanguage?: string;
  meaning?: string;
  examples: MorphemeExampleDto[];
}

export interface MorphemeExampleDto extends AuditedEntityDto<string> {
  word?: string;
  definition?: string;
  breakdown?: string;
}

export interface MorphemeGetListInput extends GetNameObjectInput {
  value?: string;
  type?: MorphemeType;
  originLanguage?: string;
  meaning?: string;
}
