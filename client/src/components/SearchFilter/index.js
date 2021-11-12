import React, { useState, useCallback } from "react";
import { Form, Input, Search } from "./style";

const SearchFilter = ({ searchFilter }) => {
  const [value, setValue] = useState("");

  const onSearch = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!value.trim()) return; // 검색 값 공백 시 검색 blocking
      searchFilter(value);
      setValue("");
    },
    [value, searchFilter]
  );

  return (
    <React.Fragment>
      <div>
        <Form onSubmit={onSubmit}>
          <Input
            placeholder="찾고자 하는 제품을 검색해보세요."
            value={value}
            onChange={onSearch}
          />
          <Search onClick={onSubmit} />
        </Form>
      </div>
    </React.Fragment>
  );
};

export default SearchFilter;
