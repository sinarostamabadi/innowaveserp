import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/RestaurantInvoices/RestaurantInvoicesActions";
import { useRestaurantInvoicesUIContext } from "../RestaurantInvoicesUIContext";
import { useTranslation } from "react-i18next";
import { Row, Col, Button } from "react-bootstrap";
import { Select } from "../../../../../../core/_partials/controls";
import { getFreeRestaurantTables } from "./../../../_redux/RestaurantTables/RestaurantTablesCrud";

export function RestaurantInvoiceRelocation({ id, show, onHide }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [restaurantTables, setRestaurantTables] = useState([]);

  useEffect(() => {
    if (restaurantTables.length == 0)
      getFreeRestaurantTables().then(({ data }) =>
        setRestaurantTables((restaurantTables) => [
          { RestaurantTableId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [restaurantTables.length]);

  // RestaurantInvoices UI Context
  const restaurantInvoicesUIContext = useRestaurantInvoicesUIContext();
  const restaurantInvoicesUIProps = useMemo(() => {
    return {
      queryParams: restaurantInvoicesUIContext.queryParams,
    };
  }, [restaurantInvoicesUIContext]);

  // RestaurantInvoices Redux state
  const dispatch = useDispatch();
  const [invoiceModel, setInvoiceModel] = useState(null);
  const { isLoading, entities } = useSelector(
    (state) => ({
      isLoading: state.restaurantInvoices.actionsLoading,
      entities: state.restaurantInvoices.entities,
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
        entities.filter((model) => model.RestaurantInvoiceId == id)[0]
      );
      console.log("invoiceModel >> ", invoiceModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {}, [isLoading, dispatch]);
  const updateRestaurantInvoiceStatus = (values) => {
    // server request for deleting restaurantInvoice by id
    dispatch(actions.updateRestaurantInvoice(id, values))
      .then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchRestaurantInvoices(restaurantInvoicesUIProps.queryParams)
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
          values.RestaurantTableId = +values.RestaurantTableId;
          updateRestaurantInvoiceStatus(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              {isLoading && <ModalProgressBar variant="query" />}
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  {t("Common.Relocation") + " " + t("RestaurantInvoice.Entity")}
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
                      key="RestaurantTableId"
                      name="RestaurantTableId"
                      label={t("RestaurantInvoice.RestaurantTable")}
                      customFeedbackLabel=""
                    >
                      {restaurantTables.map((type) => (
                        <option
                          key={type.RestaurantTableId}
                          value={type.RestaurantTableId}
                        >
                          {type.Title}
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
                    {t("Common.Relocation")}
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
