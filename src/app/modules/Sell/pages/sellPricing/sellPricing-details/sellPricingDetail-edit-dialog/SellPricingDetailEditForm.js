import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  SuggestionField,
  CheckboxField,
  Select,
} from "../../../../../../../core/_partials/controls";
import { useSellPricingDetailsUIContext } from "../SellPricingDetailsUIContext";
import { suggestProduct } from "../../../../../Warehouse/_redux/products/productsCrud";

export function SellPricingDetailEditForm({
  saveSellPricingDetail,
  sellPricingDetail,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const SellPricingDetailEditSchema = Yup.object().shape({
    ProductId: Yup.array().required(
      t("err.IsRequired", { 0: t("ReceiptDtl.Product") })
    ),
  });

  const detailsUIContext = useSellPricingDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      selectedId: detailsUIContext.selectedId,
      findByProductOnDetail: detailsUIContext.findByProductOnDetail,
    };
  }, [detailsUIContext]);

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  function cleanSellPricingDetail(dirtyData) {
    return {
      SellPricingDetailId: dirtyData.SellPricingDetailId,
      SellPricingId: dirtyData.SellPricingId,
      ProductId:
        Array.isArray(dirtyData.ProductId) && dirtyData.ProductId.length == 1
          ? +dirtyData.ProductId[0].ProductId
          : !!dirtyData.ProductId
          ? dirtyData.ProductId
          : null,
      Product:
        Array.isArray(dirtyData.ProductId) && dirtyData.ProductId.length == 1
          ? dirtyData.ProductId[0]
          : dirtyData.Product,
      IsAccepted: dirtyData.IsAccepted,
      Price: +dirtyData.Price,
      OnlinePrice: !!dirtyData.OnlinePrice ? +dirtyData.OnlinePrice : null,
      PayablePrice: +dirtyData.PayablePrice,
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonSellPricingDetail"
        enableReinitialize={true}
        initialValues={sellPricingDetail}
        validationSchema={SellPricingDetailEditSchema}
        onSubmit={(values) => {
          saveSellPricingDetail(cleanSellPricingDetail(values));
        }}
      >
        {({ handleSubmit, setValues }) => (
          <>
            <Modal.Body className="">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-md">
                    <SuggestionField
                      name="ProductId"
                      labelKey="Name"
                      customFeedbackLabel=""
                      label={t("ReceiptDtl.Product")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionProduct}
                      handleOnChange={(val) => {
                        const findedProd =
                          detailsUIProps.findByProductOnDetail(val);
                        if (!!findedProd) setValues(findedProd);
                      }}
                      defaultValue={
                        sellPricingDetail && !!sellPricingDetail.Product
                          ? [sellPricingDetail.Product]
                          : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Name}</h6>
                        </div>
                      )}
                    />
                  </div>
                  <div className="col-md-auto">
                    <CheckboxField
                      name="IsAccepted"
                      label={t("SellPricingDetail.IsAccepted")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="Price"
                      component={Input}
                      label={t("SellPricingDetail.Price")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="OnlinePrice"
                      component={Input}
                      label={t("SellPricingDetail.OnlinePrice")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="PayablePrice"
                      component={Input}
                      label={t("SellPricingDetail.PayablePrice")}
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
