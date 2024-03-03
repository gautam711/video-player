"use client";
import { VideoContext } from "@/features/VideoProvider";
import { IVideo } from "@/utils/data";
import React, { useContext, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ListItem from "./ListItem";
import Search from "./Search";

function Playlist() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { videos, setVideos, currentVideo, setcurrentVideo } =
    useContext(VideoContext);
  console.log({ videos });

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const handleSort = () => {
    let items = [...videos];

    // remove and save dragged item content
    const draggedVideo = items.splice(dragItem.current, 1)[0];

    //switch pos
    items.splice(dragOverItem.current, 0, draggedVideo);

    //reset
    dragItem.current = null;
    dragOverItem.current = null;

    //update actual array
    setVideos(items);
  };

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleChangeVideo = (video: IVideo) => {
    sessionStorage.removeItem("lastVideoDuration");
    const params = new URLSearchParams(searchParams);
    params.set("video", video?.sources[0]);
    setcurrentVideo(video);
    router.push("/" + "?" + createQueryString("video", video?.id));
  };

  return (
    <div className="sm:w-full lg:w-1/4 h-full text-ellipsis max-h-[90vh] mt-8 lg:mt-0">
      <div className="flex flex-col text-left  h-24 text-xl text-bold bg-zinc-900 px-4 pt-2 mb-2 items-start rounded-t-lg">
        <div>
          {" "}
          Playlist{" "}
          {videos?.findIndex(
            (video: IVideo) => video?.id === currentVideo?.id
          ) + 1}
          /{videos?.length}
        </div>
        <Search />
      </div>
      <div
        className="max-h-[75vh]"
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {videos?.map((video: IVideo, index: number) => (
          <ListItem
            video={video}
            currentVideo={currentVideo}
            index={index}
            handleChangeVideo={handleChangeVideo}
            handleSort={handleSort}
            dragOverItem={dragOverItem}
            dragItem={dragItem}
            key={video?.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Playlist;
