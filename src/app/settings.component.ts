﻿import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from "ng2-translate/ng2-translate";

/**
 * 
 */
@Component({
    selector: 'settings',
    pipes: [TranslatePipe],
    template: `
                <div class="container">
                    <h2>{{'settings.title' | translate}}</h2>
                </div>
              `
})
export class SettingsComponent {

    /**
     *
     * @param translate
     *      TranslateService
     */
    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

}