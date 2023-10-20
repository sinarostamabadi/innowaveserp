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
import { initialFilter } from "./BowlingTeamPersonsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const BowlingTeamPersonsUIContext = createContext();

export function useBowlingTeamPersonsUIContext() {
  return useContext(BowlingTeamPersonsUIContext);
}

export const BowlingTeamPersonsUIConsumer = BowlingTeamPersonsUIContext.Consumer;

export const BowlingTeamPersonsUIProvider = forwardRef(
  ({ currentBowlingTeamId, children, bowlingTeamPerson, btnRef }, ref) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            activeBowlingTeamPersons.map((d) => {
              let xx = {
                BowlingTeamPersonScoreId: null,
                PersonId: d.PersonId,
              };

              return xx;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bowlingTeamId, setBowlingTeamId] = useState(currentBowlingTeamId);

    const initBowlingTeamPerson = {
      BowlingTeamPersonScoreId: "",
      BowlingTeamId: bowlingTeamId,
      PersonId: "",
      Person: null,
    };

    const { actionsLoading, bowlingTeamForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.bowlingTeams.actionsLoading,
        bowlingTeamForEdit: state.bowlingTeams.bowlingTeamForEdit,
        error: state.bowlingTeams.error,
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

    const [bowlingTeamPersons, setBowlingTeamPersons] = useState(bowlingTeamPerson);
    const [activeBowlingTeamPersons, setActiveBowlingTeamPersons] = useState(
      bowlingTeamPerson
    );
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!bowlingTeamForEdit &&
        bowlingTeamForEdit.BowlingTeamId == currentBowlingTeamId &&
        !!bowlingTeamForEdit.BowlingTeamPersons &&
        bowlingTeamForEdit.BowlingTeamPersons.length > 0
      ) {
        setBowlingTeamPersons(bowlingTeamForEdit.BowlingTeamPersons);
        setTotalCount(bowlingTeamForEdit.BowlingTeamPersons.length);
      } else {
        setBowlingTeamPersons([]);
        setTotalCount(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bowlingTeamForEdit]);

    useEffect(() => {
      initBowlingTeamPerson.BowlingTeamId = currentBowlingTeamId;

      setBowlingTeamId(currentBowlingTeamId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBowlingTeamId]);

    useEffect(() => {
      setActiveBowlingTeamPersons(
        bowlingTeamPersons.filter((x) => x.IsDeleted == false)
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bowlingTeamPersons]);

    // Edit Dialog, New Dialog
    const [
      showEditBowlingTeamPersonDialog,
      setShowEditBowlingTeamPersonDialog,
    ] = useState(false);
    const openNewBowlingTeamPersonDialog = () => {
      setSelectedId(undefined);
      setShowEditBowlingTeamPersonDialog(true);
    };
    const openEditBowlingTeamPersonDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findBowlingTeamPerson(id));
      setShowEditBowlingTeamPersonDialog(true);
    };
    const closeEditBowlingTeamPersonDialog = () => {
      setSelectedId(undefined);
      setShowEditBowlingTeamPersonDialog(false);
    };

    const [
      showDeleteBowlingTeamPersonDialog,
      setShowDeleteBowlingTeamPersonDialog,
    ] = useState(false);
    const openDeleteBowlingTeamPersonDialog = (id) => {
      setSelectedId(id);
      setShowDeleteBowlingTeamPersonDialog(true);
    };
    const closeDeleteBowlingTeamPersonDialog = () => {
      setSelectedId(undefined);
      setShowDeleteBowlingTeamPersonDialog(false);
    };

    const [
      showDeleteBowlingTeamPersonsDialog,
      setShowDeleteBowlingTeamPersonsDialog,
    ] = useState(false);
    const openDeleteBowlingTeamPersonsDialog = () => {
      setShowDeleteBowlingTeamPersonsDialog(true);
    };
    const closeDeleteBowlingTeamPersonsDialog = () => {
      setShowDeleteBowlingTeamPersonsDialog(false);
    };

    const [
      showFetchBowlingTeamPersonsDialog,
      setShowFetchBowlingTeamPersonsDialog,
    ] = useState(false);
    const openFetchBowlingTeamPersonsDialog = () => {
      setShowFetchBowlingTeamPersonsDialog(true);
    };
    const closeFetchBowlingTeamPersonsDialog = () => {
      setShowFetchBowlingTeamPersonsDialog(false);
    };

    const findBowlingTeamPerson = (bowlingTeamPersonScoreId) => {
      if (!!bowlingTeamPersonScoreId == false) return;

      const bowlingTeamPersonObj = bowlingTeamPersons.filter(
        (bowlingTeamPerson) =>
          bowlingTeamPerson.BowlingTeamPersonScoreId == bowlingTeamPersonScoreId
      )[0];

      return {
        BowlingTeamPersonScoreId: bowlingTeamPersonObj.BowlingTeamPersonScoreId,
        BowlingTeamId: bowlingTeamPersonObj.BowlingTeamId,
        PersonId: bowlingTeamPersonObj.PersonId,
        Person: bowlingTeamPersonObj.Person,
      };
    };

    const addBowlingTeamPerson = (bowlingTeamPerson) => {
      bowlingTeamPerson.BowlingTeamPersonScoreId =
        "temp_" + Math.floor(Math.random() * 100);

      setBowlingTeamPersons((bowlingTeamPersons) => [...bowlingTeamPersons, bowlingTeamPerson]);
    };

    const removeBowlingTeamPerson = (bowlingTeamPersonScoreId) => {
      if (bowlingTeamPersonScoreId.toString().indexOf("temp_") > -1)
        setBowlingTeamPersons(
          bowlingTeamPersons.filter(
            (x) => x.BowlingTeamPersonScoreId != bowlingTeamPersonScoreId
          )
        );
      else {
        let bowlingTeamPerson = findBowlingTeamPerson(bowlingTeamPersonScoreId);
        bowlingTeamPerson["IsDeleted"] = true;
        updateBowlingTeamPerson(bowlingTeamPerson);
      }
    };

    const clearPersons = () => {
      setBowlingTeamPersons([]);
    };

    const updateBowlingTeamPerson = (bowlingTeamPerson) => {
      setBowlingTeamPersons((bowlingTeamPersons) =>
        bowlingTeamPersons.map((item) =>
          item.BowlingTeamPersonScoreId == bowlingTeamPerson.BowlingTeamPersonScoreId
            ? bowlingTeamPerson
            : item
        )
      );

      setTimeout(() => {
        setSelectedItem(bowlingTeamPerson);
      }, 200);
    };

    const value = {
      bowlingTeamPersons,
      activeBowlingTeamPersons,
      totalCount,
      setTotalCount,
      findBowlingTeamPerson,
      addBowlingTeamPerson,
      removeBowlingTeamPerson,
      updateBowlingTeamPerson,
      clearPersons,
      actionsLoading,
      bowlingTeamId,
      setBowlingTeamId,
      initBowlingTeamPerson,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Edit
      showEditBowlingTeamPersonDialog,
      openEditBowlingTeamPersonDialog,
      openNewBowlingTeamPersonDialog,
      closeEditBowlingTeamPersonDialog,
      // Delete
      showDeleteBowlingTeamPersonDialog,
      openDeleteBowlingTeamPersonDialog,
      closeDeleteBowlingTeamPersonDialog,
      // Deletes
      showDeleteBowlingTeamPersonsDialog,
      openDeleteBowlingTeamPersonsDialog,
      closeDeleteBowlingTeamPersonsDialog,
      // Fetch
      showFetchBowlingTeamPersonsDialog,
      openFetchBowlingTeamPersonsDialog,
      closeFetchBowlingTeamPersonsDialog,
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
        <BowlingTeamPersonsUIContext.Provider value={value}>
          {children}
        </BowlingTeamPersonsUIContext.Provider>
      </>
    );
  }
);
