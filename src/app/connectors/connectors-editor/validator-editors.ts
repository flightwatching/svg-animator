import {AbstractControl, ValidatorFn} from "@angular/forms";


export function validApiUrl(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const urlRegex: RegExp = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
        const localhost: RegExp = new RegExp(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?$/);
        const url = control.value;
        const no = urlRegex.test(url) || localhost.test(url);
        
        return no ? null : {'apiUrl': {url}};
    };
}
