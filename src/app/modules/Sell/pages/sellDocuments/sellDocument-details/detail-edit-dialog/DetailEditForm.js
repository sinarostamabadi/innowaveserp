import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
} from "../../../../../../../core/_partials/controls";
import { useDetailsUIContext } from "../DetailsUIContext";
import { suggestProduct } from "../../../../../Warehouse/_redux/products/productsCrud";
import { getByProduct } from "../../../../../Warehouse/_redux/productUnits/productUnitsCrud";
import { SuggestionField } from "../../../../../../../core/_partials/controls";

export function DetailEditForm({ saveDetail, detail, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const DetailEditSchema = Yup.object().shape({
    ProductId: Yup.array().required(
      t("err.IsRequired", { 0: t("AssignmentDtl.Product") })
    ),
    ProductUnitId: Yup.string().required(
      t("err.IsRequired", { 0: t("AssignmentDtl.ProductUnit") })
    ),
    Amount: Yup.string().required(
      t("err.IsRequired", { 0: t("AssignmentDtl.Amount") })
    ),
  });

  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      selectedId: detailsUIContext.selectedId,
      findDetail: detailsUIContext.findDetail,
      addDetail: detailsUIContext.addDetail,
      updateDetail: detailsUIContext.updateDetail,
    };
  }, [detailsUIContext]);

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const [productSelected, setProductSelected] = useState(null);
  const [productUnits, setProductUnits] = useState([]);
  useEffect(() => {
    if (!!productSelected) {
      getByProduct(productSelected + "").then(({ data }) => {
        setProductUnits((productUnits) => [
          { ProductUnitId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ]);
      });
    }
  }, [productSelected]);

  useEffect(() => {
    if (!!detailsUIProps.selectedId && !!detail.AssignmentDtlId) {
      setProductSelected(detail.ProductId);
    }
  }, [detail]);

  function cleanDetail(dirtyData) {
    return {
      AssignmentDtlId: dirtyData.AssignmentDtlId,
      AssignmentId: dirtyData.AssignmentId,
      Product:
        !!dirtyData.ProductId && dirtyData.ProductId.length == 1
          ? dirtyData.ProductId[0]
          : !!dirtyData.Product
          ? dirtyData.Product
          : null,
      ProductId:
        !!dirtyData.ProductId && dirtyData.ProductId.length == 1
          ? +dirtyData.ProductId[0].ProductId
          : !!dirtyData.ProductId
          ? dirtyData.ProductId
          : null,
      ProductUnitId: +dirtyData.ProductUnitId,
      ProductUnit: !!dirtyData.ProductUnitId
        ? productUnits.filter(
            (x) => x.ProductUnitId == dirtyData.ProductUnitId
          )[0]
        : null,
      Amount: +dirtyData.Amount,
      IsDeleted: false,
      AssignmentSerials: dirtyData.AssignmentSerials,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonDetail"
        enableReinitialize={true}
        initialValues={detail}
        validationSchema={DetailEditSchema}
        onSubmit={(values) => {
          saveDetail(cleanDetail(values));
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
                  <div className="col-lg-12">
                    <SuggestionField
                      name="ProductId"
                      labelKey={option => `${option.Code} ${option.Name}`}
                      customFeedbackLabel=""
                      label={t("AssignmentDtl.Product")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionProduct}
                      handleOnChange={(val) => setProductSelected(val)}
                      defaultValue={
                        detail && !!detail.Product ? [detail.Product] : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Name}</h6>
                          <span>{option.Code}</span>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select
                      name="ProductUnitId"
                      label={t("AssignmentDtl.ProductUnit")}
                    >
                      {productUnits.map((productUnit) => (
                        <option
                          key={productUnit.ProductUnitId}
                          value={productUnit.ProductUnitId}
                        >
                          {!!productUnit && !!productUnit.Unit
                            ? productUnit.Unit.Name
                            : ""}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="Amount"
                      component={Input}
                      label={t("AssignmentDtl.Amount")}
                    />
                  </div>
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
