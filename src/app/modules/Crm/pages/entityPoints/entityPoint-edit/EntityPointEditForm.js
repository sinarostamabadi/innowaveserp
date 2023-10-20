import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { SuggestionField } from "../../../../../../core/_partials/controls";
import { suggestEntity } from "../../../_redux/entities/entitiesCrud";

export function EntityPointEditForm({ entityPoint, btnRef, saveEntityPoint }) {
  const { t } = useTranslation();

  const EntityPointEditSchema = Yup.object().shape({
    EntityId: Yup.array()
      .required(t("err.IsRequired", { 0: t("EntityPoint.EntityObj") })),
    Price: Yup.string()
      .required(t("err.IsRequired", { 0: t("EntityPoint.Price") })),
    Point: Yup.string()
      .required(t("err.IsRequired", { 0: t("EntityPoint.Point") })),      
  });

  const handleSuggestionEntity = useCallback((query, fnCallback) => {
    suggestEntity(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  function clean(dirtyData) {
    return {
      EntityPointId: dirtyData.DocumentDtlId,
      Entity:
        !!dirtyData.EntityId && dirtyData.EntityId.length == 1
          ? dirtyData.EntityId[0]
          : (!!dirtyData.Entity ? dirtyData.Entity: null),
      EntityId:
        !!dirtyData.EntityId && dirtyData.EntityId.length == 1
          ? +dirtyData.EntityId[0].EntityId
          : (!!dirtyData.EntityId ? dirtyData.EntityId: null),
      Price: dirtyData.Price && +dirtyData.Price,
      Point: dirtyData.Point && +dirtyData.Point,
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={entityPoint}
        validationSchema={EntityPointEditSchema}
        onSubmit={(values) => {
          saveEntityPoint(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                <SuggestionField
                      name="EntityId"
                      labelKey="Title"
                      customFeedbackLabel=""
                      label={t("EntityPoint.EntityObj")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionEntity}
                      defaultValue={
                        entityPoint && !!entityPoint.Entity ? [entityPoint.Entity] : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Title}</h6>
                        </div>
                      )}
                    />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="Price"
                    type="number"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("EntityPoint.Price")}
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="Point"
                    type="number"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("EntityPoint.Point")}
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