import { AccountFloatingModel } from "../Accounting/AccountFloatingModel";

export const CashModel = {
  entity: "Cash",
  CashId: {
    type: "key|number",
    display: "CashId",
    sortable: true,
  },
  Title: {
    type: "title|string",
    display: "Title",
    sortable: true,
  },
  AccountFloating: {...AccountFloatingModel, type: "ref", display: "AccountFloating"},
  };