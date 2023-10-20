export const ReserveModel = {
  entity: "Reserve",
  ReserveId: {
    type: "key|number",
    display: "ReserveId",
    sortable: true,
  },
  LineId: {
    type: "number",
    display: "LineId",
    sortable: true,
  },
  ReserveDate: {
    type: "title|DateTime",
    display: "ReserveDate",
    sortable: true,
  },
  PersonId: {
    type: "number",
    display: "PersonId",
    sortable: true,
  },
  PersonCount: {
    type: "number",
    display: "PersonCount",
    sortable: true,
  },
  FromTime: {
    type: "TimeSpan",
    display: "FromTime",
    sortable: true,
  },
  ToTime: {
    type: "TimeSpan",
    display: "ToTime",
    sortable: true,
  },
  ClosetNumber: {
    type: "number",
    display: "ClosetNumber",
    sortable: true,
  },
  IsSet: {
    type: "boolean",
    display: "IsSet",
    sortable: true,
  },
  UserId: {
    type: "number",
    display: "UserId",
    sortable: true,
  },
  TimePriceId: {
    type: "number",
    display: "TimePriceId",
    sortable: true,
  },
  SetPriceId: {
    type: "number",
    display: "SetPriceId",
    sortable: true,
  },
  DiscountId: {
    type: "number",
    display: "DiscountId",
    sortable: true,
  },
  PayablePrice: {
    type: "number",
    display: "PayablePrice",
    sortable: true,
  },
};
