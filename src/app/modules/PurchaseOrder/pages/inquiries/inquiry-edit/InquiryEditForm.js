/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SuggestionField } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import Axios from "axios";

export function InquiryEditForm({ inquiry, btnRef, saveInquiry }) {
  const { t } = useTranslation();

  const InquiryEditSchema = Yup.object().shape({
    PersonId: Yup.array()
      .required(t("err.IsRequired", { 0: t("Inquiry.PersonId") })),
    InquiryStatusId: Yup.array()
      .required(t("err.IsRequired", { 0: t("Inquiry.InquiryStatusId") })),
  });

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    Axios
      .post("Person/Get", {
        Filters: [{ Property: "FullNameFa", Operation: 7, Values: [query] }],
        OrderBy: "FullNameFa asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const handleSuggestionInquiryStatus = useCallback((query, fnCallback) => {
    Axios
      .post("InquiryStatus/Get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={inquiry}
        validationSchema={InquiryEditSchema}
        onSubmit={(values) => {
          saveInquiry(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <SuggestionField
                    name="PersonId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("Inquiry.PersonId")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPerson}
                    defaultValue={inquiry ? [inquiry.Person] : []}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.FullNameFa}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-6">
                  <SuggestionField
                    name="InquiryStatusId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("Inquiry.InquiryStatusId")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionInquiryStatus}
                    defaultValue={inquiry ? [inquiry.InquiryStatus] : []}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}