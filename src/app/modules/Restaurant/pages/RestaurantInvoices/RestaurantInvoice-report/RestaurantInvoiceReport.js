import React, { useEffect, useMemo, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";
import { useRestaurantInvoicesUIContext } from "../RestaurantInvoicesUIContext";
import { useTranslation } from "react-i18next";
import { Row, Col, Button } from "react-bootstrap";
import { DatePickerField } from "../../../../../../core/_partials/controls";
import { getFreeRestaurantTables } from "./../../../_redux/RestaurantTables/RestaurantTablesCrud";
import { getReport } from "../../../_redux/RestaurantInvoices/RestaurantInvoicesCrud";
import {
  useReactToPrint,
  getStorage,
  FaObjToEnDateTime,
  DateObjToDate,
} from "../../../../../../core/_helpers";
import { PrintReport } from "../print-report/PrintReport";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";

export function RestaurantInvoiceReport() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, serPreview] = useState(false);
  const [printModel, setPrintModel] = useState(null);

  const defaultRestaurant = !!getStorage("defaultRestaurant")
    ? JSON.parse(getStorage("defaultRestaurant"))
    : null;

  const uiContext = useRestaurantInvoicesUIContext();
  const uiProps = useMemo(() => {
    return {
      show: uiContext.showReportDialog,
      onHide: uiContext.closeReportDialog,
    };
  }, [uiContext]);

  useEffect(() => {
    setError(null);
    setPrintModel(null);
    serPreview(false);
  }, [uiProps.show]);

  const print = (values) => {
    setIsLoading(true);
    getReport({
      ...values,
      FromDate: FaObjToEnDateTime(values.FromDate),
      ToDate: FaObjToEnDateTime(values.ToDate),
    })
      .then((res) => {
        setPrintModel({
          ...res.data,
          Param: {
            FromDate: DateObjToDate(values.FromDate),
            ToDate: DateObjToDate(values.ToDate),
            Title: !!defaultRestaurant ? defaultRestaurant.Title : "",
          },
        });
        setIsLoading(false);

        if (preview == false) handlePrint();

        //onHide();
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const [reportModel] = useState({
    ItemId: !!defaultRestaurant ? +defaultRestaurant.RestaurantId : null,
    FromDate: "",
    ToDate: "",
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 6pt;padding: 0;margin: 0;} @page { size: 80mm auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });

  return (
    <Modal
      show={uiProps.show}
      onHide={uiProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Formik
        enableReinitialize={true}
        initialValues={reportModel}
        onSubmit={(values) => {
          print(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              {isLoading && <ModalProgressBar variant="query" />}
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  {t("Reports.CashReport", {
                    0: !!defaultRestaurant ? defaultRestaurant.Title : "",
                  })}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {!isLoading && error != null && (
                  <div style={{ margin: "auto -1.25rem" }}>
                    <Alerty
                      variant="danger"
                      title={t("err.Error")}
                      description={error}
                    ></Alerty>
                  </div>
                )}
                <Row>
                  <Col lg="6">
                    <DatePickerField
                      key="FromDate"
                      name="FromDate"
                      label={t("ReportFields.FromDate")}
                      customFeedbackLabel=""
                    />
                  </Col>
                  <Col lg="6">
                    <DatePickerField
                      key="ToDate"
                      name="ToDate"
                      label={t("ReportFields.ToDate")}
                      customFeedbackLabel=""
                    />
                  </Col>
                </Row>
                <div
                  style={{
                    border: "2px solid #000",
                    marginTop: "2rem",
                    display: preview ? "block" : "none",
                  }}
                >
                  <PrintReport ref={componentRef} data={printModel} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div>
                  <button
                    type="button"
                    onClick={uiProps.onHide}
                    className="btn btn-light btn-elevate"
                  >
                    {t("Common.Cancel")}
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => {
                      serPreview(false);
                      handleSubmit();
                    }}
                    className="btn btn-delete btn-success"
                  >
                    {t("Common.Print")}
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => {
                      serPreview(true);
                      handleSubmit();
                    }}
                    className="btn btn-delete btn-success"
                  >
                    {t("Common.PrintPreview")}
                  </button>
                </div>
              </Modal.Footer>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  );
}
