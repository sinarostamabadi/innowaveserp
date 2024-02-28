import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/requests/requestsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRequestsUIContext } from "../RequestsUIContext";
import { RequestModel } from "../../../../../../core/_models/Cash/RequestModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RequestsTable() {
  const { t } = useTranslation();

  const requestsUIContext = useRequestsUIContext();

  const requestsUIProps = useMemo(() => {
    return {
      ids: requestsUIContext.ids,
      setIds: requestsUIContext.setIds,
      queryParams: requestsUIContext.queryParams,
      setQueryParams: requestsUIContext.setQueryParams,
      openEditRequestPage: requestsUIContext.openEditRequestPage,
      openDeleteRequestDialog: requestsUIContext.openDeleteRequestDialog,
    };
  }, [requestsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.requests }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RequestModel);
  const fieldKey = getFields(RequestModel);
  const fields = RequestModel;

  const dispatch = useDispatch();
  useEffect(() => {
    requestsUIProps.setIds([]);
    dispatch(actions.fetchRequests(requestsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Request." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Request." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRequestPage: requestsUIProps.openEditRequestPage,
        openDeleteRequestDialog: requestsUIProps.openDeleteRequestDialog,
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
    sizePerPage: requestsUIProps.queryParams.PageSize,
    page: requestsUIProps.queryParams.PageNumber,
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
                  requestsUIProps.setQueryParams
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
