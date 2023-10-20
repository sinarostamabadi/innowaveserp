import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CostEditDialogHeader } from "./CostEditDialogHeader";
import { CostEditForm } from "./CostEditForm";
import { useCostsUIContext } from "../CostsUIContext";

export function CostEditDialog() {
  // Costs UI Context
  const costsUIContext = useCostsUIContext();
  const costsUIProps = useMemo(() => {
    return {
      id: costsUIContext.selectedId,
      selectedItem: costsUIContext.selectedItem,
      show: costsUIContext.showEditCostDialog,
      onHide: costsUIContext.closeEditCostDialog,
      queryParams: costsUIContext.queryParams,
      initCost: costsUIContext.initCost,
      findCost: costsUIContext.findCost,
      addCost: costsUIContext.addCost,
      updateCost: costsUIContext.updateCost,
    };
  }, [costsUIContext]);

  // Costs Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editCost, setEditCost] = useState(costsUIProps.initCost);

  useEffect(() => {
    if (!!costsUIProps.id)
      setEditCost(costsUIProps.findCost(costsUIProps.id));
  }, [costsUIProps.id, dispatch]);

  const saveCost = (cost) => {
    if (!costsUIProps.id) {
      costsUIProps.addCost(cost);
      costsUIProps.onHide();
    } else {
      costsUIProps.updateCost(cost);
      costsUIProps.onHide();
    }
  };
  
  return (
    <Modal
      show={costsUIProps.show}
      onHide={costsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CostEditDialogHeader id={costsUIProps.id} />
      <CostEditForm
        saveCost={saveCost}
        actionsLoading={actionsLoading}
        cost={costsUIProps.selectedItem || costsUIProps.initCost}
        onHide={costsUIProps.onHide}
      />
    </Modal>
  );
}
