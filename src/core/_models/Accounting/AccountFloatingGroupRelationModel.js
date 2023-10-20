import { AccountFloatingModel } from "./AccountFloatingModel";
import { AccountFloatingGroupModel } from "./AccountFloatingGroupModel";

export const AccountFloatingGroupRelationModel = {
  entity: "AccountFloatingGroupRelation",
  AccountFloatingGroupRelationId: {
        type: "key|number",
        display: "AccountFloatingGroupRelationId",
        sortable: true,
      },
  AccountFloatingId: {
        type: "title|number",
        display: "AccountFloatingId",
        sortable: true,
      },
  AccountFloatingGroupId: {
        type: "number",
        display: "AccountFloatingGroupId",
        sortable: true,
      },
  AccountFloating: { ...AccountFloatingModel, type: "ref", display: "AccountFloating" },
  AccountFloatingGroup: { ...AccountFloatingGroupModel, type: "ref", display: "AccountFloatingGroup" },
  };
  