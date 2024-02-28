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
import { initialFilter } from "./ExpertisesUIHelper";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ExpertisesUIContext = createContext();

export function useExpertisesUIContext() {
  return useContext(ExpertisesUIContext);
}

export const ExpertisesUIConsumer = ExpertisesUIContext.Consumer;

export const ExpertisesUIProvider = forwardRef(
  ({ currentBodyBuildingEmployeeTypeId, children, expertise, btnRef }, ref) => {
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          expertises.map((d) => {
            let x = {
              BodyBuildingEmployeeTypeExpertiseId:
                d.BodyBuildingEmployeeTypeExpertiseId.toString().indexOf(
                  "temp"
                ) > -1
                  ? null
                  : +d.BodyBuildingEmployeeTypeExpertiseId,
              BodyBuildingEmployeeTypeId: d.BodyBuildingEmployeeTypeId,
              Title: d.Title,
              IsDeleted: d.IsDeleted,
            };

            return x;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bodyBuildingEmployeeTypeId, setBodyBuildingEmployeeTypeId] =
      useState(currentBodyBuildingEmployeeTypeId);

    const initExpertise = {
      BodyBuildingEmployeeTypeExpertiseId: "",
      BodyBuildingEmployeeTypeId: bodyBuildingEmployeeTypeId,
      Title: "",
      IsDeleted: false,
    };

    const { actionsLoading } = useSelector(
      (state) => ({
        actionsLoading: state.employeeTypes.actionsLoading,
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

    const [expertises, setExpertises] = useState(expertise);
    const [activeExpertises, setActiveExpertises] = useState(expertise);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setExpertises(expertise);
      setTotalCount(!!expertise && expertise.length > 0 ? expertise.length : 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expertise]);

    useEffect(() => {
      initExpertise.BodyBuildingEmployeeTypeId =
        currentBodyBuildingEmployeeTypeId;

      setBodyBuildingEmployeeTypeId(currentBodyBuildingEmployeeTypeId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBodyBuildingEmployeeTypeId]);

    useEffect(() => {
      setActiveExpertises(expertises.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expertises]);

    // Edit Dialog, New Dialog
    const [showEditExpertiseDialog, setShowEditExpertiseDialog] =
      useState(false);
    const openNewExpertiseDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditExpertiseDialog(true);
    };
    const openEditExpertiseDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findExpertise(id));
      setShowEditExpertiseDialog(true);
    };
    const closeEditExpertiseDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditExpertiseDialog(false);
    };

    const [showDeleteExpertiseDialog, setShowDeleteExpertiseDialog] =
      useState(false);
    const openDeleteExpertiseDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findExpertise(id));
      setShowDeleteExpertiseDialog(true);
    };
    const closeDeleteExpertiseDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowDeleteExpertiseDialog(false);
    };

    const [showDeleteExpertisesDialog, setShowDeleteExpertisesDialog] =
      useState(false);
    const openDeleteExpertisesDialog = () => {
      setShowDeleteExpertisesDialog(true);
    };
    const closeDeleteExpertisesDialog = () => {
      setShowDeleteExpertisesDialog(false);
    };

    const [showFetchExpertisesDialog, setShowFetchExpertisesDialog] =
      useState(false);
    const openFetchExpertisesDialog = () => {
      setShowFetchExpertisesDialog(true);
    };
    const closeFetchExpertisesDialog = () => {
      setShowFetchExpertisesDialog(false);
    };

    const findExpertise = (bodyBuildingEmployeeTypeExpertiseId) => {
      if (!!bodyBuildingEmployeeTypeExpertiseId == false) return;

      const expertiseObj = expertises.filter(
        (expertise) =>
          expertise.BodyBuildingEmployeeTypeExpertiseId ==
          bodyBuildingEmployeeTypeExpertiseId
      )[0];

      return {
        BodyBuildingEmployeeTypeExpertiseId:
          expertiseObj.BodyBuildingEmployeeTypeExpertiseId,
        BodyBuildingEmployeeTypeId: expertiseObj.BodyBuildingEmployeeTypeId,
        Title: expertiseObj.Title,
        IsDeleted: false,
      };
    };

    const addExpertise = (expertise) => {
      expertise.BodyBuildingEmployeeTypeExpertiseId =
        "temp_" + Math.floor(Math.random() * 100);

      setExpertises((expertises) => [...expertises, expertise]);
    };

    const removeExpertise = (bodyBuildingEmployeeTypeExpertiseId) => {
      if (bodyBuildingEmployeeTypeExpertiseId.toString().indexOf("temp_") > -1)
        setExpertises(
          expertises.filter(
            (x) =>
              x.BodyBuildingEmployeeTypeExpertiseId !=
              bodyBuildingEmployeeTypeExpertiseId
          )
        );
      else {
        let expertise = findExpertise(bodyBuildingEmployeeTypeExpertiseId);
        expertise["IsDeleted"] = true;
        updateExpertise(expertise);
      }
    };

    const updateExpertise = (expertise) => {
      setExpertises((expertises) =>
        expertises.map((item) =>
          item.BodyBuildingEmployeeTypeExpertiseId ==
          expertise.BodyBuildingEmployeeTypeExpertiseId
            ? expertise
            : item
        )
      );

      setTimeout(() => {
        setSelectedItem(expertise);
      }, 200);
    };

    const value = {
      expertises,
      activeExpertises,
      totalCount,
      setTotalCount,
      findExpertise,
      addExpertise,
      removeExpertise,
      updateExpertise,
      actionsLoading,
      bodyBuildingEmployeeTypeId,
      setBodyBuildingEmployeeTypeId,
      initExpertise,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Edit
      showEditExpertiseDialog,
      openEditExpertiseDialog,
      openNewExpertiseDialog,
      closeEditExpertiseDialog,
      // Delete
      showDeleteExpertiseDialog,
      openDeleteExpertiseDialog,
      closeDeleteExpertiseDialog,
      // Deletes
      showDeleteExpertisesDialog,
      openDeleteExpertisesDialog,
      closeDeleteExpertisesDialog,
      // Fetch
      showFetchExpertisesDialog,
      openFetchExpertisesDialog,
      closeFetchExpertisesDialog,
    };

    return (
      <ExpertisesUIContext.Provider value={value}>
        {children}
      </ExpertisesUIContext.Provider>
    );
  }
);
