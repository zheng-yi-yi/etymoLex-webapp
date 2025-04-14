import { ReplaceableComponentsService, SessionStateService } from '@abp/ng.core';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { MyNavItemsComponent } from './my-nav-items/my-nav-items.component';
import { eThemeBasicComponents } from '@abp/ng.theme.basic';

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent implements OnInit, AfterViewChecked {

  constructor(private replaceableComponents: ReplaceableComponentsService
  ) { }
  
  ngOnInit() {
    this.replaceableComponents.add({
        component: MyNavItemsComponent,
        key: eThemeBasicComponents.NavItems,
      });
  }

  ngAfterViewChecked(): void {
    const targetElement = document.querySelector('li.nav-item.dropdown.ng-star-inserted') as HTMLElement;
    if (targetElement) {
      targetElement.style.display = 'none';
    }
  }
}
