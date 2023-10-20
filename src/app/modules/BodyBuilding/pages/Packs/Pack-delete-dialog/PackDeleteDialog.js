import { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import * as actions from "../../../_redux/Packs/PacksActions";
import { usePacksUIContext } from "../PacksUIContext";
import { useTranslation } from "react-i18next";

export function PackDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const uiContext = usePacksUIContext();
  const uiProps = useMemo(() => {
    return {
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
    };
  }, [uiContext]);

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.packs.actionsLoading }),
    shallowEqual
  );

  useEffect(() => {
    if (!id) onHide();
  }, [id]);

  const dispatch = useDispatch();
  const deletePack = () => {
    dispatch(actions.deletePack(id))
      .then(() => {
        dispatch(actions.fetchPacks(uiProps.queryParams));
        uiProps.setIds([]);
        onHide();
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete") + " " + t("BodyBuildingPack.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && error != null && (
          <Alerty
            variant="danger"
            title={t("err.Error")}
            description={error.clientMessage}
          ></Alerty>
        )}
        {!isLoading && <span>{t("Common.DeleteQuestion")}</span>}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
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
          onClick={deletePack}
          className="btn btn-delete btn-danger"
        >
          {t("Common.Delete")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
