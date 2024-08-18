import Image from "next/image";
import { FC } from "react";

interface PodcastCoverProps {
  title: string;
}

const PodcastCover: FC<PodcastCoverProps> = ({ title }) => (
  <div className="flex items-center">
    <Image
      src="https://via.placeholder.com/80"
      alt="Podcast Cover"
      width={80}
      height={80}
      className="rounded-md"
    />
    <div className="ml-5 text-white hidden md:block">
      <div className="text-lg font-bold capitalize">{title.replace('-', ' ')}</div>
      <div className="text-sm text-gray-400">PodWave</div>
    </div>
  </div>
);

export default PodcastCover;
