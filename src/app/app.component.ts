import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { noWhitespaceValidator } from './validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public pageInitialized: boolean = false;
  public error: boolean = false;
  public inputControl: FormControl = new FormControl(null, [
    Validators.minLength(3),
    Validators.maxLength(200),
    noWhitespaceValidator,
  ]);
  private snackbarConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['snack-bar-main'],
  };

  constructor(private appService: AppService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getSavedStringValue();
  }

  public async saveStingValue(): Promise<void> {
    if (this.inputControl.invalid) {
      return;
    }
    try {
      await this.appService.saveStringValue(this.inputControl.value);
      (this.snackbarConfig.panelClass as Array<string>).push(
        'snack-bar-success'
      );
      this.snackBar.open(
        'Value was successfully saved',
        undefined,
        this.snackbarConfig
      );
    } catch (err) {
      (this.snackbarConfig.panelClass as Array<string>).push('snack-bar-error');
      this.snackBar.open(
        'Error happened while saveing data',
        undefined,
        this.snackbarConfig
      );
    }
  }

  private async getSavedStringValue(): Promise<void> {
    try {
      const savedValue = await this.appService.getSavedStringValue();
      this.inputControl.patchValue(savedValue);
      this.pageInitialized = true;
    } catch (err) {
      this.error = true;
    }
  }
}
