import {AbstractControl, ValidatorFn} from "@angular/forms";


export function validApiUrl(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const urlRegex: RegExp = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
        const url = control.value;
        const no = urlRegex.test(url);

        return no ? {'apiUrl': {url}} : null;
    };
}
