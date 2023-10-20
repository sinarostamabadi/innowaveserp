/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useProductsUIContext } from "./ProductsUIContext";
import { useTranslation } from "react-i18next";

export function ProductDeleteDialog() {
  const { t } = useTranslation();

  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      id: productsUIContext.selectedId,
      sellDiscountId: productsUIContext.sellDiscountId,
      show: productsUIContext.showDeleteProductDialog,
      onHide: productsUIContext.closeDeleteProductDialog,
      findProduct: productsUIContext.findProduct,
      removeProduct: productsUIContext.removeProduct,
    };
  }, [productsUIContext]);

  // if !id we should close modal
  useEffect(() => {
    if (!productsUIProps.id) {
      productsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsUIProps.id]);

  const deleteProduct = () => {
    productsUIProps.removeProduct(productsUIProps.id)
    productsUIProps.onHide();
  };

  return (
    <Modal
      show={productsUIProps.show}
      onHide={productsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("Product.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <span>{t("Common.DeleteQuestion")}</span>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={productsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteProduct}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
