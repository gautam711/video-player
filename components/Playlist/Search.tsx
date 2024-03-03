import { filterItems } from "@/utils/data";
import React, { useContext, useEffect, useState } from "react";
import useDebounce from "../useDebounce";
import { VideoContext } from "@/features/VideoProvider";

function Search() {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedInput = useDebounce(inputValue, 500);

  const { originalVideoList, setVideos } = useContext(VideoContext);

  useEffect(() => {
    console.log("debounced", debouncedInput);
    handleFilter(debouncedInput);
  }, [debouncedInput]);

  const handleFilter = (value: string) => {
    console.log("value", value);
    if (inputValue === "") {
      setVideos(originalVideoList);
    } else {
      const filteredVideos = filterItems(originalVideoList, value);
      setVideos(filteredVideos);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  return (
    <div className="w-full mt-4">
      <input
        className="bg-zinc-900 w-full h-8 px-2 border-slate-400 text-sm"
        placeholder="Search"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
