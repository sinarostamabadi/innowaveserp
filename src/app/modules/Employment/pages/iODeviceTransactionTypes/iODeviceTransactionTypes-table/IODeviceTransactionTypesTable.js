import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/iODeviceTransactionTypes/iODeviceTransactionTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useIODeviceTransactionTypesUIContext } from "../IODeviceTransactionTypesUIContext";
import { IODeviceTransactionTypeModel } from "../../../../../../core/_models/Employment/IODeviceTransactionTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function IODeviceTransactionTypesTable() {
  const { t } = useTranslation();

  const iODeviceTransactionTypesUIContext =
    useIODeviceTransactionTypesUIContext();

  const iODeviceTransactionTypesUIProps = useMemo(() => {
    return {
      ids: iODeviceTransactionTypesUIContext.ids,
      setIds: iODeviceTransactionTypesUIContext.setIds,
      queryParams: iODeviceTransactionTypesUIContext.queryParams,
      setQueryParams: iODeviceTransactionTypesUIContext.setQueryParams,
      openEditIODeviceTransactionTypePage:
        iODeviceTransactionTypesUIContext.openEditIODeviceTransactionTypePage,
      openDeleteIODeviceTransactionTypeDialog:
        iODeviceTransactionTypesUIContext.openDeleteIODeviceTransactionTypeDialog,
    };
  }, [iODeviceTransactionTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.iODeviceTransactionTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(IODeviceTransactionTypeModel);
  const fieldKey = getFields(IODeviceTransactionTypeModel);
  const fields = IODeviceTransactionTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    iODeviceTransactionTypesUIProps.setIds([]);
    dispatch(
      actions.fetchIODeviceTransactionTypes(
        iODeviceTransactionTypesUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iODeviceTransactionTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("IODeviceTransactionType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("IODeviceTransactionType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditIODeviceTransactionTypePage:
          iODeviceTransactionTypesUIProps.openEditIODeviceTransactionTypePage,
        openDeleteIODeviceTransactionTypeDialog:
          iODeviceTransactionTypesUIProps.openDeleteIODeviceTransactionTypeDialog,
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
    sizePerPage: iODeviceTransactionTypesUIProps.queryParams.PageSize,
    page: iODeviceTransactionTypesUIProps.queryParams.PageNumber,
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
                  iODeviceTransactionTypesUIProps.setQueryParams
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
