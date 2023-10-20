export const AssignmentModel = {
  AssignmentId: {
    type: "key|number",
    display: "AssignmentId",
    sortable: true,
  },
  WarehouseId: {
    type: "number",
    display: "WarehouseId",
    sortable: true,
  },
  AssignmentNo: {
    type: "string",
    display: "AssignmentNo",
    sortable: true,
  },
  AssignmentDate: {
    type: "title|DateTime",
    display: "AssignmentDate",
    sortable: true,
  },
  Des: {
    type: "string",
    display: "Des",
    sortable: true,
  },
  PersonId: {
    type: "number",
    display: "PersonId",
    sortable: true,
  },
  YearId: {
    type: "number",
    display: "YearId",
    sortable: true,
  },
  AssignmentTypeId: {
    type: "number",
    display: "AssignmentTypeId",
    sortable: true,
  },
  Archive: {
    type: "boolean",
    display: "Archive",
    sortable: true,
  },
  CreatorPersonId: {
    type: "number",
    display: "CreatorPersonId",
    sortable: true,
  },
  ModifierPersonId: {
    type: "number",
    display: "ModifierPersonId",
    sortable: true,
  },
};
