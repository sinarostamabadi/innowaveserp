import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ProductEditDialogHeader } from "./ProductEditDialogHeader";
import { ProductEditForm } from "./ProductEditForm";
import { useProductsUIContext } from "../ProductsUIContext";

export function ProductEditDialog() {
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      id: productsUIContext.selectedId,
      show: productsUIContext.showEditProductDialog,
      onHide: productsUIContext.closeEditProductDialog,
      sellDiscountId: productsUIContext.sellDiscountId,
      queryParams: productsUIContext.queryParams,
      initProduct: productsUIContext.initProduct,
      findProduct: productsUIContext.findProduct,
      addProduct: productsUIContext.addProduct,
      updateProduct: productsUIContext.updateProduct,
    };
  }, [productsUIContext]);

  // Products Redux state
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);
  useEffect(() => {
    // server request for getting products by seleted id
    setEditProduct(productsUIProps.findProduct(productsUIProps.id));
  }, [productsUIProps.id, dispatch]);

  const saveProduct = (products) => {
    products.ProductNumber = +products.ProductNumber;
    products.DiscountPercent = +products.DiscountPercent;

    if (!productsUIProps.id) {
      productsUIProps.addProduct(products);
      productsUIProps.onHide();
    } else {
      productsUIProps.updateProduct(products);
      productsUIProps.onHide();
    }
  };
 
  return (
    <Modal
      size="md"
      show={productsUIProps.show}
      onHide={productsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ProductEditDialogHeader id={productsUIProps.id} />
      <ProductEditForm
        saveProduct={saveProduct}
        product={editProduct || productsUIProps.initProduct}
        onHide={productsUIProps.onHide}
      />
    </Modal>
  );
}
