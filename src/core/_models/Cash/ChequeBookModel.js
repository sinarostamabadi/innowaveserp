import { BankAccountModel } from "../Core/BankAccountModel";

export const ChequeBookModel = {
  entity: "ChequeBook",
  ChequeBookId: {
    type: "key|number",
    display: "ChequeBookId",
    sortable: true,
  },
  BankAccountId: {
    type: "title|number",
    display: "BankAccountId",
    sortable: true,
  },
  Serial: {
    type: "number",
    display: "Serial",
    sortable: true,
  },
  Count: {
    type: "number",
    display: "Count",
    sortable: true,
  },
  Description: {
    type: "number",
    display: "Description",
    sortable: true,
  },
  ChequeBookStatus: {
    type: "number",
    display: "ChequeBookStatus",
    sortable: true,
  },
  BankAccount: {...BankAccountModel, type: "ref", display: "BankAccount"},
  };
  