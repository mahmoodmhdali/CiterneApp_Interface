import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';

@Injectable()
export class LogsService {
  webConfig;

  constructor(private svcGlobal: GlobalService) {
    this.webConfig = this.svcGlobal.getSession('WEB_CONFIG');
  }

  setLog(className: string, functionName: string, content: any) {
    this.webConfig = this.svcGlobal.getSession('WEB_CONFIG');
    if (this.webConfig != null && this.webConfig.ENABLE_LOGS) {
      console.log('===============================================================================================================');
      console.log('Funtion Name: ' + functionName);
      console.log('Class Name: ' + className);
      console.log(content);
    }
  }
}
