/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useDiscountsUIContext } from "./DiscountsUIContext";
import { useTranslation } from "react-i18next";

export function DiscountDeleteDialog() {
  const { t } = useTranslation();

  // Discounts UI Context
  const discountsUIContext = useDiscountsUIContext();
  const discountsUIProps = useMemo(() => {
    return {
      id: discountsUIContext.selectedId,
      personId: discountsUIContext.personId,
      show: discountsUIContext.showDeleteDiscountDialog,
      onHide: discountsUIContext.closeDeleteDiscountDialog,
      queryParams: discountsUIContext.queryParams,
      setIds: discountsUIContext.setIds,
      findDiscount: discountsUIContext.findDiscount,
      removeDiscount: discountsUIContext.removeDiscount,
    };
  }, [discountsUIContext]);

  // Discounts Redux state
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!discountsUIProps.id) {
      discountsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDiscount = () => {
    discountsUIProps.removeDiscount(discountsUIProps.id);
    discountsUIProps.onHide();
  };

  return (
    <Modal
      show={discountsUIProps.show}
      onHide={discountsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("BuyReturnDiscount.Entity")}
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
            onClick={discountsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteDiscount}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
