import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { MaterialModule } from "@angular/material";
import { CollapseModule } from 'ng2-collapse';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CollapseModule,
        RouterModule,
],
    declarations: [
        SafeHtmlPipe,
        SidebarComponent
    ],
    exports: [
        SafeHtmlPipe,
        SidebarComponent,
    ]
})
export class SharedModule {}
