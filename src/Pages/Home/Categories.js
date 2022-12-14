import React, { useEffect, useState } from "react";
import Category from "./Category";

const Categories = () => {
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    fetch("https://popup-server-mdsajedulra.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);
  return (
    <div className="my-20">
      <h1 className="text-center my-10 text-4xl font-semibold">
        Categories to <span className="text-primary">Sell </span>
      </h1>
      <div className="grid gap-10 grid-cols-3 justify-items-center">
        {categories.map((category) => (
          <Category key={category._id} category={category}></Category>
        ))}
      </div>
    </div>
  );
};

export default Categories;
