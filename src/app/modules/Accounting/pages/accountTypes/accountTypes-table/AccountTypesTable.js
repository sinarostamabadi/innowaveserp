import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountTypes/accountTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAccountTypesUIContext } from "../AccountTypesUIContext";
import { AccountTypeModel } from "../../../../../../core/_models/Accounting/AccountTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AccountTypesTable() {
  const { t } = useTranslation();

  const accountTypesUIContext = useAccountTypesUIContext();

  const accountTypesUIProps = useMemo(() => {
    return {
      ids: accountTypesUIContext.ids,
      setIds: accountTypesUIContext.setIds,
      queryParams: accountTypesUIContext.queryParams,
      setQueryParams: accountTypesUIContext.setQueryParams,
      openEditAccountTypePage: accountTypesUIContext.openEditAccountTypePage,
      openDeleteAccountTypeDialog: accountTypesUIContext.openDeleteAccountTypeDialog,
    };
  }, [accountTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.accountTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AccountTypeModel);
  const fieldKey = getFields(AccountTypeModel);
  const fields = AccountTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    accountTypesUIProps.setIds([]);
    dispatch(actions.fetchAccountTypes(accountTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("AccountType." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Level,
      text: t("AccountType." + fields.Level.display),
      sort: fields.Level.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Parent.Title",
      text: t("AccountType.Parent"),
      sort: fields.ParentId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAccountTypePage: accountTypesUIProps.openEditAccountTypePage,
        openDeleteAccountTypeDialog: accountTypesUIProps.openDeleteAccountTypeDialog,
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
    sizePerPage: accountTypesUIProps.queryParams.PageSize,
    page: accountTypesUIProps.queryParams.PageNumber,
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
                  accountTypesUIProps.setQueryParams
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