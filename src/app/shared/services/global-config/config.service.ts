import {Injectable} from '@angular/core';
import {Configuration} from './configuration';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global.service';

@Injectable()
export class ConfigService {
  private config: Configuration;

  constructor(private http: HttpClient, private globalService: GlobalService) {
  }

  load(url: string) {
    return new Promise((resolve) => {
      this.http.get<Configuration>(url).map(res => {
        this.config = res;
        this.setConfig();
      })
        .subscribe((config: any) => {
          resolve();
        });
    });
  }

  getConfiguration(): Configuration {
    return this.config;
  }

  setConfig() {
    // const config = require('../../../../assets/globals.json');
    const config = this.getConfiguration();
    for (const configKey in config) {
      if (config.hasOwnProperty(configKey)) {
        localStorage.removeItem(btoa(configKey));
        this.globalService.setSession(configKey, config[configKey]);
      }
    }
  }

}
