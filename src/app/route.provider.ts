import { RoutesService, eLayoutType } from '@abp/ng.core';
import { inject, provideAppInitializer } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routes = inject(RoutesService);
  routes.add([
      {
        path: '/',
        name: '首页',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
    },
    {
      name: "角色管理",
      path: "/identity/roles",
      iconClass: 'fas fa-user-tag',
      order: 2,
      layout: eLayoutType.application
    },
    {
      name: "账户管理",
      path: "/identity/users",
      iconClass: 'fas fa-user-shield',
      order: 3,
      layout: eLayoutType.application
    },
    // {
    //   name: "租户管理",
    //   path: "/tenant-management/tenants",
    //   iconClass: 'fas fa-users-cog',
    //   order: 4,
    //   layout: eLayoutType.application
    // },
    {
      name: "词根词缀",
      path: "/morpheme-management",
      iconClass: 'fas fa-sitemap',
      order: 5,
      layout: eLayoutType.application
    },
    {
      name: "单词管理",
      path: "/word-management",
      iconClass: 'fas fa-book',
      order: 6,
      layout: eLayoutType.application
    },
  ]);
}
