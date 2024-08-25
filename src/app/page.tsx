"use client";
import { MultiStepLoader } from "@/components/multi-step-loader";
import PodcastPlayer from "@/components/player/PodcastPlayer";
import { SearchBar } from "@/components/SearchBar";
import { WavyBackground } from "@/components/WaveBackground";
import { URL } from "@/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

const loadingStates = [
  { text: "Generating Script", value: 0 },
  { text: "Analyzing Sentiment", value: 1 },
  { text: "Generating Summary", value: 2 },
  { text: "Transcribing Audio", value: 3 },
  { text: "Finalizing Podcast", value: 4 },
  { text: "Loading Podcast", value: 5 },
];
const Home = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [topic, setTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${URL}/api/podcast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ topic }),
      }).then(async (res) => {
        if (res.status === 200) {
          const { url, script } = await res.json();
          setLoading(false);
          router.push(`?q=${btoa(url)}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTopic(e.target.value);
  };

  return (
    <>
      <MultiStepLoader
        loadingStates={loadingStates}
        duration={5000}
        loading={loading}
        loop={false}
      />
      <WavyBackground className="max-w-4xl  w-full mx-auto justify-center">
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
          PodWave
        </p>
        <div className="flex justify-center mt-8">
          <SearchBar
            placeholders={[
              "Type your podcast topic here",
              "Mindful Minutes",
              "Culture Clash",
              "The Future of Work",
              "The Future of Education",
            ]}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        </div>
      </WavyBackground>
      {searchParams.q && <PodcastPlayer src={atob(searchParams.q as string)} />}
    </>
  );
};

export default Home;
