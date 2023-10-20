import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FactorEditDialogHeader } from "./FactorEditDialogHeader";
import { FactorEditForm } from "./FactorEditForm";
import { useFactorsUIContext } from "../FactorsUIContext";

export function FactorEditDialog() {
  // Factors UI Context
  const factorsUIContext = useFactorsUIContext();
  const factorsUIProps = useMemo(() => {
    return {
      id: factorsUIContext.selectedId,
      show: factorsUIContext.showEditFactorDialog,
      onHide: factorsUIContext.closeEditFactorDialog,
      sellDiscountId: factorsUIContext.sellDiscountId,
      queryParams: factorsUIContext.queryParams,
      initFactor: factorsUIContext.initFactor,
      findFactor: factorsUIContext.findFactor,
      addFactor: factorsUIContext.addFactor,
      updateFactor: factorsUIContext.updateFactor,
    };
  }, [factorsUIContext]);

  // Factors Redux state
  const dispatch = useDispatch();
  const [editFactor, setEditFactor] = useState(null);
  useEffect(() => {
    // server request for getting factors by seleted id
    setEditFactor(factorsUIProps.findFactor(factorsUIProps.id));
  }, [factorsUIProps.id, dispatch]);

  const saveFactor = (factors) => {
    factors.FactorNumber = +factors.FactorNumber;
    factors.DiscountPercent = +factors.DiscountPercent;

    if (!factorsUIProps.id) {
      factorsUIProps.addFactor(factors);
      factorsUIProps.onHide();
    } else {
      factorsUIProps.updateFactor(factors);
      factorsUIProps.onHide();
    }
  };
 
  return (
    <Modal
      size="md"
      show={factorsUIProps.show}
      onHide={factorsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <FactorEditDialogHeader id={factorsUIProps.id} />
      <FactorEditForm
        saveFactor={saveFactor}
        factor={editFactor || factorsUIProps.initFactor}
        onHide={factorsUIProps.onHide}
      />
    </Modal>
  );
}
