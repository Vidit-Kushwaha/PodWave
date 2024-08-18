import {
  IoPause,
  IoPlay,
  IoPlaySkipBackSharp,
  IoRefreshSharp,
} from "react-icons/io5";
import { FaPause } from "react-icons/fa6";

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipTime: (amount: number) => void;
  playbackRate: number;
  onSpeedChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onPlayPause,
  onSkipTime,
  playbackRate,
  onSpeedChange,
}) => (
  <div className="m-4">
    {/* <select
      value={playbackRate}
      onChange={onSpeedChange}
      className="text-base text-white bg-black appearance-none rounded-full p-1 focus:outline-none r-4"
    >
      <div className="text-white">Speed:
        
      <option value={0.5}>0.5x</option>
      <option value={0.75}>0.75x</option>
      <option value={1}>1x</option>
      <option value={1.25}>1.25x</option>
      <option value={1.5}>1.5x</option>
      <option value={2}>2x</option>
      </div>
    </select> */}
    <div className="flex items-center justify-between text-white space-x-8">
      <button
        onClick={() => onSkipTime(-30)}
        className="text-xs text-white focus:outline-none items-center hidden md:flex "
      >
        {/* &#9664; */}
        <IoRefreshSharp className="h-5 w-5 " />
      </button>
      <div className="flex items-center">
        <button
          onClick={onPlayPause}
          className="text-2xl focus:outline-none w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center"
        >
          {isPlaying ? <FaPause fill="black" /> : <IoPlay fill="black" />}
        </button>
      </div>
      <button
        onClick={() => onSkipTime(30)}
        className="text-xs text-white focus:outline-none flex items-center"
      >
        <IoRefreshSharp className="h-5 w-5 rotate-180" />
      </button>
    </div>
    <div></div>
  </div>
);

export default PlaybackControls;
