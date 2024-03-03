import { IVideo } from "@/utils/data";
import React from "react";

interface IListItemProps {
  video: IVideo;
  currentVideo: IVideo;
  index: number;
  handleChangeVideo: (video: IVideo) => void;
  handleSort: () => void;
  dragOverItem: React.MutableRefObject<number | null>;
  dragItem: React.MutableRefObject<number | null>;
}

const ListItem: React.FC<IListItemProps> = ({
  video,
  currentVideo,
  index,
  handleChangeVideo,
  handleSort,
  dragOverItem,
  dragItem,
}: IListItemProps) => {
  return (
    <div
      className={`flex gap-2 py-2 cursor-pointer ${
        currentVideo?.id === video?.id ? "bg-zinc-900" : "bg-black"
      } hover:bg-zinc-900`}
      key={video?.id}
      draggable
      onDragStart={(e) => {
        dragItem.current = index;
      }}
      onDragEnter={(e) => (dragOverItem.current = index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => handleChangeVideo(video)}
    >
      <img
        className="object-cover rounded min-w-32 min-h-16 max-w-32 max-h-16 flex items-start"
        src={video?.thumb}
        alt=""
      />
      <div>
        <div className="font-medium line-clamp-1">{video?.title}</div>
        <div className="text-xs font-light line-clamp-2">
          {video?.description}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
