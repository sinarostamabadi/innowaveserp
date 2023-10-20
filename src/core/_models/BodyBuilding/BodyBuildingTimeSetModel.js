export const BodyBuildingTimeSetModel = {
  BodyBuildingTimeSetId: {
    type: "key|number",
    display: "BodyBuildingTimeSetId",
    sortable: true,
  },
  Title: {
    type: "title|string",
    display: "Title",
    sortable: true,
  },
  DayId: {
    type: "number",
    display: "DayId",
    sortable: true,
  },
  FromTime: {
    type: "Time",
    display: "FromTime",
    sortable: true,
  },
  ToTime: {
    type: "Time",
    display: "ToTime",
    sortable: true,
  },
  Gender: {
    type: "enum",
    display: "Gender",
    sortable: true,
  },
};
