import { BowlingCompetitionGroupModel } from "./BowlingCompetitionGroupModel";
import { ReserveModel } from "./ReserveModel";

export const BowlingCompetitionGroupTeamModel = {
  entity: "BowlingCompetitionGroupTeam",
  BowlingCompetitionGroupTeamId: {
    type: "key|number",
    display: "BowlingCompetitionGroupTeamId",
    sortable: true,
  },
  BowlingCompetitionGroupId: {
    type: "number",
    display: "BowlingCompetitionGroupId",
    sortable: true,
  },
  BowlingCompetitionGroup: { ...BowlingCompetitionGroupModel, type: "ref", display: "BowlingCompetitionGroup" },
  ReserveId: {
    type: "number",
    display: "ReserveId",
    sortable: true,
  },
  Reserve: { ...ReserveModel, type: "ref", display: "Reserve" },
  Score: {
    type: "title|number",
    display: "Score",
    sortable: true,
  },
};