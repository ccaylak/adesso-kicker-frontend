import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TrackedStatistic} from '../models/tracked-statistic';
import {Chart} from '../models/chart';
import {TranslateService} from '@ngx-translate/core';
import {TrackedStatisticService} from '../services/tracked-statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.less']
})
export class StatisticComponent implements OnInit {
  trackedStatistics$: Observable<TrackedStatistic[]>;

  public rankOverTimeChart = new Chart(
    [{
      data: [],
      label: this.translate.instant('RANKING.RANK'),
      fill: 'start'
    }],
    [],
    [{
      borderColor: 'black',
      borderWidth: 2,
      pointBackgroundColor: 'white',
      backgroundColor: 'rgba(173,216,230,0.5)'
    }],
    true,
    'line',
    {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D.MM.YYYY',
            }
          }
        }],
        yAxes: [{
          ticks: {
            reverse: true,
            stepSize: 1
          }
        }],
      }
    }
  );

  winRateOverTimeChart = new Chart(
    [{
      data: [],
      label: this.translate.instant('RANKING.WIN-RATE'),
    }],
    [],
    [{
      borderColor: 'black',
      borderWidth: 2,
      pointBackgroundColor: 'white',
      backgroundColor: 'rgba(173,216,230,0.5)'
    }],
    true,
    'line',
    {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D.MM.YYYY',
            }
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 100,
            stepSize: 10,
          }
        }]
      }
    }
  );

  winsAndLossesPerDayChart = new Chart(
    [{
      data: [],
      label: this.translate.instant('RANKING.WINS'),
      borderColor: 'black',
      borderWidth: 2,
      pointRadius: 5,
      borderDash: [5],
      backgroundColor: 'rgba(142, 222, 168, 0.2)',
      pointBackgroundColor: 'lightgreen',
      pointBorderWidth: 1
    }, {
      data: [],
      label: this.translate.instant('RANKING.LOSSES'),
      borderColor: 'black',
      borderWidth: 2,
      pointRadius: 5,
      borderDash: [5],
      backgroundColor: 'rgba(225, 112, 112, 0.2)',
      pointBackgroundColor: 'red',
      pointBorderColor: 'black',
      pointBorderWidth: 1,
      pointHoverBackgroundColor: 'red',
      pointHoverBorderColor: 'black',
    }],
    [],
    [{}],
    true,
    'line',
    {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D.MM.YYYY',
            }
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  );

  winsAndLossesDiffPerDayChart = new Chart(
    [{
      data: [],
      label: this.translate.instant('CHART.DIFFERENCE'),
    }],
    [],
    [{
      borderColor: 'black',
      borderWidth: 2,
      pointBackgroundColor: 'white',
      backgroundColor: 'rgba(173,216,230,0.5)'
    }],
    true,
    'line',
    {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D.MM.YYYY',
            }
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 1
          }
        }]
      }
    }
  );

  constructor(private route: ActivatedRoute,
              private trackedStatisticService: TrackedStatisticService,
              private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.getTrackedStatistics();
    this.fillChartLabels();
    this.fillCharts();
  }

  getTrackedStatistics() {
    this.route.params.subscribe((params) => {
      this.trackedStatistics$ = this.trackedStatisticService.getAllTrackedStatistics(params.userId);
    });
  }

  fillChartLabels() {
    this.trackedStatistics$
      .subscribe(trackedStatistics => trackedStatistics.map(trackedStatistic => {
          const date = trackedStatistic.date.toString();
          this.rankOverTimeChart.lineChartLabels.push(date);
          this.winRateOverTimeChart.lineChartLabels.push(date);
          this.winsAndLossesPerDayChart.lineChartLabels.push(date);
          this.winsAndLossesDiffPerDayChart.lineChartLabels.push(date);
        }
        )
      );
  }

  fillCharts() {
    this.trackedStatistics$
      .subscribe(trackedStatistics => trackedStatistics
        .map(trackedStatistic => {
            this.rankOverTimeChart.lineChartData.map(lineChart => lineChart.data.push(trackedStatistic.rank));
            this.winRateOverTimeChart.lineChartData.map(lineChart => lineChart.data.push(trackedStatistic.getWinRate()));
            this.winsAndLossesPerDayChart.lineChartData[0].data.push(trackedStatistic.wins);
            this.winsAndLossesPerDayChart.lineChartData[1].data.push(trackedStatistic.losses);
            this.winsAndLossesDiffPerDayChart.lineChartData.map(lineChart => lineChart.data.push(trackedStatistic.getWinLoseDiff()));
          }
        )
      );
  }
}
