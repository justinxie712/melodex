import React, { useState } from "react";
import { format } from "date-fns";
import "./TrackCard.scss";
import { TrackCardProps } from "./TrackCardTypes";
import { FaTrashAlt } from "react-icons/fa";

const TrackCard: React.FC<TrackCardProps> = ({
  id,
  title,
  albumCover,
  releaseDate,
  color,
  onDelete,
  animate,
  className,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleDelete = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDelete && onDelete(id);
    }, 200);
  };
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 max-w-sm track-card ${className} ${
        animate && isExiting
          ? "track-card-exit"
          : animate && !isExiting
          ? "track-card-enter"
          : ""
      }`}
      style={{ outline: color ? `3px solid ${color}` : "none" }}
    >
      <div className="flex items-center">
        <img
          style={{ height: "100%", width: "100px" }}
          src={albumCover}
          alt={`${title} album cover`}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {format(new Date(releaseDate), "MMM dd, yyyy")}
        </p>
      </div>
      <div
        className="h-12"
        style={{ visibility: onDelete ? "visible" : "hidden" }}
      >
        {onDelete && (
          <button onClick={handleDelete} className="delete-button">
            <FaTrashAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackCard;
