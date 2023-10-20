import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PaymentEditDialogHeader } from "./PaymentEditDialogHeader";
import { PaymentEditForm } from "./PaymentEditForm";
import { usePaymentsUIContext } from "../PaymentsUIContext";

export function PaymentEditDialog() {
  // Payments UI Context
  const paymentsUIContext = usePaymentsUIContext();
  const paymentsUIProps = useMemo(() => {
    return {
      id: paymentsUIContext.selectedId,
      selectedItem: paymentsUIContext.selectedItem,
      show: paymentsUIContext.showEditPaymentDialog,
      onHide: paymentsUIContext.closeEditPaymentDialog,
      documentId: paymentsUIContext.documentId,
      queryParams: paymentsUIContext.queryParams,
      initPayment: paymentsUIContext.initPayment,
      findPayment: paymentsUIContext.findPayment,
      addPayment: paymentsUIContext.addPayment,
      updatePayment: paymentsUIContext.updatePayment,
    };
  }, [paymentsUIContext]);

  // Payments Redux state
  const dispatch = useDispatch();
  const { actionsLoading, paymentForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.companies.actionsLoading,
      paymentForEdit: state.companies.paymentForEdit,
    }),
    shallowEqual
  );

  const [editPayment, setEditPayment] = useState(null);
  useEffect(() => {
    // server request for getting payment by seleted id
    setEditPayment(paymentsUIProps.findPayment(paymentsUIProps.id));
  }, [paymentsUIProps.id, dispatch]);

  const savePayment = (payment) => {
    if (!paymentsUIProps.id) {
      paymentsUIProps.addPayment(payment);
      paymentsUIProps.onHide();
    } else {
      paymentsUIProps.updatePayment(payment);
      paymentsUIProps.onHide();
    }
  };

  return (
    <Modal
      show={paymentsUIProps.show}
      onHide={paymentsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PaymentEditDialogHeader id={paymentsUIProps.id} />
      <PaymentEditForm
        savePayment={savePayment}
        actionsLoading={actionsLoading}
        payment={paymentsUIProps.selectedItem}
        onHide={paymentsUIProps.onHide}
      />
    </Modal>
  );
}
