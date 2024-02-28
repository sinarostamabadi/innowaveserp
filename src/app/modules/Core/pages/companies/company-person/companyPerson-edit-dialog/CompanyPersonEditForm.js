import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Select,
  Input,
  SuggestionField,
} from "../../../../../../../core/_partials/controls";
import { getAllCompanyPersonTypes } from "./../../../../../General/_redux/companyPersonTypes/companyPersonTypesCrud";

export function CompanyPersonEditForm({
  saveCompanyPerson,
  companyPerson,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();

  const [personTypes, setPersonTypes] = useState([]);
  useEffect(() => {
    if (personTypes.length == 0)
      getAllCompanyPersonTypes().then(({ data }) => {
        console.log("data > ", data);
        setPersonTypes((personTypes) => [
          { CompanyPersonTypeId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ]);
      });
  }, [personTypes.length]);

  // Validation schema
  const CompanyPersonEditSchema = Yup.object().shape({
    CompanyPersonTypeId: Yup.string().required(
      t("err.IsRequired", { 0: t("PersonType.Entity") })
    ),
  });

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    axios
      .post("person/get", {
        Filters: [{ Property: "FullNameFa", Operation: 7, Values: [query] }],
        OrderBy: "FullNameFa asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  function clean(dirtyModel) {
    return {
      CompanyPersonId: dirtyModel.CompanyPersonId,
      CompanyPersonTypeId: +dirtyModel.CompanyPersonTypeId,
      CompanyPersonType: {
        CompanyPersonTypeId: +dirtyModel.CompanyPersonTypeId,
        Title: personTypes.find(
          (p) => p.CompanyPersonTypeId == dirtyModel.CompanyPersonTypeId
        ).Title,
      },
      Person: {
        PersonId:
          !!dirtyModel.PersonId && dirtyModel.PersonId.length == 1
            ? +dirtyModel.PersonId[0].PersonId
            : null,
        FullNameFa:
          !!dirtyModel.PersonId && dirtyModel.PersonId.length == 1
            ? dirtyModel.PersonId[0].FullNameFa
            : null,
      },
      PersonId:
        !!dirtyModel.PersonId && dirtyModel.PersonId.length == 1
          ? +dirtyModel.PersonId[0].PersonId
          : null,
    };
  }

  return (
    <>
      <Formik
        key="CompanyCompanyPerson"
        enableReinitialize={true}
        initialValues={companyPerson}
        validationSchema={CompanyPersonEditSchema}
        onSubmit={(values) => {
          saveCompanyPerson(clean(values));
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
                    <SuggestionField
                      name="PersonId"
                      labelKey="FullNameFa"
                      customFeedbackLabel=""
                      label={t("CompanyPerson.Person")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionPerson}
                      defaultValue={
                        companyPerson && !!companyPerson.Person
                          ? [companyPerson.Person]
                          : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.FullNameFa}</h6>
                        </div>
                      )}
                      extraAction={[
                        {
                          icon: "far fa-plus",
                          title: t("RealPerson.Entity"),
                          url: "/Core/realPersons/new",
                        },
                      ]}
                    />
                  </div>
                  <div className="col-lg-6">
                    <Select
                      name="CompanyPersonTypeId"
                      label={t("CompanyPerson.CompanyPersonType")}
                    >
                      {!!personTypes &&
                        personTypes.length > 0 &&
                        personTypes.map((personType) => (
                          <option
                            key={personType.CompanyPersonTypeId}
                            value={personType.CompanyPersonTypeId}
                          >
                            {personType.Title}
                          </option>
                        ))}
                    </Select>
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
