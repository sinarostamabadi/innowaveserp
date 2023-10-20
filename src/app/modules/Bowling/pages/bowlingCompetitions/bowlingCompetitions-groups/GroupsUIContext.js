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
import { initialFilter } from "./GroupsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";
import { CloneObject } from "../../../../../../core/_helpers";

const GroupsUIContext = createContext();

export function useGroupsUIContext() {
  return useContext(GroupsUIContext);
}

export const GroupsUIConsumer = GroupsUIContext.Consumer;

export const GroupsUIProvider = forwardRef(
  ({ currentBowlingCompetitionId, children, group, btnRef }, ref) => {
    const { t } = useTranslation();
    const [teamErrors, setTeamErrors] = useState("");
console.log("group > ", group);
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!teamErrors == false &&
          fn(
            groups.map((d) => {
              let xx = {
                BowlingCompetitionGroupId: d.BowlingCompetitionGroupId.toString().indexOf("temp") > -1? null: +d.BowlingCompetitionGroupId,
                BowlingCompetitionId: d.BowlingCompetitionId == ""? null: +d.BowlingCompetitionId,
                Title: d.Title,
                IsDeleted: d.IsDeleted,
                BowlingCompetitionGroupTeams: d.BowlingCompetitionGroupTeams.map((s) => {
                  return {
                    BowlingCompetitionGroupTeamId: s.BowlingCompetitionGroupTeamId.toString().indexOf("temp") > -1? null: +s.BowlingCompetitionGroupTeamId,
                    BowlingCompetitionGroupId: s.BowlingCompetitionGroupId.toString().indexOf("temp") > -1? null: +s.BowlingCompetitionGroupId,
                    BowlingTeamId: +s.BowlingTeamId,
                  };
                }),
              };

              return xx;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bowlingCompetitionId, setBowlingCompetitionId] = useState(currentBowlingCompetitionId);

    const initGroup = {
      BowlingCompetitionGroupId: "",
      BowlingCompetitionId: bowlingCompetitionId,
      Title: "",
      IsDeleted: false,
      TeamCount: 0,
      BowlingCompetitionGroupTeams: [],
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.bowlingCompetitions.actionsLoading,
        realPersonForEdit: state.bowlingCompetitions.bowlingCompetitionForEdit,
        error: state.bowlingCompetitions.error,
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

    const [groups, setGroups] = useState(group);
    const [activeGroups, setActiveGroups] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setGroups(
        !!realPersonForEdit &&
          !!realPersonForEdit.BowlingCompetitionGroups &&
          realPersonForEdit.BowlingCompetitionGroups.length > 0 && realPersonForEdit.BowlingCompetitionId == currentBowlingCompetitionId
          ? realPersonForEdit.BowlingCompetitionGroups
          : []
      );
      setTotalCount(
        !!realPersonForEdit &&
          !!realPersonForEdit.BowlingCompetitionGroups &&
          realPersonForEdit.BowlingCompetitionGroups.length > 0
          ? realPersonForEdit.BowlingCompetitionGroups.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initGroup.BowlingCompetitionId = currentBowlingCompetitionId;

      setBowlingCompetitionId(currentBowlingCompetitionId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBowlingCompetitionId]);

    useEffect(() => {
      setActiveGroups(groups.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groups]);

    // Teams Dialog
    const [showTeamGroupDialog, setShowTeamGroupDialog] = useState(false);
    const openTeamGroupDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findGroup(id));
      setShowTeamGroupDialog(true);
    };
    const closeTeamGroupDialog = () => {
      setSelectedId(undefined);
      setShowTeamGroupDialog(false);
    };

    // Edit Dialog, New Dialog
    const [showEditGroupDialog, setShowEditGroupDialog] = useState(false);
    const openNewGroupDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(null);
      setShowEditGroupDialog(true);
    };
    const openEditGroupDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findGroup(id));
      setShowEditGroupDialog(true);
    };
    const closeEditGroupDialog = () => {
      setSelectedId(undefined);
      setShowEditGroupDialog(false);
    };

    const [showDeleteGroupDialog, setShowDeleteGroupDialog] = useState(false);
    const openDeleteGroupDialog = (id) => {
      setSelectedId(id);
      setShowDeleteGroupDialog(true);
    };
    const closeDeleteGroupDialog = () => {
      setSelectedId(undefined);
      setShowDeleteGroupDialog(false);
    };

    const [showDeleteGroupsDialog, setShowDeleteGroupsDialog] = useState(
      false
    );
    const openDeleteGroupsDialog = () => {
      setShowDeleteGroupsDialog(true);
    };
    const closeDeleteGroupsDialog = () => {
      setShowDeleteGroupsDialog(false);
    };

    const [showFetchGroupsDialog, setShowFetchGroupsDialog] = useState(false);
    const openFetchGroupsDialog = () => {
      setShowFetchGroupsDialog(true);
    };
    const closeFetchGroupsDialog = () => {
      setShowFetchGroupsDialog(false);
    };

    const findGroup = (groupId) => {
      if (!!groupId == false) return;

      const groupObj = CloneObject(groups.filter(
        (group) => group.BowlingCompetitionGroupId == groupId
      )[0]);

      return {
        BowlingCompetitionGroupId: groupObj.BowlingCompetitionGroupId,
        BowlingCompetitionId: groupObj.BowlingCompetitionId,
        Title: groupObj.Title,
        IsDeleted: false,
        TeamCount: groupObj.BowlingCompetitionGroupTeams.length,
        BowlingCompetitionGroupTeams: groupObj.BowlingCompetitionGroupTeams || [],
      };
    };

    const addGroup = (group) => {
      group.BowlingCompetitionGroupId = "temp_" + Math.floor(Math.random() * 100);

      setGroups((groups) => [...groups, group]);
    };

    const removeGroup = (groupId) => {
      if (groupId.toString().indexOf("temp_") > -1)
        setGroups(groups.filter((x) => x.BowlingCompetitionGroupId != groupId));
      else {
        let group = findGroup(groupId);
        group["IsDeleted"] = true;
        updateGroup(group);
      }
    };

    const updateGroup = (group) => {
      setGroups((groups) =>
        groups.map((item) =>
          item.BowlingCompetitionGroupId == group.BowlingCompetitionGroupId ? group : item
        )
      );

      setTimeout(() => {
        setSelectedItem(group);
      }, 200);
    };

    const addTeam = (team) => {
      team.BowlingCompetitionGroupTeamId = "temps_" + Math.floor(Math.random() * 1000);
      let groupObj = CloneObject(findGroup(team.BowlingCompetitionGroupId));
      console.log("team > ", team);
      console.log("groupObj.BowlingCompetitionGroupTeams.length > ", groupObj.BowlingCompetitionGroupTeams.length);
      groupObj = {...groupObj, 
        BowlingCompetitionGroupTeams: [...groupObj.BowlingCompetitionGroupTeams, team],
        TeamCount: groupObj.BowlingCompetitionGroupTeams + 1
      };

      updateGroup(groupObj);

      setTimeout(() => {
        setSelectedItem(groupObj);
      }, 200);
    };

    const removeTeam = (team) => {
      let groupObj = findGroup(team.BowlingCompetitionGroupId);
      groupObj.BowlingCompetitionGroupTeams = groupObj.BowlingCompetitionGroupTeams.filter(
        (x) => x.BowlingCompetitionGroupTeamId != team.BowlingCompetitionGroupTeamId
      );
      groupObj.TeamCount = groupObj.BowlingCompetitionGroupTeams.length;

      updateGroup(groupObj);

      setTimeout(() => {
        setSelectedItem(groupObj);
      }, 200);
    };

    const checkTeam = (team) => {
      group = findGroup(selectedItem.BowlingCompetitionGroupId);
      return (
        group.BowlingCompetitionGroupTeams.filter((x) => x.TeamNumber == team).length > 0
      );
    };

    const value = {
      groups,
      activeGroups,
      totalCount,
      setTotalCount,
      findGroup,
      addGroup,
      removeGroup,
      updateGroup,
      // Team Actions
      addTeam,
      removeTeam,
      checkTeam,
      actionsLoading,
      bowlingCompetitionId,
      setBowlingCompetitionId,
      initGroup,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Teams
      showTeamGroupDialog,
      openTeamGroupDialog,
      closeTeamGroupDialog,
      // Edit
      showEditGroupDialog,
      openEditGroupDialog,
      openNewGroupDialog,
      closeEditGroupDialog,
      // Delete
      showDeleteGroupDialog,
      openDeleteGroupDialog,
      closeDeleteGroupDialog,
      // Deletes
      showDeleteGroupsDialog,
      openDeleteGroupsDialog,
      closeDeleteGroupsDialog,
      // Fetch
      showFetchGroupsDialog,
      openFetchGroupsDialog,
      closeFetchGroupsDialog,
    };

    return (
      <>
        {!!teamErrors && (
          <Alerty
            variant="danger"
            title={t("err.Error")}
            description={teamErrors}
            className=""
          ></Alerty>
        )}
        <GroupsUIContext.Provider value={value}>
          {children}
        </GroupsUIContext.Provider>
      </>
    );
  }
);
