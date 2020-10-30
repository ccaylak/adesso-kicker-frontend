import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TrackedStatistic} from '../models/tracked-statistic';
import {Chart} from '../models/chart';
import {UserService} from '../services/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.less']
})
export class StatisticComponent implements OnInit {
  trackedStatistics$: Observable<TrackedStatistic[]>;

  rankOverTimeChart: Chart = {
    lineChartData: [{
      data: [],
      label: this.translate.instant('RANKING.RANK'),
    }],
    lineChartLabels: [],
    lineChartColors: [{
      borderColor: 'black',
      borderWidth: 2,
      pointBackgroundColor: 'white',
      backgroundColor: 'rgba(173,216,230,0.5)'
    }],
    lineChartLegend: true,
    lineChartType: 'line',
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            reverse: true,
          },
        }],
      }
    }
  };

  winRateOverTimeChart: Chart = {
    lineChartData: [{
      data: [],
      label: this.translate.instant('RANKING.WIN-RATE'),
    }],
    lineChartLabels: [],
    lineChartColors: [{
      borderColor: 'black',
      borderWidth: 2,
      pointBackgroundColor: 'white',
      backgroundColor: 'rgba(173,216,230,0.5)'
    }],
    lineChartLegend: true,
    lineChartType: 'line',
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 10,
            max: 100,
            min: 0,
          }
        }]
      }
    }
  };

  winsAndLossesPerDayChart: Chart = {
    lineChartData: [{
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
    lineChartLabels: [],
    lineChartColors: [{}],
    lineChartLegend: true,
    lineChartType: 'line',
    options: null,
  };

  winsAndLossesDiffPerDayChart: Chart = {
    lineChartData: [{
      data: [],
      label: this.translate.instant('CHART.DIFFERENCE'),
    }],
    lineChartLabels: [],
    lineChartColors: [{
      borderColor: 'black',
      borderWidth: 2,
      pointBackgroundColor: 'white',
      backgroundColor: 'rgba(173,216,230,0.5)'
    }],
    lineChartLegend: true,
    lineChartType: 'line',
    options: null
  };

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.getTrackedStatistics();
    this.fillChartLabels();
    this.fillRankOverTimeChartData();
    this.fillWinAndLossesDiffPerDayChartData();
    this.fillWinRateOverTimeChartData();
    this.fillWinsAndLossesPerDayChartData();
  }

  getTrackedStatistics() {
    this.route.params.subscribe((params) => {
      this.trackedStatistics$ = this.userService.getAllTrackedStatistics(params.userId);
    });
  }

  fillChartLabels() {
    this.trackedStatistics$.subscribe(
      (trackedStatisticArray) => trackedStatisticArray.forEach(
        (trackedStatisticObject) => {
          this.rankOverTimeChart.lineChartLabels.push(new Date(trackedStatisticObject.date).toLocaleDateString());
          this.winRateOverTimeChart.lineChartLabels.push(new Date(trackedStatisticObject.date).toLocaleDateString());
          this.winsAndLossesPerDayChart.lineChartLabels.push(new Date(trackedStatisticObject.date).toLocaleDateString());
          this.winsAndLossesDiffPerDayChart.lineChartLabels.push(new Date(trackedStatisticObject.date).toLocaleDateString());
        }));
  }

  fillRankOverTimeChartData() {
    this.trackedStatistics$.subscribe(
      (trackedStatisticArray) => trackedStatisticArray.forEach(
        (trackedStatisticObject) => {
          this.rankOverTimeChart.lineChartData.forEach((linechart) => linechart.data.push(trackedStatisticObject.rank));
        }));
  }

  fillWinRateOverTimeChartData() {
    this.trackedStatistics$.subscribe(
      (trackedStatisticArray) => trackedStatisticArray.forEach(
        (trackedStatisticObject) => {
          this.winRateOverTimeChart.lineChartData.forEach(
            linechart => linechart.data.push(this.getTrackedStatisticWinRatio(trackedStatisticObject))
          );
        }));
  }

  fillWinsAndLossesPerDayChartData() {
    this.trackedStatistics$.subscribe(
      (trackedStatisticArray) => trackedStatisticArray.forEach(
        (trackedStatisticObject) => {
          this.winsAndLossesPerDayChart.lineChartData[0].data.push(trackedStatisticObject.wins);
          this.winsAndLossesPerDayChart.lineChartData[1].data.push(trackedStatisticObject.losses);
        }));
  }

  fillWinAndLossesDiffPerDayChartData() {
    this.trackedStatistics$.subscribe(
      (trackedStatisticArray) => trackedStatisticArray.forEach(
        (trackedStatisticObject) => {
          this.winsAndLossesDiffPerDayChart.lineChartData.forEach(
            linechart => linechart.data.push(this.getWinLossDiff(trackedStatisticObject))
          );
        }));
  }

  getTrackedStatisticWinRatio(trackedStatistic: TrackedStatistic): number {
    return trackedStatistic.wins / trackedStatistic.losses;
  }

  getWinLossDiff(trackedStatistic: TrackedStatistic): number {
    return trackedStatistic.wins - trackedStatistic.losses;
  }
}
