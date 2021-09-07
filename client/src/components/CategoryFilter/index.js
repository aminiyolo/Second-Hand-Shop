import { useEffect, useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CategoryFilter = ({ Categories, categoryFilter, clearCategory }) => {
  const [selected, setSelected] = useState([]);

  const onToggle = (key) => {
    // 선택된 것의 index number를 구한 뒤 인덱스 넘버가 이미 체크되어 있으면 삭제시키고 그렇지 않으면 추가해준다.
    const indexNum = selected.indexOf(key);
    const willBeUpdated = [...selected];

    if (indexNum === -1) {
      willBeUpdated.push(key);
    } else {
      willBeUpdated.splice(indexNum, 1);
    }
    setSelected(willBeUpdated);
    categoryFilter(willBeUpdated);
  };

  useEffect(() => {
    // 특정 내용 검색 시 선택된 카테고리 값 초기화 하기
    setSelected([]);
  }, [clearCategory]);

  return (
    <div>
      <Collapse>
        <Panel header="카테고리로 찾기">
          {Categories &&
            Categories.map((category, index) => (
              <Checkbox
                key={index}
                onChange={() => onToggle(category.key)}
                checked={selected.indexOf(category.key) === -1 ? false : true}
              >
                {category.value}
              </Checkbox>
            ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CategoryFilter;
