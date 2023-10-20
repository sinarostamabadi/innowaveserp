import { BankModel } from "../General/BankModel";
import { BankAccountModel } from "../Core/BankAccountModel";

export const PosModel = {
  entity: "Pos",
  PosId: {
    type: "key|number",
    display: "PosId",
    sortable: true,
  },
  BankId: {
    type: "number",
    display: "BankId",
    sortable: true,
  },
  Bank: {...BankModel, type: "ref", display: "Bank"},
  SerialNo: {
    type: "title|string",
    display: "SerialNo",
    sortable: true,
  },
  DefaultBankAccountId: {
    type: "number",
    display: "DefaultBankAccountId",
    sortable: true,
  },
  DefaultBankAccount: {...BankAccountModel, type: "ref", display: "DefaultBankAccount"},
  PosIpAddress: {
    type: "string",
    display: "PosIpAddress",
    sortable: true,
  },
  TerminalId: {
    type: "string",
    display: "TerminalId",
    sortable: true,
  },
};
