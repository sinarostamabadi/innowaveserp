import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ServiceEditDialogHeader } from "./ServiceEditDialogHeader";
import { ServiceEditForm } from "./ServiceEditForm";
import { useServicesUIContext } from "../ServicesUIContext";

export function ServiceEditDialog() {
  // Services UI Context
  const servicesUIContext = useServicesUIContext();
  const servicesUIProps = useMemo(() => {
    return {
      id: servicesUIContext.selectedId,
      selectedItem: servicesUIContext.selectedItem,
      show: servicesUIContext.showEditServiceDialog,
      onHide: servicesUIContext.closeEditServiceDialog,
      personId: servicesUIContext.personId,
      queryParams: servicesUIContext.queryParams,
      initService: servicesUIContext.initService,
      findService: servicesUIContext.findService,
      addService: servicesUIContext.addService,
      updateService: servicesUIContext.updateService,
    };
  }, [servicesUIContext]);

  // Services Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editService, setEditService] = useState(servicesUIProps.initService);

  useEffect(() => {
    if (!!servicesUIProps.id)
      setEditService(servicesUIProps.findService(servicesUIProps.id));
  }, [servicesUIProps.id, dispatch]);

  const saveService = (service) => {
    if (!servicesUIProps.id) {
      servicesUIProps.addService(service);
      servicesUIProps.onHide();
    } else {
      servicesUIProps.updateService(service);
      servicesUIProps.onHide();
    }
  };
  
  return (
    <Modal
      show={servicesUIProps.show}
      onHide={servicesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ServiceEditDialogHeader id={servicesUIProps.id} isLoading={actionsLoading} />
      <ServiceEditForm
        saveService={saveService}
        actionsLoading={actionsLoading}
        service={servicesUIProps.selectedItem || servicesUIProps.initService}
        onHide={servicesUIProps.onHide}
      />
    </Modal>
  );
}
