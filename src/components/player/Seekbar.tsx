import React, { forwardRef } from "react";

interface SeekbarProps {
  className?: string;
  currentTime: number;
  duration: number;
  onSeekStart: () => void;
  onSeekEnd: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line react/display-name
const Seekbar = forwardRef<HTMLInputElement, SeekbarProps>(
  ({ className, currentTime, duration, onSeekStart, onSeekEnd }, ref) => {
    const progress = (currentTime / duration) * 100 || 0;

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
      <div className={`flex items-center ${className}`}>
        <span className="ml-2 text-sm text-gray-400">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          ref={ref}
          value={progress}
          max="100"
          className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg bg-gray-300 accent-gray-500 hover:accent-green-600 transition duration-100"
          onMouseDown={onSeekStart}
          onChange={onSeekEnd}
        />

        <span className="text-sm text-gray-400">{formatTime(duration)}</span>
      </div>
    );
  }
);

export default Seekbar;
