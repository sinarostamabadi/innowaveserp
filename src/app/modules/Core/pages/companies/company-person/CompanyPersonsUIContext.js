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
import { initialFilter } from "./CompanyPersonsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const CompanyPersonsUIContext = createContext();

export function useCompanyPersonsUIContext() {
  return useContext(CompanyPersonsUIContext);
}

export const CompanyPersonsUIConsumer = CompanyPersonsUIContext.Consumer;

export const CompanyPersonsUIProvider = forwardRef(
  ({ currentPersonId, children, companyPerson, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          companyPersons.map((companyPerson) => {
            if (!!companyPerson.CompanyPersonId && companyPerson.CompanyPersonId.toString().indexOf("temp_") > -1){
              companyPerson.CompanyPersonId = null;
              // delete  companyPerson.PersonId;
            }

            return companyPerson;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [personId, setPersonId] = useState(currentPersonId);

    const initCompanyPerson = {
      CompanyPersonId: undefined,
      CompanyPersonTypeId: undefined,
      PersonId: "",
      Person: "",
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

    const [companyPersons, setCompanyPersons] = useState(companyPerson);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!companyForEdit &&
        !!companyForEdit.CompanyPersons &&
        companyForEdit.CompanyPersons.length > 0
      ) {
        setCompanyPersons(companyForEdit.CompanyPersons);
        setTotalCount(companyForEdit.CompanyPersons.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyForEdit]);

    useEffect(() => {
      initCompanyPerson.PersonId = currentPersonId;

      setPersonId(currentPersonId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPersonId]);

    const [showEditCompanyPersonDialog, setShowEditCompanyPersonDialog] = useState(false);
    const openNewCompanyPersonDialog = () => {
      setSelectedId(undefined);
      setShowEditCompanyPersonDialog(true);
    };
    const openEditCompanyPersonDialog = (id) => {
      setSelectedId(id);
      setShowEditCompanyPersonDialog(true);
    };
    const closeEditCompanyPersonDialog = () => {
      setSelectedId(undefined);
      setShowEditCompanyPersonDialog(false);
    };

    const [showDeleteCompanyPersonDialog, setShowDeleteCompanyPersonDialog] = useState(false);
    const openDeleteCompanyPersonDialog = (id) => {
      setSelectedId(id);
      setShowDeleteCompanyPersonDialog(true);
    };
    const closeDeleteCompanyPersonDialog = () => {
      setSelectedId(undefined);
      setShowDeleteCompanyPersonDialog(false);
    };

    const [showDeleteCompanyPersonsDialog, setShowDeleteCompanyPersonsDialog] = useState(false);
    const openDeleteCompanyPersonsDialog = () => {
      setShowDeleteCompanyPersonsDialog(true);
    };
    const closeDeleteCompanyPersonsDialog = () => {
      setShowDeleteCompanyPersonsDialog(false);
    };

    const [showFetchCompanyPersonsDialog, setShowFetchCompanyPersonsDialog] = useState(false);
    const openFetchCompanyPersonsDialog = () => {
      setShowFetchCompanyPersonsDialog(true);
    };
    const closeFetchCompanyPersonsDialog = () => {
      setShowFetchCompanyPersonsDialog(false);
    };

    const findCompanyPerson = (companyPersonId) => {
      return companyPersons.filter((companyPerson) => companyPerson.CompanyPersonId == companyPersonId)[0];
    };

    const addCompanyPerson = (companyPerson) => {
      companyPerson.CompanyPersonId = "temp_" + Math.floor(Math.random() * 100);
      companyPerson.CompanyPersonId = +companyPerson.CompanyPersonId;
      // companyPerson.PersonId = +companyPerson.PersonId;
      
      setCompanyPersons((companyPersons) => [...companyPersons, companyPerson]);
    };

    const removeCompanyPerson = (companyPersonId) => {
      let companyPerson = findCompanyPerson(companyPersonId);
      companyPerson["IsDeleted"] = true;
      updateCompanyPerson(companyPerson);
    };

    const updateCompanyPerson = (companyPerson) => {
      companyPerson.CompanyPersonId = +companyPerson.CompanyPersonId;
      companyPerson.PersonId = +companyPerson.PersonId;

      setCompanyPersons((companyPersons) =>
        companyPersons.map((item) => (item.CompanyPersonId === companyPerson.CompanyPersonId ? companyPerson : item))
      );
    };

    const value = {
      companyPersons,
      findCompanyPerson,
      addCompanyPerson,
      removeCompanyPerson,
      updateCompanyPerson,
      totalCount,
      setTotalCount,
      actionsLoading,
      personId,
      setPersonId,
      initCompanyPerson,
      selectedId,
      queryParams,
      setQueryParams,
      showEditCompanyPersonDialog,
      openEditCompanyPersonDialog,
      openNewCompanyPersonDialog,
      closeEditCompanyPersonDialog,
      showDeleteCompanyPersonDialog,
      openDeleteCompanyPersonDialog,
      closeDeleteCompanyPersonDialog,
      showDeleteCompanyPersonsDialog,
      openDeleteCompanyPersonsDialog,
      closeDeleteCompanyPersonsDialog,
      showFetchCompanyPersonsDialog,
      openFetchCompanyPersonsDialog,
      closeFetchCompanyPersonsDialog,
    };

    return (
      <CompanyPersonsUIContext.Provider value={value}>
        {children}
      </CompanyPersonsUIContext.Provider>
    );
  }
);
