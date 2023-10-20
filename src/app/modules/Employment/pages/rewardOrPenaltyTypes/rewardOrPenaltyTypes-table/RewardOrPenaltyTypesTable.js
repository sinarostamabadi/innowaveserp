import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rewardOrPenaltyTypes/rewardOrPenaltyTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRewardOrPenaltyTypesUIContext } from "../RewardOrPenaltyTypesUIContext";
import { RewardOrPenaltyTypeModel } from "../../../../../../core/_models/Employment/RewardOrPenaltyTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RewardOrPenaltyTypesTable() {
  const { t } = useTranslation();

  const rewardOrPenaltyTypesUIContext = useRewardOrPenaltyTypesUIContext();

  const rewardOrPenaltyTypesUIProps = useMemo(() => {
    return {
      ids: rewardOrPenaltyTypesUIContext.ids,
      setIds: rewardOrPenaltyTypesUIContext.setIds,
      queryParams: rewardOrPenaltyTypesUIContext.queryParams,
      setQueryParams: rewardOrPenaltyTypesUIContext.setQueryParams,
      openEditRewardOrPenaltyTypePage: rewardOrPenaltyTypesUIContext.openEditRewardOrPenaltyTypePage,
      openDeleteRewardOrPenaltyTypeDialog: rewardOrPenaltyTypesUIContext.openDeleteRewardOrPenaltyTypeDialog,
    };
  }, [rewardOrPenaltyTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.rewardOrPenaltyTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RewardOrPenaltyTypeModel);
  const fieldKey = getFields(RewardOrPenaltyTypeModel);
  const fields = RewardOrPenaltyTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    rewardOrPenaltyTypesUIProps.setIds([]);
    dispatch(actions.fetchRewardOrPenaltyTypes(rewardOrPenaltyTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardOrPenaltyTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RewardOrPenaltyType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RewardOrPenaltyType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRewardOrPenaltyTypePage: rewardOrPenaltyTypesUIProps.openEditRewardOrPenaltyTypePage,
        openDeleteRewardOrPenaltyTypeDialog: rewardOrPenaltyTypesUIProps.openDeleteRewardOrPenaltyTypeDialog,
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
    sizePerPage: rewardOrPenaltyTypesUIProps.queryParams.PageSize,
    page: rewardOrPenaltyTypesUIProps.queryParams.PageNumber,
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
                  rewardOrPenaltyTypesUIProps.setQueryParams
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