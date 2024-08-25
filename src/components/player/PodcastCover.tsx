import Image from "next/image";
import { FC } from "react";

interface PodcastCoverProps {
  title: string;
}

const PodcastCover: FC<PodcastCoverProps> = ({ title }) => (
  <div className="flex items-center">
    <Image
      src="https://images.unsplash.com/photo-1482442120256-9c03866de390?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Podcast Cover"
      width={80}
      height={80}
      className="rounded-md overflow-clip"
    />
    <div className="ml-5 text-white hidden md:block">
      <div className="text-lg font-bold capitalize">{title.substring(0, title.lastIndexOf('-')).replace('-',' ')}</div>
      <div className="text-sm text-gray-400">PodWave</div>
    </div>
  </div>
);

export default PodcastCover;
