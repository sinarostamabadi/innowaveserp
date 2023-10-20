import { PersonModel } from "../Core/PersonModel";
import { EntityTypeModel } from "../General/EntityTypeModel";
import { SettlementModel } from "../Cash/SettlementModel";
import { PosModel } from "../General/PosModel";

export const TakeAwayRequestModel = {
  entity: "TakeAwayRequest",
  TakeAwayRequestId: { type: "key|number", display: "TakeAwayRequestId", sortable: true },
  PersonId: { type: "number", display: "PersonId", sortable: true },
  Person: { ...PersonModel, type: "ref", display: "Person" },
  EntityTypeId: { type: "number", display: "EntityTypeId", sortable: true },
  EntityType: { ...EntityTypeModel, type: "ref", display: "EntityType" },
  Description: { type: "string", display: "Description", sortable: true },
  SettlementId: { type: "number", display: "SettlementId", sortable: true },
  Settlement: { ...SettlementModel, type: "ref", display: "Settlement" },
  PosId: { type: "number", display: "PosId", sortable: true },
  Pos: { ...PosModel, type: "ref", display: "Pos" },
  Price: { type: "number", display: "Price", sortable: true },
  CostPrice: { type: "number", display: "CostPrice", sortable: true },
  PayablePrice: { type: "number", display: "PayablePrice", sortable: true },
  IsCanceled: { type: "boolean", display: "IsCanceled", sortable: true },
  AccountingDocumentId: { type: "number", display: "AccountingDocumentId", sortable: true },
  CanceledAccountingDocumentId: { type: "number", display: "CanceledAccountingDocumentId", sortable: true }
};
