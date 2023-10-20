import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/receipts/receiptsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { ReceiptEditForm } from "./ReceiptEditForm";
import { useSubheader } from "src/core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "src/core/_partials/controls";
import { useReactToPrint } from "src/core/_helpers/Print";
import { useTranslation } from "react-i18next";
import { DetailsUIProvider } from "../receipts-details/DetailsUIContext";
import { Details } from "../receipts-details/Details";
import {
  EnToFaObjDate,
  CloneObject,
  getStorage,
} from "src/core/_helpers";
import moment from "jalali-moment";
import { PrintReceipt } from "../print/PrintReceipt";
import { CardLoading } from "src/core/_partials/custom/skeleton/Skeleton";

export function ReceiptEdit({
  history,
  match: {
    params: { id },
  },
  mode,
}) {
  const { t } = useTranslation();
  const modeTrans = {
    1: "رسید",
    2: "موجودی اول دوره",
    3: "رسید بین انبار",
    4: "رسید اتوماتیک",
    5: "شمارش انبار",
  };

  const defaultWarehouse = !!getStorage("defaultWarehouse")
    ? JSON.parse(getStorage("defaultWarehouse"))
    : null;
  const defaultYear = !!getStorage("defaultYear")
    ? JSON.parse(getStorage("defaultYear"))
    : null;

  const initModel = {
    ReceiptId: undefined,
    ReceiptNo: "",
    PersonId: "",
    Person: "",
    WarehouseId: !!defaultWarehouse ? defaultWarehouse.WarehouseId : "",
    Warehouse: defaultWarehouse,
    YearId: !!defaultYear ? defaultYear.YearId : "",
    Year: defaultYear,
    ReceiptDateObj: EnToFaObjDate(new Date()),
    ReceiptDate: moment
      .from()
      .locale("en")
      .format("YYYY-MM-DDTHH:mm:ss"),
    ReceiptTypeId: mode || 1,
    ReceiptType: "",
    BaseAssignmentId: null,
    BaseAssignment: "",
    OtherWareHouseId: null,
    OtherWareHouse: "",
    Des: "",
    Archive: false,
    ReceiptDtls: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const subheader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [receiptObj, setReceiptObj] = useState(copyModel);
  const [receiptDtlObj, setReceiptDtlObj] = useState(copyModel.ReceiptDtls);

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, receiptForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.receipts.actionsLoading,
      receiptForEdit: state.receipts.receiptForEdit,
      error: state.receipts.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchReceipt(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") +
        " «" +
        (!!mode 
          ? modeTrans[mode]
          : t("Receipt.Entity")) +
        "»";

    if (receiptForEdit && id) {
      _title =
        t("Common.Edit") + " " + (!!mode
          ? modeTrans[mode]
          : t("Receipt.Entity") + " «" + receiptForEdit.ReceiptNo + "»");
      setReceiptObj({
        ...receiptForEdit,
        ReceiptDateObj: EnToFaObjDate(receiptForEdit.ReceiptDate),
      });
      setReceiptDtlObj(receiptForEdit.ReceiptDtls);
    }

    setTitle(_title);
    subheader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptForEdit, id]);

  const saveReceipt = (values) => {
    if (!id) {
      dispatch(
        actions.createReceipt(values, () => {
          backToReceiptsList();
        })
      )
        .then((arg) => {
          backToReceiptsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateReceipt(id, values, () => {
          backToReceiptsList();
        })
      )
        .then(() => backToReceiptsList())
        .catch((err) => {});
    }
  };

  const btnRefReceipt = useRef("1");
  const btnRefDetails = useRef("2");

  const saveReceiptClick = () => {
    if (btnRefReceipt && btnRefReceipt.current) {
      btnRefReceipt.current.Collect((datas) => {
        let receiptObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              receiptObj[prop] = obj;
            }
          }
        }
        receiptObj["ReceiptDtls"] = [];

        btnRefDetails.current.Collect((detailsData) => {
          receiptObj.ReceiptDtls = detailsData;
          saveReceipt(receiptObj);
        });
      });
    }
  };

  const backToReceiptsList = () => {
    history.push(`/warehouse/receipts/${mode}`);
  };

  const [printing, setPrinting] = useState(false);
  const [printModel, setPrintModel] = useState(null);
  const Print = () => {
    setPrinting(true);

    setPrintModel({
      ...receiptObj,
    });
    setTimeout(() => {
      setPrinting(false);
      handlePrint();
    }, 500);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 5pt;padding: 0;margin: 0;} @page { size: 210mm auto; margin: 0mm; } @media print {@page {size: portrait}; body { -webkit-print-color-adjust: exact; } }",
  });

  return (
    <>
      {(!!id && receiptObj.ReceiptId == id) || !!id == false ? (
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
                onClick={backToReceiptsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>

              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>

              <button
                type="submit"
                onClick={Print}
                className="btn btn-light ml-2"
              >
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>

              {(!!id == false || (!!id && receiptObj.Archive)) && (
                <button
                  type="submit"
                  className="btn btn-primary ml-2"
                  onClick={saveReceiptClick}
                >
                  <i className="fa fa-save"></i> {t("Common.Save")}
                </button>
              )}
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <ReceiptEditForm
              actionsLoading={actionsLoading}
              receipt={receiptObj}
              ref={btnRefReceipt}
            />
            <DetailsUIProvider
              currentReceiptId={id}
              actionsLoading={actionsLoading}
              detail={receiptDtlObj}
              ref={btnRefDetails}
            >
              <Details />
            </DetailsUIProvider>
          </CardBody>
          <div style={{ display: "none", height: "auto" }}>
            <PrintReceipt ref={componentRef} data={printModel} />
          </div>
        </Card>
      ) : (
        <CardLoading type="reciept" />
      )}
    </>
  );
}
