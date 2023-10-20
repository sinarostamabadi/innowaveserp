import React, { useState, createRef, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { getAllAccountFloatingGroups } from "./../../../_redux/accountFloatingGroups/accountFloatingGroupsCrud";

export function AccountFloatingGroupEditForm({ accountFloatingGroup, btnRef, saveAccountFloatingGroup }) {
  const { t } = useTranslation();
  const defaultInput = createRef()

  useEffect(() => {
    defaultInput.current.focus();
 }, [defaultInput]);

  const AccountFloatingGroupEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("AccountFloatingGroup.Title") })),
    Code: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("AccountFloatingGroup.Code") }))
  });

  const [accountFloatingGroupTypeIds, setAccountFloatingGroupTypeIds] = useState([]);
  
  useEffect(() => {
    if (accountFloatingGroupTypeIds.length == 0)
    getAllAccountFloatingGroups().then(({ data }) =>
    setAccountFloatingGroupTypeIds((accountFloatingGroupTypeIds) => [
          { AccountFloatingGroupTypeId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [accountFloatingGroupTypeIds.length, t]);

  function clean(dirty) {
    return {
      AccountFloatingGroupId: dirty.AccountFloatingGroupId,
      AccountFloatingGroupTypeId: dirty.AccountFloatingGroupTypeId && +dirty.AccountFloatingGroupTypeId,
      Code: dirty.Code,
      Title: dirty.Title
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={accountFloatingGroup}
        validationSchema={AccountFloatingGroupEditSchema}
        onSubmit={(values) => {
          saveAccountFloatingGroup(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("AccountFloatingGroup.Title")}
                  />
                  <Field
                    name="Code"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("AccountFloatingGroup.Code")}
                  />
                  <Select
                      name="AccountFloatingGroupTypeId"
                      label={t("AccountFloatingGroup.AccountFloatingGroupTypeId")}
                      setref={defaultInput}
                      >
                        {accountFloatingGroupTypeIds.map((accountFloatingGroup) => (
                          <option 
                            key={accountFloatingGroup.AccountFloatingGroupTypeId} 
                            value={accountFloatingGroup.AccountFloatingGroupTypeId}>
                            {accountFloatingGroup.AccountFloatingGroupTypeId}
                          </option>
                        ))}
                  </Select>
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