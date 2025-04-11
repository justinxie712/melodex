import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { TimeLineChartProps } from "./TimeLineChartTypes";
import { getColors } from "../../utils/utils";

const TimeLineChart: React.FC<TimeLineChartProps> = ({
  data = [],
  title = "Time Series Chart",
  series = ["No Data"],
  yAxisTitle = "Value",
}) => {
  const colors = getColors();
  const getSeriesData = (): Highcharts.SeriesOptionsType[] => {
    if (!data.length || !data.flat().length) {
      return [
        {
          type: "line",
          name: "No Data",
          data: [],
          color: colors[0],
        },
      ];
    }

    return data.map((dataset, index) => ({
      type: "line",
      name: series[index] || `Series ${index + 1}`,
      data: dataset.map((point) => [point.timestamp, point.value]),
      color: colors[index % colors.length],
    }));
  };

  const options: Highcharts.Options = {
    title: {
      text: title,
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
      labels: {
        format: "{value:%Y-%m-%d}",
      },
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
      min: 0,
      max: data.length && data.flat().length ? undefined : 1000000, // Set max to 1 million only when no data
      tickInterval: data.length && data.flat().length ? undefined : 200000,
    },
    series: getSeriesData(),
    plotOptions: {
      line: {
        marker: {
          enabled: true,
        },
        lineWidth: 2,
      },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br/>
                Date: ${Highcharts.dateFormat("%Y-%m-%d", this.x)}<br/>
                Plays: ${this.y}`;
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
    lang: {
      noData: "No data available",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030",
      },
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default TimeLineChart;
