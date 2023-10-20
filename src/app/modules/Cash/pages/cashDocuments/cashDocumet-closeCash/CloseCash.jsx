import { useEffect, useMemo, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import axios from "axios";
import moment from "jalali-moment";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { useReactToPrint, numberWithCommas } from "src/core/_helpers";

import { useCashDocumentsUIContext } from "../CashDocumentsUIContext";
import { PrintCloseCash } from "../print/PrintCloseCash";

export function CloseCash({ show, onHide }) {
  const {history} = useHistory();
  const { t } = useTranslation();
  const [currentCash, setCurrentCash] = useState(null);
  const [error, setError] = useState(null);
  const uiContext = useCashDocumentsUIContext();
  const uiProps = useMemo(() => {
    return {
      queryParams: uiContext.queryParams,
    };
  }, [uiContext]);

  const { isLoading } = useSelector(
    (state) => ({isLoading: state.cashDocuments.actionsLoading}),
    shallowEqual
  );

  useEffect(() => {
    axios.get("cash/Get_DailySumTransaction").then(({data}) => setCurrentCash(data));
  }, []);

  const [printModel, setPrintModel] = useState(null);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 7pt;padding: 0;margin: 0;} @page { size: 80mm auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
    onAfterPrint: () => history.push("/logout"),
  });
  const Print = () => {
    handlePrint();
  };

  function closeCash() {
    const xUser = JSON.parse(JSON.parse(localStorage.getItem("persist:risha-auth")).user).UserId;
    const currentTime = moment.from().locale("en").format("YYYY-MM-DD");

    axios
      .post("SellMainReport/Close", {
        CurrentDate: currentTime,
        UserId: xUser,
      })
      .then(({ data }) => {
        setPrintModel(data);
        Print();
      });
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("CashDocument.CloseTodayCash")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && error != null && (
          <>
            <Alerty
              variant="danger"
              title={t("err.Error")}
              description={error.clientMessage}
            ></Alerty>
          </>
        )}
        {!isLoading && <strong>{t("CashDocument.CloseCashQuestion")}</strong>}
        {isLoading && <strong>{t("CashDocument.CloseCashWaiting")}</strong>}
        {currentCash && (
          <div>
            <br/>
            <div><strong>صندوق: </strong>{!!currentCash.Cash && currentCash.Cash.Title}</div>
            <div><strong>{t("CashDocument.Payment")}: </strong>{numberWithCommas(currentCash.PaymenPrice || 0)} {process.env.REACT_APP_CURRENCY}</div>
            <div><strong>{t("CashDocument.BetweenBanks")}: </strong>{numberWithCommas(currentCash.BankTransferPrice || 0)} {process.env.REACT_APP_CURRENCY}</div>
            <div><strong>{t("CashDocument.Cheque")}: </strong>{numberWithCommas(currentCash.ChequePrice || 0)} {process.env.REACT_APP_CURRENCY}</div>
            <div><strong>{t("CashDocument.Debt")}: </strong>{numberWithCommas(currentCash.DebtPrice || 0)} {process.env.REACT_APP_CURRENCY}</div>
            <div><strong>{t("CashDocument.Coupon")}: </strong>{numberWithCommas(currentCash.CouponTransactionPrice || 0)} {process.env.REACT_APP_CURRENCY}</div>
            <div><strong>{t("CashDocument.Wallet")}: </strong>{numberWithCommas(currentCash.WalletPrice || 0)} {process.env.REACT_APP_CURRENCY}</div>
            <div><strong>{t("CashDocument.Credit")}: </strong>{numberWithCommas(currentCash.CreditPrice || 0)} {process.env.REACT_APP_CURRENCY}</div>
            <div><strong>{t("CashDocument.PromissoryNote")}: </strong>{numberWithCommas(currentCash.PromissoryNotePrice || 0)} {process.env.REACT_APP_CURRENCY}</div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={closeCash}
            className="btn btn-delete btn-danger"
          >
            {t("CashDocument.CloseCash")}
          </button>
        </div>
      </Modal.Footer>
      <div style={{ display: "none" }}>
        <PrintCloseCash ref={componentRef} data={printModel} />
      </div>
    </Modal>
  );
}
