import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { Theme } from './theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  availableThemes: Record<string, Theme> = Object.fromEntries(Object.entries(Theme));
  availableThemesArr: { key: string; value: Theme }[] = Object.entries(Theme).map(([key, value]) => ({ key, value }));

  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Todo create store, create PrimeNg service that listens to global events to change translations and themes. Create directive to change theme and to append the css styles
  switchTheme(theme: Theme) {
    console.log(theme);
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
}
