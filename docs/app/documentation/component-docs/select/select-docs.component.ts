import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/select-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/select-inline-help-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/select-state-example.component.html';
import * as formGroupSelectHtml from '!raw-loader!./examples/select-form-group-example.component.html';
import * as formGroupSelectTs from '!raw-loader!./examples/select-form-group-example.component.ts';

@Component({
    selector: 'app-select',
    templateUrl: './select-docs.component.html'
})
export class SelectDocsComponent {

    selectFormHtml = formHtml;

    selectHelpFormHtml = formInlineHelpHtml;

    selectStatesFormHtml = formStateHtml;

    formGroupSelectHtml = formGroupSelectHtml;

    formGroupSelectTs = formGroupSelectTs;
}
