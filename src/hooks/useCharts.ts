import { useState, useEffect } from "react";

export interface ChartDataPoint {
  extrapolated: number;
  interpolated: number;
  value: number;
  timestp: string;
}

export interface ChartData {
  [key: string]: ChartDataPoint[];
}

export const useCharts = () => {
  const [chartData, setChartData] = useState<ChartData>({});
  const [isLoadingCharts, setIsLoadingCharts] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoadingCharts(true);
        const response = await fetch(
          import.meta.env.BASE_URL + "data/chartData.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }
        const data = await response.json();
        setChartData(data);
        setChartError(null);
      } catch (err) {
        setChartError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoadingCharts(false);
      }
    };

    fetchChartData();
  }, []);

  return {
    chartData,
    isLoadingCharts,
    chartError,
  };
};
