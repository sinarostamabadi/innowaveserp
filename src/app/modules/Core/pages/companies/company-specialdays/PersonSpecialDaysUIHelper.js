export const defaultSorted = [{ dataField: "PersonSpecialDayId", order: "asc" }];
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
  sortField: "PersonSpecialDayDate",
  pageNumber: 1,
  pageSize: 10,
};

export const SPECIFICATIONS_DICTIONARY = [
  { SpecialDayTypeId: null, TitleFa: "بدون انتخاب" },
  { SpecialDayTypeId: 1, TitleFa: "روز تولد" },

];
