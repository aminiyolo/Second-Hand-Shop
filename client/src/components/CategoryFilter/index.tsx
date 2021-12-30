import { useCallback, useEffect, useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

type Category = {
  key: number;
  value: string;
};

interface IProps {
  Categories: Category[];
  categoryFilter: (updated: number[]) => void;
  clearCategory: boolean;
}

const CategoryFilter: React.VFC<IProps> = ({
  Categories,
  categoryFilter,
  clearCategory,
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const onToggle = useCallback(
    (key: number) => {
      // 선택된 것의 index number를 구한 뒤 인덱스 넘버가 이미 체크되어 있으면 삭제시키고 그렇지 않으면 추가해준다.
      const indexNum = selected.indexOf(key);
      const newSelected = [...selected];

      indexNum === -1 ? newSelected.push(key) : newSelected.splice(indexNum, 1);

      setSelected(newSelected);
      categoryFilter(newSelected);
    },
    [selected, categoryFilter],
  );

  useEffect(() => {
    setSelected([]); // 특정 내용 검색 시 선택된 카테고리 값 초기화 하기
  }, [clearCategory]);

  return (
    <div>
      <Collapse>
        <Panel key={1} header="카테고리로 찾기">
          {Categories &&
            Categories.map((category, index: number) => (
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
