export const defaultSorted = [
  { dataField: "RelationPersonGroupId", order: "asc" },
];
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
  sortField: "RelationPersonGroupNumber",
  pageNumber: 1,
  pageSize: 10,
};

export const SPECIFICATIONS_DICTIONARY = [
  { PersonGroupId: null, TitleFa: "بدون انتخاب" },
  { PersonGroupId: 1, TitleFa: "موبایل" },
  { PersonGroupId: 2, TitleFa: "منزل" },
  { PersonGroupId: 3, TitleFa: "محل کار" },
];
