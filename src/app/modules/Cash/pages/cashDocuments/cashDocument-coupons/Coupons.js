import React from "react";
import { CouponsFilter } from "./CouponsFilter";
import { CouponsTable } from "./CouponsTable";
import { CouponsLoadingDialog } from "./CouponsLoadingDialog";
import { CouponDeleteDialog } from "./CouponDeleteDialog";
import { CouponEditDialog } from "./coupon-edit-dialog/CouponEditDialog";

export function Coupons() {
  return (
    <div className="mt-5">
      <CouponsLoadingDialog />
      <CouponEditDialog />
      <CouponDeleteDialog />
      <div className="form margin-b-30">
        <CouponsFilter />
      </div>
      <CouponsTable />
    </div>
  );
}
