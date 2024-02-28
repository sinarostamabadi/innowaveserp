import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ModalProgressBar } from "src/core/_partials/controls";
import { getRestaurantInvoiceById } from "../../../_redux/RestaurantInvoices/RestaurantInvoicesCrud";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { useReactToPrint, numberWithCommas } from "src/core/_helpers";
import { PrintInvoice } from "../print-invoice/PrintInvoice";
import { createCashRequest } from "src/app/modules/Cash/_redux/cashDocuments/cashDocumentsCrud";

export function RestaurantInvoiceCheckout({ id, show, onHide }) {
  const { t } = useTranslation();
  let history = useHistory();
  const dispatch = useDispatch();
  const [invoiceModelPay, setInvoiceModelPay] = useState(null);
  const [printModel, setPrintModel] = useState(null);

  const { isLoading, entities } = useSelector(
    (state) => ({
      isLoading: state.restaurantInvoices.actionsLoading,
      entities: state.restaurantInvoices.entities,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    } else {
      setInvoiceModelPay({
        ...entities.filter((model) => model.RestaurantInvoiceId == id)[0],
        RestaurantInvoiceStatusId: 3,
        PaymentPrice:
          entities.filter((model) => model.RestaurantInvoiceId == id)[0]
            .PaymentPrice || 0,
        PosPrice:
          entities.filter((model) => model.RestaurantInvoiceId == id)[0]
            .PosPrice || 0,
        GuestPrice:
          entities.filter((model) => model.RestaurantInvoiceId == id)[0]
            .GuestPrice || 0,
        PaymentDesc:
          entities.filter((model) => model.RestaurantInvoiceId == id)[0]
            .PaymentDesc || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {}, [isLoading, dispatch]);

  const Print = () => {
    getRestaurantInvoiceById(id).then((res) => {
      setPrintModel(res.data);
      handlePrint();
    });
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 5pt;padding: 0;margin: 0;} @page { size: 80mm auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
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
        onSubmit={(values) => {
          createCashRequest(+id, 3).then(({ data }) =>
            history.push(`/cash/cashDocuments/quick/${data}`)
          );
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              {isLoading && <ModalProgressBar variant="query" />}
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  {t("Common.Checkout") + " " + t("RestaurantInvoice.Entity")}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4 className="clearfix mb-5">
                  <b>مبلغ کل فاکتور: </b>
                  {!!invoiceModelPay == true
                    ? numberWithCommas(invoiceModelPay.InvoicePrice) + " ریال "
                    : ""}
                  <Button type="button" onClick={Print} className="float-right">
                    <i className="fas fa-print"></i>
                    چاپ صورت حساب
                  </Button>
                </h4>
                <div style={{ display: "none", height: "auto" }}>
                  <PrintInvoice ref={componentRef} data={printModel} />
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
                    {t("Common.Pay")}
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
