export const SellDiscountModel = {
  SellDiscountId: {
    type: "key|number",
    display: "SellDiscountId",
    sortable: true,
  },
  IsActive: { type: "Boolean", display: "IsActive", sortable: true },
  SellDiscountNumber: {
    type: "number",
    display: "SellDiscountNumber",
    sortable: true,
  },
  RegisterDate: { type: "DateTime", display: "RegisterDate", sortable: true },
  Title: { type: "title|string", display: "Title", sortable: true },
  FromDate: { type: "DateTime", display: "FromDate", sortable: true },
  ToDate: { type: "DateTime", display: "ToDate", sortable: true },
  FromTime: { type: "DateTime", display: "FromTime", sortable: true },
  ToTime: { type: "DateTime", display: "ToTime", sortable: true },
  PersonGroupId: { type: "number", display: "PersonGroupId", sortable: true },
  PersonId: { type: "number", display: "PersonId", sortable: true },
  HasProduct: { type: "Boolean", display: "HasProduct", sortable: true },
  FromYearsOld: { type: "number", display: "FromYearsOld", sortable: true },
  ToYearsOld: { type: "number", display: "ToYearsOld", sortable: true },
  Sex: { type: "number", display: "Sex", sortable: true },
  RewardProductId: {
    type: "number",
    display: "RewardProductId",
    sortable: true,
  },
  RewardProductUnitId: {
    type: "number",
    display: "RewardProductUnitId",
    sortable: true,
  },
};
