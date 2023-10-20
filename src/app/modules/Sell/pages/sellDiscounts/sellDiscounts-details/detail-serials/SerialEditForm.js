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

  const SellDiscountSerialEditSchema = Yup.object().shape({
    SerialNo: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(500, t("err.Max", { 0: 100 }))
      .test(
        "checkSerial",
        t("err.DucplicateContent", { 0: t("SellDiscountSerial.SerialNumber") }),
        function(value) {
          return !detailsUIProps.checkSerial(value);
        }
      )
      .required(t("err.IsRequired", { 0: t("SellDiscountSerial.SerialNumber") })),
  });

  const columns = [
    {
      dataField: "Unit.Name",
      text: t("SellDiscountDetail.Unit"),
      sort: false,
    },
    {
      dataField: "FromAmount",
      text: t("SellDiscountDetail.FromAmount"),
      sort: false,
    },
    {
      dataField: "ToAmount",
      text: t("SellDiscountDetail.ToAmount"),
      sort: false,
    },
    {
      dataField: "DiscountPercent",
      text: t("SellDiscountDetail.DiscountPercent"),
      sort: false,
    },
    {
      dataField: "DiscountPrice",
      text: t("SellDiscountDetail.DiscountPrice"),
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
      SellDiscountSerialId: "",
      SellDiscountDtlId: detailsUIProps.selectedItem.SellDiscountDtlId,
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
              validationSchema={SellDiscountSerialEditSchema}
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
                        label={t("SellDiscountSerial.SerialNumber")}
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
                      <label style={{visibility: "hidden", display: "block"}}>{"1"}</label>
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
              keyField="SellDiscountSerialId"
              data={
                detailsUIProps.selectedItem.SellDiscountSerials === null
                  ? []
                  : detailsUIProps.selectedItem.SellDiscountSerials
              }
              columns={columns}
            >
              <PleaseWaitMessage
                entities={detailsUIProps.selectedItem.SellDiscountSerials}
              />
              <NoRecordsFoundMessage
                entities={detailsUIProps.selectedItem.SellDiscountSerials}
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
