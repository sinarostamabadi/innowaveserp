import React, { createRef, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { getAllAccountFloatingTypes } from "./../../../_redux/accountFloatingTypes/accountFloatingTypesCrud";

export function AccountFloatingTypeEditForm({
  accountFloatingType,
  btnRef,
  saveAccountFloatingType,
}) {
  const { t } = useTranslation();
  const defaultInput = createRef();

  useEffect(() => {
    defaultInput.current.focus();
  }, [defaultInput]);

  const AccountFloatingTypeEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("AccountFloatingType.Title") })),
  });

  function clean(dirty) {
    return {
      AccountFloatingTypeId: dirty.AccountFloatingTypeId,
      Title: dirty.Title,
      ParentId: +dirty.ParentId,
    };
  }
  const [parentIds, setParentIds] = useState([]);

  useEffect(() => {
    if (parentIds.length == 0)
      getAllAccountFloatingTypes().then(({ data }) =>
        setParentIds((lines) => [
          { AccountFloatingTypeId: "", Title: t("Common.WithoutSelect") },
          ...data.Items.filter(
            (x) => x.CostCenterId != accountFloatingType.AccountFloatingTypeId
          ),
        ])
      );
  }, [parentIds.length, accountFloatingType.AccountFloatingTypeId]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={accountFloatingType}
        validationSchema={AccountFloatingTypeEditSchema}
        onSubmit={(values) => {
          saveAccountFloatingType(clean(values));
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
                    label={t("AccountFloatingType.Title")}
                  />
                </div>
                <div className="col-lg-6">
                  <Select
                    name="ParentId"
                    label={t("AccountFloatingType.ParentId")}
                    setref={defaultInput}
                  >
                    {parentIds.map((parent) => (
                      <option
                        key={parent.AccountFloatingTypeId}
                        value={parent.AccountFloatingTypeId}
                      >
                        {parent.Title}
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
