import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-calendar-single-example',
    template: `
        <fd-calendar [calType]="'single'"
                     [(ngModel)]="selectedDay"
                     [blockFunction]="myBlockFunction"
                     [disableFunction]="myDisableFunction">
        </fd-calendar>

        <button fd-button (click)="disableWednesday()">Disable Wednesday</button>
        <br/><br/>
        <div>Selected Date: {{selectedDay.date.toDateString()}}</div>`
})
export class CalendarSingleExampleComponent {

    selectedDay = {
        date: FdDate.getToday()
    };

    myDisableFunction = function(d: FdDate): boolean {
        const day = d.toDate().getDay();
        return day === 6 || day === 0;
    };

    // Block days before/after any day
    myBlockFunction = function(d: FdDate): boolean {
        const firstDay = new FdDate(2019, 7, 21);
        const lastDay = new FdDate(2019, 7, 30);
        return d.getTimeStamp() > firstDay.getTimeStamp() && d.getTimeStamp() < lastDay.getTimeStamp();
    };

    disableWednesday() {
        this.myDisableFunction = function(d: FdDate): boolean {
            const day = d.getDay();
            return day === 4;
        };
    }
}
