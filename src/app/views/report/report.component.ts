import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {LogsService} from '../../shared/services/logs.service';
import {GlobalService} from '../../shared/services/global.service';
import 'rxjs/Rx';
import {ReportsService} from '../../shared/services/database-services/reports.service';
import {ReportModel} from '../../shared/models/Report.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReportFilterModel} from '../../shared/models/ReportFilter.model';
import {ReportFiltersService} from '../../shared/services/database-services/reportFilters.service';
import {AppLoaderService} from '../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  providers: [TranslatePipe],
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public itemForm: FormGroup;
  apiConfig;
  reportName: ReportModel[];
  selectedReportFilters: ReportFilterModel[];
  selectedReportFiltersText = [];
  selectedReportDateRange = [];
  selectedReportFiltersNumber = [];
  selectedReportFiltersDropDown = [];
  operations = [{'id': '>', 'name': '>'}, {'id': '>=', 'name': '>='}, {'id': '<', 'name': '<'},
    {'id': '<=', 'name': '<='}, {'id': '=', 'name': '='}];
  recordsPerPage = [{'id': 10, 'name': '10'}, {'id': 20, 'name': '20'}, {'id': 50, 'name': '50'}, {
    'id': 100,
    'name': '100'
  }];
  reportStyle = [];
  selectedReportNameValue: number;
  selectedReportStyleValue = -1;
  showRecordPerPage = true;
  recordsPerPageValue = 10;
  modelLoaded = 0;
  disableButtons = false;
  isExportFunc = false;
  // =================== For Table ================
  rows = [];
  columns = [];
  temp = [];
  pageSelected = 1;
  rowNumber = 0;
  loadingIndicator = false;
  // =================== For Table ================

  chartTitle = '';
  chartSubTitle = '';
  // =================== For Pie Chart ================
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  sharedChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'bottom'
    }
  };
  doughnutOptions: any = Object.assign({
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }, this.sharedChartOptions);
  public pieChartType = 'pie';
  // =================== For Pie Chart ================

  // =================== For Bar Chart ================
  lineChartType;
  lineChartLegend = true;
  chartColors: Array<any> = [

    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: '#247ba0',
      borderColor: '#247ba0',
      pointBackgroundColor: '#247ba0',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: '#333333',
      borderColor: '#333333',
      pointBackgroundColor: '#333333',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];
  lineChartOptions: any = Object.assign({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }, legend: {
      display: true,
      position: 'bottom'
    }
  });
  lineChartLabels: Array<any> = [];
  lineChartData: Array<any> = [];

  // =================== For Bar Chart ================

  constructor(private logService: LogsService,
              private reportsService: ReportsService,
              private loader: AppLoaderService,
              private translatePipe: TranslatePipe,
              private reportFiltersService: ReportFiltersService,
              private svcGlobal: GlobalService) {
    this.apiConfig = this.svcGlobal.getSession('RESPONSE_CODE');
  }

  ngOnInit() {
    this.buildItemForm();
    this.reportsService.getReportsByLoggedInUser().subscribe(
      (responseBuilder) => {
        this.logService.setLog('ReportComponent', 'ngOnInit(getReports)', responseBuilder);
        if (responseBuilder.code === +this.apiConfig.SUCCESS) {
          this.reportName = responseBuilder.data.reports;

          this.modelLoaded++;
        }
      }
    );
  }

  buildItemForm() {
    this.itemForm = new FormGroup({
      // FormControl first input is the initial value, second the validator, third  async validator
      'reportName': new FormControl('', Validators.required),
      'reportStyle': new FormControl('', Validators.required),
      'recordsPerPage': new FormControl(0),
      'filtersText': new FormArray([]),
      'filtersDate': new FormArray([]),
      'filtersNumber': new FormArray([]),
      'filtersNumberOperation': new FormArray([]),
      'filtersDropDown': new FormArray([])
    });
  }

  submit() {
    const data = this.itemForm.value;
    if (typeof data.reportName === 'undefined' || data.reportName === null || this.selectedReportStyleValue === -1) {
      return;
    } else {
      this.modelLoaded = 1;
      this.disableButtons = true;
      let withLimit = 1;
      if (this.selectedReportStyleValue !== 1) {
        withLimit = 0;
      }
      this.publishReport(1, true, withLimit);
    }
  }

  change() {
    this.disableButtons = false;
    this.modelLoaded = 1;
  }

  changeStyle() {
    this.disableButtons = false;
    this.modelLoaded = 1;
    this.showRecordPerPage = (this.selectedReportStyleValue === 1);
  }

  changeReportName() {
    this.loader.open(this.translatePipe.transform('PLEASEWAIT'));
    this.disableButtons = false;
    this.modelLoaded = 1;
    this.removeItemForm();
    this.selectedReportFilters = this.reportName.find(x => x.id === this.selectedReportNameValue).reportFilters;
    this.reportStyle = this.reportName.find(x => x.id === this.selectedReportNameValue).reportStyleCollection;
    if (!this.reportStyle.some(item => item.id === this.selectedReportStyleValue)) {
      this.selectedReportStyleValue = -1;
      this.itemForm.controls['reportStyle'].reset('', Validators.required);
    }
    console.log('change ');
    this.selectedReportStyleValue = 1;
    if (this.selectedReportFilters.length === 0) {
      this.loader.close();
    } else {
      for (let i = 0; i < this.selectedReportFilters.length; i++) {
        const jobGroup: FormGroup = new FormGroup({});
        let control: FormControl = new FormControl('');
        if (this.selectedReportFilters[i].required) {
          control = new FormControl('', Validators.required);
        }
        jobGroup.addControl(this.selectedReportFilters[i].reportField, control);
        if (this.selectedReportFilters[i].fieldType === 'TEXT') {
          this.selectedReportFiltersText.push(this.selectedReportFilters[i]);
          (<FormArray> this.itemForm.get('filtersText')).push(jobGroup);
          if (i + 1 === this.selectedReportFilters.length) {
            this.loader.close();
          }
        } else if (this.selectedReportFilters[i].fieldType === 'DATE') {
          this.selectedReportDateRange.push(this.selectedReportFilters[i]);
          let control1: FormControl = new FormControl('');
          if (this.selectedReportFilters[i].required) {
            control1 = new FormControl('', Validators.required);
          }
          jobGroup.addControl(this.selectedReportFilters[i].reportField + '-TO', control1);
          (<FormArray> this.itemForm.get('filtersDate')).push(jobGroup);
          if (i + 1 === this.selectedReportFilters.length) {
            this.loader.close();
          }
        } else if (this.selectedReportFilters[i].fieldType === 'NUMBER') {
          this.selectedReportFiltersNumber.push(this.selectedReportFilters[i]);
          (<FormArray> this.itemForm.get('filtersNumber')).push(jobGroup);
          const jobGroup1: FormGroup = new FormGroup({});
          const control1: FormControl = new FormControl('');
          jobGroup1.addControl(this.selectedReportFilters[i].reportField + '-NUMBER', control1);
          (<FormArray> this.itemForm.get('filtersNumberOperation')).push(jobGroup1);
          if (i + 1 === this.selectedReportFilters.length) {
            this.loader.close();
          }
        } else if (this.selectedReportFilters[i].fieldType === 'DROPDOWN') {
          this.reportFiltersService.getDropDownByReportFilterId(this.selectedReportFilters[i].id).subscribe(
            (responseBuilder) => {
              this.logService.setLog('ReportComponent', 'ngOnInit(getReports)', responseBuilder);
              if (responseBuilder.code === +this.apiConfig.SUCCESS) {
                this.selectedReportFilters[i].dropDownValues = responseBuilder.data.reports;
                this.selectedReportFiltersDropDown.push(this.selectedReportFilters[i]);
                (<FormArray> this.itemForm.get('filtersDropDown')).push(jobGroup);
                if (i + 1 === this.selectedReportFilters.length) {
                  this.loader.close();
                }
              }
            }
          );
        }
      }
    }
  }

  removeItemForm() {
    this.itemForm.removeControl('filtersText');
    this.itemForm.removeControl('filtersDate');
    this.itemForm.removeControl('filtersNumber');
    this.itemForm.removeControl('filtersDropDown');
    this.itemForm.removeControl('filtersNumberOperation');
    this.itemForm.addControl('filtersText', new FormArray([]));
    this.itemForm.addControl('filtersDate', new FormArray([]));
    this.itemForm.addControl('filtersNumber', new FormArray([]));
    this.itemForm.addControl('filtersDropDown', new FormArray([]));
    this.itemForm.addControl('filtersNumberOperation', new FormArray([]));
    this.selectedReportFiltersText = [];
    this.selectedReportDateRange = [];
    this.selectedReportFiltersNumber = [];
    this.selectedReportFiltersDropDown = [];
  }

  changeRecords() {
    if (this.modelLoaded > 1) {
      this.publishReport(1, false, 1);
    }
  }

  handlePageChange(event) {
    this.publishReport(event.offset + 1, false, 1);
  }

  onPageSorted(event) {
  }

  publishReport(pageSelected, submitForm, withLimit) {
    const filtersDataText = this.itemForm.value.filtersText;
    const filtersDataDate = this.itemForm.value.filtersDate;
    const filtersDataNumber = this.itemForm.value.filtersNumber;
    const filtersDataNumberOperation = this.itemForm.value.filtersNumberOperation;
    const filtersDataDropDown = this.itemForm.value.filtersDropDown;
    this.pieChartLabels = [];
    this.pieChartData = [];
    const data = this.itemForm.value;
    let withCounter = 1;
    if (!submitForm) {
      this.loadingIndicator = true;
      withCounter = 0;
    }
    this.reportsService.getReportByProcID(data.reportName, pageSelected, this.recordsPerPageValue, withCounter,
      filtersDataText, filtersDataDate, filtersDataNumber, filtersDataNumberOperation, filtersDataDropDown, withLimit).subscribe(
      (responseBuilder) => {
        this.logService.setLog('ReportComponent', 'handlePageChange()', responseBuilder);
        this.pageSelected = pageSelected;
        if (responseBuilder.code === +this.apiConfig.SUCCESS) {
          try {
            const JSonResult = this.svcGlobal.convertResponseToJson(responseBuilder.data.result);
            if (submitForm) {
              this.rowNumber = JSonResult[0].rowNumber;
            }
            JSonResult.shift();
            if (this.selectedReportStyleValue === 1) {
              this.rows = this.temp = JSonResult;
              this.columns = this.svcGlobal.getKeysFromJsonResponseForTable(JSonResult[0]);
            } else if (this.selectedReportStyleValue === 2) {
              this.chartTitle = this.reportName.find(x => x.id === this.selectedReportNameValue).chartTitle;
              this.chartSubTitle = this.reportName.find(x => x.id === this.selectedReportNameValue).chartSubTitle;
              for (let i = 0; i < JSonResult.length; i++) {
                let j = 1;
                for (const property in JSonResult[i]) {
                  if (JSonResult[i].hasOwnProperty(property)) {
                    if (j % 2 === 0) {
                      this.pieChartData.push(JSonResult[i][property]);
                    } else {
                      this.pieChartLabels.push(JSonResult[i][property]);
                    }
                    j++;
                  }
                }
              }
            } else if (this.selectedReportStyleValue === 3) {
              this.getBarsFromResponse(JSonResult, 'bar');
            } else if (this.selectedReportStyleValue === 4) {
              this.getBarsFromResponse(JSonResult, 'line');
            }

          } catch (e) {
            this.rowNumber = 0;
            this.rows = this.temp = [];
            this.columns = [];
          }
          if (submitForm) {
            this.modelLoaded++;
            this.disableButtons = false;
          } else {
            this.loadingIndicator = false;
          }
        }
      }
    );
  }


  export() {
    this.isExportFunc = true;
    this.loader.open(this.translatePipe.transform('PLEASEWAIT'));
    const data = this.itemForm.value;
    this.disableButtons = true;
    const filtersDataText = this.itemForm.value.filtersText;
    const filtersDataDate = this.itemForm.value.filtersDate;
    const filtersDataNumber = this.itemForm.value.filtersNumber;
    const filtersDataNumberOperation = this.itemForm.value.filtersNumberOperation;
    const filtersDataDropDown = this.itemForm.value.filtersDropDown;
    this.reportsService.exportReportByProcID(data.reportName,
      filtersDataText, filtersDataDate, filtersDataNumber, filtersDataNumberOperation, filtersDataDropDown).subscribe(
      (response: Blob) => {


        const data11 = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = data11;
        link.download = this.reportName.find(x => x.id === data.reportName).name + '.csv';
        link.setAttribute('style', 'display: none');
        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(data11);
        }, 1000);
        this.disableButtons = false;
        this.isExportFunc = false;
        this.loader.close();
      }
    );
  }


  public getBarsFromResponse(JSonResult, style): void {
    this.lineChartType = style;
    this.chartTitle = this.reportName.find(x => x.id === this.selectedReportNameValue).chartTitle;
    this.chartSubTitle = this.reportName.find(x => x.id === this.selectedReportNameValue).chartSubTitle;
    const responseKeys = this.svcGlobal.getKeysFromJsonResponseForChart(JSonResult[0]);
    const _lineChartData: Array<any> = new Array(responseKeys.length - 1);
    const _lineChartLabels: Array<any> = new Array(JSonResult.length);
    const resultArrays: Array<any> = new Array(responseKeys.length - 1);
    for (let i = 0; i < responseKeys.length - 1; i++) {
      resultArrays[i] = new Array(JSonResult.length);
      for (let j = 0; j < JSonResult.length; j++) {
        const index = [];
        // build the index
        for (const x in JSonResult[j]) {
          if (JSonResult[j].hasOwnProperty(x)) {
            index.push(x);
          }
        }
        resultArrays[i][j] = JSonResult[j][index[i + 1]];
        _lineChartLabels[j] = JSonResult[j][index[0]];
      }
      _lineChartData[i] = {data: resultArrays[i], label: responseKeys[i + 1]};
    }
    this.lineChartData = _lineChartData;
    this.lineChartLabels = _lineChartLabels;
  }

  clearDate(controlName, index, isRequired) {
    if (isRequired) {
      (<FormGroup> this.itemForm.controls['filtersDate'].get(index.toString())).controls[controlName].reset('', Validators.required);
    } else {
      (<FormGroup> this.itemForm.controls['filtersDate'].get(index.toString())).controls[controlName].reset('');
    }
  }
}
