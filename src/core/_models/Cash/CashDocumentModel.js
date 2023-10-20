import { PersonModel } from "../Core/PersonModel";
import { CashModel } from "../General/CashModel";
import { CashTransactionTypeModel } from "./CashTransactionTypeModel";

export const CashDocumentModel = {
  entity: "CashDocument",
  CashDocumentId: {
    type: "key|number",
    display: "CashDocumentId",
    sortable: true,
  },
  DocumentNo: {
    type: "title|number",
    display: "DocumentNo",
    sortable: true,
  },
  TransactionTypeId: {
    type: "number",
    display: "TransactionTypeId",
    sortable: true,
  },
  DocumentDate: {
    type: "DateTime",
    display: "DocumentDate",
    sortable: true,
  },
  PersonId: {
    type: "number",
    display: "PersonId",
    sortable: true,
  },
  CashId: {
    type: "number",
    display: "CashId",
    sortable: true,
  },
  Description: {
    type: "string",
    display: "Description",
    sortable: true,
  },
  NoNeedAcc: {
    type: "boolean",
    display: "NoNeedAcc",
    sortable: true,
  },
  ContractNumber: {
    type: "string",
    display: "ContractNumber",
    sortable: true,
  },
  Added: {
    type: "number",
    display: "Added",
    sortable: true,
  },
  Deficit: {
    type: "number",
    display: "Deficit",
    sortable: true,
  },
  AccDocumentId: {
    type: "number",
    display: "AccDocumentId",
    sortable: true,
  },
  Person: {...PersonModel, type: "ref", display: "Person"},
  Cash: {...CashModel, type: "ref", display: "Cash"},
  CashTransactionType: {...CashTransactionTypeModel, type: "ref", display: "CashTransactionType"},
  };
  