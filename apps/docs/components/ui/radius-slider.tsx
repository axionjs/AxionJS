import React from "react";

interface RadiusSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const RadiusSlider: React.FC<RadiusSliderProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Border Radius</label>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min="0"
          max="50"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <span className="text-sm font-medium">{value}px</span>
      </div>
    </div>
  );
};

export default RadiusSlider;
