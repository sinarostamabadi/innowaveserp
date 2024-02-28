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
import { initialFilter } from "./ChequePapersUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CloneObject } from "src/core/_helpers";

const ChequePapersUIContext = createContext();

export function useChequePapersUIContext() {
  return useContext(ChequePapersUIContext);
}

export const ChequePapersUIConsumer = ChequePapersUIContext.Consumer;

export const ChequePapersUIProvider = forwardRef(
  ({ currentChequeBookId, children, chequePaper, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          chequePapers.map((chequePaper) => {
            return {
              ChequePaperId: chequePaper.ChequePaperId,
              ChequeBookId: !!chequePaper.ChequeBookId
                ? +chequePaper.ChequeBookId
                : null,
              ChequePaperStatus:
                chequePaper.ChequePaperStatus == null ||
                chequePaper.ChequePaperStatus == ""
                  ? null
                  : +chequePaper.ChequePaperStatus,
              Description: chequePaper.Description,
              SerialNo: chequePaper.SerialNo,
              ChangeDate: chequePaper.ChangeDate,
              IsDeleted: chequePaper.IsDeleted,
            };
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [chequeBookId, setChequeBookId] = useState(currentChequeBookId);

    const initChequePaper = {
      ChequePaperId: undefined,
      ChequeBookId: chequeBookId,
      SerialNo: "",
      ChequePaperStatus: "",
      Description: "",
      ChangeDate: "",
      IsDeleted: false,
    };

    const [selectedItem, setSelectedItem] = useState(initChequePaper);
    const { actionsLoading, chequeBookForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.chequePapers.actionsLoading,
        chequeBookForEdit: state.chequePapers.chequeBookForEdit,
        error: state.chequePapers.error,
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

    const [chequePapers, setChequePapers] = useState(chequePaper);
    const [activeChequePapers, setActiveChequePapers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setActiveChequePapers(chequePapers.filter((x) => x.IsDeleted == false));
      setTotalCount(chequePapers.filter((x) => x.IsDeleted == false).length);
    }, [chequePapers]);

    useEffect(() => {
      initChequePaper.ChequeBookId = currentChequeBookId;

      setChequeBookId(currentChequeBookId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChequeBookId]);

    useEffect(() => {
      setSelectedItem(findChequePaper(selectedId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    const [showEditChequePaperDialog, setShowEditChequePaperDialog] =
      useState(false);
    const openNewChequePaperDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initChequePaper));

      setTimeout(() => {
        setShowEditChequePaperDialog(true);
      }, 200);
    };
    const openEditChequePaperDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findChequePaper(id));
      setTimeout(() => {
        setShowEditChequePaperDialog(true);
      }, 200);
    };
    const closeEditChequePaperDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initChequePaper));
      setShowEditChequePaperDialog(false);
    };

    const [showDeleteChequePaperDialog, setShowDeleteChequePaperDialog] =
      useState(false);
    const openDeleteChequePaperDialog = (id) => {
      setSelectedId(id);
      setShowDeleteChequePaperDialog(true);
    };
    const closeDeleteChequePaperDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initChequePaper));
      setShowDeleteChequePaperDialog(false);
    };

    const [showDeleteChequePapersDialog, setShowDeleteChequePapersDialog] =
      useState(false);
    const openDeleteChequePapersDialog = () => {
      setShowDeleteChequePapersDialog(true);
    };
    const closeDeleteChequePapersDialog = () => {
      setShowDeleteChequePapersDialog(false);
    };

    const [showFetchChequePapersDialog, setShowFetchChequePapersDialog] =
      useState(false);
    const openFetchChequePapersDialog = () => {
      setShowFetchChequePapersDialog(true);
    };
    const closeFetchChequePapersDialog = () => {
      setShowFetchChequePapersDialog(false);
    };

    const findChequePaper = (chequePaperId) => {
      return chequePapers.filter(
        (chequePaper) => chequePaper.ChequePaperId == chequePaperId
      )[0];
    };

    const addChequePaper = (chequePaper) => {
      chequePaper.ChequePaperId = "temp_" + Math.floor(Math.random() * 100);
      chequePaper.ChequeBookId = +chequePaper.ChequeBookId;

      setChequePapers((chequePapers) => [...chequePapers, chequePaper]);
    };

    const removeChequePaper = (chequePaperId) => {
      if (chequePaperId.toString().indexOf("temp_") > -1) {
        setChequePapers((chequePapers) =>
          chequePapers.filter((item) => item.ChequePaperId != chequePaperId)
        );
      } else {
        setChequePapers((chequePapers) =>
          chequePapers.map((item) => {
            let copyChequePaper = CloneObject(item);
            if (copyChequePaper.ChequePaperId == chequePaperId)
              copyChequePaper.IsDeleted = true;

            return copyChequePaper;
          })
        );
      }
    };

    const updateChequePaper = (chequePaper) => {
      chequePaper.ChequeBookId = +chequePaper.ChequeBookId;
      setChequePapers((chequePapers) =>
        chequePapers.map((item) =>
          item.ChequePaperId === chequePaper.ChequePaperId ? chequePaper : item
        )
      );
    };

    const value = {
      chequePapers,
      activeChequePapers,
      findChequePaper,
      addChequePaper,
      removeChequePaper,
      updateChequePaper,
      totalCount,
      setTotalCount,
      actionsLoading,
      chequeBookId,
      setChequeBookId,
      initChequePaper,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      showEditChequePaperDialog,
      openEditChequePaperDialog,
      openNewChequePaperDialog,
      closeEditChequePaperDialog,
      showDeleteChequePaperDialog,
      openDeleteChequePaperDialog,
      closeDeleteChequePaperDialog,
      showDeleteChequePapersDialog,
      openDeleteChequePapersDialog,
      closeDeleteChequePapersDialog,
      showFetchChequePapersDialog,
      openFetchChequePapersDialog,
      closeFetchChequePapersDialog,
    };

    return (
      <ChequePapersUIContext.Provider value={value}>
        {children}
      </ChequePapersUIContext.Provider>
    );
  }
);
