import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Row, Col, Button } from "react-bootstrap";
import { useReactToPrint } from "../../../../../../core/_helpers/Print";
import { PrintLabel } from "./PrintLabel.js";
import { Input, SuggestionField } from "../../../../../../core/_partials/controls";
import { suggestProduct } from "../../../_redux/products/productsCrud";

export function ProductPrintLabels({ id, show, onHide }) {
  const { t } = useTranslation();
  const [printModel, setPrintModel] = useState(null);
  const [invoiceModelPay, setInvoiceModelPay] = useState({
      Product: "",
      Count: ""
  });

  const Print = (values) => {
    setPrintModel(values);
    handlePrint();
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 5pt;padding: 0;margin: 0;} @page { size: 105mm auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Formik
        enableReinitialize={true}
        initialValues={invoiceModelPay}
        onSubmit={(values) => Print(values)}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  {t("Common.Print") + " " + t("Common.Labels")}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className="form-group">
                  <Col lg={9}>
                  <SuggestionField
                      name="ProductId"
                      labelKey="Name"
                      customFeedbackLabel=""
                      label={t("ReceiptDtl.Product")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionProduct}
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Name}</h6>
                        </div>
                      )}
                    />
                  </Col>
                  <Col lg={3}>
                    <Field
                      name="Count"
                      component={Input}
                      type="number"
                      customFeedbackLabel=""
                      label={t("Common.Count")}
                    />
                  </Col>
                </Row>
                <div style={{ display: "none", height: "auto" }}>
                  <PrintLabel ref={componentRef} data={printModel} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div>
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                  >
                    {t("Common.Cancel")}
                  </button>{" "}
                  <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="btn btn-delete btn-success"
                  >
                    {t("Common.Print")}
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
