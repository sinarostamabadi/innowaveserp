import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EmployeeTypeEditDialogHeader } from "./EmployeeTypeEditDialogHeader";
import { EmployeeTypeEditForm } from "./EmployeeTypeEditForm";
import { useEmployeeTypesUIContext } from "../EmployeeTypesUIContext";

export function EmployeeTypeEditDialog() {
  // EmployeeTypes UI Context
  const uiContext = useEmployeeTypesUIContext();
  const uiProps = useMemo(() => {
    return {
      id: uiContext.selectedId,
      selectedItem: uiContext.selectedItem,
      selectedEmployeeType: uiContext.selectedEmployeeType,
      show: uiContext.showEditEmployeeTypeDialog,
      onHide: uiContext.closeEditEmployeeTypeDialog,
      personId: uiContext.personId,
      queryParams: uiContext.queryParams,
      initEmployeeType: uiContext.initEmployeeType,
      findEmployeeType: uiContext.findEmployeeType,
      addEmployeeType: uiContext.addEmployeeType,
      updateEmployeeType: uiContext.updateEmployeeType,
    };
  }, [uiContext]);

  // EmployeeTypes Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editEmployeeType, setEditEmployeeType] = useState(
    uiProps.initEmployeeType
  );

  useEffect(() => {
    if (!!uiProps.id) setEditEmployeeType(uiProps.findEmployeeType(uiProps.id));
  }, [uiProps.id, dispatch]);

  const saveEmployeeType = (employeeType) => {
    if (!uiProps.id) {
      uiProps.addEmployeeType(employeeType);
      uiProps.onHide();
    } else {
      uiProps.updateEmployeeType(employeeType);
      uiProps.onHide();
    }
  };

  return (
    <Modal
      show={uiProps.show}
      onHide={uiProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <EmployeeTypeEditDialogHeader
        id={uiProps.id}
        isLoading={actionsLoading}
      />
      <EmployeeTypeEditForm
        saveEmployeeType={saveEmployeeType}
        actionsLoading={actionsLoading}
        employeeType={uiProps.selectedItem || uiProps.initEmployeeType}
        selectedEmployeeType={uiProps.selectedEmployeeType}
        onHide={uiProps.onHide}
      />
    </Modal>
  );
}
