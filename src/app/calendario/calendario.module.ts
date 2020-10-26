import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localeBr);
registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [CalendarioPage],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class CalendarioPageModule {}
