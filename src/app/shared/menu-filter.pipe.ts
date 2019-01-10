import { Pipe, PipeTransform } from '@angular/core';
//import {  IMenuModel } from '../login/models/user.model';

@Pipe({
  name: 'menuFilter'
})
export class menuFilterPipe implements PipeTransform {

  transform(menu: any[], parentMenuId: number): any[] {
    if (!menu || !menu) {
        return menu;
    }
  if (parentMenuId===0)
      return menu.filter(m => m.parentMenuId === parentMenuId);
  else    
      return menu.filter(m => m.parentMenuId === parentMenuId);
}

}
