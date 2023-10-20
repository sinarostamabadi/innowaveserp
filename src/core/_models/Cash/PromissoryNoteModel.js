export const PromissoryNoteModel = {
  entity:"PromissoryNote",
  PromissoryNoteId: {
    type: "key|number",
    display: "PromissoryNoteId",
    sortable: true,
  },
  PromissoryNoteGuid: {
    type: "Guid",
    display: "PromissoryNoteGuid",
    sortable: true,
  },
  TransactionTypeId: {
    type: "number",
    display: "TransactionTypeId",
    sortable: true,
  },
  DocumentId: {
    type: "number",
    display: "DocumentId",
    sortable: true,
  },
  RequestDtlId: {
    type: "number",
    display: "RequestDtlId",
    sortable: true,
  },
  PromissoryDate: {
    type: "DateTime",
    display: "PromissoryDate",
    sortable: true,
  },
  PromissoryNumber: {
    type: "string",
    display: "PromissoryNumber",
    sortable: true,
  },
  Price: {
    type: "number",
    display: "Price",
    sortable: true,
  },
  CurrencyTypeId: {
    type: "number",
    display: "CurrencyTypeId",
    sortable: true,
  },
  CurrencyRate: {
    type: "number",
    display: "CurrencyRate",
    sortable: true,
  },
  CurrencyPrice: {
    type: "number",
    display: "CurrencyPrice",
    sortable: true,
  },
  MaxPrice: {
    type: "number",
    display: "MaxPrice",
    sortable: true,
  },
  EquivalentCurrencyTypeId: {
    type: "number",
    display: "EquivalentCurrencyTypeId",
    sortable: true,
  },
  EquivalentCurrencyPrice: {
    type: "number",
    display: "EquivalentCurrencyPrice",
    sortable: true,
  },
  Description: {
    type: "string",
    display: "Description",
    sortable: true,
  },
};
