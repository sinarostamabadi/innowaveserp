export const PosTransactionModel = {
  entity: "PosTransaction",
  PosTransactionId: {
    type: "key|number",
    display: "PosTransactionId",
    sortable: true,
  },
  PosTransactionGuid: {
    type: "Guid",
    display: "PosTransactionGuid",
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
  PosId: {
    type: "number",
    display: "PosId",
    sortable: true,
  },
  TransactionNo: {
    type: "title|string",
    display: "TransactionNo",
    sortable: true,
  },
  TransactionDate: {
    type: "string",
    display: "TransactionDate",
    sortable: true,
  },
  BankAccountId: {
    type: "number",
    display: "BankAccountId",
    sortable: true,
  },
  Price: {
    type: "price|number",
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
  