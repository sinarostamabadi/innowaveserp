export const YearModel = {
  entity: "Year",
  YearId: {
    type: "key|number",
    display: "YearId",
    sortable: true,
      },
  Title: {
    type: "title|string",
    display: "Title",
    sortable: true,
      },
  FromDate: {
    type: "DateTime",
    display: "FromDate",
    sortable: true,
      },
  ToDate: {
    type: "DateTime",
    display: "ToDate",
    sortable: true,
      },
  };