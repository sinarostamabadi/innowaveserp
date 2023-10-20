export const RestaurantInvoiceModel = {
  RestaurantInvoiceId: {
    type: "key|number",
    display: "RestaurantInvoiceId",
    sortable: true,
  },
  RestaurantId: {
    type: "number",
    display: "RestaurantId",
    sortable: true,
  },
  RestaurantTableId: {
    type: "number",
    display: "RestaurantTableId",
    sortable: true,
  },
  RestaurantInvoiceStatusId: {
    type: "number",
    display: "RestaurantInvoiceStatusId",
    sortable: true,
  },
  SettlementId: {
    type: "number",
    display: "SettlementId",
    sortable: true,
  },
  InvoiceNumber: {
    type: "title|number",
    display: "InvoiceNumber",
    sortable: true,
  },
  InvoiceDate: {
    type: "DateTime",
    display: "InvoiceDate",
    sortable: true,
  },
  InvoicePrice: {
    type: "number",
    display: "InvoicePrice",
    sortable: true,
  },
  PersonId: {
    type: "number",
    display: "PersonId",
    sortable: true,
  },
  CreationById: {
    type: "number",
    display: "CreationById",
    sortable: true,
  },
};
