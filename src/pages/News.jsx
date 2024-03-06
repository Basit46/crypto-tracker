import React from "react";
import Article from "../components/Article";

const News = () => {
  return (
    <div>
      <h1 className="text-[3rem] font-semibold">Latest Crypto News</h1>

      <div className="mt-[20px] flex flex-wrap gap-[20px]">
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
    </div>
  );
};

export default News;
