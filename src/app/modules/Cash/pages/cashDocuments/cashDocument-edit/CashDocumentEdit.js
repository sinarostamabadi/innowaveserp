import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashDocuments/cashDocumentsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { CashDocumentEditForm } from "./CashDocumentEditForm";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { useTranslation } from "react-i18next";
import moment from "jalali-moment";
import { CloneObject, EnToFaObjDate } from "src/core/_helpers";
import { Tabs, Tab } from "react-bootstrap";
import { CreditsUIProvider } from "../cashDocument-credits/CreditsUIContext";
import { Credits } from "../cashDocument-credits/Credits";
import { PaymentsUIProvider } from "../cashDocument-payments/PaymentsUIContext";
import { Payments } from "../cashDocument-payments/Payments";
import { WalletsUIProvider } from "../cashDocument-wallets/WalletsUIContext";
import { Coupons } from "../cashDocument-coupons/Coupons";
import { CouponsUIProvider } from "../cashDocument-coupons/CouponsUIContext";
import { Wallets } from "../cashDocument-wallets/Wallets";
import { PromissoryNotesUIProvider } from "../cashDocument-promissoryNotes/PromissoryNotesUIContext";
import { PromissoryNotes } from "../cashDocument-promissoryNotes/PromissoryNotes";

export function CashDocumentEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    CashDocumentId: undefined,
    DocumentNo: "",
    TransactionTypeId: 1,
    DocumentDateObj: EnToFaObjDate(moment.from()),
    DocumentDate: moment.from().locale("en").format("YYYY-MM-DDTHH:mm:ss"),
    PersonId: "",
    Person: null,
    CashId: 1,
    Description: "",
    ContractNumber: "",
    Added: 0,
    Deficit: 0,
    Transactions: [],
    Payments: [],
    BankTransfers: [],
    Cheques: [],
    CouponTransactions: [],
    Credits: [],
    PromissoryNotes: [],
    Wallets: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const subheader = useSubheader();

  // Tabs
  const [documentObj, setDocumentObj] = useState(copyModel);
  const [paymentsObj, setPaymentsObj] = useState(initModel.Payments);
  const [creditsObj, setCreditsObj] = useState(initModel.Credits);
  const [couponsObj, setCouponsObj] = useState(initModel.CouponTransactions);
  const [promissoryNotesObj, setPromissoryNotesObj] = useState(
    initModel.PromissoryNotes
  );
  const [walletsObj, setWalletsObj] = useState(initModel.Wallets);
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, cashDocumentForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.cashDocuments.actionsLoading,
      cashDocumentForEdit: state.cashDocuments.cashDocumentForEdit,
      error: state.cashDocuments.error,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  useEffect(() => {
    !!id &&
      dispatch(actions.fetchCashDocument(id)).then((res) => setEditMode(true));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("CashDocument.Entity");

    if (cashDocumentForEdit && id) {
      _title = t("Common.Edit") + " " + cashDocumentForEdit.DocumentNo;
      setDocumentObj({
        ...cashDocumentForEdit,
        DocumentDateObj: EnToFaObjDate(cashDocumentForEdit.DocumentDate),
      });
      setPaymentsObj(cashDocumentForEdit.Payments);
      setCreditsObj(cashDocumentForEdit.Credits);
      setWalletsObj(cashDocumentForEdit.Wallets);
      setCouponsObj(cashDocumentForEdit.Coupons);
      setPromissoryNotesObj(cashDocumentForEdit.PromissoryNotes);
    }

    setTitle(_title);
    subheader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashDocumentForEdit, id]);

  const saveCashDocument = (values) => {
    if (!id) {
      dispatch(actions.create(values))
        .then((arg) => {
          backToCashDocumentsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.update(id || documentObj.CashDocumentId, values))
        .then(() => backToCashDocumentsList())
        .catch((err) => {});
    }
  };

  const btnRefCashDocuments = useRef("1");
  const btnRefPayments = useRef("2");
  const btnRefCredits = useRef("3");
  const btnRefWallets = useRef("4");
  const btnRefCoupons = useRef("5");
  const btnRefPromissoryNotes = useRef("6");
  // const btnRefCheques = useRef("7");
  // const btnRefBetweenBanks = useRef("8");

  const saveCashDocumentClick = async () => {
    let cashDocumentObj = {};

    await btnRefCashDocuments.current.Collect(async (datas) => {
      cashDocumentObj = datas;

      btnRefPayments.current.Collect((datas) => {
        cashDocumentObj["Payments"] = datas;
      });

      btnRefCredits.current.Collect((datas) => {
        cashDocumentObj["Credits"] = datas;
      });

      btnRefWallets.current.Collect((datas) => {
        cashDocumentObj["Wallets"] = datas;
      });

      btnRefCoupons.current.Collect((datas) => {
        cashDocumentObj["Coupons"] = datas;
      });

      btnRefPromissoryNotes.current.Collect((datas) => {
        cashDocumentObj["PromissoryNotes"] = datas;
      });

      // btnRefCheques.current.Collect((datas) => {
      //   cashDocumentObj["Cheques"] = datas;
      // });

      // btnRefBetweenBanks.current.Collect((datas) => {
      //   cashDocumentObj["BetweenBanks"] = datas;
      // });

      saveCashDocument(cashDocumentObj);
    });
  };

  const backToCashDocumentsList = () => {
    history.push(`/cash/cashDocuments`);
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
                onClick={backToCashDocumentsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>

              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>

              <button type="submit" className="btn btn-light ml-2">
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>

              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveCashDocumentClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="cashDocument"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="cashDocument"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <CashDocumentEditForm
                  actionsLoading={actionsLoading}
                  cashDocument={documentObj}
                  ref={btnRefCashDocuments}
                />
              </Tab>

              <Tab
                eventKey="payment"
                title={t("CashDocument.Money")}
                className="nav-item"
              >
                <PaymentsUIProvider
                  currentDocumentId={id}
                  actionsLoading={actionsLoading}
                  payment={paymentsObj}
                  ref={btnRefPayments}
                >
                  <Payments />
                </PaymentsUIProvider>
              </Tab>

              <Tab
                eventKey="credit"
                title={t("CashDocument.Credit")}
                className="nav-item"
              >
                <CreditsUIProvider
                  currentDocumentId={id}
                  actionsLoading={actionsLoading}
                  credit={creditsObj}
                  ref={btnRefCredits}
                >
                  <Credits />
                </CreditsUIProvider>
              </Tab>

              <Tab
                eventKey="wallet"
                title={t("CashDocument.Wallet")}
                className="nav-item"
              >
                <WalletsUIProvider
                  currentDocumentId={id}
                  actionsLoading={actionsLoading}
                  wallet={walletsObj}
                  ref={btnRefCredits}
                >
                  <Wallets />
                </WalletsUIProvider>
              </Tab>

              <Tab
                eventKey="coupon"
                title={t("CashDocument.Coupon")}
                className="nav-item"
              >
                <CouponsUIProvider
                  currentDocumentId={id}
                  actionsLoading={actionsLoading}
                  coupon={couponsObj}
                  ref={btnRefCoupons}
                >
                  <Coupons />
                </CouponsUIProvider>
              </Tab>

              <Tab
                eventKey="promissoryNote"
                title={t("CashDocument.PromissoryNote")}
                className="nav-item"
              >
                <PromissoryNotesUIProvider
                  currentDocumentId={id}
                  actionsLoading={actionsLoading}
                  promissoryNote={promissoryNotesObj}
                  ref={btnRefPromissoryNotes}
                >
                  <PromissoryNotes />
                </PromissoryNotesUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
