import { Track } from "../components/TrackList/TrackListTypes";
import { ChartData } from "../hooks/useCharts";

export const filterByAsOfToday = (
  chartData: any[],
  selectedTimePeriod: number
) => {
  if (selectedTimePeriod === 0) {
    return chartData;
  }

  const current = new Date();
  current.setMonth(current.getMonth() - selectedTimePeriod);

  return chartData.map((dataPoints) =>
    dataPoints.filter((point: any) => {
      const pointDate = new Date(point.timestamp);
      return pointDate >= current;
    })
  );
};

export const filterByTrackReleaseDate = (
  chartData: ChartData,
  selectedTracks: Track[],
  selectedTimePeriod: number
) => {
  // Find latest release date among selected tracks
  const latestReleaseDate = selectedTracks.reduce((latest, track) => {
    const releaseDate = new Date(Date.parse(track.earliestReleaseDate));
    return !latest || releaseDate > latest ? releaseDate : latest;
  }, null as Date | null);

  if (!latestReleaseDate) {
    return [];
  }

  // Calculate end date based on selectedTimePeriod
  const endDate = new Date(latestReleaseDate);
  const newMonth = latestReleaseDate.getMonth() + Number(selectedTimePeriod);
  endDate.setMonth(newMonth);

  // Map through selected tracks and filter data points
  const filteredData = selectedTracks.map((track) => {
    const trackData = chartData[track.id];
    return trackData
      .filter((point: any) => {
        const pointDate = new Date(point.timestp);
        return pointDate >= latestReleaseDate && pointDate <= endDate;
      })
      .map((point: any) => ({
        timestamp: Date.parse(point.timestp),
        value: point.value,
      }));
  });

  // Handle empty data points
  return filteredData.map((dataPoints) =>
    dataPoints.length ? dataPoints : []
  );
};

export const getColors = () => {
  return ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce"];
};

export const getOptions = () => {
  return [
    { value: 1, label: "1 Month" },
    { value: 3, label: "3 Months" },
    { value: 6, label: "6 Months" },
    { value: 12, label: "1 Year" },
    { value: 0, label: "All Time" },
  ];
};

export const formatCsvContent = (
  headers: string[],
  data: any[],
  series: string[]
) => {
  // Create CSV header
  const header = headers.join(",");

  // Generate CSV rows
  const rows = data.flatMap((dataset, index) => {
    return dataset.map((point: any) => {
      const date = new Date(point.timestamp).toISOString().split("T")[0];
      return `${date},${series[index]},${point.value}`;
    });
  });

  // Combine header and rows
  return [header, ...rows].join("\n");
};
