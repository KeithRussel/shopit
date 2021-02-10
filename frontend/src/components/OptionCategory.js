import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OptionCategory = () => {
  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;
  return (
    <>
      {categories.map((category) => (
        <option value={`${category.name}`} key={category._id}>
          {category.name}
        </option>
      ))}
    </>
  );
};

export default OptionCategory;
