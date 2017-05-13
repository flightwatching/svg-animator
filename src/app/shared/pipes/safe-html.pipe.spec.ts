/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SafeHtmlPipe } from './safe-html.pipe';
import {DomSanitizer} from "@angular/platform-browser";
import {DomSanitizerImpl} from "@angular/platform-browser/src/security/dom_sanitization_service";

describe('SafeHtmlPipe', () => {
  it('create an instance', () => {
    const sanitazed = new DomSanitizerImpl()
    const pipe = new SafeHtmlPipe(sanitazed);
    expect(pipe).toBeTruthy();
  });
});
