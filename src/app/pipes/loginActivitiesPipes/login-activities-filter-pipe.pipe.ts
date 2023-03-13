import { Pipe, PipeTransform } from '@angular/core';
import { LoginActivity } from 'src/app/models/loginActivities/loginActivity';

@Pipe({
  name: 'loginActivitiesFilterPipe'
})
export class LoginActivitiesFilterPipePipe implements PipeTransform {

  transform(value: LoginActivity[], filterText: string): LoginActivity[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((l:LoginActivity)=> 
    l.user.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    l.dateTime.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    l.type.toLocaleLowerCase().indexOf(filterText)!==-1 ):value
  }
}
