
export const RestaurantMenuItemModel = {
  RestaurantMenuItemId: {
    type: "key|number",
    display: "RestaurantMenuItemId",
    sortable: true,
  },
  RestaurantId: {
    type: "number",
    display: "RestaurantId",
    sortable: true,
  },
  RestaurantMenuGroupId: {
    type: "number",
    display: "RestaurantMenuGroupId",
    sortable: true,
  },
  PlaceOfPreparationId: {
    type: "number",
    display: "PlaceOfPreparationId",
    sortable: true,
  },
  NameFa: {
    type: "title|string",
    display: "NameFa",
    sortable: true,
  },
  NameEn: {
    type: "string",
    display: "NameEn",
    sortable: true,
  },
  PrepTime: {
    type: "TimeSpan",
    display: "PrepTime",
    sortable: true,
  },
  CookTime: {
    type: "TimeSpan",
    display: "CookTime",
    sortable: true,
  },
  WaitTime: {
    type: "TimeSpan",
    display: "WaitTime",
    sortable: true,
  },
  IsAccepted: {
    type: "boolean",
    display: "IsAccepted",
    sortable: true,
  },
  AcceptedDate: {
    type: "DateTime",
    display: "AcceptedDate",
    sortable: true,
  },
  AttachmentId: {
    type: "number",
    display: "AttachmentId",
    sortable: true,
  },
  Barcode: {
    type: "string",
    display: "Barcode",
    sortable: true,
  },
};