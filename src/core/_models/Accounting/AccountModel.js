export const AccountModel = {
  entity: "Account",
  AccountId: {
    type: "key|number",
    display: "AccountId",
    sortable: true,
  },
  AccountUniqueId: {
    type: "Guid",
    display: "AccountUniqueId",
    sortable: true,
  },
  ParentId: {
    type: "number",
    display: "ParentId",
    sortable: true,
  },
  Code: {
    type: "string",
    display: "Code",
    sortable: true,
  },
  Title: {
    type: "title|string",
    display: "Title",
    sortable: true,
  },
  FullCode: {
    type: "string",
    display: "FullCode",
    sortable: true,
  },
  FullTitle: {
    type: "string",
    display: "FullTitle",
    sortable: true,
  },
  Level: {
    type: "number",
    display: "Level",
    sortable: true,
  },
  TarazSood: {
    type: "number",
    display: "TarazSood",
    sortable: true,
  },
  Active: {
    type: "boolean",
    display: "Active",
    sortable: true,
  },
  HasProject: {
    type: "boolean",
    display: "HasProject",
    sortable: true,
  },
  HasAccountFloating: {
    type: "boolean",
    display: "HasAccountFloating",
    sortable: true,
  },
  HasCostCenter: {
    type: "boolean",
    display: "HasCostCenter",
    sortable: true,
  },
  HasCurrency: {
    type: "boolean",
    display: "HasCurrency",
    sortable: true,
  },
  HasReference: {
    type: "boolean",
    display: "HasReference",
    sortable: true,
  },
  AccountTypeId: {
    type: "number",
    display: "AccountTypeId",
    sortable: true,
  },
  HasContract: {
    type: "boolean",
    display: "HasContract",
    sortable: true,
  },
  StartYearId: {
    type: "number",
    display: "StartYearId",
    sortable: true,
  },
  ModifiedDate: {
    type: "DateTime",
    display: "ModifiedDate",
    sortable: true,
  },
  };