"use client";
import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";

import { IVideo, mediaJSON } from "../utils/data";

interface IVideoContextProps {
  videos: IVideo[];
  setVideos: Dispatch<SetStateAction<IVideo[]>>;
  currentVideo: IVideo;
  setcurrentVideo: Dispatch<SetStateAction<IVideo>>;
  originalVideoList: IVideo[];
}

export const VideoContext = createContext<IVideoContextProps>({
  videos: mediaJSON,
  setVideos: () => {},
  currentVideo: mediaJSON[0],
  setcurrentVideo: () => {},
  originalVideoList: mediaJSON,
});

export const VideoProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [videos, setVideos] = useState(mediaJSON);
  const [currentVideo, setcurrentVideo] = useState(mediaJSON[0]);
  const [originalVideoList] = useState(mediaJSON);

  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        currentVideo,
        setcurrentVideo,
        originalVideoList,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
export default VideoProvider;
