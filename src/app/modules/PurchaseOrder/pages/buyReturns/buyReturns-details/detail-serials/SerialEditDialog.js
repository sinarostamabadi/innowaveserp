import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SerialEditDialogHeader } from "./SerialEditDialogHeader";
import { SerialEditForm } from "./SerialEditForm";
import { useDetailsUIContext } from "../DetailsUIContext";

export function SerialEditDialog() {
    // Details UI Context
  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      id: detailsUIContext.selectedId,
      selectedItem: detailsUIContext.selectedItem,
      show: detailsUIContext.showSerialDetailDialog,
      onHide: detailsUIContext.closeSerialDetailDialog,
    };
  }, [detailsUIContext]);

  // Details Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  return (
    <Modal
      show={detailsUIProps.show}
      onHide={detailsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <SerialEditDialogHeader id={detailsUIProps.id} />
      <SerialEditForm
        actionsLoading={actionsLoading}
        detail={!!detailsUIProps.selectedItem ? detailsUIProps.selectedItem.BuyReturnSerials: []}
        onHide={detailsUIProps.onHide}
      />
    </Modal>
  );
}
