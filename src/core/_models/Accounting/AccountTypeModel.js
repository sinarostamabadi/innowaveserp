export const AccountTypeModel = {
  entity: "AccountType",
  AccountTypeId: {
    type: "key|number",
    display: "AccountTypeId",
    sortable: true,
  },
  Title: {
    type: "title|string",
    display: "Title",
    sortable: true,
  },
  Level: {
    type: "number",
    display: "Level",
    sortable: true,
  },
  ParentId: {
    type: "number",
    display: "ParentId",
    sortable: true,
  },
};
