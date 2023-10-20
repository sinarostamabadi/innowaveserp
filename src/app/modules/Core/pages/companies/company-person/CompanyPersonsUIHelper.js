export const defaultSorted = [{ dataField: "CompanyPersonId", order: "asc" }];
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
  sortField: "CompanyPersonNumber",
  pageNumber: 1,
  pageSize: 10,
};

export const SPECIFICATIONS_DICTIONARY = [
  { CompanyPersonId: null, TitleFa: "بدون انتخاب" },
  { CompanyPersonId: 1, TitleFa: "موبایل" },
  { CompanyPersonId: 2, TitleFa: "منزل" },
  { CompanyPersonId: 3, TitleFa: "محل کار" },
];
