import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/loginStatuses/loginStatusesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useLoginStatusesUIContext } from "../LoginStatusesUIContext";
import { LoginStatusModel } from "../../../../../../core/_models/Security/LoginStatusModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function LoginStatusesTable() {
  const { t } = useTranslation();

  const loginStatusesUIContext = useLoginStatusesUIContext();

  const loginStatusesUIProps = useMemo(() => {
    return {
      ids: loginStatusesUIContext.ids,
      setIds: loginStatusesUIContext.setIds,
      queryParams: loginStatusesUIContext.queryParams,
      setQueryParams: loginStatusesUIContext.setQueryParams,
      openEditLoginStatusPage: loginStatusesUIContext.openEditLoginStatusPage,
      openDeleteLoginStatusDialog: loginStatusesUIContext.openDeleteLoginStatusDialog,
    };
  }, [loginStatusesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.loginStatuses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(LoginStatusModel);
  const fieldKey = getFields(LoginStatusModel);
  const fields = LoginStatusModel;

  const dispatch = useDispatch();
  useEffect(() => {
    loginStatusesUIProps.setIds([]);
    dispatch(actions.fetchLoginStatuses(loginStatusesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatusesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("LoginStatus." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("LoginStatus." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditLoginStatusPage: loginStatusesUIProps.openEditLoginStatusPage,
        openDeleteLoginStatusDialog: loginStatusesUIProps.openDeleteLoginStatusDialog,
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
    sizePerPage: loginStatusesUIProps.queryParams.PageSize,
    page: loginStatusesUIProps.queryParams.PageNumber,
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
                  loginStatusesUIProps.setQueryParams
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