import type { CreateUpdateNameObjectDto, GetNameObjectInput, NameObjectDto } from '../models';
import type { MorphemeType } from '../../enums/morpheme-type.enum';

export interface CreateUpdateMorphemeDto extends CreateUpdateNameObjectDto {
  value?: string;
  type?: MorphemeType;
  originLanguage?: string;
  meaning?: string;
}

export interface ExportMorphemeDto {
  value?: string;
  type?: MorphemeType;
  originLanguage?: string;
  meaning?: string;
  description?: string;
}

export interface MorphemeDto extends NameObjectDto<string> {
  value?: string;
  type?: MorphemeType;
  originLanguage?: string;
  meaning?: string;
}

export interface MorphemeGetListInput extends GetNameObjectInput {
  value?: string;
  type?: MorphemeType;
  originLanguage?: string;
  meaning?: string;
}
