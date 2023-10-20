export const defaultSorted = [{ dataField: "BuyReturnId", order: "asc" }];
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
  sortField: "BuyReturnNumber",
  pageNumber: 1,
  pageSize: 10,
};

export const SPECIFICATIONS_DICTIONARY = [
  { PhoneTypeId: null, TitleFa: "بدون انتخاب" },
  { PhoneTypeId: 1, TitleFa: "موبایل" },
  { PhoneTypeId: 2, TitleFa: "منزل" },
  { PhoneTypeId: 3, TitleFa: "محل کار" },
];
