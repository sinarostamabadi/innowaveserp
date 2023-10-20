export const PaymentModel = {
  entity: "Payment",
  PaymentId: {
    type: "key|number",
    display: "PaymentId",
    sortable: true,
  },
  PaymentGuid: {
    type: "Guid",
    display: "PaymentGuid",
    sortable: true,
  },
  TransactionTypeId: {
    type: "number",
    display: "TransactionTypeId",
    sortable: true,
  },
  RequestDtlId: {
    type: "number",
    display: "RequestDtlId",
    sortable: true,
  },
  DocumentId: {
    type: "number",
    display: "DocumentId",
    sortable: true,
  },
  PaymentDate: {
    type: "DateTime",
    display: "PaymentDate",
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