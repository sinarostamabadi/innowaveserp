/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/RestaurantInvoices/RestaurantInvoicesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { RestaurantInvoiceEditForm } from "./RestaurantInvoiceEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import {
  useReactToPrint,
  getStorage,
  CloneObject,
  FaObjToEnDateTime,
} from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { RestaurantInvoiceDetailsUIProvider } from "../restaurantInvoice-details/RestaurantInvoiceDetailsUIContext";
import { RestaurantInvoiceDetailsTable } from "../restaurantInvoice-details/RestaurantInvoiceDetailsTable";
import { RestaurantInvoiceCostDiscountsUIProvider } from "../restaurantInvoice-cost-discount/RestaurantInvoiceCostDiscountsUIContext";
import { RestaurantInvoiceCostDiscountsTable } from "../restaurantInvoice-cost-discount/RestaurantInvoiceCostDiscountsTable";
import { Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../../../../../../core/_helpers/MoneyUtiles";
import { PrintReserve } from "../print-order/PrintOrder";
import moment from "jalali-moment";
import { EnToFaObjDate } from "src/core/_helpers";

export function RestaurantInvoiceEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const showMode =
    !!history &&
    !!history.location &&
    history.location.pathname.indexOf("/show") > -1;

  const { t } = useTranslation();
  const defaultRestaurant = !!getStorage("defaultRestaurant")
    ? JSON.parse(getStorage("defaultRestaurant"))
    : null;

  const initModel = {
    RestaurantInvoiceId: null,
    RestaurantId: !!defaultRestaurant ? defaultRestaurant.RestaurantId : "",
    Restaurant: defaultRestaurant,
    RestaurantTableId: "",
    RestaurantInvoiceStatusId: null,
    InvoiceNumber: 0,
    InvoiceDateObj: EnToFaObjDate(new Date()),
    InvoiceDate: moment.from().locale("en").format("YYYY-MM-DDTHH:mm:ss"),
    InvoicePrice: 0,
    DisountPrice: 0,
    CostPrice: 0,
    PersonId: !!getStorage("defaultPerson")
      ? JSON.parse(getStorage("defaultPerson")).PersonId
      : "",
    Person: !!getStorage("defaultPerson")
      ? JSON.parse(getStorage("defaultPerson"))
      : "",
    RestaurantInvoiceDtl: [],
    RestaurantInvoiceCost: [],
    RestaurantInvoiceDiscount: [],
  };
  const copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  const [title, setTitle] = useState("");
  const [invoiceDate, setInvoiceDate] = useState();
  const [personId, setPersonId] = useState();
  const [printModel, setPrintModel] = useState(null);
  const [prices, setPrices] = useState({
    InvoicePrice: 0,
    DisountPrice: 0,
    CostPrice: 0,
  });
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, restaurantInvoiceForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.restaurantInvoices.actionsLoading,
      restaurantInvoiceForEdit:
        state.restaurantInvoices.restaurantInvoiceForEdit,
      error: state.restaurantInvoices.error,
    }),
    shallowEqual
  );

  const [restaurantInvoiceObj, setRestaurantInvoiceObj] = useState(copyModel);
  const [restaurantInvoiceDetailsObj, setRestaurantInvoiceDetailsObj] =
    useState(initModel.RestaurantInvoiceDtl);
  const [restaurantInvoiceCostsObj, setRestaurantInvoiceCostsObj] = useState(
    initModel.RestaurantInvoiceCost
  );
  const [restaurantInvoiceDiscountsObj, setRestaurantInvoiceDiscountsObj] =
    useState(initModel.RestaurantInvoiceDiscount);

  useEffect(() => {
    dispatch(actions.fetchRestaurantInvoice(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("RestaurantInvoice.Entity");

    if (restaurantInvoiceForEdit && id) {
      _title = t("Common.Edit") + " " + restaurantInvoiceForEdit.InvoiceNumber;

      setRestaurantInvoiceObj({
        ...restaurantInvoiceForEdit,
        PersonId: [restaurantInvoiceForEdit.Person],
      });
      setPrices({
        InvoicePrice: restaurantInvoiceForEdit.InvoicePrice,
        DisountPrice: restaurantInvoiceForEdit.DisountPrice,
        CostPrice: restaurantInvoiceForEdit.CostPrice,
      });

      setRestaurantInvoiceDetailsObj(
        restaurantInvoiceForEdit.RestaurantInvoiceDtl
      );

      setRestaurantInvoiceDiscountsObj(
        restaurantInvoiceForEdit.RestaurantInvoiceDiscount
      );

      setRestaurantInvoiceCostsObj(
        restaurantInvoiceForEdit.RestaurantInvoiceCost
      );
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantInvoiceForEdit, id]);

  const saveRestaurantInvoice = (values) => {
    dispatch(
      actions.createRestaurantInvoice(values, (res) => {
        setPrintModel(res);
        handlePrint();
        //backToRestaurantInvoicesList();
      })
    )
      .then((arg) => {
        // setPrintModel(arg);
        // handlePrint();
        //backToRestaurantInvoicesList();
      })
      .catch((err) => {});
  };

  const btnRef = useRef("1");
  const btnRefDetails = useRef("2");
  const btnRefConsDiscount = useRef("3");
  const btnPrintRef = useRef();

  const saveRestaurantInvoiceClick = () => {
    btnRef.current.Collect((values) => {
      let saveObj = {};
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          const element = values[key];
          saveObj[key] = element;
        }
      }

      if (!!saveObj.InvoiceDateObj) {
        delete saveObj.InvoiceDate;

        saveObj["InvoiceDate"] = FaObjToEnDateTime(saveObj.InvoiceDateObj);
      }

      if (!!saveObj.PersonId && !!saveObj.PersonId.length > 0)
        saveObj.PersonId = saveObj.PersonId[0].PersonId;

      saveObj.RestaurantInvoiceId = null;
      saveObj.InvoiceNumber = +saveObj.InvoiceNumber;
      saveObj.RestaurantInvoiceStatusId = 1;
      saveObj.RestaurantId = +saveObj.RestaurantId;

      saveObj.RestaurantTableId = +saveObj.RestaurantTableId;

      saveObj.InvoicePrice = prices.InvoicePrice;
      saveObj.DisountPrice = prices.DisountPrice;
      saveObj.CostPrice = prices.CostPrice;

      delete saveObj.Restaurant;
      delete saveObj.InvoiceDateObj;
      delete saveObj.Person;

      btnRefDetails.current.Collect((values) => {
        let saveDetailsObj = [];

        values.forEach((detail) => {
          let detailObj = {};

          for (const key in detail) {
            if (detail.hasOwnProperty(key)) {
              const element = detail[key];
              if (detail[key] != null && detail[key] != undefined)
                detailObj[key] = element;
            }
          }

          delete detailObj.RestaurantMenuItem;
          // detailObj.RestaurantInvoiceDetailId = null;
          // detailObj.RestaurantInvoiceDtlId = null;

          saveDetailsObj.push(detailObj);
        });

        saveObj.RestaurantInvoiceDtl = saveDetailsObj;

        saveRestaurantInvoice(saveObj);
      });
    });
  };

  const backToRestaurantInvoicesList = () => {
    history.push(`/restaurant/restaurantInvoices`);
  };

  const changeRelated = useCallback((invoiceDateObj, personIdObj) => {
    setInvoiceDate(invoiceDateObj);
    setPersonId(personIdObj);
  });

  const notifyPrices = useCallback((invoicePrice, disountPrice, costPrice) => {
    setPrices({
      InvoicePrice: invoicePrice,
      DisountPrice: disountPrice,
      CostPrice: costPrice,
    });
  });

  const Print = () => {
    setPrintModel(restaurantInvoiceObj);
    handlePrint();
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 6pt;padding: 0;margin: 0;} @page { size: 80mm auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });
  return (
    <>
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
              onClick={backToRestaurantInvoicesList}
              className="btn btn-light"
            >
              <i className="fa fa-arrow-left"></i> {t("Common.Back")}
            </button>
            {`  `}
            <button className="btn btn-light ml-2">
              <i className="fa fa-redo"></i> {t("Common.Reset")}
            </button>
            {`  `}
            <button
              type="submit"
              className="btn btn-light ml-2"
              onClick={Print}
              disabled={!id}
            >
              <i className="fa fa-print"></i> {t("Common.Print")}
            </button>
            {!showMode && (
              <>
                {`  `}
                <button
                  type="submit"
                  className="btn btn-primary ml-2"
                  onClick={saveRestaurantInvoiceClick}
                >
                  <i className="fa fa-save"></i> {t("Common.Save")}
                </button>
              </>
            )}
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {(!!id &&
            !!restaurantInvoiceObj &&
            !!restaurantInvoiceObj.RestaurantInvoiceId) ||
          !!id == false ? (
            <>
              <RestaurantInvoiceEditForm
                actionsLoading={actionsLoading}
                restaurantInvoice={restaurantInvoiceObj}
                changeRelated={changeRelated}
                ref={btnRef}
              />
              <Row>
                <Col lg="12">
                  <h6>Order items</h6>
                  <RestaurantInvoiceDetailsUIProvider
                    invoceId={id}
                    personId={personId}
                    invoiceDate={invoiceDate}
                    restaurantInvoiceDetail={restaurantInvoiceDetailsObj}
                    masterSave={saveRestaurantInvoiceClick}
                    notifyPrices={notifyPrices}
                    ref={btnRefDetails}
                  >
                    <RestaurantInvoiceDetailsTable />
                  </RestaurantInvoiceDetailsUIProvider>
                </Col>
              </Row>
              <Row>
                <Col lg="12" style={{ fontSize: "1.2rem" }}>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td style={{ width: "150px" }}>
                          <strong>Total invoice :</strong>
                        </td>
                        <td>{numberWithCommas(prices.InvoicePrice)} Euro</td>
                        {/* <td>
                        <strong>جمع کل تخفیف:</strong>
                      </td>
                      <td>123456789 ریال</td>
                      <td>
                        <strong>تخفیف قابل اعمال:</strong>
                      </td>
                      <td>123456789 ریال</td>
                      <td>
                        <strong>مبلغ قابل پرداخت:</strong>
                      </td>
                      <td>123456789 ریال</td> */}
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </>
          ) : (
            <p>{t("App.Loading")}</p>
          )}
        </CardBody>
      </Card>
      <div style={{ display: "none", height: "auto" }}>
        <PrintReserve ref={componentRef} data={printModel} />
      </div>
    </>
  );
}
