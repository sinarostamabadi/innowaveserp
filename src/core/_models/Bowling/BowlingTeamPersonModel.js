import { BowlingTeamModel } from "./BowlingTeamModel"
import { PersonModel } from "./../Core/PersonModel"

export const BowlingTeamPersonModel = {
    entity: "BowlingTeamPerson",
    BowlingTeamPersonId: {
        type: "key|number",
        display: "BowlingTeamPersonId",
        sortable: true,
    },
    BowlingTeamId: {
        type: "number",
        display: "BowlingTeamId",
        sortable: true,
    },
    BowlingTeam: { ...BowlingTeamModel, type: "ref", display: "BowlingTeam" },
    PersonId: {
        type: "number",
        display: "PersonId",
        sortable: true,
    },
    Person: { ...PersonModel, type: "ref", display: "Person" },
};