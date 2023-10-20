import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  DatePickerField,
  Input,
  Select,
} from "../../../../../../../core/_partials/controls";
import { useDetailsUIContext } from "../DetailsUIContext";
import { suggestProduct } from "../../../../_redux/products/productsCrud";
import { getByProduct } from "../../../../_redux/productUnits/productUnitsCrud";
import { SuggestionField } from "../../../../../../../core/_partials/controls";
import {
  FaObjToEnDateTime,
  EnToFaDate,
  numberFaToEn,
  getStorage
} from "../../../../../../../core/_helpers";

export function DetailEditForm({ saveDetail, detail, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const defaultWarehouse = !!getStorage("defaultWarehouse")
  ? JSON.parse(getStorage("defaultWarehouse"))
  : null;

  const DetailEditSchema = Yup.object().shape({
    ProductId: Yup.array().required(
      t("err.IsRequired", { 0: t("ReceiptDtl.Product") })
    ),
    ProductUnitId: Yup.string().required(
      t("err.IsRequired", { 0: t("ReceiptDtl.ProductUnit") })
    ),
    Amount: Yup.string()
    .required(
      t("err.IsRequired", { 0: t("ReceiptDtl.Amount") })
    ).test('AmountTest', t("ReceiptDtl.AmountOverflow") , 
      function(value) {
          if(!!this.parent.BuyDetailId && +buyDetails.filter(x=>x.BuyDetailId == this.parent.BuyDetailId)[0].Amount < +value)
            return false;
          else 
            return true;
      }),
      Amount: Yup.number().positive(t("err.NotNegetive", { 0: t("ReceiptDtl.Amount") })),
      ExpireDateObj: Yup.object()
        .test('AmountTest', t("err.MostBeGreater", { 0: t("ReceiptDtl.ExpireDate"), 1: t("ReceiptDtl.UseDate") }) , 
          function(value) {
            let expireDate = new Date(FaObjToEnDateTime(value));
            let useDate = new Date(FaObjToEnDateTime(this.parent.UseDateObj));

            return expireDate - useDate >= 0;
        })
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
  const [buyDetails, setBuyDetails] = useState([]);
  useEffect(() => {
    if (!!productSelected) {
      getByProduct(productSelected + "").then(({ data }) => {
        setProductUnits((productUnits) => [
          { ProductUnitId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ]);
      });

      axios.get(`BuyDetail/GetBuyDtlsWithoutReceipt/${productSelected}`).then(({ data }) => {
        console.log("daa > ", data);
        setBuyDetails((productUnits) => [
          { BuyDetailId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ]);
      });
    }
  }, [productSelected]);

  useEffect(() => {
    if (!!detailsUIProps.selectedId && !!detail.ReceiptDtlId) {
      setProductSelected(detail.ProductId);
    }
  }, [detail]);

  function cleanDetail(dirtyData) {
    return {
      ReceiptDtlId: dirtyData.ReceiptDtlId,
      ReceiptId: dirtyData.ReceiptId,
      Product:
        !!dirtyData.ProductId && dirtyData.ProductId.length == 1
          ? dirtyData.ProductId[0]
          : (!!dirtyData.Product ? dirtyData.Product: null),
      ProductId:
        !!dirtyData.ProductId && dirtyData.ProductId.length == 1
          ? +dirtyData.ProductId[0].ProductId
          : (!!dirtyData.ProductId ? dirtyData.ProductId: null),
      BuyDetailId: dirtyData.BuyDetailId && +dirtyData.BuyDetailId,
      ProductUnitId: +dirtyData.ProductUnitId,
      ProductUnit: !!dirtyData.ProductUnitId
        ? productUnits.filter(
            (x) => x.ProductUnitId == dirtyData.ProductUnitId
          )[0]
        : null,
      Amount: +dirtyData.Amount,
      UseDate: !!dirtyData.UseDateObj
        ? FaObjToEnDateTime(dirtyData.UseDateObj)
        : "",
      ExpireDate: !!dirtyData.ExpireDateObj
        ? FaObjToEnDateTime(dirtyData.ExpireDateObj)
        : "",
      IsDeleted: false,
      ReceiptSerials: dirtyData.ReceiptSerials,
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
                  <div className="col-lg-6">
                    <SuggestionField
                      name="ProductId"
                      labelKey={option => `${option.Code} ${option.Name}`}
                      customFeedbackLabel=""
                      label={t("ReceiptDtl.Product")}
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
                          <div>مانده: {!!option.ProductWarehouses && option.ProductWarehouses.filter(x=>x.WarehouseId == defaultWarehouse.WarehouseId).length > 0? option.ProductWarehouses.filter(x=>x.WarehouseId == defaultWarehouse.WarehouseId)[0].Inventory: ""}</div>
                        </div>
                      )}
                    />
                  </div>
                  <div className="col-lg-6">
                    <Select
                      name="BuyDetailId"
                      label={t("ReceiptDtl.BuyDetail")}
                    >
                      {buyDetails.map((buyDetail) => (
                        <option
                          key={buyDetail.BuyDetailId}
                          value={buyDetail.BuyDetailId}
                        >
                          {!!buyDetail
                            ? !!buyDetail.Buy ? buyDetail.Buy.FactorNumber + (buyDetail.Buy.FactorDate? " - " + EnToFaDate(buyDetail.Buy.FactorDate): "") + (!!buyDetail? " - مانده: " + buyDetail.RemainingAmount: "") + (!!buyDetail.Buy.Provider? " - " + buyDetail.Buy.Provider.FullNameFa: ""): buyDetail.Title
                            : ""}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select
                      name="ProductUnitId"
                      label={t("ReceiptDtl.ProductUnit")}
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
                      isltr={true}
                      label={t("ReceiptDtl.Amount")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <DatePickerField
                      name="UseDateObj"
                      customFeedbackLabel=""
                      label={t("ReceiptDtl.UseDate")}
                      value={detail.UseDateObj}
                    />
                  </div>
                  <div className="col-lg-6">
                    <DatePickerField
                      name="ExpireDateObj"
                      customFeedbackLabel=""
                      label={t("ReceiptDtl.ExpireDate")}
                      value={detail.ExpireDateObj}
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
