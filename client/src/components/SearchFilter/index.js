import React, { useState, useCallback } from "react";
import { Input } from "antd";
import { SearchStyle, Form } from "./style";

const { Search } = Input;

const SearchFilter = ({ searchFilter }) => {
  const [value, setValue] = useState("");

  const onSearch = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      searchFilter(value);
      setValue("");
    },
    [value, searchFilter]
  );

  return (
    <React.Fragment>
      <div>
        <Form onSubmit={onSubmit}>
          <Search
            placeholder="찾고자 하는 제품을 검색해보세요."
            value={value}
            onChange={onSearch}
            style={SearchStyle}
          />
        </Form>
      </div>
    </React.Fragment>
  );
};

export default SearchFilter;
