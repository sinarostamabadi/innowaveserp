import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyPersonEditDialogHeader } from "./CompanyPersonEditDialogHeader";
import { CompanyPersonEditForm } from "./CompanyPersonEditForm";
import { useCompanyPersonsUIContext } from "../CompanyPersonsUIContext";

export function CompanyPersonEditDialog() {
  // CompanyPersons UI Context
  const companyPersonsUIContext = useCompanyPersonsUIContext();
  const companyPersonsUIProps = useMemo(() => {
    return {
      id: companyPersonsUIContext.selectedId,
      show: companyPersonsUIContext.showEditCompanyPersonDialog,
      onHide: companyPersonsUIContext.closeEditCompanyPersonDialog,
      personId: companyPersonsUIContext.personId,
      queryParams: companyPersonsUIContext.queryParams,
      initCompanyPerson: companyPersonsUIContext.initCompanyPerson,
      findCompanyPerson: companyPersonsUIContext.findCompanyPerson,
      addCompanyPerson: companyPersonsUIContext.addCompanyPerson,
      updateCompanyPerson: companyPersonsUIContext.updateCompanyPerson,
    };
  }, [companyPersonsUIContext]);

  // CompanyPersons Redux state
  const dispatch = useDispatch();
  const { actionsLoading, companyPersonForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.companies.actionsLoading,
      companyPersonForEdit: state.companies.companyForEdit,
    }),
    shallowEqual
  );

  const [editCompanyPerson, setEditCompanyPerson] = useState(null);

  useEffect(() => {
    // server request for getting companyPerson by seleted id
    setEditCompanyPerson(
      companyPersonsUIProps.findCompanyPerson(companyPersonsUIProps.id)
    );
  }, [companyPersonsUIProps.id, dispatch]);

  const saveCompanyPerson = (companyPerson) => {
    console.log("companyPerson > ", companyPerson);
    if (!companyPersonsUIProps.id) {
      companyPersonsUIProps.addCompanyPerson(companyPerson);
      companyPersonsUIProps.onHide();
    } else {
      console.log("companyPerson > ", companyPerson);

      companyPersonsUIProps.updateCompanyPerson(companyPerson);
      companyPersonsUIProps.onHide();
    }
  };

  return (
    <Modal
      show={companyPersonsUIProps.show}
      onHide={companyPersonsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CompanyPersonEditDialogHeader id={companyPersonsUIProps.id} />
      <CompanyPersonEditForm
        saveCompanyPerson={saveCompanyPerson}
        actionsLoading={actionsLoading}
        companyPerson={
          editCompanyPerson || companyPersonsUIProps.initCompanyPerson
        }
        onHide={companyPersonsUIProps.onHide}
      />
    </Modal>
  );
}
