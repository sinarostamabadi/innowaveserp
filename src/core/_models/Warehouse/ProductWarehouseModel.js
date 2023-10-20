export const ProductWarehouseModel = {
  ProductWarehouseId: {
    type: "key|number",
    display: "",
    sortable: true,
  },
  ProductId: {
    type: "number",
    display: "",
    sortable: true,
  },
  WarehouseId: {
    type: "number",
    display: "",
    sortable: true,
  },
  MinStock: {
    type: "number",
    display: "MinStock",
    sortable: true,
  },
  MaxStock: {
    type: "number",
    display: "MaxStock",
    sortable: true,
  },
  OrderPoint: {
    type: "number",
    display: "OrderPoint",
    sortable: true,
  },
};
