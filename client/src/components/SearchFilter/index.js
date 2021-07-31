import React, { useState } from "react";
import { Input } from "antd";
import { SearchStyle } from "./style";

const { Search } = Input;

const SearchFilter = ({ searchFilter }) => {
  const [value, setValue] = useState("");

  const onSearch = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchFilter(value);
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <Search
          placeholder="찾고자 하는 제품을 검색헤보세요."
          value={value}
          onChange={onSearch}
          style={SearchStyle}
        />
      </form>
    </React.Fragment>
  );
};

export default SearchFilter;
