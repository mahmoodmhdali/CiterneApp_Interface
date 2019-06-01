import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AppLoaderService} from '../../shared/services/app-loader/app-loader.service';
import {GlobalService} from '../../shared/services/global.service';
import {AppConfirmService} from '../../shared/services/app-confirm/app-confirm.service';
import {ReportsService} from '../../shared/services/database-services/reports.service';
import {LogsService} from '../../shared/services/logs.service';
import {ReportModel} from '../../shared/models/Report.model';
import {ResponseBuilderModel} from '../../shared/models/ResponseBuilder.model';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})
export class ViewReportsComponent implements OnInit {

  rows: ReportModel[];
  apiConfig;
  modelLoaded = 0;

  constructor(private fb: FormBuilder,
              private snack: MatSnackBar,
              private reportsService: ReportsService,
              private logsService: LogsService,
              public router: Router,
              private loader: AppLoaderService,
              private svcGlobal: GlobalService,
              public confirmService: AppConfirmService) {
    this.apiConfig = this.svcGlobal.getSession('RESPONSE_CODE');
  }

  ngOnInit() {
    this.reportsService.getReports().subscribe(
      (responseBuilder) => {
        this.logsService.setLog('ReportComponent', 'ngOnInit(getReports)', responseBuilder);
        if (responseBuilder.code === +this.apiConfig.SUCCESS) {
          this.rows = responseBuilder.data.reports;
          this.modelLoaded++;
        }
      }
    );
  }

  removeReport(report: ReportModel) {
    this.confirmService.confirm({
      title: 'Confirmation',
      message: 'Are you sure you wand to delete ' + ` \"${report.name}\"?`
    })
      .subscribe((result) => {
        if (result === true) {
          this.loader.open('Please Wait');
          this.reportsService.removeReport(report).subscribe(
            (responseBuilder: ResponseBuilderModel) => {
              this.logsService.setLog('GroupsComponent', 'removeGroup', responseBuilder);
              if (responseBuilder.code === +this.apiConfig.SUCCESS) {
                const index: number = this.rows.indexOf(this.rows.find(rowF => rowF.id === rowF.id));
                this.rows.splice(index, 1);
                this.loader.close();
                this.snack.open('Report deleted successfully', 'Ok', {duration: 4000});
              } else if (responseBuilder.code === +this.apiConfig.ENTITY_NOT_FOUND || responseBuilder.code === +this.apiConfig.ALERT) {
                this.snack.open(responseBuilder.description, 'Ok', {duration: 4000});
              }
              this.loader.close();
            }
          );
        }
      });
  }

}
