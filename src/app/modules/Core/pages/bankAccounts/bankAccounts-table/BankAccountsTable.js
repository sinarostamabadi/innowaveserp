import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankAccounts/bankAccountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBankAccountsUIContext } from "../BankAccountsUIContext";
import { BankAccountModel } from "../../../../../../core/_models/Core/BankAccountModel";
import {
  getConfig,
  getFields,
  initial
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from 'react-i18next';

export function BankAccountsTable() {
  const { t } = useTranslation();

  const bankAccountsUIContext = useBankAccountsUIContext();
  const bankAccountsUIProps = useMemo(() => {
    return {
      ids: bankAccountsUIContext.ids,
      setIds: bankAccountsUIContext.setIds,
      queryParams: bankAccountsUIContext.queryParams,
      setQueryParams: bankAccountsUIContext.setQueryParams,
      openEditBankAccountPage: bankAccountsUIContext.openEditBankAccountPage,
      openDeleteBankAccountDialog: bankAccountsUIContext.openDeleteBankAccountDialog,
    };
  }, [bankAccountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bankAccounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;

  const configs = getConfig(BankAccountModel);
  const fields = initial(BankAccountModel);
  const fieldKey = getFields(fields);

  const dispatch = useDispatch();
  useEffect(() => {
    bankAccountsUIProps.setIds([]);
    dispatch(actions.fetchBankAccounts(bankAccountsUIProps.queryParams));
  }, [bankAccountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("BankAccount." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Bank.TitleFa,
      text: t("BankAccount." + fields.Bank.display),
      sort: fields.BankId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.AccountFloating.Title,
      text: t("BankAccount." + fields.AccountFloating.display),
      sort: fields.AccountFloatingId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBankAccountPage: bankAccountsUIProps.openEditBankAccountPage,
        openDeleteBankAccountDialog: bankAccountsUIProps.openDeleteBankAccountDialog,
        t: t
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
    sizePerPage: bankAccountsUIProps.queryParams.PageSize,
    page: bankAccountsUIProps.queryParams.PageNumber,
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
                data={!!entities ? entities: [] }
                columns={columns}
                defaultSorted={configs.defaultSorted}
                onTableChange={getHandlerTableChange(
                  bankAccountsUIProps.setQueryParams
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
