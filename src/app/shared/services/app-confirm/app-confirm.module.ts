import { AppConfirmService } from './app-confirm.service';
import {
  MatDialogModule,
  MatButtonModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComfirmComponent } from './app-confirm.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [AppConfirmService]
})
export class AppConfirmModule { }
