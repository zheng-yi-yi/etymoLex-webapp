 import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44313/',
  redirectUri: baseUrl,
  clientId: 'Academy_App',
  responseType: 'code',
  scope: 'offline_access Academy',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Academy',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44313',
      rootNamespace: 'EtymoLex.Academy',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
