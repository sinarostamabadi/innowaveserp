/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useProductWarehousesUIContext } from "./ProductWarehousesUIContext";
import { useTranslation } from "react-i18next";

export function ProductWarehouseDeleteDialog() {
  const { t } = useTranslation();

  // ProductWarehouses UI Context
  const productWarehousesUIContext = useProductWarehousesUIContext();
  const productWarehousesUIProps = useMemo(() => {
    return {
      id: productWarehousesUIContext.selectedId,
      personId: productWarehousesUIContext.personId,
      show: productWarehousesUIContext.showDeleteProductWarehouseDialog,
      onHide: productWarehousesUIContext.closeDeleteProductWarehouseDialog,
      queryParams: productWarehousesUIContext.queryParams,
      setIds: productWarehousesUIContext.setIds,
      findProductWarehouse: productWarehousesUIContext.findProductWarehouse,
      removeProductWarehouse: productWarehousesUIContext.removeProductWarehouse,
    };
  }, [productWarehousesUIContext]);

  // ProductWarehouses Redux state
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!productWarehousesUIProps.id) {
      productWarehousesUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productWarehousesUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteProductWarehouse = () => {
    productWarehousesUIProps.removeProductWarehouse(productWarehousesUIProps.id)
    productWarehousesUIProps.onHide();
  };

  return (
    <Modal
      show={productWarehousesUIProps.show}
      onHide={productWarehousesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("ProductWarehouse.Entity")}
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
            onClick={productWarehousesUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteProductWarehouse}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
