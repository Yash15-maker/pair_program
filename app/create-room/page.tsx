import React from "react";
import FormCreate from "./Form";

const page = () => {
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-8">
      <span className="xl:text-4xl lg:text-2xl md:text-xl text-base">
        Create room
      </span>
      <FormCreate />
    </div>
  );
};

export default page;
