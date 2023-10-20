export const defaultSorted = [{ dataField: "BuyRequestId", order: "asc" }];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "50", value: 50 },
  { text: "100", value: 100 },
];
export const initialFilter = {
  filter: {
    value: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "BuyRequestNumber",
  pageNumber: 1,
  pageSize: 10,
};

export const MainWarehouseStatuses = [
  { id: "0", title: "ثبت شده" },
  { id: "1", title: "موجود در انبار و تامین شده" },
  { id: "2", title: "درخواست خرید" },
];

export const ManagerApproveStatuses = [
  { id: "0", title: "ثبت شده" },
  { id: "1", title: "تایید شده" },
  { id: "2", title: "رد شده" },
];
