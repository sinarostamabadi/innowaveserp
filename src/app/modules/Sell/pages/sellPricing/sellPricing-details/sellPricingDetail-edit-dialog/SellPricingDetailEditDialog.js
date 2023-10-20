import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SellPricingDetailEditDialogHeader } from "./SellPricingDetailEditDialogHeader";
import { SellPricingDetailEditForm } from "./SellPricingDetailEditForm";
import { useSellPricingDetailsUIContext } from "../SellPricingDetailsUIContext";

export function SellPricingDetailEditDialog() {
  // SellPricingDetails UI Context
  const sellPricingDetailsUIContext = useSellPricingDetailsUIContext();
  const sellPricingDetailsUIProps = useMemo(() => {
    return {
      id: sellPricingDetailsUIContext.selectedId,
      selectedItem: sellPricingDetailsUIContext.selectedItem,
      show: sellPricingDetailsUIContext.showEditSellPricingDetailDialog,
      onHide: sellPricingDetailsUIContext.closeEditSellPricingDetailDialog,
      personId: sellPricingDetailsUIContext.personId,
      queryParams: sellPricingDetailsUIContext.queryParams,
      initSellPricingDetail: sellPricingDetailsUIContext.initSellPricingDetail,
      findSellPricingDetail: sellPricingDetailsUIContext.findSellPricingDetail,
      addSellPricingDetail: sellPricingDetailsUIContext.addSellPricingDetail,
      updateSellPricingDetail: sellPricingDetailsUIContext.updateSellPricingDetail,
    };
  }, [sellPricingDetailsUIContext]);

  // SellPricingDetails Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editSellPricingDetail, setEditSellPricingDetail] = useState(sellPricingDetailsUIProps.initSellPricingDetail);

  useEffect(() => {
    if (!!sellPricingDetailsUIProps.id)
      setEditSellPricingDetail(sellPricingDetailsUIProps.findSellPricingDetail(sellPricingDetailsUIProps.id));
  }, [sellPricingDetailsUIProps.id, dispatch]);

  const saveSellPricingDetail = (sellPricingDetail) => {
    if (!sellPricingDetailsUIProps.id) {
      sellPricingDetailsUIProps.addSellPricingDetail(sellPricingDetail);
      sellPricingDetailsUIProps.onHide();
    } else {
      sellPricingDetailsUIProps.updateSellPricingDetail(sellPricingDetail);
      sellPricingDetailsUIProps.onHide();
    }
  };
  
  return (
    <Modal
      show={sellPricingDetailsUIProps.show}
      onHide={sellPricingDetailsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      size="md"
    >
      <SellPricingDetailEditDialogHeader id={sellPricingDetailsUIProps.id} />
      <SellPricingDetailEditForm
        saveSellPricingDetail={saveSellPricingDetail}
        actionsLoading={actionsLoading}
        sellPricingDetail={sellPricingDetailsUIProps.selectedItem || sellPricingDetailsUIProps.initSellPricingDetail}
        onHide={sellPricingDetailsUIProps.onHide}
      />
    </Modal>
  );
}
