export const ReceiptModel = {
  ReceiptId: {
    type: "key|number",
    display: "ReceiptId",
    sortable: true,
  },
  WarehouseId: {
    type: "number",
    display: "WarehouseId",
    sortable: true,
  },
  ReceiptNo: {
    type: "string",
    display: "ReceiptNo",
    sortable: true,
  },
  ReceiptDate: {
    type: "title|DateTime",
    display: "ReceiptDate",
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
  ReceiptTypeId: {
    type: "number",
    display: "ReceiptTypeId",
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
