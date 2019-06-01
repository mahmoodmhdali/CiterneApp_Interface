import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {FormCanDeactivate} from '../../../shared/components/can-deactivate/form-can-deactivate/form-can-deactivate';
import {ReportStyleModel} from '../../../shared/models/ReportStyle.model';
import {ReportStylesService} from '../../../shared/services/database-services/reportStyles.service';
import {LogsService} from '../../../shared/services/logs.service';
import {GlobalService} from '../../../shared/services/global.service';
import {ReportsService} from '../../../shared/services/database-services/reports.service';
import {ResponseBuilderModel} from '../../../shared/models/ResponseBuilder.model';
import {MatSnackBar} from '@angular/material';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {ActivatedRoute, Params, Router, UrlSegment} from '@angular/router';
import {ReportModel} from '../../../shared/models/Report.model';

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.css']
})
export class ManageReportComponent extends FormCanDeactivate implements OnInit {

  @ViewChild('form')
  form: NgForm;
  basicForm: FormGroup;


  reportStyleCollectionList: ReportStyleModel[];
  reportStyleCollection: FormControl;
  modelLoaded = 0;
  apiConfig;
  showChartTitle = false;
  selectedStyleValues: number[] = [];
  disableBtn = false;
  showSelectQuery = [];
  selectedReportFilters = [];
  filterTypes = [{id: 1, value: 'NUMBER'}, {id: 2, value: 'TEXT'}, {id: 3, value: 'DROPDOWN'}, {id: 3, value: 'DATE'}];
  selectedReportId = 0;
  selectedReport: ReportModel;
  editable = true;

  constructor(private fb: FormBuilder,
              private reportStylesService: ReportStylesService,
              private snack: MatSnackBar,
              private reportsService: ReportsService,
              private logsService: LogsService,
              private route: ActivatedRoute,
              public router: Router,
              private loader: AppLoaderService,
              private svcGlobal: GlobalService,
              public confirmService: AppConfirmService) {
    super();
    this.apiConfig = this.svcGlobal.getSession('RESPONSE_CODE');
  }

  ngOnInit() {
    this.reportStylesService.getReportStyles().subscribe(
      (responseBuilder) => {
        this.logsService.setLog('GroupsComponent', 'ngOnInit(getRoles)', responseBuilder);
        if (responseBuilder.code === +this.apiConfig.SUCCESS) {
          this.reportStyleCollectionList = responseBuilder.data.styles;
          this.modelLoaded++;
        }
      }
    );
    this.route.params.subscribe(
      (params: Params) => {
        if (typeof params['id'] !== 'undefined') {
          if (Number.isNaN(+params['id'])) {
            this.router.navigate(['/sessions/404']);
          } else {
            this.selectedReportId = +params['id'];
            this.reportsService.getReport(this.selectedReportId).subscribe(
              (responseBuilder) => {
                this.logsService.setLog('GroupsComponent', 'ngOnInit(getRoles)', responseBuilder);
                if (responseBuilder.code === +this.apiConfig.SUCCESS) {
                  this.selectedReport = responseBuilder.data.report;
                  this.route.url.subscribe(
                    (response: UrlSegment[]) => {
                      if (response[0].path.toLowerCase() === 'view') {
                        this.editable = false;
                      }
                      this.buildForm(this.selectedReport);
                      this.modelLoaded++;
                    }
                  );
                } else {
                  this.router.navigate(['/sessions/404']);
                }
              }
            );
          }
        } else {
          this.buildForm({id: ''});
          this.modelLoaded++;
        }
      }
    );
  }

