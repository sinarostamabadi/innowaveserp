import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/reserves/reservesActions";
import { useReservesUIContext } from "../ReservesUIContext";
import { useTranslation } from "react-i18next";
import { Row, Col, Button } from "react-bootstrap";
import { Select } from "../../../../../../core/_partials/controls";
import { getAllLines } from "../../../_redux/lines/linesCrud";

export function ReserveRelocation({ id, show, onHide }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (lines.length == 0)
    getAllLines().then(({ data }) =>
        setLines((lines) => [
          { LineId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [lines.length]);

  // Reserves UI Context
  const uiContext = useReservesUIContext();
  const uiProps = useMemo(() => {
    return {
      queryParams: uiContext.queryParams,
    };
  }, [uiContext]);

  // Reserves Redux state
  const dispatch = useDispatch();
  const [invoiceModel, setInvoiceModel] = useState(null);
  const { isLoading, entities } = useSelector(
    (state) => ({
      isLoading: state.reserves.actionsLoading,
      entities: state.reserves.entities,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    } else {
      console.log("entities >> ", entities);

      setInvoiceModel(
        entities.filter((model) => model.ReserveId == id)[0]
      );
      console.log("invoiceModel >> ", invoiceModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {}, [isLoading, dispatch]);
  const updateReserveStatus = (values) => {
    // server request for deleting reserve by id
    dispatch(actions.updateReserve(id, values))
      .then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchReserves(uiProps.queryParams)
        );

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
      <Formik
        enableReinitialize={true}
        initialValues={invoiceModel}
        onSubmit={(values) => {
          console.log("values >> ", values);
          values.LineId = +values.LineId;
          updateReserveStatus(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              {isLoading && <ModalProgressBar variant="query" />}
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  {t("Reserve.RelocationLine")}
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
                <Row>
                  <Col lg="12">
                    <Select
                      key="LineId"
                      name="LineId"
                      label={t("Reserve.Line")}
                      customFeedbackLabel=""
                    >
                      {lines.map((line) => (
                        <option
                          key={line.LineId}
                          value={line.LineId}
                        >
                          {line.Title}
                        </option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <div>
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                  >
                    {t("Common.Cancel")}
                  </button>{" "}
                  <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="btn btn-delete btn-success"
                  >
                    {t("Reserve.RelocationLine")}
                  </button>
                </div>
              </Modal.Footer>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  );
}
