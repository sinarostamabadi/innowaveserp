export const SellDocumentModel = {
  SellDocumentId: {
    type: "key|number",
    display: "SellDocumentId",
    sortable: true,
    searchable: true
  },
  SellDocumentDate: {
    type: "title|DateTime",
    display: "SellDocumentDate",
    sortable: true,
  },
  PersonId: {
    type: "number",
    display: "PersonId",
    sortable: true,
  },
  IsTemp: {
    type: "Boolean",
    display: "IsTemp",
    sortable: true,
  },
  SettlementTypeId: {
    type: "number",
    display: "SettlementTypeId",
    sortable: true,
  },
  Price: {
    type: "number",
    display: "Price",
    sortable: true,
  },
  DiscountPrice: {
    type: "number",
    display: "DiscountPrice",
    sortable: true,
  },
  PayablePrice: {
    type: "number",
    display: "PayablePrice",
    sortable: true,
  },
  PaymentTrackingCode: {
    type: "string",
    display: "PaymentTrackingCode",
    sortable: true,
  },
  PaymentInfo: {
    type: "string",
    display: "PaymentInfo",
    sortable: true,
  },
  Description: {
    type: "string",
    display: "Description",
    sortable: true,
  },
};
