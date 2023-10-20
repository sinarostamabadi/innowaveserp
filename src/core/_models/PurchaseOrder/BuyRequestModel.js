export const BuyRequestModel = {
  BuyRequestId: {
    type: "key|number",
    display: "BuyRequestId",
    sortable: true,
  },
  BuyRequestDate: {
    type: "title|DateTime",
    display: "BuyRequestDate",
    sortable: true,
  },
  WarehouseId: {
    type: "number",
    display: "WarehouseId",
    sortable: true,
  },
  BuyRequestStatusId: {
    type: "number",
    display: "BuyRequestStatusId",
    sortable: true,
  },
  Description: {
    type: "string",
    display: "Description",
    sortable: true,
  },
  CreateBy: {
    type: "number",
    display: "CreateBy",
    sortable: true,
  }
};
