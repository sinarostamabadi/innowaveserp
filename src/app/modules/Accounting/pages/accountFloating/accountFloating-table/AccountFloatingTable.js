import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountFloating/accountFloatingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAccountFloatingUIContext } from "../AccountFloatingUIContext";
import { AccountFloatingModel } from "../../../../../../core/_models/Accounting/AccountFloatingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AccountFloatingTable() {
  const { t } = useTranslation();

  const accountFloatingUIContext = useAccountFloatingUIContext();

  const accountFloatingUIProps = useMemo(() => {
    return {
      ids: accountFloatingUIContext.ids,
      setIds: accountFloatingUIContext.setIds,
      queryParams: accountFloatingUIContext.queryParams,
      setQueryParams: accountFloatingUIContext.setQueryParams,
      openEditAccountFloatingPage: accountFloatingUIContext.openEditAccountFloatingPage,
      openDeleteAccountFloatingDialog: accountFloatingUIContext.openDeleteAccountFloatingDialog,
    };
  }, [accountFloatingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.accountFloatings }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AccountFloatingModel);
  const fieldKey = getFields(AccountFloatingModel);
  const fields = AccountFloatingModel;

  const dispatch = useDispatch();
  useEffect(() => {
    accountFloatingUIProps.setIds([]);
    dispatch(actions.fetchAccountFloatings(accountFloatingUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFloatingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Code,
      text: t("AccountFloating.Code"),
      sort: fields.Code.sortable,
      sortCaret: sortCaret
    },
    {
      dataField: fieldKey.Title,
      text: t("AccountFloating." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Des,
      text: t("AccountFloating.Des"),
      sort: fields.Des.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAccountFloatingPage: accountFloatingUIProps.openEditAccountFloatingPage,
        openDeleteAccountFloatingDialog: accountFloatingUIProps.openDeleteAccountFloatingDialog,
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
    sizePerPage: accountFloatingUIProps.queryParams.PageSize,
    page: accountFloatingUIProps.queryParams.PageNumber,
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
                  accountFloatingUIProps.setQueryParams
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