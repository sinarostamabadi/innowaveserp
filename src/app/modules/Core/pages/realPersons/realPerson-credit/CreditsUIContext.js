/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CreditsUIHelper";
import { shallowEqual, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";

const CreditsUIContext = createContext();

export function useCreditsUIContext() {
  return useContext(CreditsUIContext);
}

export const CreditsUIConsumer = CreditsUIContext.Consumer;

export const CreditsUIProvider = forwardRef(
  ({ currentPersonId, children, credit, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          !!credits && credits.length > 0
            ? credits.map((credit) => {
                return {
                  CreditId:
                    credit.CreditId.toString().indexOf("temp_") > -1
                      ? null
                      : +credit.CreditId,
                  PersonId: +personId,
                  Title: credit.Title,
                  Price: credit.Price,
                  IsDeleted: credit.IsDeleted,
                };
              })
            : []
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [personId, setPersonId] = useState(currentPersonId);

    const initCredit = {
      CreditId: undefined,
      PersonId: personId,
      Title: undefined,
      Price: "",
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.realPersons.actionsLoading,
        realPersonForEdit: state.realPersons.realPersonForEdit,
        error: state.realPersons.error,
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

    const [credits, setCredits] = useState(credit);
    const [active, setActive] = useState(credit);
    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
      if (
        !!realPersonForEdit &&
        !!realPersonForEdit.Credits &&
        realPersonForEdit.Credits.length > 0
      ) {
        setCredits(realPersonForEdit.Credits);
        setTotalCount(realPersonForEdit.Credits.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initCredit.PersonId = currentPersonId;

      setPersonId(currentPersonId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPersonId]);

    useEffect(() => {
      if (credits.length > 0) setActive(credits.filter((x) => !x.IsDeleted));
    }, [credits]);

    const [showEditCreditDialog, setShowEditCreditDialog] = useState(false);
    const openNewCreditDialog = () => {
      setSelectedId(undefined);
      setShowEditCreditDialog(true);
    };
    const openEditCreditDialog = (id) => {
      setSelectedId(id);
      setShowEditCreditDialog(true);
    };
    const closeEditCreditDialog = () => {
      setSelectedId(undefined);
      setShowEditCreditDialog(false);
    };

    const [showDeleteCreditDialog, setShowDeleteCreditDialog] = useState(false);
    const openDeleteCreditDialog = (id) => {
      setSelectedId(id);
      setShowDeleteCreditDialog(true);
    };
    const closeDeleteCreditDialog = () => {
      setSelectedId(undefined);
      setShowDeleteCreditDialog(false);
    };

    const [showDeleteCreditsDialog, setShowDeleteCreditsDialog] =
      useState(false);
    const openDeleteCreditsDialog = () => {
      setShowDeleteCreditsDialog(true);
    };
    const closeDeleteCreditsDialog = () => {
      setShowDeleteCreditsDialog(false);
    };

    const [showFetchCreditsDialog, setShowFetchCreditsDialog] = useState(false);
    const openFetchCreditsDialog = () => {
      setShowFetchCreditsDialog(true);
    };
    const closeFetchCreditsDialog = () => {
      setShowFetchCreditsDialog(false);
    };

    const findCredit = (creditId) => {
      let creditObj = !!credits
        ? credits.filter((credit) => credit.CreditId == creditId)[0]
        : null;

      return creditObj;
    };

    const addCredit = (credit) => {
      credit.CreditId = "temp_" + Math.floor(Math.random() * 100);
      credit.Title = credit.Title;
      credit.PersonId = +credit.PersonId;

      setCredits((credits) => [...credits, credit]);
    };

    const removeCredit = (creditId) => {
      let credit = findCredit(creditId);
      credit["IsDeleted"] = true;
      updateCredit(credit);
    };

    const updateCredit = (credit) => {
      credit.Title = credit.Title;
      credit.PersonId = +credit.PersonId;

      setCredits((credits) =>
        credits.map((item) =>
          item.CreditId === credit.CreditId ? credit : item
        )
      );
    };

    const value = {
      credits,
      active,
      findCredit,
      addCredit,
      removeCredit,
      updateCredit,
      totalCount,
      setTotalCount,
      actionsLoading,
      personId,
      setPersonId,
      initCredit,
      selectedId,
      queryParams,
      setQueryParams,
      showEditCreditDialog,
      openEditCreditDialog,
      openNewCreditDialog,
      closeEditCreditDialog,
      showDeleteCreditDialog,
      openDeleteCreditDialog,
      closeDeleteCreditDialog,
      showDeleteCreditsDialog,
      openDeleteCreditsDialog,
      closeDeleteCreditsDialog,
      showFetchCreditsDialog,
      openFetchCreditsDialog,
      closeFetchCreditsDialog,
    };

    return (
      <CreditsUIContext.Provider value={value}>
        {children}
      </CreditsUIContext.Provider>
    );
  }
);
