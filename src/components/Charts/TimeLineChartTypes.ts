interface TimeDataPoint {
  timestamp: number;
  value: number;
}

export interface TimeLineChartProps {
  data?: TimeDataPoint[][];
  title?: string;
  series?: string[];
  yAxisTitle?: string;
}
