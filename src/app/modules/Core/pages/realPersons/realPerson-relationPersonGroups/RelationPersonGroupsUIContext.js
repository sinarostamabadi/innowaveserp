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
import { initialFilter } from "./RelationPersonGroupsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const RelationPersonGroupsUIContext = createContext();

export function useRelationPersonGroupsUIContext() {
  return useContext(RelationPersonGroupsUIContext);
}

export const RelationPersonGroupsUIConsumer =
  RelationPersonGroupsUIContext.Consumer;

export const RelationPersonGroupsUIProvider = forwardRef(
  ({ currentPersonId, children, relationPersonGroup, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          relationPersonGroups.map((relationPersonGroup) => {
            return {
              RelationPersonGroupId:
                relationPersonGroup.RelationPersonGroupId.toString().indexOf(
                  "temp_"
                ) > -1
                  ? null
                  : relationPersonGroup.RelationPersonGroupId,
              PersonGroupId: relationPersonGroup.PersonGroupId,
              PersonId: +personId,
              IsDeleted: relationPersonGroup.IsDeleted,
            };
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [personId, setPersonId] = useState(currentPersonId);

    const initRelationPersonGroup = {
      RelationPersonGroupId: undefined,
      PersonGroupId: undefined,
      PersonId: personId,
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

    const [relationPersonGroups, setRelationPersonGroups] =
      useState(relationPersonGroup);
    const [active, setActive] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!realPersonForEdit &&
        !!realPersonForEdit.RelationPersonGroups &&
        realPersonForEdit.RelationPersonGroups.length > 0
      ) {
        setRelationPersonGroups(realPersonForEdit.RelationPersonGroups);
        setTotalCount(realPersonForEdit.RelationPersonGroups.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initRelationPersonGroup.PersonId = currentPersonId;

      setPersonId(currentPersonId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPersonId]);

    useEffect(() => {
      if (relationPersonGroups.length > 0)
        setActive(relationPersonGroups.filter((x) => !x.IsDeleted));
    }, [relationPersonGroups]);

    const [
      showEditRelationPersonGroupDialog,
      setShowEditRelationPersonGroupDialog,
    ] = useState(false);
    const openNewRelationPersonGroupDialog = () => {
      setSelectedId(undefined);
      setShowEditRelationPersonGroupDialog(true);
    };
    const openEditRelationPersonGroupDialog = (id) => {
      setSelectedId(id);
      setShowEditRelationPersonGroupDialog(true);
    };
    const closeEditRelationPersonGroupDialog = () => {
      setSelectedId(undefined);
      setShowEditRelationPersonGroupDialog(false);
    };

    const [
      showDeleteRelationPersonGroupDialog,
      setShowDeleteRelationPersonGroupDialog,
    ] = useState(false);
    const openDeleteRelationPersonGroupDialog = (id) => {
      setSelectedId(id);
      setShowDeleteRelationPersonGroupDialog(true);
    };
    const closeDeleteRelationPersonGroupDialog = () => {
      setSelectedId(undefined);
      setShowDeleteRelationPersonGroupDialog(false);
    };

    const [
      showDeleteRelationPersonGroupsDialog,
      setShowDeleteRelationPersonGroupsDialog,
    ] = useState(false);
    const openDeleteRelationPersonGroupsDialog = () => {
      setShowDeleteRelationPersonGroupsDialog(true);
    };
    const closeDeleteRelationPersonGroupsDialog = () => {
      setShowDeleteRelationPersonGroupsDialog(false);
    };

    const [
      showFetchRelationPersonGroupsDialog,
      setShowFetchRelationPersonGroupsDialog,
    ] = useState(false);
    const openFetchRelationPersonGroupsDialog = () => {
      setShowFetchRelationPersonGroupsDialog(true);
    };
    const closeFetchRelationPersonGroupsDialog = () => {
      setShowFetchRelationPersonGroupsDialog(false);
    };

    const findRelationPersonGroup = (relationPersonGroupId) => {
      return relationPersonGroups.filter(
        (relationPersonGroup) =>
          relationPersonGroup.RelationPersonGroupId == relationPersonGroupId
      )[0];
    };

    const addRelationPersonGroup = (relationPersonGroup) => {
      relationPersonGroup.RelationPersonGroupId =
        "temp_" + Math.floor(Math.random() * 100);
      relationPersonGroup.PersonGroupId = +relationPersonGroup.PersonGroupId;
      relationPersonGroup.PersonId = +relationPersonGroup.PersonId;

      setRelationPersonGroups((relationPersonGroups) => [
        ...relationPersonGroups,
        relationPersonGroup,
      ]);
    };

    const removeRelationPersonGroup = (relationPersonGroupId) => {
      let relationPersonGroup = findRelationPersonGroup(relationPersonGroupId);

      setRelationPersonGroups((relationPersonGroups) =>
        relationPersonGroups.map((item) => {
          return item.RelationPersonGroupId == relationPersonGroupId
            ? { ...relationPersonGroup, IsDeleted: true }
            : item;
        })
      );
    };

    const updateRelationPersonGroup = (relationPersonGroup) => {
      relationPersonGroup.PersonGroupId = +relationPersonGroup.PersonGroupId;
      relationPersonGroup.PersonId = +relationPersonGroup.PersonId;

      setRelationPersonGroups((relationPersonGroups) =>
        relationPersonGroups.map((item) =>
          item.RelationPersonGroupId ===
          relationPersonGroup.RelationPersonGroupId
            ? relationPersonGroup
            : item
        )
      );
    };

    const value = {
      relationPersonGroups,
      active,
      findRelationPersonGroup,
      addRelationPersonGroup,
      removeRelationPersonGroup,
      updateRelationPersonGroup,
      totalCount,
      setTotalCount,
      actionsLoading,
      personId,
      setPersonId,
      initRelationPersonGroup,
      selectedId,
      queryParams,
      setQueryParams,
      showEditRelationPersonGroupDialog,
      openEditRelationPersonGroupDialog,
      openNewRelationPersonGroupDialog,
      closeEditRelationPersonGroupDialog,
      showDeleteRelationPersonGroupDialog,
      openDeleteRelationPersonGroupDialog,
      closeDeleteRelationPersonGroupDialog,
      showDeleteRelationPersonGroupsDialog,
      openDeleteRelationPersonGroupsDialog,
      closeDeleteRelationPersonGroupsDialog,
      showFetchRelationPersonGroupsDialog,
      openFetchRelationPersonGroupsDialog,
      closeFetchRelationPersonGroupsDialog,
    };

    return (
      <RelationPersonGroupsUIContext.Provider value={value}>
        {children}
      </RelationPersonGroupsUIContext.Provider>
    );
  }
);
