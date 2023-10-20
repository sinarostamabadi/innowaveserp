/* eslint-disable no-unused-vars */
import {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./EmployeeTypesUIHelper";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const EmployeeTypesUIContext = createContext();

export function useEmployeeTypesUIContext() {
  return useContext(EmployeeTypesUIContext);
}

export const EmployeeTypesUIConsumer = EmployeeTypesUIContext.Consumer;

export const EmployeeTypesUIProvider = forwardRef(
  ({ currentBodyBuildingEmployeeId, children, employeeType, selectedEmployeeType, btnRef }, ref) => {
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      Collect(fn) {
          fn(
            employeeTypes.map((d) => {
              let x = {
                BodyBuildingEmployeeExpertiseId:
                  d.BodyBuildingEmployeeExpertiseId.toString().indexOf("temp") > -1
                    ? null
                    : +d.BodyBuildingEmployeeExpertiseId,
                    BodyBuildingEmployeeTypeExpertiseId: !!d.BodyBuildingEmployeeTypeExpertiseId? +d.BodyBuildingEmployeeTypeExpertiseId: null,
                    Grade: d.Grade,
                    IsDeleted: d.IsDeleted,
              };

              return x;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bodyBuildingEmployeeId, setBodyBuildingEmployeeId] = useState(currentBodyBuildingEmployeeId);

    const initEmployeeType = {
      BodyBuildingEmployeeExpertiseId: "",
      BodyBuildingEmployeeId: bodyBuildingEmployeeId,
      BodyBuildingEmployeeTypeExpertiseId: "",
      Grade: "",
      IsDeleted: false,
    };

    const { actionsLoading } = useSelector(
      (state) => ({
        actionsLoading: state.employees.actionsLoading,
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

    const [employeeTypes, setEmployeeTypes] = useState(employeeType);
    const [activeEmployeeTypes, setActiveEmployeeTypes] = useState(employeeType);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setEmployeeTypes(employeeType);
      setTotalCount(!!employeeType && employeeType.length > 0 ? employeeType.length : 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeType]);

    useEffect(() => {
      initEmployeeType.BodyBuildingEmployeeId = currentBodyBuildingEmployeeId;

      setBodyBuildingEmployeeId(currentBodyBuildingEmployeeId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBodyBuildingEmployeeId]);

    useEffect(() => {
      setActiveEmployeeTypes(employeeTypes.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeTypes]);

    // Edit Dialog, New Dialog
    const [showEditEmployeeTypeDialog, setShowEditEmployeeTypeDialog] = useState(false);
    const openNewEmployeeTypeDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditEmployeeTypeDialog(true);
    };
    const openEditEmployeeTypeDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findEmployeeType(id));
      setShowEditEmployeeTypeDialog(true);
    };
    const closeEditEmployeeTypeDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditEmployeeTypeDialog(false);
    };

    const [showDeleteEmployeeTypeDialog, setShowDeleteEmployeeTypeDialog] =
      useState(false);
    const openDeleteEmployeeTypeDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findEmployeeType(id));
      setShowDeleteEmployeeTypeDialog(true);
    };
    const closeDeleteEmployeeTypeDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowDeleteEmployeeTypeDialog(false);
    };

    const [showDeleteEmployeeTypesDialog, setShowDeleteEmployeeTypesDialog] =
      useState(false);
    const openDeleteEmployeeTypesDialog = () => {
      setShowDeleteEmployeeTypesDialog(true);
    };
    const closeDeleteEmployeeTypesDialog = () => {
      setShowDeleteEmployeeTypesDialog(false);
    };

    const [showFetchEmployeeTypesDialog, setShowFetchEmployeeTypesDialog] =
      useState(false);
    const openFetchEmployeeTypesDialog = () => {
      setShowFetchEmployeeTypesDialog(true);
    };
    const closeFetchEmployeeTypesDialog = () => {
      setShowFetchEmployeeTypesDialog(false);
    };

    const findEmployeeType = (bodyBuildingEmployeeExpertiseId) => {
      if (!!bodyBuildingEmployeeExpertiseId == false) return;

      const employeeTypeObj = employeeTypes.filter(
        (employeeType) =>
          employeeType.BodyBuildingEmployeeExpertiseId == bodyBuildingEmployeeExpertiseId
      )[0];

      return {
        BodyBuildingEmployeeExpertiseId: employeeTypeObj.BodyBuildingEmployeeExpertiseId,
        BodyBuildingEmployeeId: employeeTypeObj.BodyBuildingEmployeeId,
        BodyBuildingEmployeeTypeExpertiseId: employeeTypeObj.BodyBuildingEmployeeTypeExpertiseId,
        BodyBuildingEmployeeTypeExpertise: employeeTypeObj.BodyBuildingEmployeeTypeExpertise,
        Grade: employeeTypeObj.Grade,
        IsDeleted: false,
      };
    };

    const addEmployeeType = (employeeType) => {
      employeeType.BodyBuildingEmployeeExpertiseId = "temp_" + Math.floor(Math.random() * 100);

      setEmployeeTypes((employeeTypes) => [...employeeTypes, employeeType]);
    };

    const removeEmployeeType = (bodyBuildingEmployeeExpertiseId) => {
      if (bodyBuildingEmployeeExpertiseId.toString().indexOf("temp_") > -1)
        setEmployeeTypes(
          employeeTypes.filter(
            (x) => x.BodyBuildingEmployeeExpertiseId != bodyBuildingEmployeeExpertiseId
          )
        );
      else {
        let employeeType = findEmployeeType(bodyBuildingEmployeeExpertiseId);
        employeeType["IsDeleted"] = true;
        updateEmployeeType(employeeType);
      }
    };

    const updateEmployeeType = (employeeType) => {
      setEmployeeTypes((employeeTypes) =>
        employeeTypes.map((item) =>
          item.BodyBuildingEmployeeExpertiseId == employeeType.BodyBuildingEmployeeExpertiseId
            ? employeeType
            : item
        )
      );

      setTimeout(() => {
        setSelectedItem(employeeType);
      }, 200);
    };

    const value = {
      employeeTypes,
      activeEmployeeTypes,
      totalCount,
      setTotalCount,
      findEmployeeType,
      addEmployeeType,
      removeEmployeeType,
      updateEmployeeType,
      actionsLoading,
      bodyBuildingEmployeeId,
      setBodyBuildingEmployeeId,
      initEmployeeType,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      selectedEmployeeType,
      // Edit
      showEditEmployeeTypeDialog,
      openEditEmployeeTypeDialog,
      openNewEmployeeTypeDialog,
      closeEditEmployeeTypeDialog,
      // Delete
      showDeleteEmployeeTypeDialog,
      openDeleteEmployeeTypeDialog,
      closeDeleteEmployeeTypeDialog,
      // Deletes
      showDeleteEmployeeTypesDialog,
      openDeleteEmployeeTypesDialog,
      closeDeleteEmployeeTypesDialog,
      // Fetch
      showFetchEmployeeTypesDialog,
      openFetchEmployeeTypesDialog,
      closeFetchEmployeeTypesDialog,
    };

    return (
        <EmployeeTypesUIContext.Provider value={value}>
          {children}
        </EmployeeTypesUIContext.Provider>
    );
  }
);
