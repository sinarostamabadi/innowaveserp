import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CouponEditDialogHeader } from "./CouponEditDialogHeader";
import { CouponEditForm } from "./CouponEditForm";
import { useCouponsUIContext } from "../CouponsUIContext";

export function CouponEditDialog() {
  // Coupons UI Context
  const couponsUIContext = useCouponsUIContext();
  const couponsUIProps = useMemo(() => {
    return {
      id: couponsUIContext.selectedId,
      selectedItem: couponsUIContext.selectedItem,
      show: couponsUIContext.showEditCouponDialog,
      onHide: couponsUIContext.closeEditCouponDialog,
      documentId: couponsUIContext.documentId,
      queryParams: couponsUIContext.queryParams,
      initCoupon: couponsUIContext.initCoupon,
      findCoupon: couponsUIContext.findCoupon,
      addCoupon: couponsUIContext.addCoupon,
      updateCoupon: couponsUIContext.updateCoupon,
    };
  }, [couponsUIContext]);

  // Coupons Redux state
  const dispatch = useDispatch();
  const { actionsLoading, couponForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.companies.actionsLoading,
      couponForEdit: state.companies.couponForEdit,
    }),
    shallowEqual
  );

  const [editCoupon, setEditCoupon] = useState(null);
  useEffect(() => {
    // server request for getting coupon by seleted id
    setEditCoupon(couponsUIProps.findCoupon(couponsUIProps.id));
  }, [couponsUIProps.id, dispatch]);

  const saveCoupon = (coupon) => {
    if (!couponsUIProps.id) {
      couponsUIProps.addCoupon(coupon);
      couponsUIProps.onHide();
    } else {
      couponsUIProps.updateCoupon(coupon);
      couponsUIProps.onHide();
    }
  };

  return (
    <Modal
      show={couponsUIProps.show}
      onHide={couponsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CouponEditDialogHeader id={couponsUIProps.id} />
      <CouponEditForm
        saveCoupon={saveCoupon}
        actionsLoading={actionsLoading}
        coupon={couponsUIProps.selectedItem}
        onHide={couponsUIProps.onHide}
      />
    </Modal>
  );
}
