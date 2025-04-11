import React from "react";
import "./FilterWidget.scss";
import { FilterWidgetProps } from "./FilterWidgetTypes";

export const FilterWidget: React.FC<FilterWidgetProps> = ({
  options,
  onChange,
  placeholder = "Select an option",
  defaultValue,
  disabled = false,
}) => {
  return (
    <div className="filter-widget">
      <select
        className="filter-widget__select"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <option value="none" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterWidget;
