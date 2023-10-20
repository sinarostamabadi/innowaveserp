export const BodyBuildingContractModel = {
  BodyBuildingContractId: {
    type: "key|number",
    display: "BodyBuildingContractId",
    sortable: true,
  },
  PersonId: {
    type: "number|title",
    display: "PersonId",
    sortable: true,
  },
  Weight: {
    type: "number",
    display: "Weight",
    sortable: true,
  },
  Height: {
    type: "string",
    display: "Height",
    sortable: true,
  },
  BloodGroup: {
    type: "enum",
    display: "BloodGroup",
    sortable: true,
  },
  SensorInfo: {
    type: "string",
    display: "SensorInfo",
    sortable: true,
  },
  FromDate: {
    type: "Date",
    display: "FromDate",
    sortable: true,
  },
  ToDate: {
    type: "Date",
    display: "ToDate",
    sortable: true,
  },
};
