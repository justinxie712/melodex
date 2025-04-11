import React from "react";
import "./TrackList.scss";
import TrackCard from "../TrackCard/TrackCard";
import { TrackListProps } from "./TrackListTypes";
import { getColors } from "../../utils/utils";

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  onDeleteTrack,
  title,
}) => {
  const colors = getColors();
  return (
    <div className="container mx-auto px-4">
      <div className="header">{title}</div>
      <div className="track-list">
        {tracks.map((track, index) => (
          <TrackCard
            key={track.id}
            id={track.id}
            title={track.name}
            albumCover={track.image_url}
            releaseDate={track.earliestReleaseDate}
            onDelete={() => onDeleteTrack(track.id)}
            color={colors[index % colors.length]}
            animate={true}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackList;
