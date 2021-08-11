import React, { useState, useCallback } from "react";
import { Input } from "antd";
import { SearchStyle } from "./style";

const { Search } = Input;

const SearchFilter = ({ searchFilter, checkSearch }) => {
  const [value, setValue] = useState("");

  const onSearch = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      searchFilter(value);
      checkSearch(value);
      setValue("");
    },
    [value, searchFilter, checkSearch]
  );

  return (
    <React.Fragment>
      <div>
        <form style={{ textAlign: "center" }} onSubmit={onSubmit}>
          <Search
            placeholder="찾고자 하는 제품을 검색해보세요."
            value={value}
            onChange={onSearch}
            style={SearchStyle}
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default SearchFilter;
