import { Track } from "../TrackList/TrackListTypes";

export interface SearchBarProps {
  onClick?: (song: Track) => void;
  suggestions?: any[];
  items?: any[];
  render: (suggestion: any) => React.ReactNode;
}
