import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appSelectRequiredValidator]',
  providers:[
    {
     provide: NG_VALIDATORS,
     useExisting: SelectRequiredValidatorDirective,
     multi: true
    }
]
})
export class SelectRequiredValidatorDirective implements Validator {
  @Input('appSelectValidator')
  private defaultOption : object;
 
  validate(control: AbstractControl) : {[key:string] : any} | null {
  // alert(control.value == this.defaultOption);
  //console.log(control.value + "----" + this.defaultOption)
  //console.log(control.value === this.defaultOption)
    return control.value === this.defaultOption ? {'defaultSelected':true} : null;
    }

}
