import React, { useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { Formik, Field } from "formik";
import { useDetailsUIContext } from "../DetailsUIContext";
import BootstrapTable from "react-bootstrap-table-next";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../../core/_helpers";
import { ActionsColumnFormatter } from "./serial-column-formatters/ActionsColumnFormatter";
import {
  Input,
  CheckboxField,
  SuggestionField,
} from "../../../../../../../core/_partials/controls";

export function SerialEditForm({ detail, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const defaultInput = useRef(null);
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  const [serialObj, setSerialObj] = useState({
    SerialNo: "",
  });

  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      selectedItem: detailsUIContext.selectedItem,
      addSerial: detailsUIContext.addSerial,
      removeSerial: detailsUIContext.removeSerial,
      checkSerial: detailsUIContext.checkSerial,
    };
  }, [detailsUIContext]);

  const BuySerialEditSchema = Yup.object().shape({
    SerialNo: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(500, t("err.Max", { 0: 100 }))
      .test(
        "checkSerial",
        t("err.DucplicateContent", { 0: t("BuySerial.SerialNumber") }),
        function (value) {
          return !detailsUIProps.checkSerial(value);
        }
      )
      .required(t("err.IsRequired", { 0: t("BuySerial.SerialNumber") })),
  });

  const columns = [
    {
      dataField: "SerialNumber",
      text: t("BuySerial.SerialNumber"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        actionDelete: detailsUIProps.removeSerial,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  function addSerial(values) {
    detailsUIProps.addSerial({
      BuySerialId: "",
      BuyDetailId: detailsUIProps.selectedItem.BuyDetailId,
      SerialNumber: values.SerialNo,
    });

    setTimeout(() => {
      !!defaultInput && !!defaultInput.current && defaultInput.current.focus();
      !!defaultInput && !!defaultInput.current && defaultInput.current.select();

      setSerialObj({
        SerialNo: "",
      });
    }, 50);
  }

  return (
    <>
      <Modal.Body className="">
        {actionsLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-success" />
          </div>
        )}
        <Row>
          <Col>
            <Formik
              enableReinitialize={true}
              initialValues={serialObj}
              validationSchema={BuySerialEditSchema}
              onSubmit={(values) => {
                console.log("values > ", values);
                addSerial(values);
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <Row>
                    <Col>
                      <Field
                        name="SerialNo"
                        component={Input}
                        customFeedbackLabel=""
                        label={t("BuySerial.SerialNumber")}
                        setref={defaultInput}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.stopPropagation();
                            e.preventDefault();

                            handleSubmit();
                          }
                        }}
                      />
                    </Col>
                    <Col xs="auto">
                      <label style={{ visibility: "hidden", display: "block" }}>
                        {"1"}
                      </label>
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        <i className="fas fa-plus"></i> افزودن
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Formik>
          </Col>
        </Row>
        <Row>
          <Col>
            <BootstrapTable
              wrapperClasses="table-responsive"
              classes="table table-head-custom table-vertical-center"
              bordered={false}
              bootstrap4
              remote
              keyField="BuySerialId"
              data={
                detailsUIProps.selectedItem.BuySerials === null
                  ? []
                  : detailsUIProps.selectedItem.BuySerials
              }
              columns={columns}
            >
              <PleaseWaitMessage
                entities={detailsUIProps.selectedItem.BuySerials}
              />
              <NoRecordsFoundMessage
                entities={detailsUIProps.selectedItem.BuySerials}
              />
            </BootstrapTable>
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
            بستن
          </button>
        </div>
      </Modal.Footer>
    </>
  );
}
