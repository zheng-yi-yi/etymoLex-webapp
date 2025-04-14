import type { MorphemeType } from '../enums/morpheme-type.enum';
import type { ExtensibleAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateMorphemeDto extends CreateUpdateNameObjectDto {
  value?: string;
  type?: MorphemeType;
  originLanguage?: string;
  meaning?: string;
}

export interface CreateUpdateNameObjectDto {
  name: string;
  description?: string;
  tenantId?: string;
  tenantName?: string;
  displayName?: string;
  extraProperties: Record<string, object>;
}

export interface GetNameObjectInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface ImportResultDto {
  status: boolean;
  totalCount: number;
  successCount: number;
  failedCount: number;
  items: ImportResultItemDto[];
}

export interface ImportResultItemDto {
  name?: string;
  errorMessage?: string;
}

export interface ModelingHistoryDto {
  id?: string;
  userName?: string;
  executionTime?: string;
  changeType?: string;
  children: ModelingPropertyDto[];
}

export interface ModelingInputDto<TKey> extends PagedAndSortedResultRequestDto {
  id: TKey;
}

export interface ModelingPropertyDto {
  propertyName?: string;
  originalValue?: string;
  newValue?: string;
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

export interface NameObjectDto<Tkey> extends ExtensibleAuditedEntityDto<Tkey> {
  name?: string;
  description?: string;
  tenantId?: string;
  tenantName?: string;
  normalizedName?: string;
  displayName?: string;
  creator?: string;
  lastModifier?: string;
}
