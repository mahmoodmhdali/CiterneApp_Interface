import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ConfigService} from './global-config/config.service';
import {UserProfileModel} from '../models/UserProfile.model';

@Injectable()
export class GlobalService {

  constructor() {
    // this.getConfig();
  }

  // getConfig() {
  //   // const config = require('../../../../assets/globals.json');
  //   const config = this.configService.getConfiguration();
  //   for (const configKey in config) {
  //     if (config.hasOwnProperty(configKey)) {
  //       localStorage.removeItem(btoa(configKey));
  //       this.setSession(configKey, config[configKey]);
  //     }
  //   }
  // }

  setSession(parameterName: string, parameterValue) {
    localStorage.setItem(btoa(parameterName), JSON.stringify(parameterValue));
  }

  getSession(parameterName: string) {
    const parameterValue = localStorage.getItem(btoa(parameterName));
    return parameterValue ? JSON.parse(parameterValue) : null;
  }

  removeSession(parameterName: string) {
    localStorage.removeItem(btoa(parameterName));
  }

  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      if (toConvert.hasOwnProperty(property)) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(toConvert[property]);
        if (encodedValue.toString().indexOf('%5Bobject%20Object%5D') >= 0) {
          for (let i = 0; i < toConvert[property].length; i++) {
            for (const property1 in toConvert[property][i]) {
              if (toConvert[property][i].hasOwnProperty(property1)) {
                const encodedKey1 = encodeURIComponent(property1);
                const encodedValue1 = encodeURIComponent(toConvert[property][i][property1]);
                formBody.push(encodedKey + '[' + i + '].' + encodedKey1 + '=' + encodedValue1);
              }
            }
          }
        } else {
          formBody.push(encodedKey + '=' + encodedValue);
        }
      }
    }
    return formBody.join('&');
  }

  getFormUrlEncodedFromJson(options) {
    const params = new URLSearchParams();
    for (let i = 0; i < options.length; i++) {
      for (const key in options[i]) {
        if (options[i].hasOwnProperty(key)) {
          params.set(key, options[i][key]);
        }
      }
    }
    return params.toString();
  }


  checkValidationResults(itemForm: FormGroup, responseData) {
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
        itemForm.controls[key].setErrors({'serverValidation': responseData[key]});
      }
    }
  }

  getLanguage() {
    // const user: UserProfileModel = this.getSession('loggedInUser');
    // const lang = user.language.prefix;
    // if (lang != null) {
    //   // fa is for Persian language (Iran language)
    //   if (lang === 'en' || lang === 'ar' || lang === 'fr' || lang === 'fa') {
    //     return lang;
    //   }
    // }
    return 'en';
  }

  convertResponseToJson(response) {
    const fixedResponse = response.replace(/\\'/g, '\'');
    return JSON.parse(fixedResponse);
  }

  getKeysFromJsonResponseForTable(response) {
    const keys = [];
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        keys.push({
          prop: key,
          name: key.toUpperCase()
        });
      }
    }
    return keys;
  }

  getKeysFromJsonResponseForChart(response) {
    const keys = [];
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  }

  getValuesFromJSonResponse(response) {
    const keys = [];
    for (let i = 0; i < response.length; i++) {
      for (const key in response[i]) {
        if (response[i].hasOwnProperty(key)) {
          keys.push(response[i][key]);
        }
      }
    }
    return keys;
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomString(size) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
