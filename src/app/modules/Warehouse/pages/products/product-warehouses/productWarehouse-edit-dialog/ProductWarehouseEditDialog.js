import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ProductWarehouseEditDialogHeader } from "./ProductWarehouseEditDialogHeader";
import { ProductWarehouseEditForm } from "./ProductWarehouseEditForm";
import { useProductWarehousesUIContext } from "../ProductWarehousesUIContext";

export function ProductWarehouseEditDialog() {
  // ProductWarehouses UI Context
  const productWarehousesUIContext = useProductWarehousesUIContext();
  const productWarehousesUIProps = useMemo(() => {
    return {
      id: productWarehousesUIContext.selectedId,
      selectedItem: productWarehousesUIContext.selectedItem,
      show: productWarehousesUIContext.showEditProductWarehouseDialog,
      onHide: productWarehousesUIContext.closeEditProductWarehouseDialog,
      personId: productWarehousesUIContext.personId,
      queryParams: productWarehousesUIContext.queryParams,
      initProductWarehouse: productWarehousesUIContext.initProductWarehouse,
      findProductWarehouse: productWarehousesUIContext.findProductWarehouse,
      addProductWarehouse: productWarehousesUIContext.addProductWarehouse,
      updateProductWarehouse: productWarehousesUIContext.updateProductWarehouse,
    };
  }, [productWarehousesUIContext]);

  // ProductWarehouses Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editProductWarehouse, setEditProductWarehouse] = useState(productWarehousesUIProps.initProductWarehouse);

  useEffect(() => {
    if (!!productWarehousesUIProps.id)
      setEditProductWarehouse(productWarehousesUIProps.findProductWarehouse(productWarehousesUIProps.id));
  }, [productWarehousesUIProps.id, dispatch]);

  const saveProductWarehouse = (productWarehouse) => {
    if (!productWarehousesUIProps.id) {
      productWarehousesUIProps.addProductWarehouse(productWarehouse);
      productWarehousesUIProps.onHide();
    } else {
      productWarehousesUIProps.updateProductWarehouse(productWarehouse);
      productWarehousesUIProps.onHide();
    }
  };
  
  return (
    <Modal
      show={productWarehousesUIProps.show}
      onHide={productWarehousesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ProductWarehouseEditDialogHeader id={productWarehousesUIProps.id} />
      <ProductWarehouseEditForm
        saveProductWarehouse={saveProductWarehouse}
        actionsLoading={actionsLoading}
        productWarehouse={productWarehousesUIProps.selectedItem || productWarehousesUIProps.initProductWarehouse}
        onHide={productWarehousesUIProps.onHide}
      />
    </Modal>
  );
}
