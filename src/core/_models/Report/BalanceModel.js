export const BalanceModel = {
  Title: {
    type: "key|string",
    display: "Date", // عنوان
    sortable: true,
  },
  GroupByTitle: {
    type: "string",
    display: "GroupByTitle",
    sortable: true,
  },
  Code: {
    type: "string",
    display: "Code",
    sortable: true,
  },
  Code_int: {
    type: "number",
    display: "Code_int",
    sortable: true,
  },
  AccountId: {
    type: "number",
    display: "AccountId",
    sortable: true,
  },
  AccountFloatingId: {
    type: "number",
    display: "AccountFloatingId",
    sortable: true,
  },
  SumBed_TaDore: {
    type: "number",
    display: "SumBed_TaDore", //گردش بدهکاری قبل از دور
    sortable: true,
  },
  SumBes_TaDore: {
    type: "string",
    display: "SumBes_TaDore", //گردش بستانکاری قبل از دوره
    sortable: true,
  },
  MandeBed_TaDore: {
    type: "number",
    display: "MandeBed_TaDore", //مانده بدهکاری تا دوره
    sortable: true,
  },
  MandeBes_TaDore: {
    type: "number",
    display: "MandeBes_TaDore", //گردش بدهکاری طی دوره
    sortable: true,
  },
  SumBed_Dore: {
    type: "number",
    display: "SumBed_Dore", //گردش بدهکاری طی دوره
    sortable: true,
  },
  MandeBed_Dore: {
    type: "number",
    display: "MandeBed_Dore", //گردش بدهکاری طی دوره
    sortable: true,
  },
  MandeBes_Dore: {
    type: "number",
    display: "MandeBes_Dore", //گردش بدهکاری طی دوره
    sortable: true,
  },
  MandeBed: {
    type: "number",
    display: "MandeBed", //گردش بدهکاری طی دوره
    sortable: true,
  },
  MandeBes: {
    type: "number",
    display: "MandeBes", //گردش بدهکاری طی دوره
    sortable: true,
  },
  GroupAccountId: {
    type: "number",
    display: "GroupAccountId", //شناسه حساب گروه
    sortable: true,
  },
  ColAccountId: {
    type: "number",
    display: "ColAccountId", //شناسه حساب کل
    sortable: true,
  },
  MoinAccountId: {
    type: "number",
    display: "MoinAccountId", //شناسه حساب معین
    sortable: true,
  },
  GroupTitle: {
    type: "number",
    display: "GroupTitle", //عنوان گروه
    sortable: true,
  },
  ColTitle: {
    type: "number",
    display: "GroupAccountId", //عنوان کل
    sortable: true,
  },
  MoinTitle: {
    type: "number",
    display: "MoinTitle", //عنوان معین
    sortable: true,
  },
  AccountFloatingTitle: {
    type: "number",
    display: "AccountFloatingTitle", //عنوان حساب تفضیلی
    sortable: true,
  },
  GroupByAccountId: {
    type: "number",
    display: "GroupByAccountId", //شناسه دسته بندی براساس حساب
    sortable: true,
  },
  SumBed: {
    type: "number",
    display: "SumBed", //گردش بدهکاری
    sortable: true,
  },
  SumBes: {
    type: "number",
    display: "SumBes", //گردش بستاتکاری
    sortable: true,
  },
  FullCode: {
    type: "number",
    display: "FullCode", //کد
    sortable: true,
  },
  FullTitle: {
    type: "number",
    display: "FullTitle", //عنوان
    sortable: true,
  },
  LevelTitle: {
    type: "number",
    display: "LevelTitle", //عنوان سطح
    sortable: true,
  },
  DocumentNo1: {
    type: "number",
    display: "DocumentNo1", //از سند
    sortable: true,
  },
  DocumentNo2: {
    type: "number",
    display: "DocumentNo2", //تا سند
    sortable: true,
  },
  LevelReport: {
    type: "number",
    display: "LevelReport", //سطح حساب
    sortable: true,
  },
  GroupCode: {
    type: "number",
    display: "GroupCode", //کد گروه
    sortable: true,
  },
  KolCode: {
    type: "number",
    display: "KolCode", //کد کل
    sortable: true,
  },
  MoienCode: {
    type: "number",
    display: "MoienCode", //کد معین
    sortable: true,
  },
};
