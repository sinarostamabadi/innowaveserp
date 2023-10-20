export const defaultSorted = [{ dataField: "ChequeBookId", order: "asc" }];
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
  sortField: "PhoneNumber",
  pageNumber: 1,
  pageSize: 10,
};

export const SPECIFICATIONS_DICTIONARY = [
  { ChequePaperTypeId: null, TitleFa: "بدون انتخاب" },
  { ChequePaperTypeId: 1, TitleFa: "موبایل" },
  { ChequePaperTypeId: 2, TitleFa: "منزل" },
  { ChequePaperTypeId: 3, TitleFa: "محل کار" },
];
