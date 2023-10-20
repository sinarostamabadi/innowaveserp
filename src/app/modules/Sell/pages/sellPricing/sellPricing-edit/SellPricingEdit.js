import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import moment from "jalali-moment";
import { useTranslation } from "react-i18next";
import { Tabs, Tab } from "react-bootstrap";
import * as actions from "../../../_redux/sellPricing/sellPricingActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { SellPricingEditForm } from "./SellPricingEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { CloneObject, EnToFaObjDate } from "../../../../../../core/_helpers";
import { SellPricingDetailsUIProvider } from "../sellPricing-details/SellPricingDetailsUIContext";
import { SellPricingDetails } from "../sellPricing-details/SellPricingDetails";
import { useReactToPrint } from "../../../../../../core/_helpers/Print";
import { PrintLabel } from "../print/PrintLabel.js";

export function SellPricingEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    SellPricingId: undefined,
    SellPricingNumber: "",
    RegisterDateObj: EnToFaObjDate(new Date()),
    RegisterDate: moment
      .from()
      .locale("en")
      .format("YYYY-MM-DDTHH:mm:ss"),
    FromDateObj: "",
    FromDate: "",
    ToDateObj: "",
    ToDate: "",
    IsAccepted: false,
    SellPricingDetails: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [sellPricingObj, setSellPricingObj] = useState(copyModel);
  const [sellPricingDetailObj, setSellPricingDetailObj] = useState(
    copyModel.SellPricingDetails
  );

  const { actionsLoading, sellPricingForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.sellPricings.actionsLoading,
      sellPricingForEdit: state.sellPricings.sellPricingForEdit,
      error: state.sellPricings.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) {
      dispatch(actions.fetchSellPricing(id)).then((res) => {
        //setEditMode(true);
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("SellPricing.Entity");

    if (sellPricingForEdit && id) {
      _title = t("Common.Edit") + " " + t("SellPricing.SellPricingNumber") + " «" + sellPricingForEdit.SellPricingNumber + "»";
      setSellPricingObj({
        ...sellPricingForEdit,
        RegisterDateObj: EnToFaObjDate(sellPricingForEdit.RegisterDate),
        FromDateObj: EnToFaObjDate(sellPricingForEdit.FromDate),
        ToDateObj: EnToFaObjDate(sellPricingForEdit.ToDate),
      });
      setSellPricingDetailObj(sellPricingForEdit.SellPricingDetails || []);
      setEditMode(true);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellPricingForEdit, id]);

  const saveSellPricing = (values) => {
    if (!id) {
      dispatch(
        actions.createSellPricing(values, () => {
          backToSellPricingsList();
        })
      )
        .then((arg) => {
          backToSellPricingsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateSellPricing(id, values, () => {
          backToSellPricingsList();
        })
      )
        .then(() => backToSellPricingsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef("1");
  const btnRefSellPricingDetails = useRef("2");

  const saveSellPricingClick = () => {
    if (!!btnRef && !!btnRef.current) {
      btnRef.current.Collect((datas) => {
        let sellPricingDetailObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              sellPricingDetailObj[prop] = obj;
            }
          }
        }

        sellPricingDetailObj["SellPricingDetails"] = [];

        btnRefSellPricingDetails.current.Collect((sellPricingDetailsData) => {
          sellPricingDetailObj.SellPricingDetails = sellPricingDetailsData;
        });

        setTimeout(() => {
          saveSellPricing(sellPricingDetailObj);
        }, 200);
      });
    }
  };

  const backToSellPricingsList = () => {
    history.push(`/Sell/sellPricings`);
  };

  const [printModel, setPrintModel] = useState(sellPricingDetailObj);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 5pt;padding: 0;margin: 0;} @page { size: 105mm auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });

  const Print = () => {
    setPrintModel(sellPricingDetailObj);
    handlePrint();
  };

  return (
    <>
      {((!!id && editMode) || !!id == false) && (
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
                onClick={backToSellPricingsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>
              {`  `}
              <button type="submit" className="btn btn-light ml-2"
              onClick={Print}>
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>
              {`  `}
              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveSellPricingClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="sellPricing"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="sellPricing"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <SellPricingEditForm
                  actionsLoading={actionsLoading}
                  sellPricing={sellPricingObj}
                  ref={btnRef}
                />
              </Tab>
              <Tab
                eventKey="product"
                title={t("SellPricingDetail.Entity")}
                className="nav-item"
              >
                <SellPricingDetailsUIProvider
                  currentSellPricingId={id}
                  actionsLoading={actionsLoading}
                  sellPricingDetail={sellPricingDetailObj}
                  ref={btnRefSellPricingDetails}
                >
                  <SellPricingDetails />
                </SellPricingDetailsUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
          <div style={{ display: "none", height: "auto" }}>
            <PrintLabel ref={componentRef} data={printModel} />
          </div>
        </Card>
      )}
    </>
  );
}
