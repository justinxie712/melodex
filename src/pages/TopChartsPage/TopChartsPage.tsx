import { useState, useMemo, useEffect } from "react";
import TrackList from "../../components/TrackList/TrackList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useTracks } from "../../hooks/useTracks";
import { useCharts } from "../../hooks/useCharts";
import TimeLineChart from "../../components/Charts/TimeLineChart";
import TrackCard from "../../components/TrackCard/TrackCard";
import { Track } from "../../components/TrackList/TrackListTypes";
import FilterWidget from "../../components/FilterWidget/FilterWidget";
import {
  filterByAsOfToday,
  getOptions,
  formatCsvContent,
} from "../../utils/utils";
import ExportCSV from "../../components/Buttons/ExportCsvButton";
import "./TopChartsPage.scss";
import ClipLoader from "react-spinners/ClipLoader";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import { TbMusicDiscount } from "react-icons/tb";

function TopChartsPage() {
  const {
    tracks,
    selectedTracks,
    setSelectedTracks,
    suggestions,
    getTrackSeries,
    isLoadingTracks,
    trackError,
  } = useTracks();
  const { chartData, isLoadingCharts, chartError } = useCharts();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chartError || trackError) {
      setShowToast(true);
      setError(chartError || trackError);
    }
  }, [chartError, trackError]);

  const getChartData = useMemo(() => {
    let data = selectedTracks.map((track) => {
      return chartData[track.id];
    });
    const formattedData = data.map((dataPoint: any) => {
      return dataPoint.map((t: any) => ({
        timestamp: Date.parse(t.timestp),
        value: t.value,
      }));
    });
    return selectedTimePeriod > 0
      ? filterByAsOfToday(formattedData, selectedTimePeriod)
      : formattedData;
  }, [selectedTracks, selectedTimePeriod, chartData]);

  return (
    <div className="top-charts-page">
      {(isLoadingTracks || isLoadingCharts) && (
        <div className="loader-container">
          <ClipLoader loading={true} size={50} color="#36D7B7" />
        </div>
      )}
      <div className="head">
        <div className="title">
          <h2>Melodex</h2>
          <TbMusicDiscount />
        </div>
        <div className="actions">
          <SearchBar
            onClick={(song: Track) => {
              setSelectedTracks([...selectedTracks, song]);
            }}
            suggestions={suggestions}
            items={tracks}
            render={(suggestion: any) => (
              <TrackCard
                className="search-item"
                id={suggestion.id}
                title={suggestion.name}
                albumCover={suggestion.image_url}
                releaseDate={suggestion.earliestReleaseDate}
              />
            )}
          />
          <div className="filter-container">
            <label>Show Data From:</label>
            <FilterWidget
              options={getOptions()}
              onChange={(value: number) => {
                setSelectedTimePeriod(value);
              }}
              placeholder="Select time period"
              defaultValue={0}
              disabled={selectedTracks.length === 0}
            />
          </div>
          <ExportCSV
            data={getChartData}
            series={getTrackSeries}
            headers={["Timestamp,Title,Plays"]}
            formatData={formatCsvContent}
          />
        </div>
      </div>
      <div className="content">
        <TrackList
          title={`${selectedTracks.length} Selected Tracks`}
          tracks={selectedTracks}
          onDeleteTrack={(id) => {
            setSelectedTracks(
              selectedTracks.filter((track) => track.id !== id)
            );
          }}
        />
        <TimeLineChart
          data={getChartData}
          title="Most Plays"
          series={getTrackSeries}
          yAxisTitle="Plays"
        />
        {showToast && (
          <ToastNotification
            message={error}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
}

export default TopChartsPage;
