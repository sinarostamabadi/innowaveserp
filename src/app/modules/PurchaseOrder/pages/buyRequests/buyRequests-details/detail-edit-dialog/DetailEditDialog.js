import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DetailEditDialogHeader } from "./DetailEditDialogHeader";
import { DetailEditForm } from "./DetailEditForm";
import { useDetailsUIContext } from "../DetailsUIContext";

export function DetailEditDialog() {
  // Details UI Context
  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      id: detailsUIContext.selectedId,
      selectedItem: detailsUIContext.selectedItem,
      show: detailsUIContext.showEditDetailDialog,
      onHide: detailsUIContext.closeEditDetailDialog,
      queryParams: detailsUIContext.queryParams,
      initDetail: detailsUIContext.initDetail,
      findDetail: detailsUIContext.findDetail,
      addDetail: detailsUIContext.addDetail,
      updateDetail: detailsUIContext.updateDetail,
    };
  }, [detailsUIContext]);

  // Details Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editDetail, setEditDetail] = useState(detailsUIProps.initDetail);

  useEffect(() => {
    if (!!detailsUIProps.id)
      setEditDetail(detailsUIProps.findDetail(detailsUIProps.id));
  }, [detailsUIProps.id, dispatch]);

  const saveDetail = (detail) => {
    if (!detailsUIProps.id) {
      detailsUIProps.addDetail(detail);
      detailsUIProps.onHide();
    } else {
      detailsUIProps.updateDetail(detail);
      detailsUIProps.onHide();
    }
  };
  
  return (
    <Modal
      show={detailsUIProps.show}
      onHide={detailsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <DetailEditDialogHeader id={detailsUIProps.id} />
      <DetailEditForm
        saveDetail={saveDetail}
        actionsLoading={actionsLoading}
        detail={detailsUIProps.selectedItem || detailsUIProps.initDetail}
        onHide={detailsUIProps.onHide}
      />
    </Modal>
  );
}
