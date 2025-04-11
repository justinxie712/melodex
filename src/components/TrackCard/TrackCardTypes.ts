export interface TrackCardProps {
  id: number;
  title: string;
  albumCover: string;
  releaseDate: string;
  color?: string;
  className?: string;
  animate?: boolean;
  onDelete?: (id: number) => void;
}
