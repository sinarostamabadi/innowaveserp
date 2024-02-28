import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SuggestionField } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import axios from "axios";

export function AccountFloatingGroupRelationEditForm({
  accountFloatingGroupRelation,
  btnRef,
  saveAccountFloatingGroupRelation,
}) {
  const { t } = useTranslation();

  const AccountFloatingGroupRelationEditSchema = Yup.object().shape({
    AccountFloatingId: Yup.array()
      .nullable()
      .min(
        1,
        t("err.IsRequired", {
          0: t("AccountFloatingGroupRelation.AccountFloatingId"),
        })
      ),
    AccountFloatingGroupId: Yup.array()
      .nullable()
      .min(
        1,
        t("err.IsRequired", {
          0: t("AccountFloatingGroupRelation.AccountFloatingGroupId"),
        })
      ),
  });

  const handleSuggestionAccountFloating = useCallback((query, fnCallback) => {
    axios
      .post("accountFloating/get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const handleSuggestionAccountFloatingGroup = useCallback(
    (query, fnCallback) => {
      axios
        .post("accountFloatingGroup/get", {
          Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
          OrderBy: "Title asc",
          PageNumber: 1,
          PageSize: 10,
        })
        .then(({ data }) => {
          fnCallback(data.Items);
        });
    }
  );

  const clean = (dirty) => {
    return {
      AccountFloatingGroupRelationId: dirty.AccountFloatingGroupRelationId,
      AccountFloatingId:
        Array.isArray(dirty.AccountFloatingId) &&
        dirty.AccountFloatingId.length > 0
          ? +dirty.AccountFloatingId[0].AccountFloatingId
          : !!dirty.AccountFloatingId
          ? dirty.AccountFloatingId
          : null,
      AccountFloatingGroupId:
        Array.isArray(dirty.AccountFloatingGroupId) &&
        dirty.AccountFloatingGroupId.length > 0
          ? +dirty.AccountFloatingGroupId[0].AccountFloatingGroupId
          : !!dirty.AccountFloatingGroupId
          ? dirty.AccountFloatingGroupId
          : null,
    };
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={accountFloatingGroupRelation}
        validationSchema={AccountFloatingGroupRelationEditSchema}
        onSubmit={(values) => {
          saveAccountFloatingGroupRelation(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <SuggestionField
                    name="AccountFloatingId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("AccountFloatingGroupRelation.AccountFloating")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionAccountFloating}
                    defaultValue={
                      accountFloatingGroupRelation &&
                      accountFloatingGroupRelation.AccountFloating
                        ? [accountFloatingGroupRelation.AccountFloating]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-6">
                  <SuggestionField
                    name="AccountFloatingGroupId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t(
                      "AccountFloatingGroupRelation.AccountFloatingGroup"
                    )}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionAccountFloatingGroup}
                    defaultValue={
                      accountFloatingGroupRelation &&
                      accountFloatingGroupRelation.AccountFloatingGroup
                        ? [accountFloatingGroupRelation.AccountFloatingGroup]
                        : []
                    }
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
