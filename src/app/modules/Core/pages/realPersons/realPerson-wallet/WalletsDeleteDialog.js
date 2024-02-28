/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/wallets/walletsActions";
import { useWalletsUIContext } from "./WalletsUIContext";

export function WalletsDeleteDialog() {
  // Wallets UI Context
  const walletsUIContext = useWalletsUIContext();
  const walletsUIProps = useMemo(() => {
    return {
      personId: walletsUIContext.personId,
      ids: walletsUIContext.ids,
      show: walletsUIContext.showDeleteWalletsDialog,
      onHide: walletsUIContext.closeDeleteWalletsDialog,
      setIds: walletsUIContext.setIds,
      queryParams: walletsUIContext.queryParams,
      findWallet: walletsUIContext.findWallet,
    };
  }, [walletsUIContext]);

  // Wallets Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.wallets.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected wallets we should close modal
  useEffect(() => {
    if (!walletsUIProps.ids || walletsUIProps.ids.length === 0) {
      walletsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletsUIProps.ids]);

  const deleteWallets = () => {
    // server request for selected deleting wallets
    dispatch(actions.deleteWallets(walletsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchWallets(
          walletsUIProps.queryParams,
          walletsUIProps.personId
        )
      ).then(() => {
        walletsUIProps.setIds([]);
        walletsUIProps.onHide();
      });
    });
  };

  return (
    <Modal
      show={walletsUIProps.show}
      onHide={walletsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Wallets Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected wallets?</span>
        )}
        {isLoading && <span>Wallets are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={walletsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteWallets}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
