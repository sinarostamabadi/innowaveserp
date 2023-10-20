import React, {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import moment from "jalali-moment";
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
  SuggestionField,
} from "src/core/_partials/controls";
import { getAllWarehouses } from "../../../../General/_redux/warehouses/warehousesCrud";
import { FaObjToEnDateTime } from "src/core/_helpers";
import { suggestPerson } from "../../../../Core/_redux/people/peopleCrud";
import { DefaultWarehouse } from "src/core/_partials/custom/defaults/DefaultWarehouse";

export const ReceiptEditForm = forwardRef(({ receipt }, ref) => {
  const { t } = useTranslation();
  const defaultInput = useRef(null);
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  let callBack;
  const ReceiptEditSchema = Yup.object().shape({
    WarehouseId: Yup.string().required(
      t("err.IsRequired", { 0: t("Receipt.Warehouse") })
    ),
    PersonId: Yup.array().required(
      t("err.IsRequired", { 0: t("Receipt.Person") })
    ),
    ReceiptDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("Receipt.ReceiptDate") }))
      .nullable(),
    ReceiptNo: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Receipt.ReceiptNo") })),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnReceiptSend");
      btnSend.click();
    },
  }));

  function cleanData(data) {
    return {
      ReceiptId: receipt.ReceiptId,
      ReceiptNo: data.ReceiptNo,
      PersonId:
        Array.isArray(data.PersonId) && data.PersonId.length > 0
          ? +data.PersonId[0].PersonId
          : !!data.PersonId
          ? data.PersonId
          : null,
      WarehouseId: +data.WarehouseId,
      ReceiptDate: FaObjToEnDateTime(data.ReceiptDateObj),
      ReceiptTypeId: data.ReceiptTypeId,
      YearId: !!data.YearId ? +data.YearId : null,
      BaseAssignmentId: null,
      OtherWareHouseId: !!data.OtherWareHouseId ? +data.OtherWareHouseId : null,
      Des: data.Des,
      Archive: data.Archive,
      ReceiptDtls: [],
    };
  }

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    if (warehouses.length == 0)
      getAllWarehouses().then(({ data }) =>
        setWarehouses((warehouses) => [
          { WarehouseId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [warehouses.length]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={receipt}
        validationSchema={ReceiptEditSchema}
        onSubmit={(values) => {
          !!callBack && callBack(cleanData(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <Row className="form-group">
                <Col md={3}>
                  <DefaultWarehouse
                    name="WarehouseId"
                    defaultWarehouse={receipt.Warehouse}
                  />
                </Col>
                {receipt.ReceiptTypeId == 3 && (
                  <Col md={3}>
                    <Select
                      name="OtherWareHouseId"
                      label={t("Receipt.OtherWarehouse")}
                    >
                      {warehouses.map((warehouse) => (
                        <option
                          key={warehouse.WarehouseId}
                          value={warehouse.WarehouseId}
                        >
                          {warehouse.Title}
                        </option>
                      ))}
                    </Select>
                  </Col>
                )}
                <Col md={3}>
                  <SuggestionField
                    name="PersonId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("Receipt.Person")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPerson}
                    defaultValue={
                      receipt && receipt.Person ? [receipt.Person] : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.FullNameFa}</h6>
                      </div>
                    )}
                  />
                </Col>
                <Col md={3}>
                  <DatePickerField
                    name="ReceiptDateObj"
                    customFeedbackLabel=""
                    label={t("Receipt.ReceiptDate")}
                    minimumDate={{
                      year: +moment()
                        .locale(process.env.REACT_APP_DATE)
                        .format("YYYY"),
                      month: 1,
                      day: 1,
                    }}
                    value={receipt.ReceiptDateObj}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={3}>
                  <Field
                    name="ReceiptNo"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Receipt.ReceiptNo")}
                  />
                </Col>
                <Col>
                  <Field
                    name="Des"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Receipt.Des")}
                  />
                </Col>
                <Col md="auto">
                  <CheckboxField
                    name="Archive"
                    customFeedbackLabel=""
                    label={t("Receipt.Archive")}
                  />
                </Col>
              </Row>
              <button
                id="BtnReceiptSend"
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