  buildForm(item) {
    if (this.selectedReportId === 0) {
      this.basicForm = this.fb.group({
        id: [item.id || ''],
        name: [item.name || '', Validators.required],
        procName: [item.procName || '', Validators.required]
      });
      this.basicForm.addControl('reportFilters', new FormArray([]));
      this.reportStyleCollection = new FormControl([], Validators.required);
      if (item.id === '') {
      } else {
        const styleIds = [];
        for (const style of item.reportStyleCollection) {
          styleIds.push(style.id);
        }
        this.reportStyleCollection = new FormControl(styleIds, Validators.required);
      }
      this.basicForm.addControl('reportStyleCollection', this.reportStyleCollection);
    } else {
      this.basicForm = this.fb.group({
        id: [item.id],
        name: [item.name, Validators.required],
        procName: [item.procName, Validators.required]
      });
      this.basicForm.addControl('reportFilters', new FormArray([]));
      const styleIds = [];
      for (const style of item.reportStyleCollection) {
        styleIds.push(style.id);
      }
      this.selectedStyleValues = styleIds;
      if (styleIds.indexOf(2) >= 0 || styleIds.indexOf(3) >= 0 || styleIds.indexOf(4) >= 0) {
        this.basicForm.addControl('chartTitle', new FormControl(item.chartTitle, Validators.required));
        this.basicForm.addControl('chartSubTitle', new FormControl(item.chartSubTitle, Validators.required));
        this.showChartTitle = true;
      }
      if (typeof item.reportFilters !== 'undefined') {
        for (let i = 0; i < item.reportFilters.length; i++) {
          this.showSelectQuery.push(false);
          this.selectedReportFilters.push({'reportField': 'reportField', 'displayName': 'displayName'});
          this.addFilterListControlOnInit(item.reportFilters[i].selectQuery, item.reportFilters[i].reportField,
            item.reportFilters[i].displayName, item.reportFilters[i].required, item.reportFilters[i].fieldIndex,
            item.reportFilters[i].fieldType, i);
        }
      }

      if (!this.editable) {
        this.basicForm.disable();
      }
      this.reportStyleCollection = new FormControl(styleIds, Validators.required);
      this.basicForm.addControl('reportStyleCollection', this.reportStyleCollection);

    }
  }

  styleSelection() {
    if (this.basicForm.value.reportStyleCollection.indexOf(2) >= 0 ||
      this.basicForm.value.reportStyleCollection.indexOf(3) >= 0 ||
      this.basicForm.value.reportStyleCollection.indexOf(4) >= 0) {
      this.basicForm.addControl('chartTitle', new FormControl('', Validators.required));
      this.basicForm.addControl('chartSubTitle', new FormControl('', Validators.required));
      this.showChartTitle = true;
    } else {
      this.basicForm.removeControl('chartTitle');
      this.basicForm.removeControl('chartSubTitle');
      this.showChartTitle = false;
    }
  }

  submitForm() {
    this.loader.open('Please Wait');
    this.disableBtn = true;
    const data = this.basicForm.value;
    if (this.selectedReportId === 0) {
      this.reportsService.addReport(data).subscribe(
        (responseBuilder: ResponseBuilderModel) => {
          this.logsService.setLog('NgxGroupsPopupComponent', 'submit(addGroup)', responseBuilder);
          if (responseBuilder.code === +this.apiConfig.SUCCESS) {
            this.snack.open('Report Saved Successfully', 'Ok', {duration: 4000});
            this.router.navigate(['/manageReports']);
          } else if (responseBuilder.code === +this.apiConfig.PARAMETERS_VALIDATION_ERROR) {
            this.svcGlobal.checkValidationResults(this.basicForm, responseBuilder.data);
          } else {
            this.router.navigate(['/manageReports']);
          }
          this.loader.close();
          this.disableBtn = false;
        }
      );
    } else {
      this.reportsService.editReport(data).subscribe(
        (responseBuilder: ResponseBuilderModel) => {
          this.logsService.setLog('NgxGroupsPopupComponent', 'submit(addGroup)', responseBuilder);
          if (responseBuilder.code === +this.apiConfig.SUCCESS) {
            this.snack.open('Report Edit Successfully', 'Ok', {duration: 4000});
            this.router.navigate(['/manageReports']);
          } else if (responseBuilder.code === +this.apiConfig.PARAMETERS_VALIDATION_ERROR) {
            this.svcGlobal.checkValidationResults(this.basicForm, responseBuilder.data);
          } else {
            this.router.navigate(['/manageReports']);
          }
          this.loader.close();
          this.disableBtn = false;
        }
      );
    }
  }

