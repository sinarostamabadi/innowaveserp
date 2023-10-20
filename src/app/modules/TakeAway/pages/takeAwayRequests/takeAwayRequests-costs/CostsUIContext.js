/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CostsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const CostsUIContext = createContext();

export function useCostsUIContext() {
  return useContext(CostsUIContext);
}

export const CostsUIConsumer = CostsUIContext.Consumer;

export const CostsUIProvider = forwardRef(
  ({ currentTakeAwayRequestId, children, cost, mode }, ref) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            costs.map((d) => {
              let xx = {
                TakeAwayRequestCostId: d.TakeAwayRequestCostId.toString().indexOf("temp") > -1? null: d.TakeAwayRequestCostId,
                FromAmount: d.FromAmount,
                ToAmount: d.ToAmount,
                FromPrice: d.FromPrice,
                ToPrice: d.ToPrice,
                DiscountPercent: d.DiscountPercent,
                DiscountPrice: d.DiscountPrice,
                RewardAmount: d.RewardAmount,
                IsDeleted: d.IsDeleted,
                TakeAwayRequestCostInfos: !!d.TakeAwayRequestCostInfos && d.TakeAwayRequestCostInfos.map((s) => {
                  return { SerialNumber: s.SerialNumber };
                }),
              };

              return xx;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [takeAwayRequestId, setTakeAwayRequestId] = useState(currentTakeAwayRequestId);

    const initCost = {
      TakeAwayRequestCostId: "",
      TakeAwayRequestId: takeAwayRequestId,
      FromAmount: null,
      ToAmount: null,
      FromPrice: null,
      ToPrice: null,
      DiscountPercent: null,
      DiscountPrice: null,
      RewardAmount: null,
      IsDeleted: false,
      SerialCount: 0,
      TakeAwayRequestCostInfos: [],
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.takeAwayRequests.actionsLoading,
        realPersonForEdit: state.takeAwayRequests.takeAwayRequestForEdit,
        error: state.takeAwayRequests.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const setQueryParams = useCallback((nextQueryParams) => {
      setQueryParamsBase((prevQueryParams) => {
        if (isFunction(nextQueryParams)) {
          nextQueryParams = nextQueryParams(prevQueryParams);
        }

        if (isEqual(prevQueryParams, nextQueryParams)) {
          return prevQueryParams;
        }

        return nextQueryParams;
      });
    }, []);

    const [costs, setCosts] = useState(cost);
    const [activeCosts, setActiveCosts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setCosts(
        !!realPersonForEdit &&
          !!realPersonForEdit.TakeAwayRequestCosts &&
          realPersonForEdit.TakeAwayRequestCosts.length > 0 && realPersonForEdit.TakeAwayRequestId == currentTakeAwayRequestId
          ? realPersonForEdit.TakeAwayRequestCosts
          : []
      );
      setTotalCount(
        !!realPersonForEdit &&
          !!realPersonForEdit.TakeAwayRequestCosts &&
          realPersonForEdit.TakeAwayRequestCosts.length > 0
          ? realPersonForEdit.TakeAwayRequestCosts.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initCost.TakeAwayRequestId = currentTakeAwayRequestId;

      setTakeAwayRequestId(currentTakeAwayRequestId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTakeAwayRequestId]);

    useEffect(() => {
      setActiveCosts(costs.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [costs]);

    // Serials Dialog
    const [showSerialCostDialog, setShowSerialCostDialog] = useState(false);
    const openSerialCostDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findCost(id));
      setShowSerialCostDialog(true);
    };
    const closeSerialCostDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowSerialCostDialog(false);
    };

    // Edit Dialog, New Dialog
    const [showEditCostDialog, setShowEditCostDialog] = useState(false);
    const openNewCostDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditCostDialog(true);
    };
    const openEditCostDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findCost(id));
      setShowEditCostDialog(true);
    };
    const closeEditCostDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditCostDialog(false);
    };

    const [showDeleteCostDialog, setShowDeleteCostDialog] = useState(false);
    const openDeleteCostDialog = (id) => {
      setSelectedId(id);
      setShowDeleteCostDialog(true);
    };
    const closeDeleteCostDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowDeleteCostDialog(false);
    };

    const [showDeleteCostsDialog, setShowDeleteCostsDialog] = useState(
      false
    );
    const openDeleteCostsDialog = () => {
      setShowDeleteCostsDialog(true);
    };
    const closeDeleteCostsDialog = () => {
      setShowDeleteCostsDialog(false);
    };

    const [showFetchCostsDialog, setShowFetchCostsDialog] = useState(false);
    const openFetchCostsDialog = () => {
      setShowFetchCostsDialog(true);
    };
    const closeFetchCostsDialog = () => {
      setShowFetchCostsDialog(false);
    };

    const findCost = (costId) => {
      if (!!costId == false) return;

      const costObj = costs.filter(
        (cost) => cost.TakeAwayRequestCostId == costId
      )[0];

      return {
        TakeAwayRequestCostId: costObj.TakeAwayRequestCostId,
        TakeAwayRequestId: costObj.TakeAwayRequestId,
        FromAmount: costObj.FromAmount,
        ToAmount: costObj.ToAmount,
        FromPrice: costObj.FromPrice,
        ToPrice: costObj.ToPrice,
        DiscountPercent: costObj.DiscountPercent,
        DiscountPrice: costObj.DiscountPrice,
        RewardAmount: costObj.RewardAmount,
        IsDeleted: false,
        SerialCount: !!costObj.TakeAwayRequestCostInfos? costObj.TakeAwayRequestCostInfos.length: 0,
        TakeAwayRequestCostInfos: costObj.TakeAwayRequestCostInfos,
      };
    };

    const addCost = (cost) => {
      cost.TakeAwayRequestCostId = "temp_" + Math.floor(Math.random() * 100);

      setCosts((costs) => [...costs, cost]);
    };

    const removeCost = (costId) => {
      if (costId.toString().indexOf("temp_") > -1)
        setCosts(costs.filter((x) => x.TakeAwayRequestCostId != costId));
      else {
        let cost = findCost(costId);
        cost["IsDeleted"] = true;
        updateCost(cost);
      }
    };

    const updateCost = (cost) => {
      setCosts((costs) =>
        costs.map((item) =>
          item.TakeAwayRequestCostId == cost.TakeAwayRequestCostId ? cost : item
        )
      );

      setTimeout(() => {
        setSelectedItem(cost);
      }, 200);
    };

    const addSerial = (serial) => {
      serial.TakeAwayRequestSerialId = "temps_" + Math.floor(Math.random() * 1000);
      let costObj = findCost(serial.TakeAwayRequestCostId);
      costObj.TakeAwayRequestCostInfos.push(serial);
      costObj.SerialCount = costObj.TakeAwayRequestCostInfos.length;

      updateCost(costObj);

      setTimeout(() => {
        setSelectedItem(costObj);
      }, 200);
    };

    const removeSerial = (serial) => {
      let costObj = findCost(serial.TakeAwayRequestCostId);
      costObj.TakeAwayRequestCostInfos = costObj.TakeAwayRequestCostInfos.filter(
        (x) => x.TakeAwayRequestSerialId != serial.TakeAwayRequestSerialId
      );
      costObj.SerialCount = costObj.TakeAwayRequestCostInfos.length;

      updateCost(costObj);

      setTimeout(() => {
        setSelectedItem(costObj);
      }, 200);
    };

    const checkSerial = (serial) => {
      cost = findCost(selectedItem.TakeAwayRequestCostId);
      return (
        cost.TakeAwayRequestCostInfos.filter((x) => x.SerialNumber == serial).length > 0
      );
    };

    const value = {
      costs,
      activeCosts,
      totalCount,
      mode,
      setTotalCount,
      findCost,
      addCost,
      removeCost,
      updateCost,
      // Serial Actions
      addSerial,
      removeSerial,
      checkSerial,
      actionsLoading,
      takeAwayRequestId,
      setTakeAwayRequestId,
      initCost,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Serials
      showSerialCostDialog,
      openSerialCostDialog,
      closeSerialCostDialog,
      // Edit
      showEditCostDialog,
      openEditCostDialog,
      openNewCostDialog,
      closeEditCostDialog,
      // Delete
      showDeleteCostDialog,
      openDeleteCostDialog,
      closeDeleteCostDialog,
      // Deletes
      showDeleteCostsDialog,
      openDeleteCostsDialog,
      closeDeleteCostsDialog,
      // Fetch
      showFetchCostsDialog,
      openFetchCostsDialog,
      closeFetchCostsDialog,
    };

    return (
      <>
        {!!serialErrors && (
          <Alerty
            variant="danger"
            title={t("err.Error")}
            description={serialErrors}
            className=""
          ></Alerty>
        )}
        <CostsUIContext.Provider value={value}>
          {children}
        </CostsUIContext.Provider>
      </>
    );
  }
);
