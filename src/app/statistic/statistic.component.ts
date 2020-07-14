import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TrackedStatistic} from '../models/tracked-statistic';
import {Chart} from '../models/chart';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.less']
})
export class StatisticComponent implements OnInit, OnDestroy {
  trackedStatistics$: Observable<TrackedStatistic[]>;
  $destroy = new Subject();

  rankOverTimeChart: Chart = {
    lineChartData: [{
      data: [],
      label: 'Rang',
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
  };

  winRateOverTimeChart: Chart = {
    lineChartData: [{
      data: [],
      label: 'Siegesrate',
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
  };

  winsAndLossesPerDayChart: Chart = {
    lineChartData: [{
      data: [],
      label: 'Siege',
      borderColor: 'black',
      borderWidth: 2,
      pointRadius: 5,
      borderDash: [5],
      backgroundColor: 'rgba(142, 222, 168, 0.2)',
      pointBackgroundColor: 'lightgreen',
      pointBorderWidth: 1
    }, {
      data: [],
      label: 'Niederlagen',
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
  };

  winsAndLossesDiffPerDayChart: Chart = {
    lineChartData: [{
      data: [],
      label: 'Differenz',
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
  };

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
  }

  getTrackedStatistics() {
    this.route.params.subscribe((params) => {
      this.trackedStatistics$ = this.userService.getAllTrackedStatistics(params.userId);
    });
  }

  fillChartLabels() {
    this.trackedStatistics$.pipe(takeUntil(this.$destroy)).subscribe(
      (trackedStatisticArray) => trackedStatisticArray.forEach(
        (trackedStatisticObject) => {
          this.rankOverTimeChart.lineChartLabels.push(trackedStatisticObject.date.toString());
          this.winRateOverTimeChart.lineChartLabels.push(trackedStatisticObject.date.toString());
          this.winsAndLossesPerDayChart.lineChartLabels.push(trackedStatisticObject.date.toString());
          this.winsAndLossesDiffPerDayChart.lineChartLabels.push(trackedStatisticObject.date.toString());
        }));
  }

  fillRankOverTimeChartData() {
    this.trackedStatistics$.pipe(takeUntil(this.$destroy)).subscribe(
      (trackedStatisticArray) => trackedStatisticArray.forEach(
        (trackedStatisticObject) => {
          this.rankOverTimeChart.lineChartData.forEach((linechart) => linechart.data.push(trackedStatisticObject.rank));
        }));
  }

  fillWinRateOverTimeChartData() {
    this.trackedStatistics$.pipe(takeUntil(this.$destroy)).subscribe(
      (trackedStatisticArray) => trackedStatisticArray.forEach(
        (trackedStatisticObject) => {
          this.winRateOverTimeChart.lineChartData.forEach(
            linechart => linechart.data.push(this.getTrackedStatisticWinRatio(trackedStatisticObject))
          );
        }));
  }

  fillWinsAndLossesPerDayChartData() {
    this.trackedStatistics$.pipe(takeUntil(this.$destroy)).subscribe(
      (trackedStatisticArray) => trackedStatisticArray.forEach(
        (trackedStatisticObject) => {
          this.winsAndLossesPerDayChart.lineChartData[0].data.push(trackedStatisticObject.wins);
          this.winsAndLossesPerDayChart.lineChartData[1].data.push(trackedStatisticObject.losses);
        }));
  }

  fillWinAndLossesDiffPerDayChartData() {
    this.trackedStatistics$.pipe(takeUntil(this.$destroy)).subscribe(
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

  ngOnDestroy(): void {
    this.$destroy.next();
  }
}
