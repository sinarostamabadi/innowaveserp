import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DiscountEditDialogHeader } from "./DiscountEditDialogHeader";
import { DiscountEditForm } from "./DiscountEditForm";
import { useDiscountsUIContext } from "../DiscountsUIContext";

export function DiscountEditDialog() {
  // Discounts UI Context
  const discountsUIContext = useDiscountsUIContext();
  const discountsUIProps = useMemo(() => {
    return {
      id: discountsUIContext.selectedId,
      selectedItem: discountsUIContext.selectedItem,
      show: discountsUIContext.showEditDiscountDialog,
      onHide: discountsUIContext.closeEditDiscountDialog,
      queryParams: discountsUIContext.queryParams,
      initDiscount: discountsUIContext.initDiscount,
      findDiscount: discountsUIContext.findDiscount,
      addDiscount: discountsUIContext.addDiscount,
      updateDiscount: discountsUIContext.updateDiscount,
    };
  }, [discountsUIContext]);

  // Discounts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editDiscount, setEditDiscount] = useState(discountsUIProps.initDiscount);

  useEffect(() => {
    if (!!discountsUIProps.id)
      setEditDiscount(discountsUIProps.findDiscount(discountsUIProps.id));
  }, [discountsUIProps.id, dispatch]);

  const saveDiscount = (discount) => {
    if (!discountsUIProps.id) {
      discountsUIProps.addDiscount(discount);
      discountsUIProps.onHide();
    } else {
      discountsUIProps.updateDiscount(discount);
      discountsUIProps.onHide();
    }
  };
  
  return (
    <Modal
      show={discountsUIProps.show}
      onHide={discountsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <DiscountEditDialogHeader id={discountsUIProps.id} />
      <DiscountEditForm
        saveDiscount={saveDiscount}
        actionsLoading={actionsLoading}
        discount={discountsUIProps.selectedItem || discountsUIProps.initDiscount}
        onHide={discountsUIProps.onHide}
      />
    </Modal>
  );
}
