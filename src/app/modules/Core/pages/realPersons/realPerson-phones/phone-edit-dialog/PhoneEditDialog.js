import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../_redux/phones/phonesActions";
import { PhoneEditDialogHeader } from "./PhoneEditDialogHeader";
import { PhoneEditForm } from "./PhoneEditForm";
import { usePhonesUIContext } from "../PhonesUIContext";

export function PhoneEditDialog() {
  // Phones UI Context
  const phonesUIContext = usePhonesUIContext();
  const phonesUIProps = useMemo(() => {
    return {
      id: phonesUIContext.selectedId,
      show: phonesUIContext.showEditPhoneDialog,
      onHide: phonesUIContext.closeEditPhoneDialog,
      personId: phonesUIContext.personId,
      queryParams: phonesUIContext.queryParams,
      initPhone: phonesUIContext.initPhone,
      findPhone: phonesUIContext.findPhone,
      addPhone: phonesUIContext.addPhone,
      updatePhone: phonesUIContext.updatePhone,
    };
  }, [phonesUIContext]);

  // Phones Redux state
  const dispatch = useDispatch();
  const { actionsLoading, phoneForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.phones.actionsLoading,
      phoneForEdit: state.phones.phoneForEdit,
    }),
    shallowEqual
  );

  const [editPhone, setEditPhone] = useState(null);

  useEffect(() => {
    // server request for getting phone by seleted id
    setEditPhone(phonesUIProps.findPhone(phonesUIProps.id));
  }, [phonesUIProps.id, dispatch]);

  const savePhone = (phone) => {
    if (!phonesUIProps.id) {
      console.log("phone > ", phone);
      phonesUIProps.addPhone(phone);
      phonesUIProps.onHide();
    } else {
      console.log("phone > ", phone);

      phonesUIProps.updatePhone(phone);
      phonesUIProps.onHide();
    }
  };

  return (
    <Modal
      show={phonesUIProps.show}
      onHide={phonesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PhoneEditDialogHeader id={phonesUIProps.id} />
      <PhoneEditForm
        savePhone={savePhone}
        actionsLoading={actionsLoading}
        phone={editPhone || phonesUIProps.initPhone}
        onHide={phonesUIProps.onHide}
      />
    </Modal>
  );
}
