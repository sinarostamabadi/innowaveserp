/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Select,
  DatePickerField,
} from "../../../../../../../core/_partials/controls";
import { getAllSpecialDayTypes } from "../../../../../General/_redux/specialDayTypes/specialDayTypesCrud";
import { FaObjToEnDateTime } from "../../../../../../../core/_helpers";

export function PersonSpecialDayEditForm({
  savePersonSpecialDay,
  personSpecialDay,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();

  const [personSpecialDayTypes, setPersonSpecialDayTypes] = useState([]);
  useEffect(() => {
    if (personSpecialDayTypes.length == 0)
      getAllSpecialDayTypes().then(({ data }) =>
        setPersonSpecialDayTypes((personSpecialDayTypes) => [
          { SpecialDayTypeId: null, TitleFa: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [personSpecialDayTypes.length, t]);

  // Validation schema
  const PersonSpecialDayEditSchema = Yup.object().shape({
    SpecialDayTypeId: Yup.string().required(
      t("err.IsRequired", { 0: t("PersonSpecialDay.SpecialDayTypeId") })
    ),
    PersonSpecialDayDate: Yup.object()
      .nullable()
      .required(
        t("err.IsRequired", { 0: t("PersonSpecialDay.PersonSpecialDayDate") })
      ),
  });

  function clean(dirty) {
    return {
      PersonSpecialDayId: dirty.PersonSpecialDayId,
      PersonId: +dirty.PersonId,
      SpecialDayTypeId: +dirty.SpecialDayTypeId,
      SpecialDayType: {
        SpecialDayTypeId: +dirty.SpecialDayTypeId,
        TitleFa: personSpecialDayTypes.find(
          (p) => p.SpecialDayTypeId == dirty.SpecialDayTypeId
        ).TitleFa,
      },
      PersonSpecialDayDate: FaObjToEnDateTime(dirty.PersonSpecialDayDate),
    };
  }

  return (
    <>
      <Formik
        key="CompanyPersonSpecialDay"
        enableReinitialize={true}
        initialValues={personSpecialDay}
        validationSchema={PersonSpecialDayEditSchema}
        onSubmit={(values) => {
          savePersonSpecialDay(clean(values));
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
                    <Select
                      name="SpecialDayTypeId"
                      label={t("PersonSpecialDay.SpecialDayType")}
                    >
                      {personSpecialDayTypes.map((personSpecialDayType) => (
                        <option
                          key={personSpecialDayType.SpecialDayTypeId}
                          value={personSpecialDayType.SpecialDayTypeId}
                        >
                          {personSpecialDayType.TitleFa}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <DatePickerField
                      name="PersonSpecialDayDate"
                      customFeedbackLabel=""
                      label={t("PersonSpecialDay.PersonSpecialDayDate")}
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
