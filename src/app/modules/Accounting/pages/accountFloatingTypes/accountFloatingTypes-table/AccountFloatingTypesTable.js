import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountFloatingTypes/accountFloatingTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAccountFloatingTypesUIContext } from "../AccountFloatingTypesUIContext";
import { AccountFloatingTypeModel } from "../../../../../../core/_models/Accounting/AccountFloatingTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AccountFloatingTypesTable() {
  const { t } = useTranslation();

  const accountFloatingTypesUIContext = useAccountFloatingTypesUIContext();

  const accountFloatingTypesUIProps = useMemo(() => {
    return {
      ids: accountFloatingTypesUIContext.ids,
      setIds: accountFloatingTypesUIContext.setIds,
      queryParams: accountFloatingTypesUIContext.queryParams,
      setQueryParams: accountFloatingTypesUIContext.setQueryParams,
      openEditAccountFloatingTypePage:
        accountFloatingTypesUIContext.openEditAccountFloatingTypePage,
      openDeleteAccountFloatingTypeDialog:
        accountFloatingTypesUIContext.openDeleteAccountFloatingTypeDialog,
    };
  }, [accountFloatingTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.accountFloatingTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AccountFloatingTypeModel);
  const fieldKey = getFields(AccountFloatingTypeModel);
  const fields = AccountFloatingTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    accountFloatingTypesUIProps.setIds([]);
    dispatch(
      actions.fetchAccountFloatingTypes(accountFloatingTypesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFloatingTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("AccountFloatingType." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Parent.Title",
      text: t("AccountFloatingType.Parent"),
      sort: fields.ParentId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAccountFloatingTypePage:
          accountFloatingTypesUIProps.openEditAccountFloatingTypePage,
        openDeleteAccountFloatingTypeDialog:
          accountFloatingTypesUIProps.openDeleteAccountFloatingTypeDialog,
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
    sizePerPage: accountFloatingTypesUIProps.queryParams.PageSize,
    page: accountFloatingTypesUIProps.queryParams.PageNumber,
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
                  accountFloatingTypesUIProps.setQueryParams
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
