import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  DatePickerField,
  Input,
  Select,
} from "../../../../../../../core/_partials/controls";
import { useGroupsUIContext } from "../GroupsUIContext";
import { suggestProduct } from "../../../../../Warehouse/_redux/products/productsCrud";
import { getByProduct } from "../../../../../Warehouse/_redux/productUnits/productUnitsCrud";
import { SuggestionField } from "../../../../../../../core/_partials/controls";
import {
  FaObjToEnDateTime,
  EnToFaDate,
  numberFaToEn,
} from "../../../../../../../core/_helpers";

export function GroupEditForm({ saveGroup, group, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const GroupEditSchema = Yup.object().shape({
    Title: Yup.string().required(
      t("err.IsRequired", { 0: t("BowlingCompetitionGroup.Title") })
    ),
  });

  const groupsUIContext = useGroupsUIContext();

  function cleanGroup(dirtyData) {
    return {
      BowlingCompetitionGroupId: dirtyData.BowlingCompetitionGroupId,
      BowlingCompetitionId: dirtyData.BowlingCompetitionId,
      Title: dirtyData.Title,
      IsDeleted: false,
      BowlingCompetitionGroupTeams: dirtyData.BowlingCompetitionGroupTeams,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonGroup"
        enableReinitialize={true}
        initialValues={group}
        validationSchema={GroupEditSchema}
        onSubmit={(values) => {
          saveGroup(cleanGroup(values));
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
                      name="Title"
                      component={Input}
                      label={t("BowlingCompetitionGroup.Title")}
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
