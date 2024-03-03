import Playlist from "@/components/Playlist";
import VideoPlayer from "@/components/VideoPlayer";
import Videoontext from "@/features/VideoProvider";

export default function Home() {
  return (
    <Videoontext>
      <div className="flex flex-wrap mt-4 h-full">
        <VideoPlayer />
        <Playlist />
      </div>
    </Videoontext>
  );
}
