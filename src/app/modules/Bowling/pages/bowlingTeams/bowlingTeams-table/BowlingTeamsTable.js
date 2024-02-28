import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bowlingTeams/bowlingTeamsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBowlingTeamsUIContext } from "../BowlingTeamsUIContext";
import { BowlingTeamModel } from "../../../../../../core/_models/Bowling/BowlingTeamModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import {
  MoneyColumnFormatter,
  DateFaColumnFormatter,
  TimeColumnFormatter,
} from "../../../../../../core/_formatters";

export function BowlingTeamsTable() {
  const { t } = useTranslation();

  const bowlingTeamsUIContext = useBowlingTeamsUIContext();

  const bowlingTeamsUIProps = useMemo(() => {
    return {
      ids: bowlingTeamsUIContext.ids,
      setIds: bowlingTeamsUIContext.setIds,
      queryParams: bowlingTeamsUIContext.queryParams,
      setQueryParams: bowlingTeamsUIContext.setQueryParams,
      openEditBowlingTeamPage: bowlingTeamsUIContext.openEditBowlingTeamPage,
      openDeleteBowlingTeamDialog:
        bowlingTeamsUIContext.openDeleteBowlingTeamDialog,
      openDoneBowlingTeamDialog:
        bowlingTeamsUIContext.openDoneBowlingTeamDialog,
      openAddTimeBowlingTeamDialog:
        bowlingTeamsUIContext.openAddTimeBowlingTeamDialog,
      openRelocationDialog: bowlingTeamsUIContext.openRelocationDialog,
    };
  }, [bowlingTeamsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bowlingTeams }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BowlingTeamModel);
  const fieldKey = getFields(BowlingTeamModel);
  const fields = BowlingTeamModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bowlingTeamsUIProps.setIds([]);
    dispatch(actions.fetchBowlingTeams(bowlingTeamsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bowlingTeamsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "Title",
      text: t("BowlingTeam.Title"),
      sort: fields.BowlingTeamId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBowlingTeamPage: bowlingTeamsUIProps.openEditBowlingTeamPage,
        openDeleteBowlingTeamDialog:
          bowlingTeamsUIProps.openDeleteBowlingTeamDialog,
        openDoneBowlingTeamDialog:
          bowlingTeamsUIProps.openDoneBowlingTeamDialog,
        openAddTimeBowlingTeamDialog:
          bowlingTeamsUIProps.openAddTimeBowlingTeamDialog,
        openRelocationDialog: bowlingTeamsUIProps.openRelocationDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "190px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: bowlingTeamsUIProps.queryParams.PageSize,
    page: bowlingTeamsUIProps.queryParams.PageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                bordered={false}
                remote
                keyField={configs.id}
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={configs.defaultSorted}
                onTableChange={getHandlerTableChange(
                  bowlingTeamsUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
