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
    name: '词源智库',
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
  localization: {
    defaultResourceName: "Academy",
  },
} as Environment;
