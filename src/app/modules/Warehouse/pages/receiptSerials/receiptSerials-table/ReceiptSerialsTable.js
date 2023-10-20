import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/receiptSerials/receiptSerialsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useReceiptSerialsUIContext } from "../ReceiptSerialsUIContext";
import { ReceiptSerialModel } from "../../../../../../core/_models/Warehouse/ReceiptSerialModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ReceiptSerialsTable() {
  const { t } = useTranslation();

  const receiptSerialsUIContext = useReceiptSerialsUIContext();

  const receiptSerialsUIProps = useMemo(() => {
    return {
      ids: receiptSerialsUIContext.ids,
      setIds: receiptSerialsUIContext.setIds,
      queryParams: receiptSerialsUIContext.queryParams,
      setQueryParams: receiptSerialsUIContext.setQueryParams,
      openEditReceiptSerialPage: receiptSerialsUIContext.openEditReceiptSerialPage,
      openDeleteReceiptSerialDialog: receiptSerialsUIContext.openDeleteReceiptSerialDialog,
    };
  }, [receiptSerialsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.receiptSerials }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ReceiptSerialModel);
  const fieldKey = getFields(ReceiptSerialModel);
  const fields = ReceiptSerialModel;

  const dispatch = useDispatch();
  useEffect(() => {
    receiptSerialsUIProps.setIds([]);
    dispatch(actions.fetchReceiptSerials(receiptSerialsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptSerialsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ReceiptSerial." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ReceiptSerial." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditReceiptSerialPage: receiptSerialsUIProps.openEditReceiptSerialPage,
        openDeleteReceiptSerialDialog: receiptSerialsUIProps.openDeleteReceiptSerialDialog,
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
    sizePerPage: receiptSerialsUIProps.queryParams.PageSize,
    page: receiptSerialsUIProps.queryParams.PageNumber,
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
                  receiptSerialsUIProps.setQueryParams
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