/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import moment from "jalali-moment";
import * as actions from "../../../_redux/discounts/discountsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { DiscountEditForm } from "./DiscountEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { EnToFaObjDate } from "../../../../../../core/_helpers";

export function DiscountEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    DiscountId: undefined,
    DiscountTypeId: "",
    Discount: "",
    FromDateObj: "",
    FromDate: "",
    ToDateObj: "",
    ToDate: "",
    FromTimeObj: "",
    FromTime: "",
    ToTimeObj: "",
    ToTime: "",
    PersonId: "",
    Person: ""
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [object, setObject] = useState({...initModel});
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, discountForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.discounts.actionsLoading,
      discountForEdit: state.discounts.discountForEdit,
      error: state.discounts.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id)
      dispatch(actions.fetchDiscount(id)).then(() => {
        setEditMode(true);
      });
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("Discount.Entity");

    if (discountForEdit && discountForEdit.DiscountId == id) {
      _title = t("Common.Edit") + " " + t("Discount.Entity") + " «" + discountForEdit.DiscountType.TitleFa + "»";
      setObject({
        ...discountForEdit,
        FromDateObj: EnToFaObjDate(discountForEdit.FromDate),
        ToDateObj: EnToFaObjDate(discountForEdit.ToDate),
        FromTimeObj: moment(discountForEdit.FromTime, 'hh:mm:ss'),
        ToTimeObj: moment(discountForEdit.ToTime, 'hh:mm:ss')
      })
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountForEdit, id]);

  const saveDiscount = (values) => {
    if (!id) {
      dispatch(actions.createDiscount(values, () => {
        backToDiscountsList();
      }))
        .then((arg) => {
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateDiscount(id, values, () => {
        backToDiscountsList();
      }))
        .then(() => backToDiscountsList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveDiscountClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToDiscountsList = () => {
    history.push(`/bowling/discount`);
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
          <CardHeader title={title}>
            <CardHeaderToolbar>
              <button
                type="button"
                onClick={backToDiscountsList}
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
                onClick={saveDiscountClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <DiscountEditForm
              actionsLoading={actionsLoading}
              discount={object}
              btnRef={btnRef}
              saveDiscount={saveDiscount}
            />
          </CardBody>
        </Card>
      )}
    </>
  );
}
