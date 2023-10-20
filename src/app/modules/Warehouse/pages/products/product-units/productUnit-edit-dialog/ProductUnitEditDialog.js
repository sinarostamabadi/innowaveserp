import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ProductUnitEditDialogHeader } from "./ProductUnitEditDialogHeader";
import { ProductUnitEditForm } from "./ProductUnitEditForm";
import { useProductUnitsUIContext } from "../ProductUnitsUIContext";

export function ProductUnitEditDialog() {
  // ProductUnits UI Context
  const productUnitsUIContext = useProductUnitsUIContext();
  const productUnitsUIProps = useMemo(() => {
    return {
      id: productUnitsUIContext.selectedId,
      selectedItem: productUnitsUIContext.selectedItem,
      show: productUnitsUIContext.showEditProductUnitDialog,
      onHide: productUnitsUIContext.closeEditProductUnitDialog,
      personId: productUnitsUIContext.personId,
      queryParams: productUnitsUIContext.queryParams,
      initProductUnit: productUnitsUIContext.initProductUnit,
      findProductUnit: productUnitsUIContext.findProductUnit,
      addProductUnit: productUnitsUIContext.addProductUnit,
      updateProductUnit: productUnitsUIContext.updateProductUnit,
    };
  }, [productUnitsUIContext]);

  // ProductUnits Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editProductUnit, setEditProductUnit] = useState(productUnitsUIProps.initProductUnit);

  useEffect(() => {
    if (!!productUnitsUIProps.id)
      setEditProductUnit(productUnitsUIProps.findProductUnit(productUnitsUIProps.id));
  }, [productUnitsUIProps.id, dispatch]);

  const saveProductUnit = (productUnit) => {
    if (!productUnitsUIProps.id) {
      productUnitsUIProps.addProductUnit(productUnit);
      productUnitsUIProps.onHide();
    } else {
      productUnitsUIProps.updateProductUnit(productUnit);
      productUnitsUIProps.onHide();
    }
  };
  
  return (
    <Modal
      show={productUnitsUIProps.show}
      onHide={productUnitsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ProductUnitEditDialogHeader id={productUnitsUIProps.id} />
      <ProductUnitEditForm
        saveProductUnit={saveProductUnit}
        actionsLoading={actionsLoading}
        productUnit={productUnitsUIProps.selectedItem || productUnitsUIProps.initProductUnit}
        onHide={productUnitsUIProps.onHide}
      />
    </Modal>
  );
}
