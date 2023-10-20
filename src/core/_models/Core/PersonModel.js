export const PersonModel = {
  entity: "Person",
  PersonId: {
    type: "key|number",
    display: "PersonId",
    sortable: true,
  },
  Email: {
    type: "string",
    display: "Email",
    sortable: true,
  },
  WebSite: {
    type: "string",
    display: "WebSite",
    sortable: true,
  },
  Mobile: {
    type: "string",
    display: "Mobile",
    sortable: true,
  },
  FullNameFa: {
    type: "title|string",
    display: "FullNameFa",
    sortable: true,
  },
  FullNameEn: {
    type: "string",
    display: "FullNameEn",
    sortable: true,
  },
  AccountFloatingId: {
    type: "number",
    display: "AccountFloatingId",
    sortable: true,
  },
  IsDefault: {
    type: "boolean",
    display: "IsDefault",
    sortable: true,
  },
};
