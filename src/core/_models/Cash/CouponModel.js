import { UseLocationModel } from "../Cash/UseLocationModel";

export const CouponModel = {
  entity: "Coupon",
  CouponId: {
    type: "key|number",
    display: "CouponId",
    sortable: true,
  },
  CouponNumber: {
    type: "title|string",
    display: "CouponNumber",
    sortable: true,
  },
  Price: {
    type: "number",
    display: "Price",
    sortable: true,
  },
  IsUsed: {
    type: "boolean",
    display: "IsUsed",
    sortable: true,
  },
  UseLocationId: {
    type: "number",
    display: "UseLocationId",
    sortable: true,
  },
  UseLocation: {...UseLocationModel, type: "ref", display: "UseLocation"},
};