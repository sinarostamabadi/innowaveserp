export const CostCenterModel = {
  entity: "CostCenter",
  CostCenterId: {
        type: "key|number",
        display: "CostCenterId",
        sortable: true,
      },
  Title: {
        type: "title|string",
        display: "Title",
        sortable: true,
      },
  Code: {
        type: "string",
        display: "Code",
        sortable: true,
      },
  ParentId: {
        type: "number",
        display: "ParentId",
        sortable: true,
      },
  Level: {
        type: "number",
        display: "Level",
        sortable: true,
      },
  };