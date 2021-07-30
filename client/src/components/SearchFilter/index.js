import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

const style = {
  width: "620px",
  outline: "none",
  position: "absolute",
  right: "24.5%",
  top: "42.5%",
};

const SearchFilter = () => {
  return (
    <React.Fragment>
      <Search placeholder="찾고자 하는 제품을 검색헤보세요." style={style} />
    </React.Fragment>
  );
};

export default SearchFilter;
