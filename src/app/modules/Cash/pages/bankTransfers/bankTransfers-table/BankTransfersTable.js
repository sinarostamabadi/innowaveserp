import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankTransfers/bankTransfersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBankTransfersUIContext } from "../BankTransfersUIContext";
import { BankTransferModel } from "../../../../../../core/_models/Cash/BankTransferModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BankTransfersTable() {
  const { t } = useTranslation();

  const bankTransfersUIContext = useBankTransfersUIContext();

  const bankTransfersUIProps = useMemo(() => {
    return {
      ids: bankTransfersUIContext.ids,
      setIds: bankTransfersUIContext.setIds,
      queryParams: bankTransfersUIContext.queryParams,
      setQueryParams: bankTransfersUIContext.setQueryParams,
      openEditBankTransferPage: bankTransfersUIContext.openEditBankTransferPage,
      openDeleteBankTransferDialog:
        bankTransfersUIContext.openDeleteBankTransferDialog,
    };
  }, [bankTransfersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bankTransfers }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BankTransferModel);
  const fieldKey = getFields(BankTransferModel);
  const fields = BankTransferModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bankTransfersUIProps.setIds([]);
    dispatch(actions.fetchBankTransfers(bankTransfersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankTransfersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BankTransfer." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BankTransfer." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBankTransferPage: bankTransfersUIProps.openEditBankTransferPage,
        openDeleteBankTransferDialog:
          bankTransfersUIProps.openDeleteBankTransferDialog,
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
    sizePerPage: bankTransfersUIProps.queryParams.PageSize,
    page: bankTransfersUIProps.queryParams.PageNumber,
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
                  bankTransfersUIProps.setQueryParams
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
