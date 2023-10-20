import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/iOTransactionTypes/iOTransactionTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useIOTransactionTypesUIContext } from "../IOTransactionTypesUIContext";
import { IOTransactionTypeModel } from "../../../../../../core/_models/Employment/IOTransactionTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function IOTransactionTypesTable() {
  const { t } = useTranslation();

  const iOTransactionTypesUIContext = useIOTransactionTypesUIContext();

  const iOTransactionTypesUIProps = useMemo(() => {
    return {
      ids: iOTransactionTypesUIContext.ids,
      setIds: iOTransactionTypesUIContext.setIds,
      queryParams: iOTransactionTypesUIContext.queryParams,
      setQueryParams: iOTransactionTypesUIContext.setQueryParams,
      openEditIOTransactionTypePage: iOTransactionTypesUIContext.openEditIOTransactionTypePage,
      openDeleteIOTransactionTypeDialog: iOTransactionTypesUIContext.openDeleteIOTransactionTypeDialog,
    };
  }, [iOTransactionTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.iOTransactionTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(IOTransactionTypeModel);
  const fieldKey = getFields(IOTransactionTypeModel);
  const fields = IOTransactionTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    iOTransactionTypesUIProps.setIds([]);
    dispatch(actions.fetchIOTransactionTypes(iOTransactionTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iOTransactionTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("IOTransactionType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("IOTransactionType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditIOTransactionTypePage: iOTransactionTypesUIProps.openEditIOTransactionTypePage,
        openDeleteIOTransactionTypeDialog: iOTransactionTypesUIProps.openDeleteIOTransactionTypeDialog,
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
    sizePerPage: iOTransactionTypesUIProps.queryParams.PageSize,
    page: iOTransactionTypesUIProps.queryParams.PageNumber,
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
                  iOTransactionTypesUIProps.setQueryParams
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