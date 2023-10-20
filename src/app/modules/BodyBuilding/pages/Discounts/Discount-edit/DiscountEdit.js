import { useEffect, useState, useRef } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { DiscountEditForm } from "./DiscountEditForm";
import * as actions from "../../../_redux/Discounts/DiscountsActions";

export function DiscountEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const initModel = {
    BodyBuildingDiscountId: undefined,
    Title: "",
    PersonId: null,
    PersonGroupId: null,
    BodyBuildingTimeSetId: null,
    FromDate: null,
    ToDate: null,
    FromTime: null,
    ToTime: null,
    Gender: null,
    BodyBuildingPackId: null,
    BodyBuildingServiceId: null,
    DiscountPercent: null,
  };

  const suhbeader = useSubheader();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { actionsLoading, discountForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.bodyBuildingDiscounts.actionsLoading,
      discountForEdit: state.bodyBuildingDiscounts.discountForEdit,
      error: state.bodyBuildingDiscounts.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchDiscount(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " «" + t("BodyBuildingDiscount.Entity") + "»";

    if (discountForEdit && discountForEdit.BodyBuildingDiscountId == id) {
      _title = t("Common.Edit") + " «" + discountForEdit.Title + "»";
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountForEdit, id]);

  const saveDiscount = (values) => {
    if (!id) {
      dispatch(actions.createDiscount(values, ()=> backToDiscountsList()));
    } else {
      dispatch(actions.updateDiscount(id, values, ()=> backToDiscountsList()));
    }
  };

  const btnRef = useRef();
  const saveDiscountClick = () => {
    if (btnRef && btnRef.current) 
      btnRef.current.click();
  };

  const backToDiscountsList = () => history.push(`/BodyBuilding/discounts`);

  return (
    <>
    {(!!id && discountForEdit && discountForEdit.BodyBuildingDiscountId == id) || !!id == false? (
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
          discount={discountForEdit || initModel}
          btnRef={btnRef}
          saveDiscount={saveDiscount}
        />
      </CardBody>
    </Card>
    ): (
      <p>{t("Common.Loading")}</p>
    )}
    </>
  );
}
