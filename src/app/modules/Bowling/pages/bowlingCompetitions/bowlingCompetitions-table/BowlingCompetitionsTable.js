import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bowlingCompetitions/bowlingCompetitionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBowlingCompetitionsUIContext } from "../BowlingCompetitionsUIContext";
import { BowlingCompetitionModel } from "../../../../../../core/_models/Bowling/BowlingCompetitionModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BowlingCompetitionsTable() {
  const { t } = useTranslation();

  const bowlingCompetitionsUIContext = useBowlingCompetitionsUIContext();

  const bowlingCompetitionsUIProps = useMemo(() => {
    return {
      ids: bowlingCompetitionsUIContext.ids,
      setIds: bowlingCompetitionsUIContext.setIds,
      queryParams: bowlingCompetitionsUIContext.queryParams,
      setQueryParams: bowlingCompetitionsUIContext.setQueryParams,
      openEditBowlingCompetitionPage: bowlingCompetitionsUIContext.openEditBowlingCompetitionPage,
      openDeleteBowlingCompetitionDialog: bowlingCompetitionsUIContext.openDeleteBowlingCompetitionDialog,
    };
  }, [bowlingCompetitionsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bowlingCompetitions }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BowlingCompetitionModel, "BowlingCompetitionDate", "desc");
  const fieldKey = getFields(BowlingCompetitionModel);
  const fields = BowlingCompetitionModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bowlingCompetitionsUIProps.setIds([]);
    dispatch(actions.fetchBowlingCompetitions(bowlingCompetitionsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bowlingCompetitionsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("BowlingCompetition." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },    
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBowlingCompetitionPage: bowlingCompetitionsUIProps.openEditBowlingCompetitionPage,
        openDeleteBowlingCompetitionDialog: bowlingCompetitionsUIProps.openDeleteBowlingCompetitionDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: bowlingCompetitionsUIProps.queryParams.PageSize,
    page: bowlingCompetitionsUIProps.queryParams.PageNumber,
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
                  bowlingCompetitionsUIProps.setQueryParams
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