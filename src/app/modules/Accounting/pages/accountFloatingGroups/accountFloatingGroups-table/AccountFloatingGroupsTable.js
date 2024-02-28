import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountFloatingGroups/accountFloatingGroupsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAccountFloatingGroupsUIContext } from "../AccountFloatingGroupsUIContext";
import { AccountFloatingGroupModel } from "../../../../../../core/_models/Accounting/AccountFloatingGroupModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AccountFloatingGroupsTable() {
  const { t } = useTranslation();

  const accountFloatingGroupsUIContext = useAccountFloatingGroupsUIContext();

  const accountFloatingGroupsUIProps = useMemo(() => {
    return {
      ids: accountFloatingGroupsUIContext.ids,
      setIds: accountFloatingGroupsUIContext.setIds,
      queryParams: accountFloatingGroupsUIContext.queryParams,
      setQueryParams: accountFloatingGroupsUIContext.setQueryParams,
      openEditAccountFloatingGroupPage:
        accountFloatingGroupsUIContext.openEditAccountFloatingGroupPage,
      openDeleteAccountFloatingGroupDialog:
        accountFloatingGroupsUIContext.openDeleteAccountFloatingGroupDialog,
    };
  }, [accountFloatingGroupsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.accountFloatingGroups }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AccountFloatingGroupModel);
  const fieldKey = getFields(AccountFloatingGroupModel);
  const fields = AccountFloatingGroupModel;

  const dispatch = useDispatch();
  useEffect(() => {
    accountFloatingGroupsUIProps.setIds([]);
    dispatch(
      actions.fetchAccountFloatingGroups(
        accountFloatingGroupsUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFloatingGroupsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Code,
      text: t("AccountFloatingGroup.Code"),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Title,
      text: t("AccountFloatingGroup." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.AccountFloatingGroupTypeId,
      text: t(
        "AccountFloatingGroup." + fields.AccountFloatingGroupTypeId.display
      ),
      sort: fields.AccountFloatingGroupTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAccountFloatingGroupPage:
          accountFloatingGroupsUIProps.openEditAccountFloatingGroupPage,
        openDeleteAccountFloatingGroupDialog:
          accountFloatingGroupsUIProps.openDeleteAccountFloatingGroupDialog,
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
    sizePerPage: accountFloatingGroupsUIProps.queryParams.PageSize,
    page: accountFloatingGroupsUIProps.queryParams.PageNumber,
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
                  accountFloatingGroupsUIProps.setQueryParams
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
