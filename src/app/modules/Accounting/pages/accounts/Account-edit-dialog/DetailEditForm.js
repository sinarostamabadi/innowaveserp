import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  CheckboxField,
} from "../../../../../../core/_partials/controls";
import { useAccountsUIContext } from "../AccountsUIContext";
import { getAllAccountTypes } from "../../../_redux/accountTypes/accountTypesCrud";

export function DetailEditForm({ saveDetail, detail, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const DetailEditSchema = Yup.object().shape({
    Code: Yup.string().required(t("err.IsRequired", { 0: t("Account.Code") })),
    Title: Yup.string().required(
      t("err.IsRequired", { 0: t("Account.Title") })
    ),
    AccountTypeId: Yup.number().required(
      t("err.IsRequired", { 0: t("Account.AccountType") })
    ),
    StartYearId: Yup.number().required(
      t("err.IsRequired", { 0: t("Account.StartYear") })
    ),
    TarazSood: Yup.string().required(
      t("err.IsRequired", { 0: t("Account.TarazSood") })
    ),
  });

  const detailsUIContext = useAccountsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      selectedId: detailsUIContext.selectedId,
      selectedItem: detailsUIContext.selectedItem,
      findDetail: detailsUIContext.findDetail,
      addDetail: detailsUIContext.addDetail,
      updateDetail: detailsUIContext.updateDetail,
    };
  }, [detailsUIContext]);

  const [accountTypes, setAccountTypes] = useState([]);
  useEffect(() => {
    if (accountTypes.length == 0)
      getAllAccountTypes().then(({ data }) =>
        setAccountTypes((accountTypes) => [
          { AccountTypeId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [accountTypes.length]);

  useEffect(() => {
    if (!!detailsUIProps.selectedId) {
    }
  }, [detail]);

  function cleanDetail(dirtyData) {
    return {
      AccountId: dirtyData.AccountId,
      ParentId: detailsUIProps.selectedItem.parent,
      Code: dirtyData.Code,
      Title: dirtyData.Title,
      FullCode: dirtyData.Code,
      FullTitle: dirtyData.Title,
      StartYearId: +dirtyData.StartYearId,
      AccountTypeId: +dirtyData.AccountTypeId,
      AccountType: accountTypes.filter(
        (x) => x.AccountTypeId == dirtyData.AccountTypeId
      )[0],
      Level: detailsUIProps.selectedItem.level,
      TarazSood: +dirtyData.TarazSood,
      Active: dirtyData.Active,
      HasProject: dirtyData.HasProject,
      HasAccountFloating: dirtyData.HasAccountFloating,
      HasCostCenter: dirtyData.HasCostCenter,
      HasCurrency: dirtyData.HasCurrency,
      HasReference: dirtyData.HasReference,
      HasContract: dirtyData.HasContract,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonDetail"
        enableReinitialize={true}
        initialValues={detail}
        validationSchema={DetailEditSchema}
        onSubmit={(values) => {
          saveDetail(cleanDetail(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="Code"
                      component={Input}
                      label={t("Account.Code")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="Title"
                      component={Input}
                      label={t("Account.Title")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select
                      name="AccountTypeId"
                      label={t("Account.AccountType")}
                    >
                      {accountTypes.map((accountType) => (
                        <option
                          key={accountType.AccountTypeId}
                          value={accountType.AccountTypeId}
                        >
                          {!!accountType ? accountType.Title : ""}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="StartYearId"
                      component={Input}
                      label={t("Account.StartYear")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="TarazSood"
                      component={Input}
                      label={t("Account.TarazSood")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CheckboxField
                      name="Active"
                      customFeedbackLabel=""
                      label={t("Account.Active")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CheckboxField
                      name="HasProject"
                      customFeedbackLabel=""
                      label={t("Account.HasProject")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CheckboxField
                      name="HasAccountFloating"
                      customFeedbackLabel=""
                      label={t("Account.HasAccountFloating")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CheckboxField
                      name="HasCostCenter"
                      customFeedbackLabel=""
                      label={t("Account.HasCostCenter")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CheckboxField
                      name="HasCurrency"
                      customFeedbackLabel=""
                      label={t("Account.HasCurrency")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CheckboxField
                      name="HasReference"
                      customFeedbackLabel=""
                      label={t("Account.HasReference")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CheckboxField
                      name="HasContract"
                      customFeedbackLabel=""
                      label={t("Account.HasContract")}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                {t("Common.Cancel")}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                {t("Common.Save")}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
