import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  DatePickerField,
  Input,
  Select,
  SuggestionField,
} from "../../../../../../../core/_partials/controls";
import { useReservePersonsUIContext } from "../ReservePersonsUIContext";
import {
  suggestPerson,
  createPerson,
} from "../../../../../Core/_redux/people/peopleCrud";
import moment from "jalali-moment";

export function ReservePersonEditForm({
  saveReservePerson,
  reservePerson,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const ReservePersonEditSchema = Yup.object().shape({
    PersonId: Yup.array()
      .nullable()
      .min(1, t("err.IsRequired", { 0: t("ReservePerson.Person") })),
  });

  const uiContext = useReservePersonsUIContext();
  const uiProps = useMemo(() => {
    return {
      version: uiContext.version,
    };
  }, [uiContext]);

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  function cleanReservePerson(dirtyData) {
    return {
      ReservePersonScoreId: dirtyData.ReservePersonScoreId,
      ReserveId: dirtyData.ReserveId,
      Person:
        !!dirtyData.PersonId && dirtyData.PersonId.length == 1
          ? dirtyData.PersonId[0]
          : !!dirtyData.Person
          ? dirtyData.Person
          : null,
      PersonId:
        !!dirtyData.PersonId && dirtyData.PersonId.length == 1
          ? +dirtyData.PersonId[0].PersonId
          : !!dirtyData.PersonId
          ? dirtyData.PersonId
          : null,
      IsDeleted: false,
    };
  }

  function addNewPerson(data) {
    createPerson({
      Mobile: " ",
      AccountFloatingId: 1,
      FullNameFa: data.NameFa,
      FullNameEn: data.NameFa,
      RealPerson: {
        FirstNameFa: data.NameFa,
        LastNameFa: " ",
        BirthDate: moment.from().format("YYYY-MM-DD"),
      },
    }).then(({ data }) =>
      saveReservePerson(
        cleanReservePerson({
          ...data,
          PersonId: data.PersonId,
          Person: data,
          IsDeleted: false,
        })
      )
    );
  }

  return (
    <>
      <Formik
        key="RealPersonReservePerson"
        enableReinitialize={true}
        initialValues={reservePerson}
        validationSchema={ReservePersonEditSchema}
        onSubmit={(values) => {
          uiProps.version === 1 &&
            saveReservePerson(cleanReservePerson(values));
          uiProps.version === 2 && addNewPerson(values);
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
                  {uiProps.version === 1 ? (
                    <div className="col-lg-12">
                      <SuggestionField
                        name="PersonId"
                        labelKey="FullNameFa"
                        objectName="Person"
                        version={2}
                        customFeedbackLabel=""
                        label={t("ReservePerson.Person")}
                        placeHolder={t("msg.SelectBySuggestion")}
                        handleSearch={handleSuggestionPerson}
                        defaultValue={
                          reservePerson && !!reservePerson.Person
                            ? [reservePerson.Person]
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
                            url: "/core/realPersons/new",
                          },
                        ]}
                      />
                    </div>
                  ) : (
                    <div className="col-lg-12">
                      <Field
                        name="NameFa"
                        component={Input}
                        type="text"
                        customFeedbackLabel=""
                        label={t("ReservePerson.Person")}
                      />
                    </div>
                  )}
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
