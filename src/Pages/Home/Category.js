import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
  return (
    <div className="bg-white rounded-md">
      <Link to={`/category/${category.category}`}>
        {" "}
        <img className="w-full" src={category.img} alt="" />
      </Link>
    </div>
  );
};

export default Category;
