import { BankModel } from "../General/BankModel";
import { AccountFloatingModel } from "../Accounting/AccountFloatingModel";

export const BankAccountModel = {
  entity: "BankAccount",
  BankAccountId: {
    type: "key|number",
    display: "BankAccountId",
    sortable: true,
  },
  Title: {
    type: "title|string",
    display: "Title",
    sortable: true,
  },
  BankId: {
    type: "number",
    ref: "Bank",
    display: "BankId",
    sortable: true,
  },
  Bank: {...BankModel, type: "ref", display: "Bank"},
  AccountFloatingId: {
    type: "number",
    display: "AccountFloatingId",
    sortable: true,
  },
  AccountFloating: {...AccountFloatingModel, type: "ref", display: "AccountFloating"},
};
