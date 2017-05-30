import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

/**
 * The idea is to keep the connector service and store in a shared module
 * for keep the lazy loading in connectors module. Where you'll rather find
 * components for editing and monitoring the connectors.
 */
import {StoreService} from "../connectors/store.service";


@NgModule({
    imports: [
        CommonModule,
],
    declarations: [
        SafeHtmlPipe,
    ],
    providers: [
        StoreService
    ],
    exports: [
        SafeHtmlPipe,
    ]
})
export class SharedModule {}
