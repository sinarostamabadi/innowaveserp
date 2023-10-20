import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/currencies/currenciesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCurrenciesUIContext } from "../CurrenciesUIContext";
import { CurrencyModel } from "../../../../../../core/_models/General/CurrencyModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CurrenciesTable() {
  const { t } = useTranslation();

  const currenciesUIContext = useCurrenciesUIContext();

  const currenciesUIProps = useMemo(() => {
    return {
      ids: currenciesUIContext.ids,
      setIds: currenciesUIContext.setIds,
      queryParams: currenciesUIContext.queryParams,
      setQueryParams: currenciesUIContext.setQueryParams,
      openEditCurrencyPage: currenciesUIContext.openEditCurrencyPage,
      openDeleteCurrencyDialog: currenciesUIContext.openDeleteCurrencyDialog,
    };
  }, [currenciesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.currencies }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CurrencyModel);
  const fieldKey = getFields(CurrencyModel);
  const fields = CurrencyModel;

  const dispatch = useDispatch();
  useEffect(() => {
    currenciesUIProps.setIds([]);
    dispatch(actions.fetchCurrencies(currenciesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenciesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Currency." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Currency." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCurrencyPage: currenciesUIProps.openEditCurrencyPage,
        openDeleteCurrencyDialog: currenciesUIProps.openDeleteCurrencyDialog,
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
    sizePerPage: currenciesUIProps.queryParams.PageSize,
    page: currenciesUIProps.queryParams.PageNumber,
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
                  currenciesUIProps.setQueryParams
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