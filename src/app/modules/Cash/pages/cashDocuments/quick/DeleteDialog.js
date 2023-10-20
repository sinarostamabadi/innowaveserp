import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function DeleteDialog({ show, onHide, deleteObj, transactions, setTransactions }) {
  const { t } = useTranslation();

  function deleteTran() {
    setTransactions(trans => ({
      ...transactions,
      Transactions: transactions.Transactions.filter(x => x.TranId != deleteObj.TranId),
      Payments: transactions.Payments.filter(x => x.TranId != deleteObj.TranId),
      BankTransfers: transactions.BankTransfers.filter(x => x.TranId != deleteObj.TranId),
      Cheques: transactions.Cheques.filter(x => x.TranId != deleteObj.TranId),
      CouponTransactions: transactions.CouponTransactions.filter(x => x.TranId != deleteObj.TranId),
      Credits: transactions.Credits.filter(x => x.TranId != deleteObj.TranId),
      PromissoryNotes: transactions.PromissoryNotes.filter(x => x.TranId != deleteObj.TranId),
      Wallets: transactions.Wallets.filter(x => x.TranId != deleteObj.TranId),
    }));
    onHide();
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("CashDocument.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>{t("Common.DeleteQuestion")}</span>
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
            onClick={deleteTran}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
