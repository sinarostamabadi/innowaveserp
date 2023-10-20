import { BankAccountModel } from "../Core/BankAccountModel";

export const BankCardModel = {
  entity: "BankCard",
  BankCardId: {
    type: "key|number",
    display: "BankCardId",
    sortable: true,
  },
  Title: {
    type: "title|string",
    display: "Title",
    sortable: true,
  },
  CartNumber: {
    type: "string",
    display: "CartNumber",
    sortable: true,
  },
  BankAccountId: {
    type: "number",
    display: "BankAccountId",
    sortable: true,
  },
  BankAccount: {...BankAccountModel, type: "ref", display: "BankAccount"},
  };
  