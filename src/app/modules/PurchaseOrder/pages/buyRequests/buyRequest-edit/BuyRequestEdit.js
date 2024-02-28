import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/buyRequests/buyRequestsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { BuyRequestEditForm } from "./BuyRequestEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";
import { DetailsUIProvider } from "../buyRequests-details/DetailsUIContext";
import { Details } from "../buyRequests-details/Details";
import {
  EnToFaObjDate,
  CloneObject,
  getStorage,
} from "../../../../../../core/_helpers";

export function BuyRequestEdit({
  history,
  match: {
    params: { id },
  },
  mode,
}) {
  const { t } = useTranslation();
  const defaultWarehouse = !!getStorage("defaultWarehouse")
    ? JSON.parse(getStorage("defaultWarehouse"))
    : null;

  const initModel = {
    BuyRequestId: undefined,
    WarehouseId: !!defaultWarehouse ? defaultWarehouse.WarehouseId : "",
    Warehouse: defaultWarehouse,
    BuyRequestDateObj: EnToFaObjDate(new Date()),
    Description: "",
    BuyRequestStatusId: 1,
    BuyRequestDetails: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [buyRequestObj, setBuyRequestObj] = useState(copyModel);
  const [buyRequestDtlObj, setBuyRequestDetailObj] = useState(
    copyModel.BuyRequestDetails
  );

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, buyRequestForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.buyRequests.actionsLoading,
      buyRequestForEdit: state.buyRequests.buyRequestForEdit,
      error: state.buyRequests.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchBuyRequest(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("BuyRequest.Entity");

    if (buyRequestForEdit && id) {
      _title = t("Common.Edit") + " " + t("BuyRequest.Entity");

      setBuyRequestObj({
        ...buyRequestForEdit,
        BuyRequestDateObj: EnToFaObjDate(buyRequestForEdit.BuyRequestDate),
      });
      setBuyRequestDetailObj(buyRequestForEdit.BuyRequestDetails);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyRequestForEdit, id]);

  const saveBuyRequest = (values) => {
    if (!id) {
      dispatch(
        actions.createBuyRequest(values, () => {
          backToBuyRequestsList();
        })
      )
        .then((arg) => {
          backToBuyRequestsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateBuyRequest(id, values, () => {
          backToBuyRequestsList();
        })
      )
        .then(() => backToBuyRequestsList())
        .catch((err) => {});
    }
  };

  const btnRefBuyRequest = useRef("1");
  const btnRefDetails = useRef("2");

  const saveBuyRequestClick = (isApprove) => {
    if (btnRefBuyRequest && btnRefBuyRequest.current) {
      btnRefBuyRequest.current.Collect((datas) => {
        let buyRequestObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              buyRequestObj[prop] = obj;
            }
          }
        }

        if (isApprove == true)
          buyRequestObj["BuyRequestStatusId"] =
            ++buyRequestObj.BuyRequestStatusId;
        if (isApprove == false) buyRequestObj["BuyRequestStatusId"] = 5;

        buyRequestObj["BuyRequestDetails"] = [];
        btnRefDetails.current.Collect((detailsData) => {
          buyRequestObj.BuyRequestDetails = detailsData;

          saveBuyRequest(buyRequestObj);
        });
      });
    }
  };

  const backToBuyRequestsList = () => {
    if (mode == 3) history.push(`/PurchaseOrder/cartables/manager`);
    else if (mode == 4) history.push(`/PurchaseOrder/cartables/warehouse`);
    else history.push(`/PurchaseOrder/buyRequests`);
  };

  return (
    <>
      {((!!id && !!buyRequestObj.BuyRequestId) || !!id == false) && (
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
                onClick={backToBuyRequestsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              {mode < 2 && (
                <>
                  <button className="btn btn-light ml-2">
                    <i className="fa fa-redo"></i> {t("Common.Reset")}
                  </button>
                  {`  `}
                  <button type="submit" className="btn btn-light ml-2">
                    <i className="fa fa-print"></i> {t("Common.Print")}
                  </button>
                  {`  `}
                  {!!id == false && (
                    <button
                      type="submit"
                      className="btn btn-primary ml-2"
                      onClick={saveBuyRequestClick}
                    >
                      <i className="fa fa-save"></i> {t("Common.Save")}
                    </button>
                  )}
                </>
              )}
              {mode > 2 && (
                <>
                  {!!id && (
                    <>
                      <button
                        type="submit"
                        className="btn btn-success ml-2"
                        onClick={() => {
                          saveBuyRequestClick(true);
                        }}
                      >
                        <i className="fa fa-check"></i> {t("Common.Approve")}
                      </button>
                      <button
                        type="submit"
                        className="btn btn-danger ml-2"
                        onClick={() => {
                          saveBuyRequestClick(false);
                        }}
                      >
                        <i className="fa fa-times"></i> {t("Common.Deny")}
                      </button>
                    </>
                  )}
                </>
              )}
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <BuyRequestEditForm
              actionsLoading={actionsLoading}
              buyRequest={buyRequestObj}
              ref={btnRefBuyRequest}
            />
            <DetailsUIProvider
              currentProviderId={id}
              actionsLoading={actionsLoading}
              detail={buyRequestDtlObj}
              ref={btnRefDetails}
              mode={mode || 0}
            >
              <Details />
            </DetailsUIProvider>
          </CardBody>
        </Card>
      )}
    </>
  );
}
