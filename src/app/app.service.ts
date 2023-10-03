import { Injectable } from '@angular/core';
import { getStringValue, saveStringValue } from './api';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public getSavedStringValue(): Promise<string | null> {
    return getStringValue();
  }

  public saveStringValue(value: string): Promise<void> {
    return saveStringValue(value);
  }
}
