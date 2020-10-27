import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';

export interface Chart {
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartColors: Color[];
  lineChartLegend: boolean;
  lineChartType: string;
  options: ChartOptions;
}
