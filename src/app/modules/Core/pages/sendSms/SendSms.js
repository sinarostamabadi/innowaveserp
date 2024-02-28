import React, { useState, useCallback, useRef } from "react";
import { Tabs, Tab, InputGroup, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  ModalProgressBar,
  Alerty,
  Input,
  TextArea,
  SuggestionField,
} from "../../../../../core/_partials/controls";
import { suggestPerson } from "../../_redux/people/peopleCrud";
import {
  suggestPersonGroup,
  getPersonGroupById,
} from "../../../General/_redux/personGroups/personGroupsCrud";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../core/_helpers";

export function SendSms() {
  const { t } = useTranslation();
  const [phones, setPhones] = useState([]);
  const [sending, setSending] = useState(false);

  function sendSms(message) {
    setSending(true);

    axios
      .post("Person/SendSMS", {
        MobileNumbers: phones.map((x) => x.Mobile),
        message: message,
      })
      .then(() => {
        setSending(false);
      });
  }

  function addPhone(phoneNumber) {
    setPhones((p) => [...phones, phoneNumber]);
  }

  function addPhoneByPersonGroup(personGroupId) {
    axios
      .post("RelationPersonGroup/get", {
        Filters: [
          {
            Property: "PersonGroupId",
            Operation: 5,
            Values: [personGroupId + ""],
          },
        ],
        OrderBy: "PersonId asc",
      })
      .then(({ data }) => {
        if (data.Items.length > 0) {
          setPhones((p) => [
            ...phones,
            ...data.Items.filter((x) => !!x.Person).map((x) => {
              return { Person: x.Person.FullNameFa, Mobile: x.Person.Mobile };
            }),
          ]);
        }
      });
  }

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const handleSuggestionPersonGroup = useCallback((query, fnCallback) => {
    suggestPersonGroup(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const columns = [
    {
      dataField: "Person",
      text: t("Person.FullNameFa"),
      sort: true,
    },
    {
      dataField: "Mobile",
      text: t("Person.Mobile"),
      sort: true,
    },
  ];

  return (
    <Formik
      initialValues={{
        Person: "",
        PersonGroup: "",
        Message: "",
      }}
    >
      {({ handleSubmit, values }) => (
        <>
          <Form id="Formik" className="form form-label-right">
            <Card>
              {sending && <ModalProgressBar />}
              <CardHeader title="Send SMS">
                <CardHeaderToolbar>
                  <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    onClick={() => sendSms(values.Message)}
                  >
                    <i className="fa fa-sms"></i> {t("Common.SendSms")}
                  </button>
                </CardHeaderToolbar>
              </CardHeader>
              <CardBody>
                <div className="form-group row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col">
                        <SuggestionField
                          name="Person"
                          labelKey="FullNameFa"
                          fieldKey="PersonId"
                          customFeedbackLabel=""
                          label={t("Person.Entity")}
                          placeHolder={t("msg.SelectBySuggestion")}
                          handleSearch={handleSuggestionPerson}
                          renderMenuItemChildren={(option, props) => (
                            <div>
                              <h6>{option.FullNameFa}</h6>
                              <span>
                                {t("Person.Mobile")}:{" "}
                                {option.Mobile ?? "Mobile phone is not registered"}
                              </span>
                              <br />
                              <span>
                                {t("Person.Email")}: {option.Email}
                              </span>
                            </div>
                          )}
                        />
                      </div>
                      <div className="col-auto">
                        <label className="d-block">&nbsp;</label>
                        <Button
                          variant="outline-success"
                          onClick={() => {
                            addPhone({
                              Person: values.Person[0].FullNameFa,
                              Mobile: values.Person[0].Mobile,
                            });
                          }}
                        >
                          <i className="fa fa-plus p-0"></i>
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <SuggestionField
                          name="PersonGroup"
                          labelKey="Title"
                          fieldKey="PersonGroupId"
                          customFeedbackLabel=""
                          label={t("PersonGroup.Entity")}
                          placeHolder={t("msg.SelectBySuggestion")}
                          handleSearch={handleSuggestionPersonGroup}
                          renderMenuItemChildren={(option, props) => (
                            <div>
                              <h6>{option.Title}</h6>
                            </div>
                          )}
                        />
                      </div>
                      <div className="col-auto">
                        <label className="d-block">&nbsp;</label>
                        <Button
                          variant="outline-success"
                          onClick={() => {
                            addPhoneByPersonGroup(
                              values.PersonGroup[0].PersonGroupId
                            );
                          }}
                        >
                          <i className="fa fa-plus p-0"></i>
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <BootstrapTable
                          wrapperClasses="table-responsive"
                          classes="table table-head-custom table-vertical-center"
                          bootstrap4
                          bordered={false}
                          remote
                          keyField="Mobile"
                          data={phones === null ? [] : phones}
                          columns={columns}
                        >
                          <PleaseWaitMessage entities={phones} />
                          <NoRecordsFoundMessage entities={phones} />
                        </BootstrapTable>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="Message"
                      customFeedbackLabel=""
                      component={TextArea}
                      label={t("Common.Message")}
                      // value="به باشگاه مشتریان جهان‌ساتراپ خوش آمدید"
                      row={5}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Form>
        </>
      )}
    </Formik>
  );
}
