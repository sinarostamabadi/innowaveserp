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
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const FactorsUIContext = createContext();

export function useFactorsUIContext() {
  return useContext(FactorsUIContext);
}

export const FactorsUIConsumer = FactorsUIContext.Consumer;

export const FactorsUIProvider = forwardRef(
  ({ currentSellDiscountId, children, factor, mode }, ref) => {

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          factors.map((factor) => {
            console.log("factor > ", factor);
            
            if (factor.SellDiscountFactorId.toString().indexOf("temp_") > -1)
              factor.SellDiscountFactorId = null;

            return factor;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [sellDiscountId, setSellDiscountId] = useState(currentSellDiscountId);

    const initFactor = {
      SellDiscountFactorId: undefined,
      FactorNumber: "",
      DiscountPercent: ""
    };

    const { actionsLoading, SellDiscountForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.sellDiscounts.actionsLoading,
        SellDiscountForEdit: state.sellDiscounts.SellDiscountForEdit,
        error: state.sellDiscounts.error,
      }),
      shallowEqual
    );

    const [factors, setFactors] = useState(factor);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!SellDiscountForEdit &&
        !!SellDiscountForEdit.SellDiscountFactors &&
        SellDiscountForEdit.SellDiscountFactors.length > 0
      ) {
        setFactors(SellDiscountForEdit.SellDiscountFactors);
        setTotalCount(SellDiscountForEdit.SellDiscountFactors.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SellDiscountForEdit]);

    useEffect(() => {
      initFactor.SellDiscountId = currentSellDiscountId;

      setSellDiscountId(currentSellDiscountId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSellDiscountId]);

    const [showEditFactorDialog, setShowEditFactorDialog] = useState(false);
    const openNewFactorDialog = () => {
      setSelectedId(undefined);
      setShowEditFactorDialog(true);
    };
    const openEditFactorDialog = (id) => {
      setSelectedId(id);
      setShowEditFactorDialog(true);
    };
    const closeEditFactorDialog = () => {
      setSelectedId(undefined);
      setShowEditFactorDialog(false);
    };

    const [showDeleteFactorDialog, setShowDeleteFactorDialog] = useState(false);
    const openDeleteFactorDialog = (id) => {
      setSelectedId(id);
      setShowDeleteFactorDialog(true);
    };
    const closeDeleteFactorDialog = () => {
      setSelectedId(undefined);
      setShowDeleteFactorDialog(false);
    };

    const [showDeleteFactorsDialog, setShowDeleteFactorsDialog] = useState(false);
    const openDeleteFactorsDialog = () => {
      setShowDeleteFactorsDialog(true);
    };
    const closeDeleteFactorsDialog = () => {
      setShowDeleteFactorsDialog(false);
    };

    const [showFetchFactorsDialog, setShowFetchFactorsDialog] = useState(false);
    const openFetchFactorsDialog = () => {
      setShowFetchFactorsDialog(true);
    };
    const closeFetchFactorsDialog = () => {
      setShowFetchFactorsDialog(false);
    };

    const findFactor = (sellDiscountFactorId) => {
      return factors.filter((factor) => factor.SellDiscountFactorId == sellDiscountFactorId)[0];
    };

    const addFactor = (factor) => {
      factor.SellDiscountFactorId = "temp_" + Math.floor(Math.random() * 100);
      
      setFactors((factors) => [...factors, factor]);
    };

    const removeFactor = (sellDiscountFactorId) => {
      let factor = findFactor(sellDiscountFactorId);
      factor["IsDeleted"] = true;
      updateFactor(factor);
    };

    const updateFactor = (factor) => {
      setFactors((factors) =>
        factors.map((item) => (item.SellDiscountFactorId === factor.SellDiscountFactorId ? factor : item))
      );
    };

    const value = {
      factors,
      mode,
      findFactor,
      addFactor,
      removeFactor,
      updateFactor,
      totalCount,
      setTotalCount,
      actionsLoading,
      sellDiscountId,
      setSellDiscountId,
      initFactor,
      selectedId,
      showEditFactorDialog,
      openEditFactorDialog,
      openNewFactorDialog,
      closeEditFactorDialog,
      showDeleteFactorDialog,
      openDeleteFactorDialog,
      closeDeleteFactorDialog,
      showDeleteFactorsDialog,
      openDeleteFactorsDialog,
      closeDeleteFactorsDialog,
      showFetchFactorsDialog,
      openFetchFactorsDialog,
      closeFetchFactorsDialog,
    };

    return (
      <FactorsUIContext.Provider value={value}>
        {children}
      </FactorsUIContext.Provider>
    );
  }
);
