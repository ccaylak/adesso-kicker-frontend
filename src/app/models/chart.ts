import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';

export class Chart {
  private _lineChartData: ChartDataSets[];
  private _lineChartLabels: Label[];
  private _lineChartOptions: ChartOptions;
  private _lineChartColors: Color[];
  private _lineChartLegend: boolean;
  private _lineChartType: ChartType;

  constructor(
    lineChartData: ChartDataSets[],
    lineChartLabels: Label[],
    lineChartColors: Color[],
    lineChartLegend: boolean,
    lineChartType: ChartType,
    lineChartOptions?: ChartOptions
  ) {
    this._lineChartData = lineChartData;
    this._lineChartLabels = lineChartLabels;
    this._lineChartColors = lineChartColors;
    this._lineChartLegend = lineChartLegend;
    this._lineChartType = lineChartType;
    this._lineChartOptions = lineChartOptions;
  }

  get lineChartData(): ChartDataSets[] {
    return this._lineChartData;
  }

  set lineChartData(lineChartData: ChartDataSets[]) {
    this._lineChartData = lineChartData;
  }

  get lineChartLabels(): Label[] {
    return this._lineChartLabels;
  }

  set lineChartLabels(lineChartLabels: Label[]) {
    this._lineChartLabels = lineChartLabels;
  }

  get lineChartOptions(): ChartOptions {
    return this._lineChartOptions;
  }

  set lineChartOptions(lineChartOptions: ChartOptions) {
    this._lineChartOptions = lineChartOptions;
  }

  get lineChartColors(): Color[] {
    return this._lineChartColors;
  }

  set lineChartColors(lineChartColors: Color[]) {
    this._lineChartColors = lineChartColors;
  }

  get lineChartLegend(): boolean {
    return this._lineChartLegend;
  }

  set lineChartLegend(lineChartLegend: boolean) {
    this._lineChartLegend = lineChartLegend;
  }

  get lineChartType(): ChartType {
    return this._lineChartType;
  }

  set lineChartType(lineChartType: ChartType) {
    this._lineChartType = lineChartType;
  }
}
