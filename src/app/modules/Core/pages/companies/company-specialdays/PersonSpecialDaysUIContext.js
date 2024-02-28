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
import { initialFilter } from "./PersonSpecialDaysUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";

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
                console.log("personSpecialDay > ", personSpecialDay);

                if (
                  personSpecialDay.PersonSpecialDayId.toString().indexOf(
                    "temp_"
                  ) > -1
                )
                  personSpecialDay.PersonSpecialDayId = null;

                return personSpecialDay;
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
    };

    const { actionsLoading, companyForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.companies.actionsLoading,
        companyForEdit: state.companies.companyForEdit,
        error: state.companies.error,
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
    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
      if (
        !!companyForEdit &&
        !!companyForEdit.PersonSpecialDays &&
        companyForEdit.PersonSpecialDays.length > 0
      ) {
        setPersonSpecialDays(companyForEdit.PersonSpecialDays);
        setTotalCount(companyForEdit.PersonSpecialDays.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyForEdit]);

    useEffect(() => {
      initPersonSpecialDay.PersonId = currentPersonId;

      setPersonId(currentPersonId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPersonId]);

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

      if (personSpecialDayObj)
        personSpecialDayObj = {
          ...personSpecialDayObj,
          PersonSpecialDayDate: EnToFaObjDate(
            personSpecialDayObj.PersonSpecialDayDate
          ),
        };
      return personSpecialDayObj;
    };

    const addPersonSpecialDay = (personSpecialDay) => {
      personSpecialDay.PersonSpecialDayId =
        "temp_" + Math.floor(Math.random() * 100);
      personSpecialDay.PersonId = +personSpecialDay.PersonId;

      setPersonSpecialDays((personSpecialDays) => [
        ...personSpecialDays,
        personSpecialDay,
      ]);
    };

    const removePersonSpecialDay = (personSpecialDayId) => {
      let personSpecialDay = findPersonSpecialDay(personSpecialDayId);
      personSpecialDay["IsDeleted"] = true;
      updatePersonSpecialDay(personSpecialDay);
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
