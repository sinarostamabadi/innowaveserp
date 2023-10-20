import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  createRef,
  useRef,
} from "react";
import { Formik, Form, Field } from "formik";
import { Row, Col } from "react-bootstrap";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useTranslation } from "react-i18next";
import { suggestProduct } from "../../../../Warehouse/_redux/products/productsCrud";
import {
  CardHeaderTitle,
  SuggestionField,
  Card,
  CardBody,
  CardHeader,
} from "../../../../../../core/_partials/controls";
import { numberWithCommas } from "../../../../../../core/_helpers";

export function ProductShow({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const handle = useFullScreenHandle();

  const defaultInput = createRef();

  useEffect(() => {
    !!defaultInput.current && defaultInput.current.focus();
  }, [defaultInput]);

  const [hasError, setHasError] = useState(false);
  const [lastProduct, setLastProduct] = useState(false);
  const [barcode, setBarcode] = useState(true);
  const [detailsModel, setDetailsModel] = useState({
    ProductId: null,
    Count: 1,
  });

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  function addByBarcode(text) {
    let barcode = text;
    let bars = ("" + barcode).split("-");
    let code = bars[0];
    let unit = bars[1] || "4";
    let amount = bars[2];
    let serial = bars[3];

    if (text[0] == 2) {
      code = text.substring(1, 6);
      amount = text.substring(6, 9);
      amount = amount + "." + text.substring(9, 12);
      amount = +amount;
    }
    suggestProduct(code).then(({ data }) => {
      if (data.Items.length == 0) return;

      if (!!data.Items[0].SellPricingDetailId) {
        setHasError(false);
        setLastProduct(data.Items[0]);
      } else {
        setHasError(true);
        setLastProduct(data.Items[0]);
      }

    });
  }

  function addDetail(detail) {
    if (!!detail.ProductId[0].SellPricingDetailId) {
      setHasError(false);
      setLastProduct(detail.ProductId[0]);
    } else {
      setHasError(true);
      setLastProduct(detail.ProductId[0]);

      return;
    }

  }

  const [optionList, setOptionList] = useState([]);
  const [textBarcode, setText] = useState("");
  const [resetingForm, setResetingForm] = useState(false);
  function resetFormHard() {
    setResetingForm(true);
    setTimeout(() => {
      setResetingForm(false);
    }, 100);
  }

  return (
    <>
      <FullScreen handle={handle}>
        <Card style={{ height: "100%", backgroundColor: "#b089ff" }}>
          <CardHeader>
            {!handle.active && (
              <button
                className="btn btn-outline-primary"
                style={{
                  float: "left",
                  position: "absolute",
                  left: "0",
                  top: "0",
                }}
                onClick={handle.enter}
              >
                <i className="fas fa-window-maximize p-0"></i>
              </button>
            )}
            {handle.active && (
              <button
                className="btn btn-outline-primary"
                style={{
                  float: "left",
                  position: "absolute",
                  left: "0",
                  top: "0",
                }}
                onClick={handle.exit}
              >
                <i className="fas fa-window-minimize p-0"></i>
              </button>
            )}
            <CardHeaderTitle
              style={{
                padding: "2rem",
                textAlign: "center",
                width: "100%",
                color: "#ffe300",
                fontSize: "1.7rem",
                textShadow: "0 0 1px #ffe300",
              }}
            >
              مشاهده قیمت کالا
            </CardHeaderTitle>
          </CardHeader>
          <CardBody>
            {!resetingForm && (
              <Formik
                key="BySuggestion"
                enableReinitialize={true}
                initialValues={{}}
                onSubmit={(values) => {
                  addDetail(values);
                  resetFormHard();
                }}
              >
                {({ handleSubmit }) => (
                  <>
                    <Row className="w-100 m-0">
                      <Col md={12} className="m-0 p-5">
                        <SuggestionField
                          name="ProductId"
                          labelKey="Name"
                          customFeedbackLabel=""
                          setref={defaultInput}
                          placeHolder={t("msg.SelectBySuggestion")}
                          handleSearch={handleSuggestionProduct}
                          // onInputChange={(text, e) => {
                          //   // setText(text);
                          //   console.log(text)
                          //   // handleSuggestionProduct(text, (items) => {
                          //   //   setOptionList(items);
                          //   // });
                          // }}
                          handleOnChange={(val) => {
                            if (val == null) handleSubmit();
                          }}
                          // optionList={optionList}
                          onKeyPress={(e) => {
                            if (e.keyCode === 13) {
                              addByBarcode(defaultInput.current.state.text);
                              // resetFormHard();
                            }
                            // if (
                            //   e.keyCode == 13 &&
                            //   (optionList.length < 2 || optionList.length == 0)
                            // ) {
                            //   addByBarcode(textBarcode);
                            //   console.log("keyPress")
                            //   // resetFormHard();
                            // }
                          }}
                          renderMenuItemChildren={(option, props) => (
                            <div>
                              <h6>{option.Name}</h6>
                              <span>{option.Code}</span>
                            </div>
                          )}
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </Formik>
            )}
            {!hasError && !!lastProduct && (
              <div
                className="alert mt-3"
                style={{ fontSize: "1.5rem", color: "#fff" }}
                role="alert"
              >
                <Row>
                  <Col md={12}>
                    <b>کالا: </b>
                    {lastProduct.Name}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <b>کد: </b>
                    {lastProduct.Code}
                  </Col>
                  <Col md={6}>
                    <b>گروه: </b>
                    {lastProduct.ProductGroup?.Title}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <b>قیمت واحد: </b>{" "}
                    {numberWithCommas(lastProduct.SellPricingDetail?.Price)}{" "}
                    ریال
                  </Col>
                  <Col md={6}>
                    <b>واحد شمارش: </b>
                    {lastProduct.BaseUnit?.Name}
                  </Col>
                </Row>
              </div>
            )}
            {hasError && !!lastProduct && (
              <div className="alert alert-danger mt-3" role="alert">
                <Row>
                  <Col md={12}>
                    <b>کالا: </b>
                    {lastProduct.Name}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <b>کد: </b>
                    {lastProduct.Code}
                  </Col>
                  <Col md={6}>
                    <b>گروه: </b>
                    {lastProduct.ProductGroup?.Title}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <b>قیمت واحد: </b>قیمت‌گذاری نشده
                  </Col>
                  <Col md={6}>
                    <b>واحد شمارش: </b>
                    {lastProduct.BaseUnit?.Name}
                  </Col>
                </Row>
              </div>
            )}
          </CardBody>
          <img src="/media/bg/sell.png" />
        </Card>
      </FullScreen>
    </>
  );
}
