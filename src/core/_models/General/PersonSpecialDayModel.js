export const PersonSpecialDayModel = {
  PersonSpecialDayId: {
    type: "key|number",
    display: "PersonSpecialDayId",
    sortable: true,
  },
  PersonId: {
    type: "number",
    display: "PersonId",
    sortable: true,
  },
  SpecialDayTypeId: {
    type: "number",
    display: "SpecialDayTypeId",
    sortable: true,
  },
  PersonSpecialDayDate: {
    type: "title|DateTime",
    display: "PersonSpecialDayDate",
    sortable: true,
  },
};
