import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/takeAwayRequests/takeAwayRequestsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { TakeAwayRequestEditForm } from "./TakeAwayRequestEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";
import { CostsUIProvider } from "../takeAwayRequests-costs/CostsUIContext";
import { Costs } from "../takeAwayRequests-costs/Costs";
import { EnToFaObjDate, CloneObject } from "../../../../../../core/_helpers";
import moment from "jalali-moment";

export function TakeAwayRequestEdit({
  history,
  match: {
    params: { id },
  },
  mode,
}) {
  const { t } = useTranslation();

  const initModel = {
    TakeAwayRequestId: undefined,
    TakeAwayRequestTypeId: mode,
    Title: "",
    TakeAwayRequestNumber: "",
    PersonId: null,
    Person: "",
    PersonGroupId: null,
    PersonGroup: "",
    RegisterDateObj: EnToFaObjDate(new Date()),
    RegisterDate: moment
      .from()
      .locale("en")
      .format("YYYY-MM-DDTHH:mm:ss"),
    FromDateObj: "",
    FromDate: "",
    ToDateObj: "",
    ToDate: "",
    FromTimeObj: "",
    FromTime: "",
    ToTimeObj: "",
    ToTime: "",
    HasProduct: false,
    FromYearsOld: "",
    ToYearsOld: "",
    Sex: "",
    RewardProductId: null,
    RewardProduct: "",
    RewardProductUnitId: null,
    RewardProductUnit: "",
    TakeAwayRequestCosts: [],
    TakeAwayRequestFactors: [],
    TakeAwayRequestProducts: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [takeAwayRequestObj, setTakeAwayRequestObj] = useState(copyModel);
  const [takeAwayRequestCostObj, setTakeAwayRequestCostObj] = useState(
    copyModel.TakeAwayRequestCosts
  );
  const [takeAwayRequestFactorsObj, setTakeAwayRequestFactorsObj] = useState(
    copyModel.TakeAwayRequestFactors
  );

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, takeAwayRequestForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.takeAwayRequests.actionsLoading,
      takeAwayRequestForEdit: state.takeAwayRequests.takeAwayRequestForEdit,
      error: state.takeAwayRequests.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchTakeAwayRequest(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("TakeAwayRequest.Entity");

    if (takeAwayRequestForEdit && id) {
      _title =
        t("Common.Edit") +
        " " +
        t("TakeAwayRequest.Entity") +
        " «" +
        takeAwayRequestForEdit.Title +
        "»";

      setTakeAwayRequestObj({
        ...takeAwayRequestForEdit,
        RegisterDateObj:
          !!takeAwayRequestForEdit.RegisterDate == false
            ? null
            : EnToFaObjDate(takeAwayRequestForEdit.RegisterDate),
        FromDateObj:
          !!takeAwayRequestForEdit.FromDate == false
            ? null
            : EnToFaObjDate(takeAwayRequestForEdit.FromDate),
        ToDateObj:
          !!takeAwayRequestForEdit.ToDate == false
            ? null
            : EnToFaObjDate(takeAwayRequestForEdit.ToDate),
      });
      setTakeAwayRequestCostObj(takeAwayRequestForEdit.TakeAwayRequestCosts);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [takeAwayRequestForEdit, id]);

  const saveTakeAwayRequest = (values) => {
    if (!id) {
      dispatch(
        actions.createTakeAwayRequest(values, () => {
          backToTakeAwayRequestsList();
        })
      )
        .then((arg) => {
          backToTakeAwayRequestsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateTakeAwayRequest(id, values, () => {
          backToTakeAwayRequestsList();
        })
      )
        .then(() => backToTakeAwayRequestsList())
        .catch((err) => {});
    }
  };

  const btnRefTakeAwayRequest = useRef("1");
  const btnRefCosts = useRef("2");

  const saveTakeAwayRequestClick = () => {
    if (btnRefTakeAwayRequest && btnRefTakeAwayRequest.current) {
      btnRefTakeAwayRequest.current.Collect((datas) => {
        let takeAwayRequestObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              takeAwayRequestObj[prop] = obj;
            }
          }
        }
        takeAwayRequestObj["TakeAwayRequestCosts"] = [];

        if (!!btnRefCosts.current && !!btnRefCosts.current.Collect)
          btnRefCosts.current.Collect((costsData) => {
            takeAwayRequestObj.TakeAwayRequestCosts = costsData;
          });

        saveTakeAwayRequest(takeAwayRequestObj);
      });
    }
  };

  const backToTakeAwayRequestsList = () => {
    history.push(`/TakeAway/takeAwayRequests`);
  };

  return (
    <>
      {((!!id && !!takeAwayRequestObj.TakeAwayRequestId) || !!id == false) && (
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
                onClick={backToTakeAwayRequestsList}
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
                onClick={saveTakeAwayRequestClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-6">
                <TakeAwayRequestEditForm
                  actionsLoading={actionsLoading}
                  takeAwayRequest={takeAwayRequestObj}
                  ref={btnRefTakeAwayRequest}
                  mode={mode || takeAwayRequestObj.TakeAwayRequestTypeId}
                />
              </div>
              <div className="col-6">
                <CostsUIProvider
                  currentTakeAwayRequestId={id}
                  actionsLoading={actionsLoading}
                  cost={takeAwayRequestCostObj}
                  ref={btnRefCosts}
                  mode={mode || takeAwayRequestObj.TakeAwayRequestTypeId}
                >
                  <Costs />
                </CostsUIProvider>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
