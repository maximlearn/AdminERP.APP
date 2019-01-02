import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appCompareDateValidator]',
  providers:[
    {
     provide: NG_VALIDATORS,
     useExisting: CompareDateValidatorDirective,
     multi: true
    }
]
})
export class CompareDateValidatorDirective implements Validator {

 @Input()
  private appCompareDateValidator : string;
 
  validate(control: AbstractControl) : {[key:string] : any} | null {
    const controlToCompare = control.parent.get(this.appCompareDateValidator)
    console.log(controlToCompare.value +' ---- '+ control.value)
    if (controlToCompare && controlToCompare.value != null && control.value<controlToCompare.value){
     return {'notValidated':true};
    }
     return null;
  // alert(control.value == this.defaultOption);
  //  return control.value == this.defaultOption ? {'defaultSelected':true} : null;
    }

}
