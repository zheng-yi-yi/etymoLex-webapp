import {
  AuthService,
  ConfigStateService,
  CurrentUserDto,
  LanguageInfo,
  NAVIGATE_TO_MANAGE_PROFILE,
  SessionStateService,
} from '@abp/ng.core';
import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import snq from 'snq';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-my-nav-items',
  templateUrl: './my-nav-items.component.html',
  imports: [
    SharedModule,
    NgbDropdownModule
  ],
})
  
export class MyNavItemsComponent {
currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');
  selectedTenant$ = this.sessionState.getTenant$();

  languages$: Observable<LanguageInfo[]> = this.configState.getDeep$('localization.languages');

  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  get defaultLanguage$(): Observable<string> {
    return this.languages$.pipe(
      map(
        languages =>
          snq(
            () => languages.find(lang => lang.cultureName === this.selectedLangCulture).displayName
          ),
        ''
      )
    );
  }

  get dropdownLanguages$(): Observable<LanguageInfo[]> {
    return this.languages$.pipe(
      map(
        languages =>
          snq(() => languages.filter(lang => lang.cultureName !== this.selectedLangCulture)),
        []
      )
    );
  }

  get selectedLangCulture(): string {
    return this.sessionState.getLanguage();
  }

  constructor(
    @Inject(NAVIGATE_TO_MANAGE_PROFILE) public navigateToManageProfile,
    private configState: ConfigStateService,
    private authService: AuthService,
    private sessionState: SessionStateService
  ) {}

  onChangeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
  }

  navigateToLogin() {
    this.authService.navigateToLogin();
  }

  logout() {
    this.authService.logout().subscribe();
  }
}