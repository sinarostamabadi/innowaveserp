import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  DatePickerField,
  Input,
  Select,
  SuggestionField
} from "../../../../../../../core/_partials/controls";
import { useBowlingTeamPersonsUIContext } from "../BowlingTeamPersonsUIContext";
import { suggestPerson } from "../../../../../Core/_redux/people/peopleCrud";

export function BowlingTeamPersonEditForm({ saveBowlingTeamPerson, bowlingTeamPerson, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const BowlingTeamPersonEditSchema = Yup.object().shape({
    PersonId: Yup.array().nullable().min(1, t("err.IsRequired", { 0: t("BowlingTeamPerson.Person") })),
  }); 

  const bowlingTeamPersonsUIContext = useBowlingTeamPersonsUIContext();
  const bowlingTeamPersonsUIProps = useMemo(() => {
    return {
      selectedId: bowlingTeamPersonsUIContext.selectedId,
      findBowlingTeamPerson: bowlingTeamPersonsUIContext.findBowlingTeamPerson,
      addBowlingTeamPerson: bowlingTeamPersonsUIContext.addBowlingTeamPerson,
      updateBowlingTeamPerson: bowlingTeamPersonsUIContext.updateBowlingTeamPerson,
    };
  }, [bowlingTeamPersonsUIContext]);

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  function cleanBowlingTeamPerson(dirtyData) {
    return {
      BowlingTeamPersonScoreId: dirtyData.BowlingTeamPersonScoreId,
      BowlingTeamId: dirtyData.BowlingTeamId,
      Person:
        !!dirtyData.PersonId && dirtyData.PersonId.length == 1
          ? dirtyData.PersonId[0]
          : (!!dirtyData.Person ? dirtyData.Person: null),
      PersonId:
        !!dirtyData.PersonId && dirtyData.PersonId.length == 1
          ? +dirtyData.PersonId[0].PersonId
          : (!!dirtyData.PersonId ? dirtyData.PersonId: null),
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonBowlingTeamPerson"
        enableReinitialize={true}
        initialValues={bowlingTeamPerson}
        validationSchema={BowlingTeamPersonEditSchema}
        onSubmit={(values) => {
          saveBowlingTeamPerson(cleanBowlingTeamPerson(values));
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
                  <div className="col-lg-12">
                    <SuggestionField
                      name="PersonId"
                      labelKey="FullNameFa"
                      customFeedbackLabel=""
                      label={t("BowlingTeamPerson.Person")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionPerson}
                      defaultValue={bowlingTeamPerson && !!bowlingTeamPerson.Person ? [bowlingTeamPerson.Person] : []}
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.FullNameFa}</h6>
                        </div>
                      )}
                      extraAction={[
                        {
                          icon: "far fa-plus",
                          title: t("RealPerson.Entity"),
                          url: "/core/realPersons/new"
                        },
                      ]}
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
