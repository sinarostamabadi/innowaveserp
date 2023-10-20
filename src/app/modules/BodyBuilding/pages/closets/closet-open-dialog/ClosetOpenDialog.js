import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import * as actions from "../../../_redux/closets/closetsActions";
import { useClosetsUIContext } from "../ClosetsUIContext";

export function ClosetOpenDialog({ id, show, onHide }) {
  const { t } = useTranslation();
  const closetsUIContext = useClosetsUIContext();
  const [error, setError] = useState(null);
  const { setIds, queryParams } = useMemo(
    () => ({
      setIds: closetsUIContext.setIds,
      queryParams: closetsUIContext.queryParams,
    }),
    [closetsUIContext]
  );

  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.closets.actionsLoading }),
    shallowEqual
  );

  useEffect(() => {
    if (!id) onHide();
  }, [id]);

  useEffect(() => {}, [isLoading, dispatch]);

  const openCloset = () => {
    dispatch(actions.openCloset(+id))
      .then(() => {
        dispatch(actions.fetchClosets(queryParams));
        setIds([]);
        onHide();
      })
      .catch((err) => setError(err));
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="openCloset">
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="openCloset">{t("Common.OpenCloset")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && error != null && (
          <Alerty
            variant="danger"
            title={t("err.Error")}
            description={error.clientMessage}
          ></Alerty>
        )}
        {!isLoading && <span>{t("Common.ConfirmQuestion")}</span>}
        {isLoading && <span>{t("Common.ConfirmLoading")}</span>}
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
            onClick={openCloset}
            className="btn btn-delete btn-danger"
          >
            {t("Common.OpenCloset")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
