import { Injectable } from '@angular/core';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

@Injectable({
  providedIn: 'root',
})
export class FlagService {
  get(countryCode: string | undefined): string {
    if (countryCode) {
      try {
        return getUnicodeFlagIcon(countryCode);
      } catch (error) {
        return getUnicodeFlagIcon('ZZ');
      }
    }
    return getUnicodeFlagIcon('ZZ');
  }
}
