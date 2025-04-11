import { useState, useEffect, useMemo } from "react";
import { Track } from "../components/TrackList/TrackListTypes";

export const useTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState<boolean>(false);
  const [trackError, setTrackError] = useState<string | null>(null);

  const suggestions = useMemo(() => {
    return tracks.filter((item) => !selectedTracks.includes(item)).slice(0, 5);
  }, [selectedTracks, tracks]);

  const getTrackSeries = useMemo(() => {
    return selectedTracks.map((track) => {
      return track.name;
    });
  }, [selectedTracks]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoadingTracks(true);
        const response = await fetch(
          import.meta.env.BASE_URL + "data/tracks.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tracks data");
        }
        const data = await response.json();
        setTracks(data);
      } catch (err) {
        setTrackError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoadingTracks(false);
      }
    };

    fetchChartData();
  }, []);

  return {
    tracks,
    isLoadingTracks,
    trackError,
    selectedTracks,
    setSelectedTracks,
    suggestions,
    getTrackSeries,
  };
};
