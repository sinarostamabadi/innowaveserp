import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountFloatingGroupRelations/accountFloatingGroupRelationsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAccountFloatingGroupRelationsUIContext } from "../AccountFloatingGroupRelationsUIContext";
import { AccountFloatingGroupRelationModel } from "../../../../../../core/_models/Accounting/AccountFloatingGroupRelationModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AccountFloatingGroupRelationsTable() {
  const { t } = useTranslation();

  const accountFloatingGroupRelationsUIContext =
    useAccountFloatingGroupRelationsUIContext();

  const accountFloatingGroupRelationsUIProps = useMemo(() => {
    return {
      ids: accountFloatingGroupRelationsUIContext.ids,
      setIds: accountFloatingGroupRelationsUIContext.setIds,
      queryParams: accountFloatingGroupRelationsUIContext.queryParams,
      setQueryParams: accountFloatingGroupRelationsUIContext.setQueryParams,
      openEditAccountFloatingGroupRelationPage:
        accountFloatingGroupRelationsUIContext.openEditAccountFloatingGroupRelationPage,
      openDeleteAccountFloatingGroupRelationDialog:
        accountFloatingGroupRelationsUIContext.openDeleteAccountFloatingGroupRelationDialog,
    };
  }, [accountFloatingGroupRelationsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.accountFloatingGroupRelations }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AccountFloatingGroupRelationModel);
  const fieldKey = getFields(AccountFloatingGroupRelationModel);
  const fields = AccountFloatingGroupRelationModel;

  const dispatch = useDispatch();
  useEffect(() => {
    accountFloatingGroupRelationsUIProps.setIds([]);
    dispatch(
      actions.fetchAccountFloatingGroupRelations(
        accountFloatingGroupRelationsUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFloatingGroupRelationsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.AccountFloating.Title,
      text: t("AccountFloatingGroupRelation." + fields.AccountFloating.display),
      sort: fields.AccountFloatingId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.AccountFloatingGroup.Title,
      text: t(
        "AccountFloatingGroupRelation." + fields.AccountFloatingGroup.display
      ),
      sort: fields.AccountFloatingGroupId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAccountFloatingGroupRelationPage:
          accountFloatingGroupRelationsUIProps.openEditAccountFloatingGroupRelationPage,
        openDeleteAccountFloatingGroupRelationDialog:
          accountFloatingGroupRelationsUIProps.openDeleteAccountFloatingGroupRelationDialog,
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
    sizePerPage: accountFloatingGroupRelationsUIProps.queryParams.PageSize,
    page: accountFloatingGroupRelationsUIProps.queryParams.PageNumber,
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
                  accountFloatingGroupRelationsUIProps.setQueryParams
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