  addFilterListControl() {
    this.showSelectQuery.push(false);
    const jobGroup: FormGroup = new FormGroup({});
    const control1: FormControl = new FormControl('', Validators.required);
    const control2: FormControl = new FormControl('', Validators.required);
    const control3: FormControl = new FormControl('', Validators.required);
    const control4: FormControl = new FormControl('', Validators.required);
    const control5: FormControl = new FormControl('', Validators.required);
    jobGroup.addControl('reportField', control1);
    jobGroup.addControl('displayName', control2);
    jobGroup.addControl('required', control3);
    jobGroup.addControl('fieldIndex', control4);
    jobGroup.addControl('fieldType', control5);
    this.selectedReportFilters.push({'reportField': 'reportField', 'displayName': 'displayName'});
    (<FormArray> this.basicForm.get('reportFilters')).push(jobGroup);
  }

  addFilterListControlOnInit(dropDownSelectQuery, reportField, displayName, required, fieldIndex, fieldType, index) {
    const jobGroup: FormGroup = new FormGroup({});
    const control1: FormControl = new FormControl('', Validators.required);
    const control2: FormControl = new FormControl('', Validators.required);
    const control3: FormControl = new FormControl('', Validators.required);
    const control4: FormControl = new FormControl('', Validators.required);
    const control5: FormControl = new FormControl('', Validators.required);
    jobGroup.addControl('reportField', control1);
    jobGroup.addControl('displayName', control2);
    jobGroup.addControl('required', control3);
    jobGroup.addControl('fieldIndex', control4);
    jobGroup.addControl('fieldType', control5);
    (<FormArray> this.basicForm.get('reportFilters')).push(jobGroup);
    if (fieldType === 'DROPDOWN') {
      this.showSelectQuery[index] = true;
      const jobGroup1: FormGroup = (<FormGroup>(<FormArray> this.basicForm.get('reportFilters')).controls[index]);
      const control11: FormControl = new FormControl('');
      jobGroup1.addControl('selectQuery', control11);
      (<FormGroup>(<FormArray>this.basicForm.controls['reportFilters'])
        .controls[index]).controls['selectQuery'].setValue(dropDownSelectQuery);
    } else {
      this.showSelectQuery[index] = false;
      const jobGroup1: FormGroup = (<FormGroup>(<FormArray> this.basicForm.get('reportFilters')).controls[index]);
      jobGroup1.removeControl('selectQuery');
    }
    (<FormGroup>(<FormArray>this.basicForm.controls['reportFilters'])
      .controls[index]).controls['reportField'].setValue(reportField);
    (<FormGroup>(<FormArray>this.basicForm.controls['reportFilters'])
      .controls[index]).controls['displayName'].setValue(displayName);
    (<FormGroup>(<FormArray>this.basicForm.controls['reportFilters'])
      .controls[index]).controls['required'].setValue(required.toString());
    (<FormGroup>(<FormArray>this.basicForm.controls['reportFilters'])
      .controls[index]).controls['fieldIndex'].setValue(fieldIndex);
    (<FormGroup>(<FormArray>this.basicForm.controls['reportFilters'])
      .controls[index]).controls['fieldType'].setValue(fieldType);
  }

  removeFilter(index) {
    this.confirmService.confirm({
      title: 'Confirmation',
      message: 'Are you sure you want to remove this report?'
    }).subscribe((result) => {
      if (result === true) {
        this.showSelectQuery.splice(index, 1);
        this.selectedReportFilters.splice(index, 1);
        (<FormArray> this.basicForm.get('reportFilters')).removeAt(index);
      }
    });
  }

  onFieldType(index) {
    if (this.basicForm.value.reportFilters[index].fieldType === 'DROPDOWN') {
      this.showSelectQuery[index] = true;
      const jobGroup: FormGroup = (<FormGroup>(<FormArray> this.basicForm.get('reportFilters')).controls[index]);
      const control1: FormControl = new FormControl('', Validators.required);
      jobGroup.addControl('selectQuery', control1);
    } else {
      this.showSelectQuery[index] = false;
      const jobGroup: FormGroup = (<FormGroup>(<FormArray> this.basicForm.get('reportFilters')).controls[index]);
      jobGroup.removeControl('selectQuery');
    }
  }

}
