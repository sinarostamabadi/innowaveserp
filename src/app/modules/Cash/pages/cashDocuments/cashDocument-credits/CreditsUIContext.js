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
import { CloneObject } from "src/core/_helpers";
import { CreditTools } from "../quick/Dependency";
import { CreditModel } from "src/core/_models/Core/CreditModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const CreditsUIContext = createContext();

export function useCreditsUIContext() {
  return useContext(CreditsUIContext);
}

export const CreditsUIConsumer = CreditsUIContext.Consumer;

export const CreditsUIProvider = forwardRef(
  ({ currentDocumentId, children, credit, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          credits.map((credit) => {
            let tempDoc = CreditTools.Clean(credit);
            if (
              !!tempDoc.CreditId &&
              tempDoc.CreditId.toString().indexOf("temp_") > -1
            ) {
              tempDoc.CreditId = null;
            }

            return tempDoc;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [documentId, setDocumentId] = useState(currentDocumentId);
    const initCredit = {...CreditTools.Model, DocumentId: currentDocumentId};
    const [selectedItem, setSelectedItem] = useState(initCredit);
    const { actionsLoading, documentForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.companies.actionsLoading,
        documentForEdit: state.companies.documentForEdit,
        error: state.companies.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState(getConfig(CreditModel, "Price", "desc").initialFilter);

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

    const [credits, setCredits] = useState(credit.map(x=> CreditTools.Clean(x)));
    const [activeCredits, setActiveCredits] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setActiveCredits(credits.filter((x) => x.IsDeleted == false));
      setTotalCount(credits.filter((x) => x.IsDeleted == false).length);
    }, [credits]);

    useEffect(() => {
      initCredit.DocumentId = currentDocumentId;

      setDocumentId(currentDocumentId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDocumentId]);

    useEffect(() => {
      setSelectedItem(findCredit(selectedId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);
    
    const [showEditCreditDialog, setShowEditCreditDialog] = useState(false);
    const openNewCreditDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initCredit));

      setTimeout(() => {
        setShowEditCreditDialog(true);
      }, 200);
    };
    const openEditCreditDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findCredit(selectedId));
      setTimeout(() => {
        setShowEditCreditDialog(true);
      }, 200);
    };
    const closeEditCreditDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initCredit));
      setShowEditCreditDialog(false);
    };

    const [showDeleteCreditDialog, setShowDeleteCreditDialog] = useState(false);
    const openDeleteCreditDialog = (id) => {
      setSelectedId(id);
      setShowDeleteCreditDialog(true);
    };
    const closeDeleteCreditDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initCredit));
      setShowDeleteCreditDialog(false);
    };

    const [showDeleteCreditsDialog, setShowDeleteCreditsDialog] = useState(
      false
    );
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
      return credits.filter((credit) => credit.CreditId == creditId)[0];
    };

    const addCredit = (credit) => {
      credit.CreditId = "temp_" + Math.floor(Math.random() * 100);
      credit.DocumentId = +credit.DocumentId;

      setCredits((credits) => [...credits, credit]);
    };

    const removeCredit = (creditId) => {
      if (creditId.toString().indexOf("temp_") > -1) {
        setCredits((credits) =>
          credits.filter((item) => item.CreditId != creditId)
        );
      } else {
        setCredits((credits) =>
          credits.map((item) => {
            let copyCredit = CloneObject(item);
            if (copyCredit.CreditId == creditId) copyCredit.IsDeleted = true;

            return copyCredit;
          })
        );
      }
    };

    const updateCredit = (credit) => {
      credit.DocumentId = +credit.DocumentId;
      setCredits((credits) =>
        credits.map((item) =>
          item.CreditId === credit.CreditId ? credit : item
        )
      );
    };

    const value = {
      credits,
      activeCredits,
      findCredit,
      addCredit,
      removeCredit,
      updateCredit,
      totalCount,
      setTotalCount,
      actionsLoading,
      documentId,
      setDocumentId,
      initCredit,
      selectedId,
      selectedItem,
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
