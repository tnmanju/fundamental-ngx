import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from '../calendar/calendar.component';
import { DatePickerComponent } from './date-picker.component';
import { PopoverModule } from '../popover/popover.module';
import { IconModule } from '../icon/icon.module';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { DatePickerModule } from './date-picker.module';

describe('DatePickerComponent', () => {
    let component: DatePickerComponent;
    let fixture: ComponentFixture<DatePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarComponent, DatePickerComponent],
            imports: [PopoverModule, FormsModule, IconModule]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the calendar', () => {
        spyOn(component, 'getInputValue');
        component.isOpen = false;
        component.isInvalidDateInput = true;
        component.openCalendar({});
        expect(component.getInputValue).toHaveBeenCalled();
        expect(component.isOpen).toBeTruthy();
        expect(component.inputFieldDate).toBeNull();
    });

    it('should not open the calendar if the component is disabled', () => {
        component.isOpen = false;
        component.disabled = true;
        component.openCalendar({});
        expect(component.isOpen).toBeFalsy();
    });

    it('should close the calendar', () => {
        component.isOpen = true;
        component.isInvalidDateInput = true;
        component.closeCalendar();
        expect(component.inputFieldDate).toBeNull();
        expect(component.isOpen).not.toBeTruthy();
    });

    it('should update date picker input handler', () => {
        const dateVal = new Date();
        const firstDateVal = new Date();
        firstDateVal.setTime(firstDateVal.getTime() - 86400000);
        const lastDateVal = new Date();
        lastDateVal.setTime(firstDateVal.getTime() + 86400000);
        const d = {
            selectedDay: {
                id: 1,
                date: dateVal
            },
            selectedFirstDay: {
                id: 2,
                date: firstDateVal
            },
            selectedLastDay: {
                id: 3,
                date: lastDateVal
            }
        };
        component.type = 'single';
        component.updateDatePickerInputHandler(d);
        expect(component.inputFieldDate).toEqual(
            (d.selectedDay.date.getMonth()) + 1 + '/' + d.selectedDay.date.getDate() + '/' + d.selectedDay.date.getFullYear());
        component.type = 'range';
        component.updateDatePickerInputHandler(d);
        expect(component.inputFieldDate).toEqual(
            (d.selectedFirstDay.date.getMonth()) + 1 + '/' + d.selectedFirstDay.date.getDate() + '/' + d.selectedFirstDay.date.getFullYear()
            + ' - '
            + (d.selectedLastDay.date.getMonth() + 1) + '/' + d.selectedLastDay.date.getDate() + '/' + d.selectedLastDay.date.getFullYear()
        );
    });

    it('should handle escape keydown', () => {
        spyOn(component, 'closeCalendar');
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: 'escape'
        });
        document.dispatchEvent(keyDownEvent);
        expect(component.closeCalendar).toHaveBeenCalled();
    });

    it('should handle document click', () => {
        spyOn(component, 'closeCalendar');
        fixture.nativeElement.click();
        expect(component.closeCalendar).not.toHaveBeenCalled();
        document.dispatchEvent(new MouseEvent('click'));
        expect(component.closeCalendar).toHaveBeenCalled();
    });
});
@Component({
    selector: 'fd-form-test-component',
        template: `
        <form [formGroup]="customForm">
            <fd-date-picker id="datePicker" formControlName="date"></fd-date-picker>
        </form>
    `
})
export class FormTestComponent {
    allowNull = true;

    customForm = new FormGroup({
        date: new FormControl({ date: new Date() })
    });
}

describe('DatePickerFormTest', () => {
    let fixture: ComponentFixture<FormTestComponent>,
        component: FormTestComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTestComponent],
                imports: [ReactiveFormsModule, DatePickerModule]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTestComponent);
        component = fixture.componentInstance;
    });

    it('form and controls should be valid and clean by default', () => {
        const datePickerControl = component.customForm.get('date');
        expect(datePickerControl.valid).toBeTruthy();
        expect(component.customForm.valid).toBeTruthy();
        expect(component.customForm.touched).toBeFalsy();
        expect(component.customForm.dirty).toBeFalsy();
    });
});
