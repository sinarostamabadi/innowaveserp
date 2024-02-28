import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/operationTypeAccounts/operationTypeAccountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useOperationTypeAccountsUIContext } from "../OperationTypeAccountsUIContext";
import { OperationTypeAccountModel } from "../../../../../../core/_models/Cash/OperationTypeAccountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function OperationTypeAccountsTable() {
  const { t } = useTranslation();

  const operationTypeAccountsUIContext = useOperationTypeAccountsUIContext();

  const operationTypeAccountsUIProps = useMemo(() => {
    return {
      ids: operationTypeAccountsUIContext.ids,
      setIds: operationTypeAccountsUIContext.setIds,
      queryParams: operationTypeAccountsUIContext.queryParams,
      setQueryParams: operationTypeAccountsUIContext.setQueryParams,
      openEditOperationTypeAccountPage:
        operationTypeAccountsUIContext.openEditOperationTypeAccountPage,
      openDeleteOperationTypeAccountDialog:
        operationTypeAccountsUIContext.openDeleteOperationTypeAccountDialog,
    };
  }, [operationTypeAccountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.operationTypeAccounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(OperationTypeAccountModel);
  const fieldKey = getFields(OperationTypeAccountModel);
  const fields = OperationTypeAccountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    operationTypeAccountsUIProps.setIds([]);
    dispatch(
      actions.fetchOperationTypeAccounts(
        operationTypeAccountsUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationTypeAccountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("OperationTypeAccount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("OperationTypeAccount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOperationTypeAccountPage:
          operationTypeAccountsUIProps.openEditOperationTypeAccountPage,
        openDeleteOperationTypeAccountDialog:
          operationTypeAccountsUIProps.openDeleteOperationTypeAccountDialog,
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
    sizePerPage: operationTypeAccountsUIProps.queryParams.PageSize,
    page: operationTypeAccountsUIProps.queryParams.PageNumber,
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
                  operationTypeAccountsUIProps.setQueryParams
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
