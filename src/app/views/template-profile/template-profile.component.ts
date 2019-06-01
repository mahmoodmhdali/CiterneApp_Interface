import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-template-profile',
  templateUrl: './template-profile.component.html'
})
export class TemplateProfileComponent implements OnInit {
  activeView = 'overview';

  // Doughnut
  doughnutChartColors: any[] = [{
    backgroundColor: ['#fff', 'rgba(0, 0, 0, .24)']
  }];

  total1 = 500;
  data1 = 200;
  doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

  total2 = 1000;
  data2 = 400;
  doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];

  doughnutChartType = 'doughnut';
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    tooltips: {
      enabled: false
    }
  };

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeView = this.router.snapshot.params['view'];
  }

}
