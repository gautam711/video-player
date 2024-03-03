"use client";
import { VideoContext } from "@/features/VideoProvider";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IVideo } from "@/utils/data";

function VideoPlayer() {
  const searchParams = useSearchParams();
  const video = searchParams.get("video");
  const videoRef = useRef<HTMLVideoElement>(null);

  const { videos, currentVideo, setcurrentVideo } = useContext(VideoContext);

  const [duration, setDuration] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (video) {
      setcurrentVideo(videos?.filter((item: IVideo) => item?.id === video)[0]);
    }
  }, [video]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef?.current?.load();
    }
    // Event listener to track time updates
    const handleTimeUpdate = () => {
      if (videoRef?.current) {
        setDuration(videoRef?.current.currentTime);
        // Save current duration in sessionStorage
        sessionStorage.setItem(
          "lastVideoDuration",
          videoRef?.current?.currentTime.toString()
        );
      }
    };

    if (videoRef?.current) {
      videoRef?.current.addEventListener("timeupdate", handleTimeUpdate);

      // Retrieve last duration from sessionStorage on component mount
      const lastDuration = sessionStorage.getItem("lastVideoDuration");
      if (lastDuration) {
        setDuration(parseFloat(lastDuration));
        if (videoRef?.current) {
          videoRef.current.currentTime = parseFloat(lastDuration);
        }
      }
    }

    // Cleanup on component unmount
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [video, currentVideo]);

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener("keydown", handleSpacebar);
    document.addEventListener("keydown", handleArrowRight);
    document.addEventListener("keydown", handleArrowLeft);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleSpacebar);
      document.removeEventListener("keydown", handleArrowRight);
      document.removeEventListener("keydown", handleArrowLeft);
    };
  }, [playing]);

  const handleSpacebar = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      togglePlayPause();
    }
  };

  const handleArrowRight = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      seek(5);
    }
  };

  const handleArrowLeft = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      seek(-5);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (playing) {
        video.pause();
      } else {
        video.play();
      }
      setPlaying(!playing);
    }
  };

  const seek = (seconds: number) => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.currentTime += seconds;
    }
  };

  const handleVideoEnded = () => {
    setDuration(0);
    sessionStorage.removeItem("lastVideoDuration");

    const currentIndex = videos?.findIndex(
      (item: IVideo) => item?.id === currentVideo?.id
    );

    if (videos?.length - 1 === currentIndex) {
      return;
    } else {
      setcurrentVideo(videos[currentIndex + 1]);
    }
  };

  return (
    <div className="sm:w-full lg:w-2/3 mx-auto relative h-full">
      <video
        className="w-full rounded-lg top-0 right-0"
        controls
        preload="metadata"
        onEnded={handleVideoEnded}
        ref={videoRef}
        autoPlay
      >
        <source
          src={`${currentVideo?.sources[0]}#t=${duration}`}
          type="video/mp4"
        />
        <track
          src="_"
          kind={currentVideo?.subtitle}
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
      <h1 className="font-bold text-lg my-3">{currentVideo?.title}</h1>
      <p className="my-1">{currentVideo?.description}</p>
    </div>
  );
}

export default VideoPlayer;
