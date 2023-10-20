import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountFloatingGroupTypes/accountFloatingGroupTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAccountFloatingGroupTypesUIContext } from "../AccountFloatingGroupTypesUIContext";
import { AccountFloatingGroupTypeModel } from "../../../../../../core/_models/Accounting/AccountFloatingGroupTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AccountFloatingGroupTypesTable() {
  const { t } = useTranslation();

  const accountFloatingGroupTypesUIContext = useAccountFloatingGroupTypesUIContext();

  const accountFloatingGroupTypesUIProps = useMemo(() => {
    return {
      ids: accountFloatingGroupTypesUIContext.ids,
      setIds: accountFloatingGroupTypesUIContext.setIds,
      queryParams: accountFloatingGroupTypesUIContext.queryParams,
      setQueryParams: accountFloatingGroupTypesUIContext.setQueryParams,
      openEditAccountFloatingGroupTypePage: accountFloatingGroupTypesUIContext.openEditAccountFloatingGroupTypePage,
      openDeleteAccountFloatingGroupTypeDialog: accountFloatingGroupTypesUIContext.openDeleteAccountFloatingGroupTypeDialog,
    };
  }, [accountFloatingGroupTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.accountFloatingGroupTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AccountFloatingGroupTypeModel);
  const fieldKey = getFields(AccountFloatingGroupTypeModel);
  const fields = AccountFloatingGroupTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    accountFloatingGroupTypesUIProps.setIds([]);
    dispatch(actions.fetchAccountFloatingGroupTypes(accountFloatingGroupTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFloatingGroupTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("AccountFloatingGroupType." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAccountFloatingGroupTypePage: accountFloatingGroupTypesUIProps.openEditAccountFloatingGroupTypePage,
        openDeleteAccountFloatingGroupTypeDialog: accountFloatingGroupTypesUIProps.openDeleteAccountFloatingGroupTypeDialog,
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
    sizePerPage: accountFloatingGroupTypesUIProps.queryParams.PageSize,
    page: accountFloatingGroupTypesUIProps.queryParams.PageNumber,
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
                  accountFloatingGroupTypesUIProps.setQueryParams
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