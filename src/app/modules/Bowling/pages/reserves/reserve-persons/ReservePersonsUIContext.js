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
import { initialFilter } from "./ReservePersonsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const ReservePersonsUIContext = createContext();

export function useReservePersonsUIContext() {
  return useContext(ReservePersonsUIContext);
}

export const ReservePersonsUIConsumer = ReservePersonsUIContext.Consumer;

export const ReservePersonsUIProvider = forwardRef(
  (
    {
      currentReserveId,
      children,
      reservePerson,
      setReservePerson,
      btnRef,
      version = 1,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            activeReservePersons.map((d) => {
              let xx = {
                ReservePersonScoreId: null,
                PersonId: d.PersonId,
              };

              return xx;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [reserveId, setReserveId] = useState(currentReserveId);

    const initReservePerson = {
      ReservePersonScoreId: "",
      ReserveId: reserveId,
      PersonId: "",
      Person: null,
      NameFa: "",
    };

    const { actionsLoading, reserveForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.reserves.actionsLoading,
        reserveForEdit: state.reserves.reserveForEdit,
        error: state.reserves.error,
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

    const [reservePersons, setReservePersons] = useState(reservePerson);
    const [activeReservePersons, setActiveReservePersons] =
      useState(reservePerson);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!reserveForEdit &&
        reserveForEdit.ReserveId == currentReserveId &&
        !!reserveForEdit.ReservePersonScores &&
        reserveForEdit.ReservePersonScores.length > 0
      ) {
        setReservePersons(reserveForEdit.ReservePersonScores);
        setTotalCount(reserveForEdit.ReservePersonScores.length);
      } else {
        setReservePersons([]);
        setTotalCount(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserveForEdit]);

    useEffect(() => {
      initReservePerson.ReserveId = currentReserveId;

      setReserveId(currentReserveId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentReserveId]);

    useEffect(() => {
      setReservePersons(reservePerson);
    }, [reservePerson]);

    useEffect(() => {
      setActiveReservePersons(
        reservePersons.filter((x) => x.IsDeleted == false)
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reservePersons]);

    // Edit Dialog, New Dialog
    const [showEditReservePersonDialog, setShowEditReservePersonDialog] =
      useState(false);
    const openNewReservePersonDialog = () => {
      setSelectedId(undefined);
      setShowEditReservePersonDialog(true);
    };
    const openEditReservePersonDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findReservePerson(id));
      setShowEditReservePersonDialog(true);
    };
    const closeEditReservePersonDialog = () => {
      setSelectedId(undefined);
      setShowEditReservePersonDialog(false);
    };

    const [showDeleteReservePersonDialog, setShowDeleteReservePersonDialog] =
      useState(false);
    const openDeleteReservePersonDialog = (id) => {
      setSelectedId(id);
      setShowDeleteReservePersonDialog(true);
    };
    const closeDeleteReservePersonDialog = () => {
      setSelectedId(undefined);
      setShowDeleteReservePersonDialog(false);
    };

    const [showDeleteReservePersonsDialog, setShowDeleteReservePersonsDialog] =
      useState(false);
    const openDeleteReservePersonsDialog = () => {
      setShowDeleteReservePersonsDialog(true);
    };
    const closeDeleteReservePersonsDialog = () => {
      setShowDeleteReservePersonsDialog(false);
    };

    const [showFetchReservePersonsDialog, setShowFetchReservePersonsDialog] =
      useState(false);
    const openFetchReservePersonsDialog = () => {
      setShowFetchReservePersonsDialog(true);
    };
    const closeFetchReservePersonsDialog = () => {
      setShowFetchReservePersonsDialog(false);
    };

    const findReservePerson = (reservePersonScoreId) => {
      if (!!reservePersonScoreId == false) return;

      const reservePersonObj = reservePersons.filter(
        (reservePerson) =>
          reservePerson.ReservePersonScoreId == reservePersonScoreId
      )[0];

      return {
        ReservePersonScoreId: reservePersonObj.ReservePersonScoreId,
        ReserveId: reservePersonObj.ReserveId,
        PersonId: reservePersonObj.PersonId,
        Person: reservePersonObj.Person,
      };
    };

    const addReservePerson = (reservePerson) => {
      reservePerson.ReservePersonScoreId =
        "temp_" + Math.floor(Math.random() * 100);

      setReservePersons((reservePersons) => [...reservePersons, reservePerson]);
    };

    const removeReservePerson = (reservePersonScoreId) => {
      if (reservePersonScoreId.toString().indexOf("temp_") > -1)
        setReservePersons(
          reservePersons.filter(
            (x) => x.ReservePersonScoreId != reservePersonScoreId
          )
        );
      else {
        let reservePerson = findReservePerson(reservePersonScoreId);
        reservePerson["IsDeleted"] = true;
        updateReservePerson(reservePerson);
      }
    };

    const clearPersons = () => {
      setReservePersons([]);
    };

    const updateReservePerson = (reservePerson) => {
      setReservePersons((reservePersons) =>
        reservePersons.map((item) =>
          item.ReservePersonScoreId == reservePerson.ReservePersonScoreId
            ? reservePerson
            : item
        )
      );

      setTimeout(() => {
        setSelectedItem(reservePerson);
      }, 200);
    };

    const value = {
      reservePersons,
      activeReservePersons,
      totalCount,
      setTotalCount,
      findReservePerson,
      setReservePerson,
      addReservePerson,
      removeReservePerson,
      updateReservePerson,
      clearPersons,
      actionsLoading,
      reserveId,
      setReserveId,
      initReservePerson,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      version,
      // Edit
      showEditReservePersonDialog,
      openEditReservePersonDialog,
      openNewReservePersonDialog,
      closeEditReservePersonDialog,
      // Delete
      showDeleteReservePersonDialog,
      openDeleteReservePersonDialog,
      closeDeleteReservePersonDialog,
      // Deletes
      showDeleteReservePersonsDialog,
      openDeleteReservePersonsDialog,
      closeDeleteReservePersonsDialog,
      // Fetch
      showFetchReservePersonsDialog,
      openFetchReservePersonsDialog,
      closeFetchReservePersonsDialog,
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
        <ReservePersonsUIContext.Provider value={value}>
          {children}
        </ReservePersonsUIContext.Provider>
      </>
    );
  }
);
