import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/loginHistories/loginHistoriesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useLoginHistoriesUIContext } from "../LoginHistoriesUIContext";
import { LoginHistoryModel } from "../../../../../../core/_models/Security/LoginHistoryModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function LoginHistoriesTable() {
  const { t } = useTranslation();

  const loginHistoriesUIContext = useLoginHistoriesUIContext();

  const loginHistoriesUIProps = useMemo(() => {
    return {
      ids: loginHistoriesUIContext.ids,
      setIds: loginHistoriesUIContext.setIds,
      queryParams: loginHistoriesUIContext.queryParams,
      setQueryParams: loginHistoriesUIContext.setQueryParams,
      openEditLoginHistoryPage: loginHistoriesUIContext.openEditLoginHistoryPage,
      openDeleteLoginHistoryDialog: loginHistoriesUIContext.openDeleteLoginHistoryDialog,
    };
  }, [loginHistoriesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.loginHistories }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(LoginHistoryModel);
  const fieldKey = getFields(LoginHistoryModel);
  const fields = LoginHistoryModel;

  const dispatch = useDispatch();
  useEffect(() => {
    loginHistoriesUIProps.setIds([]);
    dispatch(actions.fetchLoginHistories(loginHistoriesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginHistoriesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("LoginHistory." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("LoginHistory." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditLoginHistoryPage: loginHistoriesUIProps.openEditLoginHistoryPage,
        openDeleteLoginHistoryDialog: loginHistoriesUIProps.openDeleteLoginHistoryDialog,
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
    sizePerPage: loginHistoriesUIProps.queryParams.PageSize,
    page: loginHistoriesUIProps.queryParams.PageNumber,
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
                  loginHistoriesUIProps.setQueryParams
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