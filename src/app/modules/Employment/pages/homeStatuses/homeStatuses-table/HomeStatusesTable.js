import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/homeStatuses/homeStatusesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useHomeStatusesUIContext } from "../HomeStatusesUIContext";
import { HomeStatusModel } from "../../../../../../core/_models/Employment/HomeStatusModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function HomeStatusesTable() {
  const { t } = useTranslation();

  const homeStatusesUIContext = useHomeStatusesUIContext();

  const homeStatusesUIProps = useMemo(() => {
    return {
      ids: homeStatusesUIContext.ids,
      setIds: homeStatusesUIContext.setIds,
      queryParams: homeStatusesUIContext.queryParams,
      setQueryParams: homeStatusesUIContext.setQueryParams,
      openEditHomeStatusPage: homeStatusesUIContext.openEditHomeStatusPage,
      openDeleteHomeStatusDialog: homeStatusesUIContext.openDeleteHomeStatusDialog,
    };
  }, [homeStatusesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.homeStatuses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(HomeStatusModel);
  const fieldKey = getFields(HomeStatusModel);
  const fields = HomeStatusModel;

  const dispatch = useDispatch();
  useEffect(() => {
    homeStatusesUIProps.setIds([]);
    dispatch(actions.fetchHomeStatuses(homeStatusesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeStatusesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("HomeStatus." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("HomeStatus." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditHomeStatusPage: homeStatusesUIProps.openEditHomeStatusPage,
        openDeleteHomeStatusDialog: homeStatusesUIProps.openDeleteHomeStatusDialog,
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
    sizePerPage: homeStatusesUIProps.queryParams.PageSize,
    page: homeStatusesUIProps.queryParams.PageNumber,
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
                  homeStatusesUIProps.setQueryParams
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