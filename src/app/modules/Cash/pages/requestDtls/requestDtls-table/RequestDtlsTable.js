import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/requestDtls/requestDtlsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRequestDtlsUIContext } from "../RequestDtlsUIContext";
import { RequestDtlModel } from "../../../../../../core/_models/Cash/RequestDtlModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RequestDtlsTable() {
  const { t } = useTranslation();

  const requestDtlsUIContext = useRequestDtlsUIContext();

  const requestDtlsUIProps = useMemo(() => {
    return {
      ids: requestDtlsUIContext.ids,
      setIds: requestDtlsUIContext.setIds,
      queryParams: requestDtlsUIContext.queryParams,
      setQueryParams: requestDtlsUIContext.setQueryParams,
      openEditRequestDtlPage: requestDtlsUIContext.openEditRequestDtlPage,
      openDeleteRequestDtlDialog:
        requestDtlsUIContext.openDeleteRequestDtlDialog,
    };
  }, [requestDtlsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.requestDtls }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RequestDtlModel);
  const fieldKey = getFields(RequestDtlModel);
  const fields = RequestDtlModel;

  const dispatch = useDispatch();
  useEffect(() => {
    requestDtlsUIProps.setIds([]);
    dispatch(actions.fetchRequestDtls(requestDtlsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestDtlsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RequestDtl." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RequestDtl." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRequestDtlPage: requestDtlsUIProps.openEditRequestDtlPage,
        openDeleteRequestDtlDialog:
          requestDtlsUIProps.openDeleteRequestDtlDialog,
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
    sizePerPage: requestDtlsUIProps.queryParams.PageSize,
    page: requestDtlsUIProps.queryParams.PageNumber,
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
                  requestDtlsUIProps.setQueryParams
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
