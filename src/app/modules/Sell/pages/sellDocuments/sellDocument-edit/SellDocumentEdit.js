/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import moment from "jalali-moment";
import { Row, Col } from "react-bootstrap";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Card, CardBody, CardFooter } from "src/core/_partials/controls";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { useReactToPrint, EnToFaObjDate, CloneObject } from "src/core/_helpers";
import { SellDocumentEditForm } from "./SellDocumentEditForm";
import { DetailsUIProvider } from "../sellDocument-details/DetailsUIContext";
import { Details } from "../sellDocument-details/Details";
import { PrintSell } from "../print-sell/PrintSell";
import { createRealPerson } from "../../../../Core/_redux/realPersons/realPersonsCrud";
import { calculate } from "../../../_redux/sellDocuments/sellDocumentsCrud";
import { createCashRequest } from "src/app/modules/Cash/_redux/cashDocuments/cashDocumentsCrud";
import * as actions from "../../../_redux/sellDocuments/sellDocumentsActions";
import "src/core/_assets/sass/pages/wizard/wizard-1.scss";

export function SellDocumentEdit({
  history,
  match: {
    params: { id },
  },
  mode,
}) {
  const { t } = useTranslation();
  const handle = useFullScreenHandle();

  const initModel = {
    SellDocumentId: "",
    SellDocumentDateObj: EnToFaObjDate(new Date()),
    SellDocumentDate: moment
      .from()
      .locale("en")
      .format("YYYY-MM-DDTHH:mm:ss"),
    IsCanceled: false,
    PersonId: "",
    Person: "",
    FirstNameFa: "",
    LastNameFa: "",
    Mobile: "",
    IsTemp: true,
    SettlementId: undefined,
    Description: "",
    Price: 0,
    DiscountPrice: 0,
    PayablePrice: 0,
    BeforePayablePrice: "",
    CanceledSellDocumentId: "",
    PaymentTrackingCode: undefined,
    PaymentInfo: undefined,
    SellDocumentDetails: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs

  const [payError, setPayError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [beforeSell, setBeforeSell] = useState(null);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const [sellDocumentObj, setSellDocumentObj] = useState(copyModel);
  const [detailsObj, setDetailsObj] = useState(copyModel.SellDocumentDetails);
  const [printModel, setPrintModel] = useState(null);
  const [paymentObj, setPaymentObj] = useState({
    PayType: "Pos",
    CreditPrice: 0,
    PointPrice: 0,
    WalletPrice: 0,
    BonNumber: "",
    BonPrice: null,
    IsCreditPrice: false,
    IsPointPrice: false,
    IsWalletPrice: false,
    IsBonPrice: false,
  });

  function mapFromServerObject(serverObj) {
    return {
      SellDocumentDateObj: EnToFaObjDate(serverObj.SellDocumentDate),
      BeforePayablePrice: beforeSell,
      PersonId: [
        {
          PersonId: serverObj.PersonId,
          FullNameFa:
            serverObj.Person.RealPerson.FirstNameFa +
            " " +
            serverObj.Person.RealPerson.LastNameFa,
        },
      ],
      Person: {
        PersonId: serverObj.PersonId,
        FullNameFa: serverObj.Person.FullNameFa,
        FullNameEn: serverObj.Person.FullNameEn,
        RealPerson: serverObj.Person.RealPerson,
        CreditPrice: !!serverObj.Person ? +serverObj.Person.CreditPrice : null,
        PointPrice: !!serverObj.Person ? +serverObj.Person.PointPrice : null,
        RelationPersonGroups: serverObj.Person.RelationPersonGroups
      },
      FirstNameFa: serverObj.Person.RealPerson.FirstNameFa,
      LastNameFa: serverObj.Person.RealPerson.LastNameFa,
      BirthDate: serverObj.Person.RealPerson.BirthDate,
      NationalCode: serverObj.Person.RealPerson.NationalCode,
      Mobile: serverObj.Person.Mobile,
      GenderId: serverObj.Person.RealPerson.GenderId,
    };
  }

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, sellDocumentForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.sellDocuments.actionsLoading,
      sellDocumentForEdit: state.sellDocuments.sellDocumentForEdit,
      error: state.sellDocuments.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchSellDocument(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (sellDocumentForEdit && id && sellDocumentForEdit.SellDocumentId == id) {
      setPrintModel({
        ...sellDocumentForEdit,
        ...mapFromServerObject(sellDocumentForEdit),
      });

      if (mode == 1) {
        setBeforeSell(sellDocumentForEdit.PayablePrice);

        setSellDocumentObj({
          ...sellDocumentForEdit,
          ...mapFromServerObject(sellDocumentForEdit),
          SellDocumentId: "",
          CanceledSellDocumentId: id,
          IsCanceled: false,
        });
      } else if (mode == 2) {
        setSellDocumentObj({
          ...sellDocumentForEdit,
          ...mapFromServerObject(sellDocumentForEdit),
        });

        setPaymentObj({
          PayType: sellDocumentForEdit.PayType == 2 ? "Pos" : "Cash",
          CreditPrice: sellDocumentForEdit.CreditPrice,
          PointPrice: sellDocumentForEdit.PointPrice,
          WalletPrice: sellDocumentForEdit.WalletPrice,
          BonNumber: sellDocumentForEdit.BonNumber,
          BonPrice: sellDocumentForEdit.BonPrice,
          IsCreditPrice: !!sellDocumentForEdit.CreditPrice,
          IsPointPrice: !!sellDocumentForEdit.PointPrice,
          IsWalletPrice: !!sellDocumentForEdit.WalletPrice,
          IsBonPrice: !!sellDocumentForEdit.BonPrice,
        });

        setStep(3);
      } else {
        setBeforeSell(null);

        setSellDocumentObj({
          ...sellDocumentForEdit,
          ...mapFromServerObject(sellDocumentForEdit),
        });
      }

      setDetailsObj(sellDocumentForEdit.SellDocumentDetails);
      setEditMode(true);
    }

    suhbeader.setTitle(t("SellDocument.Entity"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDocumentForEdit, id]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 7pt;padding: 0;margin: 0;} @page { size: 80mm auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });
  const Print = () => {
    handlePrint();
  };

  const saveSellDocument = (values) => {
    if (!sellDocumentObj.SellDocumentId) {
      dispatch(
        actions.createSellDocument(values, (data) => {
          setSellDocumentObj({
            ...data,
            ...mapFromServerObject(data),
          });

          setDetailsObj(data.SellDocumentDetails);
          setPrintModel({
            ...data,
            ...mapFromServerObject(data),
          });

          setStep(step + 1);
        })
      );
    } else {
      dispatch(
        actions.updateSellDocument(
          sellDocumentObj.SellDocumentId,
          values,
          ({ data }) => {
            setSellDocumentObj({
              ...data,
              ...mapFromServerObject(data),
            });

            setDetailsObj(detailsObj);
            setPrintModel({
              ...data,
              ...mapFromServerObject(data),
            });
            setStep(step + 1);
          }
        )
      );
    }
  };

  const btnRefSellDocument = useRef("1");
  const btnRefDetails = useRef("2");
  const saveSellDocumentClick = () => {
    if (step == 1 && btnRefSellDocument && btnRefSellDocument.current) {
      btnRefSellDocument.current.Collect((datas) => {
        if (!!datas.PersonId) saveSellDocument(datas);
        else
          createRealPerson({
            PersonId: undefined,
            Mobile: datas.Person.Mobile,
            FullNameEn: datas.Person.FullNameEn,
            RealPerson: {
              RealPersonId: undefined,
              FirstNameFa: !!datas.Person.FirstNameFa
                ? datas.Person.FirstNameFa
                : null,
              NationalCode: !!datas.Person.NationalCode
                ? datas.Person.NationalCode
                : null,
              LastNameFa: !!datas.Person.LastNameFa
                ? datas.Person.LastNameFa
                : null,
              BirthDate: !!datas.Person.BirthDate
                ? datas.Person.BirthDate
                : null,
              GenderId: !!datas.Person.GenderId ? +datas.Person.GenderId : null,
            },
            RelationPersonGroups: datas.Person.RelationPersonGroups
          }).then(({ data }) => {
            saveSellDocument({ ...datas, PersonId: data.PersonId });
          });
      });
    }
    if (step == 2) {
      calculate(sellDocumentObj.SellDocumentId).then(({ data }) => {
        setSellDocumentObj(data);
        setDetailsObj(data.SellDocumentDetails);
        setPrintModel({ ...data, ...mapFromServerObject(data) });
        setStep(step + 1);
      });
    }
  };

  const backToSellDocumentsList = () => {
    history.push(`/sell/sellDocuments`);
  };

  useEffect(() => {
    const sumOfOptions =
      +paymentObj.PointPrice +
      +paymentObj.CreditPrice +
      +paymentObj.WalletPrice +
      +paymentObj.BonPrice;

    if (sumOfOptions > sellDocumentObj.PayablePrice)
      setPayError(
        `جمع مبالغ (${sumOfOptions}) از مبلغ فاکتور (${sellDocumentObj.PayablePrice}) بیشتر می‌باشد.`
      );
    else setPayError(null);

    if (step == 3) {
      setPrintModel({
        ...sellDocumentObj,
        ...mapFromServerObject(sellDocumentObj),
        SettlementId: paymentObj.PayType == "Pos" ? 2 : 1,
        CreditPrice: paymentObj.IsCreditPrice ? +paymentObj.CreditPrice : null,
        PointPrice: paymentObj.IsPointPrice ? +paymentObj.PointPrice : null,
        WalletPrice: paymentObj.IsWalletPrice ? +paymentObj.WalletPrice : null,
        BonPrice: paymentObj.IsBonPrice ? +paymentObj.BonPrice : null,
        BonNumber: paymentObj.IsBonPrice ? paymentObj.BonNumber + "" : null,
      });
    }
  }, [paymentObj]);

  function usableBonPrice(bonPrice, payablePrice) {
    const maxBonPrice = 1000000;
    let useBonPrice = 0;
    let finalBon = 0;

    if (bonPrice > maxBonPrice) useBonPrice = maxBonPrice;
    else useBonPrice = bonPrice;

    if (payablePrice > useBonPrice) finalBon = useBonPrice;
    else finalBon = payablePrice;

    return finalBon;
  }
  function closeSellDocument() {
    createCashRequest(sellDocumentObj.SellDocumentId, 6).then(({ data }) =>
      history.push(`/cash/cashDocuments/quick/${data}`)
    );
  }

  return (
    <>
      <FullScreen handle={handle}>
        <Card style={{ height: "100%" }}>
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
          <CardBody style={{ padding: "1rem", height: "100%" }}>
            <div
              className="wizard wizard-1"
              id="kt_wizard"
              data-wizard-state="first"
              data-wizard-clickable="false"
              style={{ height: "100%" }}
            >
              <div
                className="wizard-nav border-bottom"
                style={{ height: "15%" }}
              >
                <div className="wizard-steps p-1 position-relative">
                  <div
                    className="wizard-step mx-8 position-relative"
                    data-wizard-type="step"
                    data-wizard-state={
                      step == 1 ? "current" : step > 1 ? "done" : "pending"
                    }
                  >
                    <div className="wizard-label">
                      <i className="wizard-icon fimanager flaticon-shop-online-support"></i>
                      <h3 className="wizard-title">1. اطلاعات مشتری</h3>
                    </div>
                    <i
                      className={
                        "fad fa-arrow-left position-absolute " +
                        (step >= 1 && "text-primary")
                      }
                      style={{ left: "-2.5rem" }}
                    ></i>
                  </div>
                  <div
                    className="wizard-step mx-8 position-relative"
                    data-wizard-type="step"
                    data-wizard-state={
                      step == 2 ? "current" : step > 2 ? "done" : "pending"
                    }
                  >
                    <div className="wizard-label">
                      <i className="wizard-icon fimanager flaticon-shop-note"></i>
                      <h3 className="wizard-title">2. لیست فروش</h3>
                    </div>
                    <i
                      className={
                        "fad fa-arrow-left position-absolute " +
                        (step >= 2 && "text-primary")
                      }
                      style={{ left: "-2.5rem" }}
                    ></i>
                  </div>
                  <div
                    className="wizard-step mx-8"
                    data-wizard-type="step"
                    data-wizard-state={step == 3 ? "current" : "pending"}
                  >
                    <div className="wizard-label">
                      <i className="wizard-icon fimanager flaticon-shop-cashbox"></i>
                      <h3 className="wizard-title">3. صندوق فروش</h3>
                    </div>
                  </div>
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
                </div>
              </div>
              <div
                className="row justify-content-center pt-3"
                style={{ height: "85%", display: "block" }}
              >
                <div
                  className="col form fv-plugins-bootstrap fv-plugins-framework"
                  style={{ height: "100%" }}
                >
                  <div
                    className="pb-5"
                    data-wizard-type="step-content"
                    data-wizard-state={step == 1 ? "current" : ""}
                    style={{ height: "100%" }}
                  >
                    {step == 1 && (
                      <SellDocumentEditForm
                        actionsLoading={actionsLoading}
                        sellDocument={sellDocumentObj}
                        ref={btnRefSellDocument}
                        setSellDocument={setSellDocumentObj}
                      />
                    )}
                  </div>
                  <div
                    className="pb-5"
                    data-wizard-type="step-content"
                    data-wizard-state={step == 2 ? "current" : ""}
                    style={{ height: "100%" }}
                  >
                    {step == 2 && (
                      <>
                        <DetailsUIProvider
                          currentSellDocumentId={id}
                          actionsLoading={actionsLoading}
                          detail={detailsObj}
                          ref={btnRefDetails}
                          setSellDocument={setSellDocumentObj}
                          sellDocument={sellDocumentObj}
                        >
                          <Details />
                        </DetailsUIProvider>
                      </>
                    )}
                  </div>
                  <div
                    className="pb-5"
                    data-wizard-type="step-content"
                    data-wizard-state={step == 3 ? "current" : ""}
                    style={{ height: "100%", overflowY: "auto" }}
                  >
                    {step == 3 && (
                      <div style={{ width: "150mm", margin: "0 auto" }}>
                        <PrintSell ref={componentRef} data={printModel} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="p-3 dir-ltr text-right">
            {mode != 2 ? (
              <Formik enableReinitialize={true} initialValues={paymentObj}>
                {({ handleSubmit, values, setFieldValue, onChange }) => (
                  <>
                    <Form
                      className="form form-label-right"
                      onSubmit={handleSubmit}
                    >
                      <Row>
                        <Col md="auto">
                          {step < 3 && (
                            <button
                              type="button"
                              className="btn btn-primary font-weight-bolder text-uppercase px-9 py-4 ml-2"
                              data-wizard-type="action-next"
                              onClick={saveSellDocumentClick}
                            >
                              مرحله بعد
                            </button>
                          )}
                          {step > 1 && (
                            <button
                              type="button"
                              className="btn btn-light-primary font-weight-bolder text-uppercase px-9 py-4 ml-2"
                              data-wizard-type="action-prev"
                              onClick={() => setStep(step - 1)}
                            >
                              مرحله قبل
                            </button>
                          )}
                        </Col>
                        <Col md="auto">
                          {step == 3 && (
                            <>
                              <button
                                type="button"
                                className="btn btn-success font-weight-bolder text-uppercase px-9 py-4 ml-2"
                                data-wizard-type="action-submit"
                                disabled={!!payError ? "disabled" : ""}
                                onClick={closeSellDocument}
                              >
                                بستن
                              </button>
                              <button
                                type="button"
                                className="btn btn-success font-weight-bolder text-uppercase px-9 py-4 ml-2"
                                data-wizard-type="action-submit"
                                disabled={!!payError ? "disabled" : ""}
                                onClick={() => {
                                  setPrintModel({
                                    ...sellDocumentObj,
                                    ...mapFromServerObject(sellDocumentObj),
                                  });
                                  handlePrint();
                                }}
                              >
                                چاپ
                              </button>
                            </>
                          )}
                        </Col>
                        <Col>
                          {step == 3 && !!payError && (
                            <div
                              className="alert alert-danger m-0 text-left"
                              style={{ direction: "rtl" }}
                            >
                              {payError}
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  </>
                )}
              </Formik>
            ) : (
              <Row>
                <Col>
                  <button
                    className="btn btn-primary"
                    onClick={() => backToSellDocumentsList()}
                  >
                    {t("Common.Back")} <i className="fa fa-arrow-left"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-success mr-2"
                    onClick={() => {
                      setPrintModel({
                        ...sellDocumentObj,
                        ...mapFromServerObject(sellDocumentObj),
                      });
                      handlePrint();
                    }}
                  >
                    {t("Common.Print")} <i className="fa fa-print"></i>
                  </button>
                </Col>
              </Row>
            )}
          </CardFooter>
        </Card>
      </FullScreen>
    </>
  );
}
