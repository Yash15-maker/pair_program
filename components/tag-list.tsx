import React from "react";
import { tagsLanguage } from "../app/interface/tag";
import { Badge } from "@/components/ui/badge";

export default function TagList({ tagLanguage }: tagsLanguage) {
  return (
    <div className="flex gap-2 flex-wrap py-2">
      {tagLanguage.map((tag) => {
        return (
          <Badge
            className=" cursor-pointer w-fit hover:text-white hover:bg-gray-600  bg-black text-white dark:bg-gray-400 "
            variant={"default"}
            key={tag}
          >
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}
