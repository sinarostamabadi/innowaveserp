import React, {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import {
  Input,
  Select,
  CheckboxField,
  DatePickerField,
  TextArea,
} from "../../../../../../core/_partials/controls";
import { FaObjToEnDateTime, getStorage } from "../../../../../../core/_helpers";
import { DefaultWarehouse } from "../../../../../../core/_partials/custom/defaults/DefaultWarehouse";
import { BuyRequestStatus } from "../BuyRequestsUIContext";

export const BuyRequestEditForm = forwardRef(({ buyRequest }, ref) => {
  const { t } = useTranslation();
  const defaultWarehouse = !!getStorage("defaultWarehouse")
    ? JSON.parse(getStorage("defaultWarehouse"))
    : null;
  const defaultInput = useRef(null);
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  let callBack;
  const BuyRequestEditSchema = Yup.object().shape({
    WarehouseId: Yup.string().required(
      t("err.IsRequired", { 0: t("BuyRequest.Warehouse") }) +
      "!! Go to the warehouse dashboard to choose the default warehouse!!"
    ),
    BuyRequestDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("BuyRequest.BuyRequestDate") }))
      .nullable(),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnBuyRequestSend");
      btnSend.click();
    },
  }));

  function cleanData(data) {
    return {
      BuyRequestId: buyRequest.BuyRequestId,
      WarehouseId: !!defaultWarehouse ? +defaultWarehouse.WarehouseId : null,
      BuyRequestDate: FaObjToEnDateTime(data.BuyRequestDateObj),
      BuyRequestStatusId: data.BuyRequestStatusId,
      Description: data.Description,
      BuyRequestDetails: [],
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={buyRequest}
        validationSchema={BuyRequestEditSchema}
        onSubmit={(values) => {
          !!callBack && callBack(cleanData(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <Row className="form-group">
                <Col md="4">
                  {/* <label>{t("BuyRequest.Warehouse")}</label>
                  <input
                    className="form-control"
                    readOnly={true}
                    disabled={true}
                    value={!!defaultWarehouse ? defaultWarehouse.Title : ""}
                  />
                  <Field
                    name="WarehouseId"
                    component={Input}
                    disabled={true}
                    readonly={true}
                    type="hidden"
                    value={
                      !!defaultWarehouse ? defaultWarehouse.WarehouseId : ""
                    }
                  /> */}
                  <DefaultWarehouse
                    name="WarehouseId"
                    defaultWarehouse={buyRequest.Warehouse}
                  />
                </Col>
                <Col md="4">
                  <DatePickerField
                    name="BuyRequestDateObj"
                    customFeedbackLabel=""
                    label={t("BuyRequest.BuyRequestDate")}
                    value={buyRequest.BuyRequestDateObj}
                  />
                </Col>
                <Col md="4">
                  <label>{t("BuyRequest.BuyRequestStatus")}</label>
                  <input
                    className="form-control"
                    readOnly={true}
                    disabled={true}
                    value={BuyRequestStatus[buyRequest.BuyRequestStatusId]}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Field
                    name="Description"
                    component={TextArea}
                    customFeedbackLabel=""
                    label={t("BuyRequest.Description")}
                  />
                </Col>
              </Row>
              <button
                id="BtnBuyRequestSend"
                type="submit"
                style={{ display: "none" }}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
});
