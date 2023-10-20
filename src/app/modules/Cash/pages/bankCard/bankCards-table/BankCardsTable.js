import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankCards/bankCardsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useBankCardsUIContext } from "../BankCardsUIContext";
import { BankCardModel } from "src/core/_models/Cash/BankCardModel";
import {
  getConfig,
  getFields,
} from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BankCardsTable() {
  const { t } = useTranslation();

  const bankCardsUIContext = useBankCardsUIContext();

  const bankCardsUIProps = useMemo(() => {
    return {
      ids: bankCardsUIContext.ids,
      setIds: bankCardsUIContext.setIds,
      queryParams: bankCardsUIContext.queryParams,
      setQueryParams: bankCardsUIContext.setQueryParams,
      openEditBankCardPage: bankCardsUIContext.openEditBankCardPage,
      openDeleteBankCardDialog: bankCardsUIContext.openDeleteBankCardDialog,
    };
  }, [bankCardsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bankCards }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BankCardModel);
  const fieldKey = getFields(BankCardModel);
  const fields = BankCardModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bankCardsUIProps.setIds([]);
    dispatch(actions.fetchBankCards(bankCardsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankCardsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("BankCard." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.CartNumber,
      text: t("BankCard." + fields.CartNumber.display),
      sort: fields.CartNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.BankAccount.Title,
      text: t("BankCard." + fields.BankAccount.Title.display),
      sort: fields.BankAccountId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBankCardPage: bankCardsUIProps.openEditBankCardPage,
        openDeleteBankCardDialog: bankCardsUIProps.openDeleteBankCardDialog,
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
    sizePerPage: bankCardsUIProps.queryParams.PageSize,
    page: bankCardsUIProps.queryParams.PageNumber,
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
                  bankCardsUIProps.setQueryParams
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