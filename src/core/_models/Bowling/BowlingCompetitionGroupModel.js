import { BowlingCompetitionModel } from "./BowlingCompetitionModel";

export const BowlingCompetitionGroupModel = {
  entity: "BowlingCompetitionGroup",
  BowlingCompetitionGroupId: {
    type: "key|number",
    display: "BowlingCompetitionGroupId",
    sortable: true,
  },
  BowlingCompetitionId: {
    type: "number",
    display: "BowlingCompetitionId",
    sortable: true,
  },
  BowlingCompetition: { ...BowlingCompetitionModel, type: "ref", display: "BowlingCompetition" },
  Title: {
    type: "title|string",
    display: "Title",
    sortable: true,
  },
};