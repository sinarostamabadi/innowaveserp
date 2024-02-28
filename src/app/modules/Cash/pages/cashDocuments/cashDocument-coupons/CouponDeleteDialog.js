/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "src/core/_partials/controls";
import { useCouponsUIContext } from "./CouponsUIContext";
import { useTranslation } from "react-i18next";

export function CouponDeleteDialog() {
  const { t } = useTranslation();

  // Coupons UI Context
  const couponsUIContext = useCouponsUIContext();
  const couponsUIProps = useMemo(() => {
    return {
      id: couponsUIContext.selectedId,
      documentId: couponsUIContext.documentId,
      show: couponsUIContext.showDeleteCouponDialog,
      onHide: couponsUIContext.closeDeleteCouponDialog,
      queryParams: couponsUIContext.queryParams,
      setIds: couponsUIContext.setIds,
      findCoupon: couponsUIContext.findCoupon,
      removeCoupon: couponsUIContext.removeCoupon,
    };
  }, [couponsUIContext]);

  // Coupons Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companies.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!couponsUIProps.id) {
      couponsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCoupon = () => {
    couponsUIProps.removeCoupon(couponsUIProps.id);
    couponsUIProps.onHide();
  };

  return (
    <Modal
      show={couponsUIProps.show}
      onHide={couponsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("CashDocument.Coupon")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>{t("Common.DeleteQuestion")}</span>}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={couponsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCoupon}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
