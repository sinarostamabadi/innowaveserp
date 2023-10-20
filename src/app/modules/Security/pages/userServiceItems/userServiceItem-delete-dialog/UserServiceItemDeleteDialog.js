
/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/userServiceItems/userServiceItemsActions";
import { useUserServiceItemsUIContext } from "../UserServiceItemsUIContext";
import { useTranslation } from "react-i18next";

export function UserServiceItemDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // UserServiceItems UI Context
  const userServiceItemsUIContext = useUserServiceItemsUIContext();
  const [error, setError] = useState(null);
  const userServiceItemsUIProps = useMemo(() => {
    return {
      setIds: userServiceItemsUIContext.setIds,
      queryParams: userServiceItemsUIContext.queryParams,
    };
  }, [userServiceItemsUIContext]);

  // UserServiceItems Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.userServiceItems.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteUserServiceItem = () => {
    // server request for deleting userServiceItem by id
    dispatch(actions.deleteUserServiceItem(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchUserServiceItems(userServiceItemsUIProps.queryParams));
        // clear selections list
        userServiceItemsUIProps.setIds([]);
        // closing delete modal
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
        <Modal.Title id="example-modal-sizes-title-lg">{t("Common.Delete") + " " + t("UserServiceItem.Entity")}</Modal.Title>
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
        {!isLoading && <span>{t("Common.DeleteQuestion")}</span>}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
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
            onClick={deleteUserServiceItem}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}