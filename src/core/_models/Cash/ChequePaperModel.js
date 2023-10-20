import { ChequeBookModel } from "../Cash/ChequeBookModel";

export const ChequePaperModel = {
  entity: "ChequePaper",
  ChequePaperId: {
    type: "key|number",
    display: "",
    sortable: true,
  },
  ChequeBookId: {
    type: "title|number",
    display: "ChequeBookId",
    sortable: true,
  },
  SerialNo: {
    type: "number",
    display: "SerialNo",
    sortable: true,
  },
  ChequePaperStatus: {
    type: "number",
    display: "ChequePaperStatus",
    sortable: true,
  },
  Description: {
    type: "string",
    display: "Description",
    sortable: true,
  },
  ChequeBook: {...ChequeBookModel, type: "ref", display: "ChequeBook"},
  };
  