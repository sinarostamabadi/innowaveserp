/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/RestaurantDiscountTypes/RestaurantDiscountTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { RestaurantDiscountTypeEditForm } from "./RestaurantDiscountTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { CloneObject, getStorage } from "../../../../../../core/_helpers";

export function RestaurantDiscountTypeEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const defaultRestaurant = !!getStorage("defaultRestaurant")
    ? JSON.parse(getStorage("defaultRestaurant"))
    : null;

  const initModel = {
    RestaurantDiscountTypeId: undefined,
    Title: "",
    DiscountPercent: "",
    Price: "",
    FromDateObj: "",
    FromDate: "",
    ToDateObj: "",
    ToDate: "",
    FromTimeObj: "",
    FromTime: "",
    ToTimeObj: "",
    ToTime: "",
    PersonId: "",
    Person: "",
    PersonGroupId: "",
    PersonGroup: "",
    RestaurantId: !!defaultRestaurant ? defaultRestaurant.RestaurantId : "",
    Restaurant: defaultRestaurant,
    RestaurantMenuGroupId: "",
    RestaurantMenuGroup: "",
    RestaurantMenuItemId: "",
    RestaurantMenuItem: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [errs, setErrs] = useState([]);
  const [title, setTitle] = useState("");
  let validation = [];
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, restaurantDiscountTypeForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.restaurantDiscountTypes.actionsLoading,
      restaurantDiscountTypeForEdit:
        state.restaurantDiscountTypes.restaurantDiscountTypeForEdit,
      error: state.restaurantDiscountTypes.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id)
      dispatch(actions.fetchRestaurantDiscountType(id)).then(() => {
        setEditMode(true);
      });
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("RestaurantDiscountType.Entity");

    if (restaurantDiscountTypeForEdit && id) {
      _title = t("Common.Edit") + " " + restaurantDiscountTypeForEdit.Title;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantDiscountTypeForEdit, id]);

  function validate(values) {
    validation = [];

    if (
      (values.DiscountPercent != null && values.Price != null) ||
      (values.DiscountPercent == null && values.Price == null)
    ) {
      validation.push("مبلغ یا درصد تخفیف فقط یکی را وارد نمایید.");
    }

    if (values.PersonId != null && values.PersonGroupId != null)
      validation.push("شخص یا گروه اشخاص فقط یکی را وارد نمایید.");

    if (
      values.RestaurantMenuItemId != null &&
      values.RestaurantMenuGroupId != null
    )
      validation.push("منو یا گروه منو فقط یکی را وارد نمایید.");

    setErrs(validation);
    return validation.length == 0;
  }

  function validateToError() {
    return errs.map((x) => x + "<br/>");
  }

  const saveRestaurantDiscountType = (values) => {
    if (!validate(values)) return;

    if (!id) {
      dispatch(
        actions.createRestaurantDiscountType(values, () => {
          backToRestaurantDiscountTypesList();
        })
      )
        .then((arg) => {})
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateRestaurantDiscountType(id, values, () => {
          backToRestaurantDiscountTypesList();
        })
      )
        .then(() => backToRestaurantDiscountTypesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveRestaurantDiscountTypeClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToRestaurantDiscountTypesList = () => {
    history.push(`/restaurant/restaurantDiscountTypes`);
  };

  return (
    <>
      {((!!editMode && editMode) || !!id == false) && (
        <Card>
          {actionsLoading && <ModalProgressBar />}
          {!actionsLoading && error != null && (
            <>
              <ModalProgressBar variant="danger" />
              <Alerty
                variant="danger"
                title={t("err.Error")}
                description={error}
              ></Alerty>
            </>
          )}
          {!actionsLoading && errs.length > 0 && (
            <>
              <Alerty
                variant="danger"
                title={t("err.Error")}
                description={validateToError()}
                dismis={false}
              ></Alerty>
            </>
          )}
          <CardHeader title={title}>
            <CardHeaderToolbar>
              <button
                type="button"
                onClick={backToRestaurantDiscountTypesList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>
              {`  `}
              <button type="submit" className="btn btn-light ml-2">
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>
              {`  `}
              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveRestaurantDiscountTypeClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <RestaurantDiscountTypeEditForm
              actionsLoading={actionsLoading}
              restaurantDiscountType={
                restaurantDiscountTypeForEdit || initModel
              }
              btnRef={btnRef}
              saveRestaurantDiscountType={saveRestaurantDiscountType}
            />
          </CardBody>
        </Card>
      )}
    </>
  );
}
