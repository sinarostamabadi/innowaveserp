import React from "react";
import { Route } from "react-router-dom";
import { CouponsLoadingDialog } from "./coupons-loading-dialog/CouponsLoadingDialog";
import { CouponDeleteDialog } from "./coupon-delete-dialog/CouponDeleteDialog";
import { CouponsCard } from "./CouponsCard";
import { CouponsUIProvider } from "./CouponsUIContext";

export function CouponsPage({ history }) {
  const couponsUIEvents = {
    newCouponButtonClick: () => {
      history.push("/cash/coupons/new");
    },
    openEditCouponPage: (id) => {
      history.push(`/cash/coupons/${id}/edit`);
    },
    openDeleteCouponDialog: (id) => {
      history.push(`/cash/coupons/${id}/delete`);
    },
    openDeleteCouponsDialog: () => {
      history.push(`/cash/coupons/deleteCoupons`);
    },
    openFetchCouponsDialog: () => {
      history.push(`/cash/coupons/fetch`);
    },
    openUpdateCouponsStatusDialog: () => {
      history.push("/cash/coupons/updateStatus");
    },
  };

  return (
    <CouponsUIProvider couponsUIEvents={couponsUIEvents}>
      <CouponsLoadingDialog />
      <Route path="/cash/coupons/:id/delete">
        {({ history, match }) => (
          <CouponDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/coupons");
            }}
          />
        )}
      </Route>
      <CouponsCard />
    </CouponsUIProvider>
  );
}
