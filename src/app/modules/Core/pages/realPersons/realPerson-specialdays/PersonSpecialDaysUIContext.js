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
import { initialFilter } from "./PersonSpecialDaysUIHelper";
import { shallowEqual, useSelector } from "react-redux";

const PersonSpecialDaysUIContext = createContext();

export function usePersonSpecialDaysUIContext() {
  return useContext(PersonSpecialDaysUIContext);
}

export const PersonSpecialDaysUIConsumer = PersonSpecialDaysUIContext.Consumer;

export const PersonSpecialDaysUIProvider = forwardRef(
  ({ currentPersonId, children, personSpecialDay, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          !!personSpecialDays && personSpecialDays.length > 0
            ? personSpecialDays.map((personSpecialDay) => {
                return {
                  PersonSpecialDayId:
                    personSpecialDay.PersonSpecialDayId.toString().indexOf(
                      "temp_"
                    ) > -1
                      ? null
                      : personSpecialDay.PersonSpecialDayId,
                  SpecialDayTypeId: personSpecialDay.SpecialDayTypeId,
                  PersonId: +personId,
                  PersonSpecialDayDate: personSpecialDay.PersonSpecialDayDate,
                  IsDeleted: personSpecialDay.IsDeleted,
                };
              })
            : []
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [personId, setPersonId] = useState(currentPersonId);

    const initPersonSpecialDay = {
      PersonSpecialDayId: undefined,
      SpecialDayType: undefined,
      SpecialDayTypeId: undefined,
      PersonId: personId,
      PersonSpecialDayDate: "",
      IsDeleted: false,
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

    const [personSpecialDays, setPersonSpecialDays] =
      useState(personSpecialDay);
    const [active, setActive] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
      if (
        !!realPersonForEdit &&
        !!realPersonForEdit.PersonSpecialDays &&
        realPersonForEdit.PersonSpecialDays.length > 0
      ) {
        setPersonSpecialDays(realPersonForEdit.PersonSpecialDays);
        setTotalCount(realPersonForEdit.PersonSpecialDays.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initPersonSpecialDay.PersonId = currentPersonId;

      setPersonId(currentPersonId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPersonId]);

    useEffect(() => {
      if (personSpecialDays.length > 0)
        setActive(personSpecialDays.filter((x) => !x.IsDeleted));
    }, [personSpecialDays]);

    const [showEditPersonSpecialDayDialog, setShowEditPersonSpecialDayDialog] =
      useState(false);
    const openNewPersonSpecialDayDialog = () => {
      setSelectedId(undefined);
      setShowEditPersonSpecialDayDialog(true);
    };
    const openEditPersonSpecialDayDialog = (id) => {
      setSelectedId(id);
      setShowEditPersonSpecialDayDialog(true);
    };
    const closeEditPersonSpecialDayDialog = () => {
      setSelectedId(undefined);
      setShowEditPersonSpecialDayDialog(false);
    };

    const [
      showDeletePersonSpecialDayDialog,
      setShowDeletePersonSpecialDayDialog,
    ] = useState(false);
    const openDeletePersonSpecialDayDialog = (id) => {
      setSelectedId(id);
      setShowDeletePersonSpecialDayDialog(true);
    };
    const closeDeletePersonSpecialDayDialog = () => {
      setSelectedId(undefined);
      setShowDeletePersonSpecialDayDialog(false);
    };

    const [
      showDeletePersonSpecialDaysDialog,
      setShowDeletePersonSpecialDaysDialog,
    ] = useState(false);
    const openDeletePersonSpecialDaysDialog = () => {
      setShowDeletePersonSpecialDaysDialog(true);
    };
    const closeDeletePersonSpecialDaysDialog = () => {
      setShowDeletePersonSpecialDaysDialog(false);
    };

    const [
      showFetchPersonSpecialDaysDialog,
      setShowFetchPersonSpecialDaysDialog,
    ] = useState(false);
    const openFetchPersonSpecialDaysDialog = () => {
      setShowFetchPersonSpecialDaysDialog(true);
    };
    const closeFetchPersonSpecialDaysDialog = () => {
      setShowFetchPersonSpecialDaysDialog(false);
    };

    const findPersonSpecialDay = (personSpecialDayId) => {
      let personSpecialDayObj = !!personSpecialDays
        ? personSpecialDays.filter(
            (personSpecialDay) =>
              personSpecialDay.PersonSpecialDayId == personSpecialDayId
          )[0]
        : null;
      return personSpecialDayObj;
    };

    const addPersonSpecialDay = (personSpecialDay) => {
      personSpecialDay.PersonSpecialDayId =
        "temp_" + Math.floor(Math.random() * 100);
      personSpecialDay.SpecialDayTypeId = +personSpecialDay.SpecialDayTypeId;
      personSpecialDay.PersonId = +personSpecialDay.PersonId;

      setPersonSpecialDays((personSpecialDays) => [
        ...personSpecialDays,
        personSpecialDay,
      ]);
    };

    const removePersonSpecialDay = (personSpecialDayId) => {
      let personSpecialDay = findPersonSpecialDay(personSpecialDayId);

      setPersonSpecialDays((personSpecialDays) =>
        personSpecialDays.map((item) => {
          console.log(
            "item.PersonSpecialDayId > ",
            item.PersonSpecialDayId == personSpecialDayId
          );
          return item.PersonSpecialDayId == personSpecialDayId
            ? { ...personSpecialDay, IsDeleted: true }
            : item;
        })
      );
    };

    const updatePersonSpecialDay = (personSpecialDay) => {
      personSpecialDay.SpecialDayTypeId = +personSpecialDay.SpecialDayTypeId;
      personSpecialDay.PersonId = +personSpecialDay.PersonId;

      setPersonSpecialDays((personSpecialDays) =>
        personSpecialDays.map((item) =>
          item.PersonSpecialDayId === personSpecialDay.PersonSpecialDayId
            ? personSpecialDay
            : item
        )
      );
    };

    const value = {
      personSpecialDays,
      active,
      findPersonSpecialDay,
      addPersonSpecialDay,
      removePersonSpecialDay,
      updatePersonSpecialDay,
      totalCount,
      setTotalCount,
      actionsLoading,
      personId,
      setPersonId,
      initPersonSpecialDay,
      selectedId,
      queryParams,
      setQueryParams,
      showEditPersonSpecialDayDialog,
      openEditPersonSpecialDayDialog,
      openNewPersonSpecialDayDialog,
      closeEditPersonSpecialDayDialog,
      showDeletePersonSpecialDayDialog,
      openDeletePersonSpecialDayDialog,
      closeDeletePersonSpecialDayDialog,
      showDeletePersonSpecialDaysDialog,
      openDeletePersonSpecialDaysDialog,
      closeDeletePersonSpecialDaysDialog,
      showFetchPersonSpecialDaysDialog,
      openFetchPersonSpecialDaysDialog,
      closeFetchPersonSpecialDaysDialog,
    };

    return (
      <PersonSpecialDaysUIContext.Provider value={value}>
        {children}
      </PersonSpecialDaysUIContext.Provider>
    );
  }
);
