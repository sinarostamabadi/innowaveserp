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
  (
    { currentBuyId, children, cost, btnRef, updateBuy, editable, buySum },
    ref
  ) => {
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          costs.map((d) => {
            let xx = {
              BuyCostId:
                d.BuyCostId.toString().indexOf("temp") > -1
                  ? null
                  : d.BuyCostId,
              CostTypeId: d.CostTypeId,
              Price: d.Price,
              CostPercent: d.CostPercent,
              Describtion: d.Describtion,
              IsDeleted: d.IsDeleted,
            };

            return xx;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [buyId, setBuyId] = useState(currentBuyId);

    const initCost = {
      BuyCostId: "",
      BuyId: buyId,
      CostTypeId: "",
      Price: "",
      CostPercent: "",
      Describtion: "",
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.buys.actionsLoading,
        realPersonForEdit: state.buys.buyForEdit,
        error: state.buys.error,
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
    const [activeCosts, setActiveCosts] = useState(cost);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setCosts(
        !!realPersonForEdit &&
          !!realPersonForEdit.BuyCosts &&
          realPersonForEdit.BuyCosts.length > 0 &&
          realPersonForEdit.BuyId == currentBuyId
          ? realPersonForEdit.BuyCosts
          : []
      );
      setTotalCount(
        !!realPersonForEdit &&
          !!realPersonForEdit.BuyCosts &&
          realPersonForEdit.BuyCosts.length > 0
          ? realPersonForEdit.BuyCosts.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initCost.BuyId = currentBuyId;

      setBuyId(currentBuyId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBuyId]);

    useEffect(() => {
      setActiveCosts(costs.filter((x) => x.IsDeleted == false));

      updateBuy(
        !!costs &&
          costs.length > 0 &&
          costs.filter((x) => x.IsDeleted == false).length > 0
          ? costs
              .filter((x) => x.IsDeleted == false)
              .map((x) => x.Price)
              .reduce((a, b) => a + b)
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [costs]);

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

    const [showDeleteCostsDialog, setShowDeleteCostsDialog] = useState(false);
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

      const costObj = costs.filter((cost) => cost.BuyCostId == costId)[0];

      return {
        BuyCostId: costObj.BuyCostId,
        BuyId: costObj.BuyId,
        CostTypeId: costObj.CostTypeId,
        CostType: costObj.CostType,
        Price: costObj.Price,
        CostPercent: costObj.CostPercent,
        Describtion: costObj.Describtion,
      };
    };

    const addCost = (cost) => {
      cost.BuyCostId = "temp_" + Math.floor(Math.random() * 100);
      if (+cost.CostPercent > 0)
        cost.Price = (+buySum.SumPayable * +cost.CostPercent) / 100;

      setCosts((costs) => [...costs, cost]);
    };

    const removeCost = (costId) => {
      if (costId.toString().indexOf("temp_") > -1)
        setCosts(costs.filter((x) => x.BuyCostId != costId));
      else {
        let cost = findCost(costId);
        cost["IsDeleted"] = true;
        updateCost(cost);
      }
    };

    const updateCost = (cost) => {
      if (+cost.CostPercent > 0)
        cost.Price = (+buySum.SumPayable * +cost.CostPercent) / 100;

      setCosts((costs) =>
        costs.map((item) => (item.BuyCostId == cost.BuyCostId ? cost : item))
      );

      setTimeout(() => {
        setSelectedItem(cost);
      }, 200);
    };

    const value = {
      costs,
      activeCosts,
      totalCount,
      setTotalCount,
      findCost,
      addCost,
      removeCost,
      updateCost,
      actionsLoading,
      buyId,
      editable,
      setBuyId,
      initCost,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      buySum,
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
      <CostsUIContext.Provider value={value}>
        {children}
      </CostsUIContext.Provider>
    );
  }
);
