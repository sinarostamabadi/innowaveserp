export const BuyRequestDetailModel = {
  BuyRequestDetailId: {
    type: "key|number",
    display: "BuyRequestDetailId",
    sortable: true,
  },
  BuyRequestId: {
    type: "number",
    display: "BuyRequestId",
    sortable: true,
  },
  ProductId: {
    type: "number",
    display: "ProductId",
    sortable: true,
  },
  ProductUnitId: {
    type: "number",
    display: "ProductUnitId",
    sortable: true,
  },
  Amount: {
    type: "number",
    display: "Amount",
    sortable: true,
  },
  ManagerAmount: {
    type: "number",
    display: "ManagerAmount",
    sortable: true,
  },
  MainWarehouseAmount: {
    type: "number",
    display: "MainWarehouseAmount",
    sortable: true,
  },
  ManagerDescription: {
    type: "string",
    display: "ManagerDescription",
    sortable: true,
  },
  CreationDate: {
    type: "DateTime",
    display: "CreationDate",
    sortable: true,
  },
};
