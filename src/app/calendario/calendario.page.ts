import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { AlertController } from '@ionic/angular';
import { registerLocaleData } from '@angular/common';
import localeZh from '@angular/common/locales/zh';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  mesCalendario;
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent, null) myCalendar: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) {
    
  }

  ngOnInit() {
    // this.resetEvent();
  }

  onTimeSelected() {}
  onViewTitleChanged(title) {
    console.log(title);
    this.mesCalendario = title.toUpperCase();
  }
  onEventSelected(evt) {
    console.log(evt.id);
    console.log(evt.tipo);
  }
  addEv() {
    console.log('wwwwww');
    const startTime = new Date(2020, 9, 18, 10, 0, 0);
    const endTime = new Date(2020, 9, 18, 11, 59, 59);

    this.eventSource.push({
      id: 10,
      tipo: 'tarefa',
      title: 'test',
      startTime: startTime,
      endTime: endTime,
      allDay: true
    });
    this.myCalendar.loadEvents();
  }
}
