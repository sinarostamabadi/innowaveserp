import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ProductGroupEditDialogHeader } from "./ProductGroupEditDialogHeader";
import { ProductGroupEditForm } from "./ProductGroupEditForm";
import { useProductGroupsUIContext } from "../ProductGroupsUIContext";

export function ProductGroupEditDialog() {
  // ProductGroups UI Context
  const uiContext = useProductGroupsUIContext();
  const uiProps = useMemo(() => {
    return {
      id: uiContext.selectedId,
      selectedItem: uiContext.selectedItem,
      show: uiContext.showEditProductGroupDialog,
      onHide: uiContext.closeEditProductGroupDialog,
      personId: uiContext.personId,
      queryParams: uiContext.queryParams,
      initProductGroup: uiContext.initProductGroup,
      findProductGroup: uiContext.findProductGroup,
      addProductGroup: uiContext.addProductGroup,
      updateProductGroup: uiContext.updateProductGroup,
    };
  }, [uiContext]);

  // ProductGroups Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);
  const [editProductGroup, setEditProductGroup] = useState({...uiProps.initProductGroup, ParentId: (!!uiProps.selectedItem? uiProps.selectedItem.parent: null)});

  useEffect(() => {
    if (!!uiProps.id)
      uiProps.findProductGroup(uiProps.id, (res)=> setEditProductGroup(res));
    else
      setEditProductGroup({...uiProps.initProductGroup, ParentId: (!!uiProps.selectedItem? uiProps.selectedItem.parent: null)});
  }, [uiProps.id, dispatch]);

  useEffect(() => {
    if (!!uiProps.id)
      uiProps.findProductGroup(uiProps.id, (res)=> setEditProductGroup(res));
    else
      setEditProductGroup({...uiProps.initProductGroup, ParentId: (!!uiProps.selectedItem? uiProps.selectedItem.parent: null)});
  }, [uiProps.selectedItem, dispatch]);

  const saveProductGroup = (productGroup) => {
    if (!uiProps.id) {
      uiProps.addProductGroup(productGroup);
      uiProps.onHide();
    } else {
      uiProps.updateProductGroup(productGroup);
      uiProps.onHide();
    }
  };
  
  return (
    <Modal
      show={uiProps.show}
      onHide={uiProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ProductGroupEditDialogHeader id={uiProps.id} />
      <ProductGroupEditForm
        saveProductGroup={saveProductGroup}
        actionsLoading={actionsLoading}
        productGroup={editProductGroup}
        onHide={uiProps.onHide}
      />
    </Modal>
  );
}
