import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Dropdown, Tabs, Tab } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import moment from "jalali-moment";
import axios from "axios";
import * as actions from "../../../_redux/buyReturns/buyReturnsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { BuyReturnEditForm } from "./BuyReturnEditForm";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { useReactToPrint } from "src/core/_helpers/Print";
import { useTranslation } from "react-i18next";
import { DetailsUIProvider } from "../buyReturns-details/DetailsUIContext";
import { Details } from "../buyReturns-details/Details";
import { CostsUIProvider } from "../buyReturns-costs/CostsUIContext";
import { Costs } from "../buyReturns-costs/Costs";
import { DiscountsUIProvider } from "../buyReturns-discounts/DiscountsUIContext";
import { Discounts } from "../buyReturns-discounts/Discounts";
import { PrintFactor } from "../print/PrintFactor";
import { PrintOfficial } from "../print/PrintOfficial";
import {
  EnToFaObjDate,
  CloneObject,
  getStorage,
  numberWithCommas,
} from "src/core/_helpers";
import { Attachments } from "src/core/_partials/controls/attachment/Attachments";
import { ObjectToFormData } from "src/core/_helpers";

export function BuyReturnEdit({
  history,
  match: {
    params: { id, pack },
  },
  mode,
}) {
  const { t } = useTranslation();
  const initModel = {
    BuyReturnId: undefined,
    BuyReturnNumber: "اوتوماتیک توسط سیستم ایجاد می‌گردد",
    FactorNumber: "",
    ProviderId: "",
    BuyReturnSettlementTypeId: 1,
    Provider: "",
    InquiryId: "",
    Inquiry: "",
    FactorDate: "",
    FactorDateObj: "",
    BuyReturnDateObj: EnToFaObjDate(new Date()),
    BuyReturnDate: moment.from().locale("en").format("YYYY-MM-DDTHH:mm:ss"),
    IsClosed: false,
    IsTemp: true,
    BuyReturnDetails: [],
    BuyReturnCosts: [],
    BuyReturnDiscounts: [],
    EntityAttachments: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [buyReturnObj, setBuyReturnObj] = useState(copyModel);
  const [buyReturnDtlObj, setBuyReturnDetailObj] = useState(
    copyModel.BuyReturnDetails
  );
  const [entityAttachmentsObj, setEntityAttachmentsObj] = useState(
    copyModel.EntityAttachments
  );
  const [buyReturnRequestDetailsObj, setBuyReturnRequestDetailsObj] = useState(
    []
  );
  const [buyReturnCostObj, setBuyReturnCostObj] = useState(
    copyModel.BuyReturnCosts
  );
  const [buyReturnDiscountObj, setBuyReturnDiscountObj] = useState(
    copyModel.BuyReturnDiscounts
  );
  const [buyReturnSum, updateBuyReturnSum] = useState({
    DetailCount: 0,
    SumPrice: 0,
    SumPayable: 0,
  });
  const [buyReturnSumDiscount, updateBuyReturnSumDiscount] = useState(0);
  const [buyReturnSumCost, updateBuyReturnSumCost] = useState(0);

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, buyReturnForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.buyReturns.actionsLoading,
      buyReturnForEdit: state.buyReturns.buyReturnForEdit,
      error: state.buyReturns.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (mode != 1) dispatch(actions.fetchBuyReturn(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!!pack && buyReturnRequestDetailsObj.length == 0) {
      const ids = getStorage("pack_" + pack);

      if (ids && ids.length > 0) {
        let details = [];
        for (let index = 0; index < ids.length; index++) {
          const element = ids[index];

          (function (el) {
            axios
              .get(`BuyReturnRequestDetail/get/${el}`)
              .then(({ data }) => {
                details.push(data);

                setBuyReturnDetailObj((buyReturnRequestDetailsObj) => [
                  ...(details.length > 0
                    ? details.map((x) => {
                        return {
                          BuyReturnDetailId:
                            "temp_" + Math.floor(Math.random() * 100),
                          ProductId: x.ProductId,
                          Product: x.Product,
                          ProductUnitId: x.ProductUnitId,
                          ProductUnit: x.ProductUnit,
                          Amount: x.Amount,
                          Price: null,
                          DiscountPrice: null,
                          DiscountPercent: null,
                          IsDeleted: false,
                          SerialCount: 0,
                          BuyReturnSerials: [],
                          BuyReturnDetailRequestDetails: [
                            {
                              // BuyReturnDetailId: null,
                              BuyReturnRequestDetailId:
                                x.BuyReturnRequestDetailId,
                            },
                          ],
                        };
                      })
                    : []),
                ]);
              })
              .catch(() => {});
          })(element);
        }
      }
    }
  }, [pack]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("BuyReturn.Entity");

    if (id && buyReturnForEdit && buyReturnForEdit.BuyReturnId == id) {
      _title =
        t("Common.Edit") +
        " " +
        t("BuyReturn.Entity") +
        " «" +
        buyReturnForEdit.BuyReturnNumber +
        "»";

      setBuyReturnObj({
        ...buyReturnForEdit,
        BuyReturnDateObj: EnToFaObjDate(buyReturnForEdit.BuyReturnDate),
        FactorDateObj:
          buyReturnForEdit.FactorDate &&
          EnToFaObjDate(buyReturnForEdit.FactorDate),
      });
      setBuyReturnDetailObj(buyReturnForEdit.BuyReturnDetails);
      setBuyReturnCostObj(buyReturnForEdit.BuyReturnCosts);
      setBuyReturnCostObj(buyReturnForEdit.BuyReturnDiscounts);
      setBuyReturnRequestDetailsObj(
        buyReturnForEdit.BuyReturnDetailRequestDetails
      );
      setEntityAttachmentsObj(buyReturnForEdit.EntityAttachments);

      updateBuyReturnSum({
        DetailCount: buyReturnForEdit.DetailCount,
        SumPrice: buyReturnForEdit.SumPrice,
        SumDiscount: buyReturnForEdit.SumDiscount,
        SumCost: buyReturnForEdit.SumCost,
        SumPayable: buyReturnForEdit.SumPayable,
      });
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyReturnForEdit, id]);

  const saveBuyReturn = (values) => {
    if (!id) {
      dispatch(
        actions.createBuyReturn(ObjectToFormData(values), () => {
          backToBuyReturnsList();
        })
      )
        .then((arg) => {
          backToBuyReturnsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateBuyReturn(id, ObjectToFormData(values), () => {
          backToBuyReturnsList();
        })
      )
        .then(() => backToBuyReturnsList())
        .catch((err) => {});
    }
  };

  const btnRefBuyReturn = useRef("1");
  const btnRefDetails = useRef("2");
  const btnRefCosts = useRef("3");
  const btnRefDiscounts = useRef("4");

  const saveBuyReturnClick = () => {
    if (btnRefBuyReturn && btnRefBuyReturn.current) {
      btnRefBuyReturn.current.Collect((datas) => {
        let buyReturnObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              buyReturnObj[prop] = obj;
            }
          }
        }
        buyReturnObj["BuyReturnDetails"] = [];
        buyReturnObj["BuyReturnCosts"] = [];
        buyReturnObj["BuyReturnDiscounts"] = [];
        buyReturnObj["EntityAttachments"] = entityAttachmentsObj.map((x) => {
          return {
            EntityAttachmentId:
              x.EntityAttachmentId.toString().indexOf("temp_") > -1
                ? null
                : x.EntityAttachmentId,
            EntityId: x.EntityId,
            EntityPKId: x.EntityPKId,
            AttachmentId: x.AttachmentId,
            Title: x.Title,
            Description: x.Description,
            Reference1: x.Reference1,
            Reference2: x.Reference2,
            Reference3: x.Reference3,
            Reference4: x.Reference4,
            IsDeleted: x.IsDeleted || false,
            Attachment: x.Attachment.FormFile
              ? {
                  FormFile: x.Attachment.FormFile,
                }
              : null,
          };
        });

        btnRefDetails.current.Collect((detailsData) => {
          buyReturnObj.BuyReturnDetails = detailsData;
        });
        btnRefCosts.current.Collect((detailsData) => {
          buyReturnObj.BuyReturnCosts = detailsData;
        });
        btnRefDiscounts.current.Collect((detailsData) => {
          buyReturnObj.BuyReturnDiscounts = detailsData;
        });
        saveBuyReturn(buyReturnObj);
      });
    }
  };

  const backToBuyReturnsList = () => {
    history.push(`/PurchaseOrder/buyReturns`);
  };

  const [printing, setPrinting] = useState(false);
  const [printModel, setPrintModel] = useState(null);
  const Print = () => {
    setPrinting(true);

    setPrintModel({
      ...buyReturnObj,
      SumPrice: buyReturnSum.SumPrice,
      SumDiscount: buyReturnSumDiscount,
      SumCost: buyReturnSumCost,
      SumPayable: buyReturnSum.SumPayable,
    });
    setTimeout(() => {
      setPrinting(false);
      handlePrint();
    }, 500);
  };

  const doPrintOfficial = () => {
    setPrinting(true);

    setPrintModel({
      ...buyReturnObj,
      SumPrice: buyReturnSum.SumPrice,
      SumDiscount: buyReturnSumDiscount,
      SumCost: buyReturnSumCost,
      SumPayable: buyReturnSum.SumPayable,
    });
    setTimeout(() => {
      setPrinting(false);
      handlePrintOfficial();
    }, 500);
  };

  const componentRef = useRef();
  const componentRefOfficial = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 5pt;padding: 0;margin: 0;} @page { size: 210mm auto; margin: 0mm; } @media print {@page {size: portrait}; body { -webkit-print-color-adjust: exact; } }",
  });

  const handlePrintOfficial = useReactToPrint({
    content: () => componentRefOfficial.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 5pt;padding: 0;margin: 0;} @page { size: 210mm auto; margin: 0mm; } @media print {@page {size: landscape}; body { -webkit-print-color-adjust: exact; } }",
  });

  return (
    <>
      {((!!id && !!buyReturnObj.BuyReturnId) ||
        (!!id == false && !!pack == false) ||
        (!!pack == true && buyReturnDtlObj.length > 0)) && (
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
                onClick={backToBuyReturnsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>
              {`  `}
              <Dropdown className="ml-2">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="pr-1"
                >
                  <i className="fa fa-print"></i>{" "}
                  <span className="mr-2">{t("Common.Print")}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={Print}
                    disabled={printing}
                    eventKey="1"
                  >
                    {t("Common.Print")} فاکتور خرید
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={doPrintOfficial}
                    disabled={printing}
                    eventKey="2"
                  >
                    {t("Common.Print")} فاکتور رسمی
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {`  `}
              {(!!id == false || (!!id == true && buyReturnObj.IsTemp)) && (
                <button
                  type="submit"
                  className="btn btn-primary ml-2"
                  onClick={saveBuyReturnClick}
                >
                  <i className="fa fa-save"></i> {t("Common.Save")}
                </button>
              )}
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody className="py-0">
            <Tabs
              defaultActiveKey="buyReturn"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="buyReturn"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <BuyReturnEditForm
                  actionsLoading={actionsLoading}
                  buyReturn={buyReturnObj}
                  ref={btnRefBuyReturn}
                />
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="font-weight-bold">
                        تعداد کالا:{" "}
                        {numberWithCommas(Math.ceil(buyReturnSum.DetailCount))}
                      </td>
                      <td className="font-weight-bold">
                        جمع کل:{" "}
                        {numberWithCommas(Math.ceil(+buyReturnSum.SumPayable))}
                      </td>
                      <td className="font-weight-bold">
                        جمع تخفیف‌های پای فاکتور:{" "}
                        {numberWithCommas(Math.ceil(buyReturnSumDiscount))}
                      </td>
                      <td className="font-weight-bold">
                        جمع هزینه‌های پای فاکتور:{" "}
                        {numberWithCommas(Math.ceil(buyReturnSumCost))}
                      </td>
                      <td className="font-weight-bold">
                        قابل پرداخت:{" "}
                        {numberWithCommas(
                          Math.ceil(
                            +buyReturnSum.SumPayable -
                              +buyReturnSumDiscount +
                              +buyReturnSumCost
                          )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <DetailsUIProvider
                  currentBuyReturnId={id}
                  actionsLoading={actionsLoading}
                  detail={buyReturnDtlObj}
                  updateBuyReturn={updateBuyReturnSum}
                  buyReturnSum={buyReturnSum}
                  editable={
                    !!id == false || (!!id == true && buyReturnObj.IsTemp)
                  }
                  ref={btnRefDetails}
                >
                  <Details />
                </DetailsUIProvider>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="font-weight-bold">
                        تعداد کالا:{" "}
                        {numberWithCommas(Math.ceil(buyReturnSum.DetailCount))}
                      </td>
                      <td className="font-weight-bold">
                        جمع کل:{" "}
                        {numberWithCommas(Math.ceil(+buyReturnSum.SumPayable))}
                      </td>
                      <td className="font-weight-bold">
                        جمع تخفیف‌های پای فاکتور:{" "}
                        {numberWithCommas(Math.ceil(buyReturnSumDiscount))}
                      </td>
                      <td className="font-weight-bold">
                        جمع هزینه‌های پای فاکتور:{" "}
                        {numberWithCommas(Math.ceil(buyReturnSumCost))}
                      </td>
                      <td className="font-weight-bold">
                        قابل پرداخت:{" "}
                        {numberWithCommas(
                          Math.ceil(
                            +buyReturnSum.SumPayable -
                              +buyReturnSumDiscount +
                              +buyReturnSumCost
                          )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Row className="mt-5">
                  <Col lg="6" md="12">
                    <CostsUIProvider
                      currentBuyReturnId={id}
                      actionsLoading={actionsLoading}
                      cost={buyReturnCostObj}
                      updateBuyReturn={updateBuyReturnSumCost}
                      buyReturnSum={buyReturnSum}
                      editable={
                        !!id == false || (!!id == true && buyReturnObj.IsTemp)
                      }
                      ref={btnRefCosts}
                    >
                      <Costs />
                    </CostsUIProvider>
                  </Col>
                  <Col lg="6" md="12">
                    <DiscountsUIProvider
                      currentBuyReturnId={id}
                      actionsLoading={actionsLoading}
                      discount={buyReturnDiscountObj}
                      updateBuyReturn={updateBuyReturnSumDiscount}
                      buyReturnSum={buyReturnSum}
                      editable={
                        !!id == false || (!!id == true && buyReturnObj.IsTemp)
                      }
                      ref={btnRefDiscounts}
                    >
                      <Discounts />
                    </DiscountsUIProvider>
                  </Col>
                </Row>
              </Tab>
              <Tab
                eventKey="attachments"
                title={t("Common.Attachments")}
                className="nav-item"
              >
                <Attachments
                  attachments={entityAttachmentsObj}
                  action={setEntityAttachmentsObj}
                />
              </Tab>
            </Tabs>
          </CardBody>
          <div style={{ display: "none", height: "auto" }}>
            <PrintFactor ref={componentRef} data={printModel} />
            <PrintOfficial ref={componentRefOfficial} data={printModel} />
          </div>
        </Card>
      )}
    </>
  );
}
