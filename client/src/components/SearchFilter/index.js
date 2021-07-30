import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

const style = {
  width: 225,
  position: "absolute",
  right: "40%",
  top: "30%",
};

const SearchFilter = () => {
  return (
    <React.Fragment>
      <Search placeholder="Search the category" style={style} />
    </React.Fragment>
  );
};

export default SearchFilter;
