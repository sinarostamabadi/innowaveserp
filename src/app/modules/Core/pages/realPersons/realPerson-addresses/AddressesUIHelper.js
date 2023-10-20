export const defaultSorted = [{ dataField: "AddressId", order: "asc" }];
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
  sortField: "AddressFa",
  pageNumber: 1,
  pageSize: 10,
};

export const SPECIFICATIONS_DICTIONARY = [
  { AddressCategoryId: null, TitleFa: "بدون انتخاب" },
  { AddressCategoryId: 1, TitleFa: "منزل" },
  { AddressCategoryId: 2, TitleFa: "محل کار" },
];
