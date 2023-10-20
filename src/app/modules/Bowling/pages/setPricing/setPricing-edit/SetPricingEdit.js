import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { useSubheader } from "src/core/layout";
import { FaObjToEnDateTime } from "src/core/_helpers";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { SetPricingEditForm } from "./SetPricingEditForm";
import * as actions from "../../../_redux/setPricing/setPricingActions";

export function SetPricingEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    SetPricingId: undefined,
    CenterId: "",
    PersonId: "",
    DayInWeek: "",
    PersonCount: "",
    Price: "",
    FromDateObj: "",
    ToDateObj: "",
    FromDate: "",
    IsHoliday: false,
    IsForSpecialDays: false,
    ToDate: "",
    ForMinuts: "",
    FromTime: "",
    ToTime: "",
  };

  // Subheader
  const subheader = useSubheader();
  const [title, setTitle] = useState("");
  const [pricingObj, setPricingObj] = useState({ ...initModel });
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, setPricingForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.setPricings.actionsLoading,
      setPricingForEdit: state.setPricings.setPricingForEdit,
      error: state.setPricings.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchSetPricing(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("SetPricing.Entity");

    if (setPricingForEdit && id && setPricingForEdit.SetPricingId == id) {
      setPricingObj(setPricingForEdit);
      setEditMode(true);
      _title = t("Common.Edit") + " " + setPricingForEdit.Title;
    }

    setTitle(_title);
    subheader.setTitle(_title);
  }, [setPricingForEdit, id]);

  const saveSetPricing = (values) => {
    if (!id) {
      values.FromDate = FaObjToEnDateTime(values.FromDateObj);
      values.ToDate = FaObjToEnDateTime(values.ToDateObj);
      values.CenterId = parseInt(values.CenterId);
      values.IsForSpecialDays = Boolean(values.IsForSpecialDays);
      values.IsHoliday = Boolean(values.IsHoliday);
      dispatch(actions.createSetPricing(values))
        .then((arg) => {
          backToSetPricingList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateSetPricing(id, values))
        .then(() => backToSetPricingList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveSetPricingClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToSetPricingList = () => {
    history.push(`/bowling/setPricing`);
  };

  return (
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
            onClick={backToSetPricingList}
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
            onClick={saveSetPricingClick}
          >
            <i className="fa fa-save"></i> {t("Common.Save")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {(!!id && editMode) || !!id === false ? (
          <SetPricingEditForm
            actionsLoading={actionsLoading}
            setPricing={pricingObj}
            btnRef={btnRef}
            saveSetPricing={saveSetPricing}
          />
        ) : (
          <p>درحال بارگذاری...</p>
        )}
      </CardBody>
    </Card>
  );
}
