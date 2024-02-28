import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Dropdown, Tabs, Tab } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import moment from "jalali-moment";
import axios from "axios";
import * as actions from "../../../_redux/buys/buysActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { BuyEditForm } from "./BuyEditForm";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { useReactToPrint } from "src/core/_helpers/Print";
import { useTranslation } from "react-i18next";
import { DetailsUIProvider } from "../buys-details/DetailsUIContext";
import { Details } from "../buys-details/Details";
import { CostsUIProvider } from "../buys-costs/CostsUIContext";
import { Costs } from "../buys-costs/Costs";
import { DiscountsUIProvider } from "../buys-discounts/DiscountsUIContext";
import { Discounts } from "../buys-discounts/Discounts";
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

export function BuyEdit({
  history,
  match: {
    params: { id, pack },
  },
  mode,
}) {
  const { t } = useTranslation();
  const initModel = {
    BuyId: undefined,
    BuyNumber: "It is created automatically by the system",
    FactorNumber: "",
    ProviderId: "",
    BuySettlementTypeId: 1,
    Provider: "",
    InquiryId: "",
    Inquiry: "",
    FactorDate: "",
    FactorDateObj: "",
    BuyDateObj: EnToFaObjDate(new Date()),
    BuyDate: moment.from().locale("en").format("YYYY-MM-DDTHH:mm:ss"),
    IsClosed: false,
    IsTemp: true,
    BuyDetails: [],
    BuyCosts: [],
    BuyDiscounts: [],
    EntityAttachments: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [buyObj, setBuyObj] = useState(copyModel);
  const [buyDtlObj, setBuyDetailObj] = useState(copyModel.BuyDetails);
  const [entityAttachmentsObj, setEntityAttachmentsObj] = useState(
    copyModel.EntityAttachments
  );
  const [buyRequestDetailsObj, setBuyRequestDetailsObj] = useState([]);
  const [buyCostObj, setBuyCostObj] = useState(copyModel.BuyCosts);
  const [buyDiscountObj, setBuyDiscountObj] = useState(copyModel.BuyDiscounts);
  const [buySum, updateBuySum] = useState({
    DetailCount: 0,
    SumPrice: 0,
    SumPayable: 0,
  });
  const [buySumDiscount, updateBuySumDiscount] = useState(0);
  const [buySumCost, updateBuySumCost] = useState(0);

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, buyForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.buys.actionsLoading,
      buyForEdit: state.buys.buyForEdit,
      error: state.buys.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (mode != 1) dispatch(actions.fetchBuy(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!!pack && buyRequestDetailsObj.length == 0) {
      const ids = getStorage("pack_" + pack);

      if (ids && ids.length > 0) {
        let details = [];
        for (let index = 0; index < ids.length; index++) {
          const element = ids[index];

          (function (el) {
            axios
              .get(`BuyRequestDetail/get/${el}`)
              .then(({ data }) => {
                details.push(data);

                setBuyDetailObj((buyRequestDetailsObj) => [
                  ...(details.length > 0
                    ? details.map((x) => {
                        return {
                          BuyDetailId:
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
                          BuySerials: [],
                          BuyDetailRequestDetails: [
                            {
                              // BuyDetailId: null,
                              BuyRequestDetailId: x.BuyRequestDetailId,
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
    let _title = id ? "" : t("Common.Create") + " " + t("Buy.Entity");

    if (id && buyForEdit && buyForEdit.BuyId == id) {
      _title =
        t("Common.Edit") +
        " " +
        t("Buy.Entity") +
        " «" +
        buyForEdit.BuyNumber +
        "»";

      setBuyObj({
        ...buyForEdit,
        BuyDateObj: EnToFaObjDate(buyForEdit.BuyDate),
        FactorDateObj:
          buyForEdit.FactorDate && EnToFaObjDate(buyForEdit.FactorDate),
      });
      setBuyDetailObj(buyForEdit.BuyDetails);
      setBuyCostObj(buyForEdit.BuyCosts);
      setBuyCostObj(buyForEdit.BuyDiscounts);
      setBuyRequestDetailsObj(buyForEdit.BuyDetailRequestDetails);
      setEntityAttachmentsObj(buyForEdit.EntityAttachments);

      updateBuySum({
        DetailCount: buyForEdit.DetailCount,
        SumPrice: buyForEdit.SumPrice,
        SumDiscount: buyForEdit.SumDiscount,
        SumCost: buyForEdit.SumCost,
        SumPayable: buyForEdit.SumPayable,
      });
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyForEdit, id]);

  const saveBuy = (values) => {
    if (!id) {
      dispatch(
        actions.createBuy(ObjectToFormData(values), () => {
          backToBuysList();
        })
      )
        .then((arg) => {
          backToBuysList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateBuy(id, ObjectToFormData(values), () => {
          backToBuysList();
        })
      )
        .then(() => backToBuysList())
        .catch((err) => {});
    }
  };

  const btnRefBuy = useRef("1");
  const btnRefDetails = useRef("2");
  const btnRefCosts = useRef("3");
  const btnRefDiscounts = useRef("4");

  const saveBuyClick = () => {
    if (btnRefBuy && btnRefBuy.current) {
      btnRefBuy.current.Collect((datas) => {
        let buyObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              buyObj[prop] = obj;
            }
          }
        }
        buyObj["BuyDetails"] = [];
        buyObj["BuyCosts"] = [];
        buyObj["BuyDiscounts"] = [];
        buyObj["EntityAttachments"] = entityAttachmentsObj.map((x) => {
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
          buyObj.BuyDetails = detailsData;
        });
        btnRefCosts.current.Collect((detailsData) => {
          buyObj.BuyCosts = detailsData;
        });
        btnRefDiscounts.current.Collect((detailsData) => {
          buyObj.BuyDiscounts = detailsData;
        });
        saveBuy(buyObj);
      });
    }
  };

  const backToBuysList = () => {
    history.push(`/PurchaseOrder/buys`);
  };

  const [printing, setPrinting] = useState(false);
  const [printModel, setPrintModel] = useState(null);
  const Print = () => {
    setPrinting(true);

    setPrintModel({
      ...buyObj,
      SumPrice: buySum.SumPrice,
      SumDiscount: buySumDiscount,
      SumCost: buySumCost,
      SumPayable: buySum.SumPayable,
    });
    setTimeout(() => {
      setPrinting(false);
      handlePrint();
    }, 500);
  };

  const doPrintOfficial = () => {
    setPrinting(true);

    setPrintModel({
      ...buyObj,
      SumPrice: buySum.SumPrice,
      SumDiscount: buySumDiscount,
      SumCost: buySumCost,
      SumPayable: buySum.SumPayable,
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
      {((!!id && !!buyObj.BuyId) ||
        (!!id == false && !!pack == false) ||
        (!!pack == true && buyDtlObj.length > 0)) && (
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
                onClick={backToBuysList}
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
              {(!!id == false || (!!id == true && buyObj.IsTemp)) && (
                <button
                  type="submit"
                  className="btn btn-primary ml-2"
                  onClick={saveBuyClick}
                >
                  <i className="fa fa-save"></i> {t("Common.Save")}
                </button>
              )}
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody className="py-0">
            <Tabs
              defaultActiveKey="buy"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="buy"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <BuyEditForm
                  actionsLoading={actionsLoading}
                  buy={buyObj}
                  ref={btnRefBuy}
                />
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="font-weight-bold">
                        Number of goods:{" "}
                        {numberWithCommas(Math.ceil(buySum.DetailCount))}
                      </td>
                      <td className="font-weight-bold">
                        Total:{" "}
                        {numberWithCommas(Math.ceil(+buySum.SumPayable))}
                      </td>
                      <td className="font-weight-bold">
                        Sum of invoice discounts:{" "}
                        {numberWithCommas(Math.ceil(buySumDiscount))}
                      </td>
                      <td className="font-weight-bold">
                        Sum of invoice costs:{" "}
                        {numberWithCommas(Math.ceil(buySumCost))}
                      </td>
                      <td className="font-weight-bold">
                        Payable:{" "}
                        {numberWithCommas(
                          Math.ceil(
                            +buySum.SumPayable - +buySumDiscount + +buySumCost
                          )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <DetailsUIProvider
                  currentBuyId={id}
                  actionsLoading={actionsLoading}
                  detail={buyDtlObj}
                  updateBuy={updateBuySum}
                  buySum={buySum}
                  editable={!!id == false || (!!id == true && buyObj.IsTemp)}
                  ref={btnRefDetails}
                >
                  <Details />
                </DetailsUIProvider>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="font-weight-bold">
                        Number of goods:{" "}
                        {numberWithCommas(Math.ceil(buySum.DetailCount))}
                      </td>
                      <td className="font-weight-bold">
                        Total:{" "}
                        {numberWithCommas(Math.ceil(+buySum.SumPayable))}
                      </td>
                      <td className="font-weight-bold">
                        Sum of invoice discount:{" "}
                        {numberWithCommas(Math.ceil(buySumDiscount))}
                      </td>
                      <td className="font-weight-bold">
                        Sum of invoice cost:{" "}
                        {numberWithCommas(Math.ceil(buySumCost))}
                      </td>
                      <td className="font-weight-bold">
                        Payable:{" "}
                        {numberWithCommas(
                          Math.ceil(
                            +buySum.SumPayable - +buySumDiscount + +buySumCost
                          )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Row className="mt-5">
                  <Col lg="6" md="12">
                    <CostsUIProvider
                      currentBuyId={id}
                      actionsLoading={actionsLoading}
                      cost={buyCostObj}
                      updateBuy={updateBuySumCost}
                      buySum={buySum}
                      editable={
                        !!id == false || (!!id == true && buyObj.IsTemp)
                      }
                      ref={btnRefCosts}
                    >
                      <Costs />
                    </CostsUIProvider>
                  </Col>
                  <Col lg="6" md="12">
                    <DiscountsUIProvider
                      currentBuyId={id}
                      actionsLoading={actionsLoading}
                      discount={buyDiscountObj}
                      updateBuy={updateBuySumDiscount}
                      buySum={buySum}
                      editable={
                        !!id == false || (!!id == true && buyObj.IsTemp)
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
