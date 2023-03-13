import { Pipe, PipeTransform } from '@angular/core';
import { SystemLog } from 'src/app/models/systemLogs/systemLog';

@Pipe({
  name: 'systemLogPipe'
})
export class SystemLogPipePipe implements PipeTransform {

 
  transform(value: SystemLog[], filterText: string): SystemLog[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((l:SystemLog)=> 
    l.date.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    l.level.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    
    l.message.toLocaleLowerCase().indexOf(filterText)!==-1 ):value
  }

}
