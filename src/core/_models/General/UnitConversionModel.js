export const UnitConversionModel = {
  UnitConversionId: {
    type: "key|number",
    display: "UnitConversionId",
    sortable: true,
  },
  BaseUnitId: {
    type: "number",
    display: "BaseUnitId",
    sortable: true,
  },
  ConvertedUnitId: {
    type: "number",
    display: "ConvertedUnitId",
    sortable: true,
  },
  Amount: {
    type: "title|number",
    display: "Amount",
    sortable: true,
  },
};
