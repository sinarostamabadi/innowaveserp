import React from "react";

function SelectionCheckbox({ isSelected, onChange }) {
  return (
    <>
      <input type="checkbox" style={{ display: "none" }} />
      <label className="checkbox checkbox-single">
        <input type="checkbox" checked={isSelected} onChange={onChange} />
        <span />
      </label>
    </>
  );
}

function groupingItemOnSelect(props) {
  const { ids, setIds, entityId } = props;
  if (ids.some((id) => id === entityId)) {
    setIds(ids.filter((id) => id !== entityId));
  } else {
    const newIds = [...ids];
    newIds.push(entityId);
    setIds(newIds);
  }
}

function groupingAllOnSelect(props) {
  const { isSelected, setIds, entities, keyField } = props;
  if (!isSelected) {
    const allIds = [];
    entities.forEach((el) => allIds.push(el[keyField]));
    setIds(allIds);
  } else {
    setIds([]);
  }

  return isSelected;
}

// check official documentations: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Row%20Selection&selectedStory=Custom%20Selection%20Column%20Header%20Style&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
export function getSelectRow(props) {
  const { entities, ids, setIds, keyField } = props;
  return {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectAll: false,
    selectionHeaderRenderer: () => {
      const isSelected =
        entities && entities.length > 0 && entities.length === ids.length;
      const props = { isSelected, entities, setIds, keyField };
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => groupingAllOnSelect(props)}
        />
      );
    },
    selectionRenderer: ({ rowIndex }) => {
      const isSelected = ids.some((el) => el === entities[rowIndex][keyField]);
      const props = { ids, setIds, entityId: entities[rowIndex][keyField] };
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => groupingItemOnSelect(props)}
        />
      );
    },
  };
}
