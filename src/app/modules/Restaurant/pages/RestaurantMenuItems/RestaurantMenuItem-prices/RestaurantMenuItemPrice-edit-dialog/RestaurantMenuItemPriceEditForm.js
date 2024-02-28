import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
} from "../../../../../../../core/_partials/controls";
import { FaObjToEnDateTime } from "../../../../../../../core/_helpers";

export function RestaurantMenuItemPriceEditForm({
  saveRestaurantMenuItemPrice,
  restaurantMenuItemPrice,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const RestaurantMenuItemPriceEditSchema = Yup.object().shape({
    Price: Yup.number().required(
      t("err.IsRequired", { 0: t("RestaurantMenuItemPrice.Price") })
    ),
    ActiveDateObj: Yup.object()
      .required(
        t("err.IsRequired", { 0: t("RestaurantMenuItemPrice.ActiveDate") })
      )
      .nullable(),
  });

  function cleanRestaurantMenuItemPrice(dirtyData) {
    return {
      RestaurantMenuItemPriceId: dirtyData.RestaurantMenuItemPriceId,
      RestaurantMenuItemId: +dirtyData.RestaurantMenuItemId,
      RestaurantMenuItem: dirtyData.RestaurantMenuItem,
      Price: +dirtyData.Price,
      ActiveDateObj: dirtyData.ActiveDateObj,
      ActiveDate: FaObjToEnDateTime(dirtyData.ActiveDateObj),
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonRestaurantMenuItemPrice"
        enableReinitialize={true}
        initialValues={restaurantMenuItemPrice}
        validationSchema={RestaurantMenuItemPriceEditSchema}
        onSubmit={(values) => {
          saveRestaurantMenuItemPrice(cleanRestaurantMenuItemPrice(values));
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
                      name="Price"
                      component={Input}
                      customFeedbackLabel=""
                      label={t("RestaurantMenuItemPrice.Price")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <DatePickerField
                      name="ActiveDateObj"
                      customFeedbackLabel=""
                      label={t("RestaurantMenuItemPrice.ActiveDate")}
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
