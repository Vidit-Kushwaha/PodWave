import { useRef, useState, useEffect, FC } from "react";
import PodcastCover from "./PodcastCover";
import PlaybackControls from "./PlaybackControls";
import Seekbar from "./Seekbar";
import {
  IoVolumeLowSharp,
  IoVolumeMedium,
  IoVolumeMuteSharp,
} from "react-icons/io5";

interface PodcastPlayerProps {
  src: string;
}

const PodcastPlayer: FC<PodcastPlayerProps> = ({ src }) => {

  const audioRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const title = src.split('/')[src.split('/').length -1]  ?? "";

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (!isSeeking && audio && seekbarRef.current) {
        setCurrentTime(audio.currentTime);
        seekbarRef.current.value = (
          (audio.currentTime / audio.duration) *
          100
        ).toString();
      }
    };

    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    handleLoadedMetadata();

    audio?.addEventListener("timeupdate", handleTimeUpdate);
    audio?.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
      audio?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isSeeking, duration]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && seekbarRef.current) {
      const seekTime = (parseFloat(seekbarRef.current.value) / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      setIsSeeking(false);
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newRate = Number(e.target.value);
      setPlaybackRate(newRate);
      audio.playbackRate = newRate;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
    }
  };

  const setVolumeBar = (value: number) => {
    const audio = audioRef.current;
    setVolume(value);
    if (audio) {
      audio.volume = value;
    }
  };

  const skipTime = (amount: number) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Math.min(
        Math.max(audio.currentTime + amount, 0),
        duration
      );
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 w-full shadow-lg">
      <div className="bg-black shadow-md flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <div className="w-1/3">
          <PodcastCover title={title} />
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center mx-auto">
          <PlaybackControls
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onSkipTime={skipTime}
            playbackRate={playbackRate}
            onSpeedChange={handleSpeedChange}
          />
          <audio ref={audioRef} src={src} />
          <Seekbar
            className="hidden md:flex"
            ref={seekbarRef}
            currentTime={currentTime}
            duration={duration}
            onSeekStart={handleSeekStart}
            onSeekEnd={handleSeekEnd}
          />
        </div>
        <div className="w-1/3 hidden md:flex items-center justify-end gap-2">
          <label
            htmlFor="volume"
            className="text-white text-sm m-1 cursor-pointer transition duration-100"
          >
            {volume > 0.5 ? (
              <IoVolumeMedium
                className="h-5 w-5"
                onClick={() => setVolumeBar(0)}
              />
            ) : volume > 0.1 ? (
              <IoVolumeLowSharp
                className="h-5 w-5"
                onClick={() => setVolumeBar(0)}
              />
            ) : (
              <IoVolumeMuteSharp
                className="h-5 w-5"
                onClick={() => setVolumeBar(0.25)}
              />
            )}
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 cursor-pointer rounded-lg bg-gray-300  hover:accent-green-600 transition duration-100"
          />
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
