export interface Track {
  id: number;
  name: string;
  earliestReleaseDate: string;
  image_url: string;
}

export interface TrackListProps {
  tracks: Track[];
  onDeleteTrack: (id: number) => void;
  title: string;
}
