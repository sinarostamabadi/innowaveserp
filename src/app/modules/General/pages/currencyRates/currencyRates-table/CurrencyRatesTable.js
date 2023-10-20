import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/currencyRates/currencyRatesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCurrencyRatesUIContext } from "../CurrencyRatesUIContext";
import { CurrencyRateModel } from "../../../../../../core/_models/General/CurrencyRateModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CurrencyRatesTable() {
  const { t } = useTranslation();

  const currencyRatesUIContext = useCurrencyRatesUIContext();

  const currencyRatesUIProps = useMemo(() => {
    return {
      ids: currencyRatesUIContext.ids,
      setIds: currencyRatesUIContext.setIds,
      queryParams: currencyRatesUIContext.queryParams,
      setQueryParams: currencyRatesUIContext.setQueryParams,
      openEditCurrencyRatePage: currencyRatesUIContext.openEditCurrencyRatePage,
      openDeleteCurrencyRateDialog: currencyRatesUIContext.openDeleteCurrencyRateDialog,
    };
  }, [currencyRatesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.currencyRates }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CurrencyRateModel);
  const fieldKey = getFields(CurrencyRateModel);
  const fields = CurrencyRateModel;

  const dispatch = useDispatch();
  useEffect(() => {
    currencyRatesUIProps.setIds([]);
    dispatch(actions.fetchCurrencyRates(currencyRatesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyRatesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("CurrencyRate." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("CurrencyRate." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCurrencyRatePage: currencyRatesUIProps.openEditCurrencyRatePage,
        openDeleteCurrencyRateDialog: currencyRatesUIProps.openDeleteCurrencyRateDialog,
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
    sizePerPage: currencyRatesUIProps.queryParams.PageSize,
    page: currencyRatesUIProps.queryParams.PageNumber,
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
                  currencyRatesUIProps.setQueryParams
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