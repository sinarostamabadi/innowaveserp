import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/banks/banksActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useBanksUIContext } from "../BanksUIContext";
import { BankModel } from "src/core/_models/General/BankModel";
import {
  getConfig,
  getFields,
} from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BanksTable() {
  const { t } = useTranslation();

  const banksUIContext = useBanksUIContext();

  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
      setIds: banksUIContext.setIds,
      queryParams: banksUIContext.queryParams,
      setQueryParams: banksUIContext.setQueryParams,
      openEditBankPage: banksUIContext.openEditBankPage,
      openDeleteBankDialog: banksUIContext.openDeleteBankDialog,
    };
  }, [banksUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.banks }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BankModel);
  const fieldKey = getFields(BankModel);
  const fields = BankModel;

  const dispatch = useDispatch();
  useEffect(() => {
    banksUIProps.setIds([]);
    dispatch(actions.fetchBanks(banksUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banksUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Bank." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Bank." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBankPage: banksUIProps.openEditBankPage,
        openDeleteBankDialog: banksUIProps.openDeleteBankDialog,
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
    sizePerPage: banksUIProps.queryParams.PageSize,
    page: banksUIProps.queryParams.PageNumber,
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
                  banksUIProps.setQueryParams
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
