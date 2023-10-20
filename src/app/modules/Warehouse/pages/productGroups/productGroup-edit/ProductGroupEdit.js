/* eslint-disable eqeqeq */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/productGroups/productGroupsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { ProductGroupEditForm } from "./ProductGroupEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function ProductGroupEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    ProductGroupId: undefined,
    Title: "",
    ParentId: "",
    Parent: "",
    Code: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, productGroupForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.productGroups.actionsLoading,
      productGroupForEdit: state.productGroups.productGroupForEdit,
      error: state.productGroups.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id)
      dispatch(actions.fetchProductGroup(id)).then((res) => {
        setEditMode(true);
      });;
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("ProductGroup.Entity");

    if (productGroupForEdit && id) {
      _title = t("Common.Edit") + " " + productGroupForEdit.Title;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

  }, [productGroupForEdit, id, t, suhbeader]);

  const saveProductGroup = (values) => {
    const ParentId = values.ParentId[0] ? values.ParentId[0].ProductGroupId : values.Parent.ProductGroupId;
    const value = {
      ProductGroupId: values.ProductGroupId,
      ParentId,
      Code: values.Code,
      Title: values.Title
    }
    if (!id) {
      dispatch(actions.createProductGroup(value, (res)=>{
        backToProductGroupsList();
      }));
    } else {
      dispatch(actions.updateProductGroup(id, value))
        .then(() => backToProductGroupsList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveProductGroupClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToProductGroupsList = () => {
    history.push(`/warehouse/productGroups`);
  };

  return (
    <React.Fragment>
      {((!!id && editMode) || !!id == false) && (
        <Card>
          {actionsLoading && <ModalProgressBar />}
          {!actionsLoading && error != null && (
            <>
              <ModalProgressBar variant="danger" />
              <Alerty
                variant="danger"
                title={t("err.Error")}
                description={error}
              ></Alerty>
            </>
          )}
          <CardHeader title={title}>
            <CardHeaderToolbar>
              <button
                type="button"
                onClick={backToProductGroupsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>
              {`  `}
              <button type="submit" className="btn btn-light ml-2">
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>
              {`  `}
              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveProductGroupClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <ul className="nav nav-tabs nav-tabs-line " role="tablist">
              <li className="nav-item" onClick={() => setTab("basic")}>
                <a
                  className={`nav-link ${tab === "basic" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "basic").toString()}
                >
                  {t("Common.BasicInfo")}
                </a>
              </li>
            </ul>
            <div className="mt-5">
              {tab === "basic" && (
                <ProductGroupEditForm
                  actionsLoading={actionsLoading}
                  productGroup={productGroupForEdit || initModel}
                  btnRef={btnRef}
                  saveProductGroup={saveProductGroup}
                />
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  );
}