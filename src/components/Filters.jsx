import React from "react";

const Filters = () => {
  return (
    <div className=" m-5">
      <button className="w-20 h-20 px-6 py-8 bg-white rounded-2xl justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-secondDash" >
        <div className="text-zinc-500 text-xs font-normal">Filters</div>
      </button>
    </div>
  );
};

export default Filters;
