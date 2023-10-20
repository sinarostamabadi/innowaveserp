import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import {
  Input,
  Select,
  CheckboxField,
  SuggestionField
} from "../../../../../../core/_partials/controls";
import { useProductGroupsUIContext } from "../ProductGroupsUIContext";

export function ProductGroupEditForm({ saveProductGroup, productGroup, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const ProductGroupEditSchema = Yup.object().shape({
    Title: Yup.string().required(
      t("err.IsRequired", { 0: t("ProductGroup.Title") })
    )
  });

  const uiContext = useProductGroupsUIContext();
  const uiProps = useMemo(() => {
    return {
      selectedId: uiContext.selectedId,
      selectedItem: uiContext.selectedItem,
      findProductGroup: uiContext.findProductGroup,
      addProductGroup: uiContext.addProductGroup,
      updateProductGroup: uiContext.updateProductGroup,
    };
  }, [uiContext]);

  function cleanProductGroup(dirtyData) {
    return {
      ProductGroupId: dirtyData.ProductGroupId,
      Title: dirtyData.Title,
      ParentId: !!dirtyData.ParentId? +dirtyData.ParentId: null,
      Code: dirtyData.Code,
    };
  }

  const handleSuggestionProductGroup = useCallback((query, fnCallback) => {
    Axios.post("ProductGroup/Get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items.filter((item) => item.ProductGroupId != productGroup.ParentId));
      });
  });

  return (
    <>
      <Formik
        key="RealPersonProductGroup"
        enableReinitialize={true}
        initialValues={productGroup}
        validationSchema={ProductGroupEditSchema}
        onSubmit={(values) => {
          console.log("values > ", values);
          saveProductGroup(cleanProductGroup(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Title"
                    component={Input}
                    type="text"
                    customFeedbackLabel=""
                    label={t("ProductGroup.Title")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="Code"
                    component={Input}
                    type="text"
                    customFeedbackLabel=""
                    label={t("ProductGroup.Code")}
                  />
                </div>
                {/* <div className="col-lg-6">
                  <SuggestionField
                    name="ParentId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("ProductGroup.ParentId")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProductGroup}
                    defaultValue={!!productGroup && !!productGroup.Parent ? [productGroup.Parent] : []}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div> */}
              </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                {t("Common.Cancel")}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                {t("Common.Save")}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
