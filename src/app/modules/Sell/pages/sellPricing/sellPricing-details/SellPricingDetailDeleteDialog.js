/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useSellPricingDetailsUIContext } from "./SellPricingDetailsUIContext";
import { useTranslation } from "react-i18next";

export function SellPricingDetailDeleteDialog() {
  const { t } = useTranslation();

  // SellPricingDetails UI Context
  const sellPricingDetailsUIContext = useSellPricingDetailsUIContext();
  const sellPricingDetailsUIProps = useMemo(() => {
    return {
      id: sellPricingDetailsUIContext.selectedId,
      personId: sellPricingDetailsUIContext.personId,
      show: sellPricingDetailsUIContext.showDeleteSellPricingDetailDialog,
      onHide: sellPricingDetailsUIContext.closeDeleteSellPricingDetailDialog,
      queryParams: sellPricingDetailsUIContext.queryParams,
      setIds: sellPricingDetailsUIContext.setIds,
      findSellPricingDetail: sellPricingDetailsUIContext.findSellPricingDetail,
      removeSellPricingDetail: sellPricingDetailsUIContext.removeSellPricingDetail,
    };
  }, [sellPricingDetailsUIContext]);

  // SellPricingDetails Redux state
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!sellPricingDetailsUIProps.id) {
      sellPricingDetailsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellPricingDetailsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteSellPricingDetail = () => {
    sellPricingDetailsUIProps.removeSellPricingDetail(sellPricingDetailsUIProps.id)
    sellPricingDetailsUIProps.onHide();
  };

  return (
    <Modal
      show={sellPricingDetailsUIProps.show}
      onHide={sellPricingDetailsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("SellPricingDetail.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>{t("Common.DeleteQuestion")}</span>
        )}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={sellPricingDetailsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteSellPricingDetail}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
