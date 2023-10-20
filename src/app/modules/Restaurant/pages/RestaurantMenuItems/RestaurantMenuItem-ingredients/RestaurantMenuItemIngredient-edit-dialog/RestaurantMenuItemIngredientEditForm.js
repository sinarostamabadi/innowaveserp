import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../../core/_partials/controls";
import { suggestProductGroup } from "../../../../../Warehouse/_redux/productGroups/productGroupsCrud";
import { getAllUnits } from "../../../../../General/_redux/units/unitsCrud";
import { SuggestionField } from "../../../../../../../core/_partials/controls";
import {
  FaObjToEnDateTime,
  numberFaToEn,
} from "../../../../../../../core/_helpers";

export function RestaurantMenuItemIngredientEditForm({
  saveRestaurantMenuItemIngredient,
  restaurantMenuItemIngredient,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const RestaurantMenuItemIngredientEditSchema = Yup.object().shape({
    ProductGroupId: Yup.array().required(
      t("err.IsRequired", { 0: t("RestaurantMenuItemIngredient.ProductGroup") })
    ),
    UnitId: Yup.string().required(
      t("err.IsRequired", { 0: t("RestaurantMenuItemIngredient.Unit") })
    ),
    Amount: Yup.string().required(
      t("err.IsRequired", { 0: t("RestaurantMenuItemIngredient.Amount") })
    ),
  });

  const handleSuggestionProductGroup = useCallback((query, fnCallback) => {
    suggestProductGroup(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const [units, setUnits] = useState([]);
  useEffect(() => {
      getAllUnits().then(({ data }) => {
        setUnits((units) => [
          { UnitId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ]);
      });
  }, [units.length]);

  function cleanDetail(dirtyData) {
    return {
      RestaurantMenuItemIngredientId: dirtyData.RestaurantMenuItemIngredientId,
      RestaurantMenuItemId: dirtyData.RestaurantMenuItemId,
      ProductGroup:
        !!dirtyData.ProductGroupId && dirtyData.ProductGroupId.length == 1
          ? dirtyData.ProductGroupId[0]
          : (!!dirtyData.ProductGroup ? dirtyData.ProductGroup: null),
      ProductGroupId:
        !!dirtyData.ProductGroupId && dirtyData.ProductGroupId.length == 1
          ? +dirtyData.ProductGroupId[0].ProductGroupId
          : (!!dirtyData.ProductGroupId ? dirtyData.ProductGroupId: null),
      UnitId: +dirtyData.UnitId,
      Unit: !!dirtyData.UnitId
        ? units.filter(
            (x) => x.UnitId == dirtyData.UnitId
          )[0]
        : null,
      Amount: +dirtyData.Amount,
      Description: dirtyData.Description,
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonRestaurantMenuItemIngredient"
        enableReinitialize={true}
        initialValues={restaurantMenuItemIngredient}
        validationSchema={RestaurantMenuItemIngredientEditSchema}
        onSubmit={(values) => {
          saveRestaurantMenuItemIngredient(cleanDetail(values));
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
                      name="ProductGroupId"
                      labelKey="Title"
                      customFeedbackLabel=""
                      label={t("RestaurantMenuItemIngredient.ProductGroup")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionProductGroup}
                      defaultValue={
                        restaurantMenuItemIngredient && !!restaurantMenuItemIngredient.ProductGroup ? [restaurantMenuItemIngredient.ProductGroup] : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Title}</h6>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select
                      name="UnitId"
                      label={t("RestaurantMenuItemIngredient.Unit")}
                    >
                      {units.map((unit) => (
                        <option
                          key={unit.UnitId}
                          value={unit.UnitId}
                        >
                          {!!unit 
                            ? unit.Name
                            : ""}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="Amount"
                      component={Input}
                      label={t("RestaurantMenuItemIngredient.Amount")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="Description"
                      component={Input}
                      label={t("RestaurantMenuItemIngredient.Description")}
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
