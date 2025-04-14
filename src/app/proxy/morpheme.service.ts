import type { CreateUpdateMorphemeDto, ImportResultDto, ModelingHistoryDto, ModelingInputDto, MorphemeDto, MorphemeGetListInput } from './dtos/models';
import type { FileType } from './enums/file-type.enum';
import type { OverridingMode } from './enums/overriding-mode.enum';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MorphemeService {
  apiName = 'Default';
  

  copy = (input: CreateUpdateMorphemeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MorphemeDto>({
      method: 'POST',
      url: '/api/app/morpheme/copy',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateUpdateMorphemeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MorphemeDto>({
      method: 'POST',
      url: '/api/app/morpheme',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createOrUpdate = (data: CreateUpdateMorphemeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MorphemeDto>({
      method: 'POST',
      url: '/api/app/morpheme/or-update',
      body: data,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/morpheme/${id}`,
    },
    { apiName: this.apiName,...config });
  

  exportAllByFileType = (fileType: FileType, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number[]>({
      method: 'POST',
      url: '/api/app/morpheme/export-all',
      params: { fileType },
    },
    { apiName: this.apiName,...config });
  

  exportByFileTypeAndIds = (fileType: FileType, ids: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, number[]>({
      method: 'POST',
      url: '/api/app/morpheme/export',
      params: { fileType },
      body: ids,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MorphemeDto>({
      method: 'GET',
      url: `/api/app/morpheme/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllInstances = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MorphemeDto[]>({
      method: 'GET',
      url: '/api/app/morpheme/instances',
    },
    { apiName: this.apiName,...config });
  

  getByName = (name: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MorphemeDto>({
      method: 'GET',
      url: '/api/app/morpheme/by-name',
      params: { name },
    },
    { apiName: this.apiName,...config });
  

  getExistInstances = (entities: CreateUpdateMorphemeDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, MorphemeDto[]>({
      method: 'POST',
      url: '/api/app/morpheme/get-exist-instances',
      body: entities,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: MorphemeGetListInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<MorphemeDto>>({
      method: 'GET',
      url: '/api/app/morpheme',
      params: { value: input.value, type: input.type, originLanguage: input.originLanguage, meaning: input.meaning, filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getModelingHistoryByInput = (input: ModelingInputDto<string>, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ModelingHistoryDto>>({
      method: 'GET',
      url: '/api/app/morpheme/modeling-history',
      params: { id: input.id, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  importByDtosAndMode = (dtos: CreateUpdateMorphemeDto[], mode: OverridingMode, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ImportResultDto>({
      method: 'POST',
      url: '/api/app/morpheme/import',
      params: { mode },
      body: dtos,
    },
    { apiName: this.apiName,...config });
  

  multipleDeleteByIds = (ids: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/morpheme/multiple-delete',
      body: ids,
    },
    { apiName: this.apiName,...config });
  

  multipleUpdate = (inputs: Record<string, CreateUpdateMorphemeDto>, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MorphemeDto[]>({
      method: 'PUT',
      url: '/api/app/morpheme/multiple-update',
      body: inputs,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateMorphemeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MorphemeDto>({
      method: 'PUT',
      url: `/api/app/morpheme/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
