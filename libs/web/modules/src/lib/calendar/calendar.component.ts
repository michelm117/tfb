import { Component, OnInit } from '@angular/core';
import { RaceService, StoryService } from '@tfb/web/data';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'tfb-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentDays: Date[] = [];
  weekDay: Date[][] = [];
  weeks: number[] = [];
  year: number;
  month: any;
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  records: Record<number, Record<number, Record<number, string[][]>>> = {};

  constructor(
    private raceService: RaceService,
    private stroyService: StoryService
  ) {
    this.records[2022] = { 8: { 10: [['Ridermann', 'stories/30']] } };
  }

  ngOnInit(): void {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.initWeekDay(this.month, this.year);

    const tasks: Observable<
      Record<number, Record<number, Record<number, string[][]>>>
    >[] = [this.raceService.getCalendar(), this.stroyService.getCalendar()];

    forkJoin(tasks).subscribe(([races, stories]) => {
      this.records = {};

      for (const year in stories) {
        if (!this.records[year]) {
          this.records[year] = {};
        }
        for (const month in stories[year]) {
          if (!this.records[year][month]) {
            this.records[year][month] = {};
          }
          for (const day in stories[year][month]) {
            if (!this.records[year][month][day]) {
              this.records[year][month][day] = [];
            }
            const el = stories[year][month][day];
            for (let i = 0; i < el.length; i++) {
              const element = el[i];
              this.records[year][month][day].push(element);
            }
          }
        }
      }

      for (const year in races) {
        if (!this.records[year]) {
          this.records[year] = {};
        }
        for (const month in races[year]) {
          if (!this.records[year][month]) {
            this.records[year][month] = {};
          }
          for (const day in races[year][month]) {
            if (!this.records[year][month][day]) {
              this.records[year][month][day] = [];
            }
            const el = races[year][month][day];
            for (let i = 0; i < el.length; i++) {
              const element = el[i];
              this.records[year][month][day].push(element);
            }
          }
        }
      }

      console.log(this.records);
    });
  }

  initCurrentDays(month: number, year: number): void {
    const previousMonthDays = this.getRemainingDaysOfPreviousMonth(month, year);
    const monthDays = this.getDaysInMonth(month, year);
    const nextMonthDays = this.getRemainingDaysOfNextMonth(month, year);

    this.currentDays = previousMonthDays.concat(monthDays, nextMonthDays);
  }

  initWeekDay(month: number, year: number) {
    this.initCurrentDays(month, year);
    const tmpDays = [...this.currentDays];
    this.weeks = [...Array(Math.ceil(this.currentDays.length / 7)).keys()];

    for (let i = 0; i < this.weeks.length; i++) {
      const week: Date[] = [];
      for (let j = 0; j < 7; j++) {
        const day = tmpDays.shift();
        if (day) {
          week.push(day);
        }
      }
      this.weekDay.push(week);
    }
  }

  getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getRemainingDaysOfPreviousMonth(month: number, year: number) {
    const currentDays = this.getDaysInMonth(month, year);
    let nbrOldMonthDays = currentDays[0].getDay() - 1;
    if (nbrOldMonthDays === -1) {
      nbrOldMonthDays = 6;
    }

    let previousMonth = month - 1;
    if (previousMonth === -1) {
      previousMonth = 11;
      year = year - 1;
    }
    const oldMonth = this.getDaysInMonth(previousMonth, year);

    return oldMonth.splice(oldMonth.length - nbrOldMonthDays);
  }

  getRemainingDaysOfNextMonth(month: number, year: number) {
    const currentDays = this.getDaysInMonth(month, year);
    const nbrNewMonthDays = 7 - currentDays[currentDays.length - 1].getDay();

    let nextMonth = month + 1;
    if (nextMonth === 12) {
      nextMonth = 0;
      year = year + 1;
    }
    const newMonth = this.getDaysInMonth(nextMonth, year);
    return newMonth.splice(0, nbrNewMonthDays);
  }

  nextMonth() {
    this.month = this.month + 1;
    if (this.month === 12) {
      this.month = 0;
      this.year = this.year + 1;
    }

    this.weekDay = [];
    this.initWeekDay(this.month, this.year);
  }
  previousMonth() {
    this.month = this.month - 1;
    if (this.month === -1) {
      this.month = 11;
      this.year = this.year - 1;
    }

    this.weekDay = [];
    this.initWeekDay(this.month, this.year);
  }

  hasEntry(year: number, month: number, day: number) {
    if (this.records[year]) {
      if (this.records[year][month]) {
        if (this.records[year][month][day]) {
          return true;
        }
      }
    }
    return false;
  }

  getEntries(year: number, month: number, day: number) {
    if (!this.hasEntry(year, month, day)) {
      return [];
    }

    if (this.records[year][month][day]) {
      return this.records[year][month][day];
    }
    return [];
  }
}
