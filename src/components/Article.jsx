import React from "react";
import { Link } from "react-router-dom";

const Article = () => {
  return (
    <Link to="/news/1" className="w-full sm:w-[300px]">
      <div className="w-full h-[150px] bg-primary"></div>
      <p className="px-[10px] mt-[5px] text-[1rem]">
        Meme tokens rise as bull market continues
      </p>
    </Link>
  );
};

export default Article;
