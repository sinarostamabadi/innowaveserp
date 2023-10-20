import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/receipts/receiptsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useReceiptsUIContext } from "../ReceiptsUIContext";
import { ReceiptModel } from "src/core/_models/Warehouse/ReceiptModel";
import {
  getConfig,
  getFields,
} from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ReceiptsTable() {
  const { t } = useTranslation();

  const receiptsUIContext = useReceiptsUIContext();

  const receiptsUIProps = useMemo(() => {
    return {
      ids: receiptsUIContext.ids,
      setIds: receiptsUIContext.setIds,
      queryParams: receiptsUIContext.queryParams,
      setQueryParams: receiptsUIContext.setQueryParams,
      openEditReceiptPage: receiptsUIContext.openEditReceiptPage,
      openDeleteReceiptDialog: receiptsUIContext.openDeleteReceiptDialog,
    };
  }, [receiptsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.receipts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ReceiptModel, "ReceiptDate", "desc");
  const fieldKey = getFields(ReceiptModel);
  const fields = ReceiptModel;

  const dispatch = useDispatch();
  useEffect(() => {
    receiptsUIProps.setIds([]);
    dispatch(actions.fetchReceipts(receiptsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.ReceiptNo,
      text: t("Receipt." + fields.ReceiptNo.display),
      sort: fields.ReceiptNo.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Year.Title",
      text: t("Assignment.Year"),
      sort: fields.YearId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "ReceiptType.Title",
      text: t("Receipt.ReceiptType"),
      sort: fields.ReceiptTypeId.sortable,
      sortCaret: sortCaret,
    },    
    {
      dataField: "Warehouse.Title",
      text: t("Receipt.Warehouse"),
      sort: fields.WarehouseId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.ReceiptDate,
      text: t("Receipt." + fields.ReceiptDate.display),
      sort: fields.ReceiptDate.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFaColumnFormatter,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("Receipt.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },        
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditReceiptPage: receiptsUIProps.openEditReceiptPage,
        openDeleteReceiptDialog: receiptsUIProps.openDeleteReceiptDialog,
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
    sizePerPage: receiptsUIProps.queryParams.PageSize,
    page: receiptsUIProps.queryParams.PageNumber,
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
                  receiptsUIProps.setQueryParams
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