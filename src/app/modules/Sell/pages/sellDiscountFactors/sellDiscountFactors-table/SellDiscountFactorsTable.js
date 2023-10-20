import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDiscountFactors/sellDiscountFactorsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellDiscountFactorsUIContext } from "../SellDiscountFactorsUIContext";
import { SellDiscountFactorModel } from "../../../../../../core/_models/Sell/SellDiscountFactorModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SellDiscountFactorsTable() {
  const { t } = useTranslation();

  const sellDiscountFactorsUIContext = useSellDiscountFactorsUIContext();

  const sellDiscountFactorsUIProps = useMemo(() => {
    return {
      ids: sellDiscountFactorsUIContext.ids,
      setIds: sellDiscountFactorsUIContext.setIds,
      queryParams: sellDiscountFactorsUIContext.queryParams,
      setQueryParams: sellDiscountFactorsUIContext.setQueryParams,
      openEditSellDiscountFactorPage: sellDiscountFactorsUIContext.openEditSellDiscountFactorPage,
      openDeleteSellDiscountFactorDialog: sellDiscountFactorsUIContext.openDeleteSellDiscountFactorDialog,
    };
  }, [sellDiscountFactorsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellDiscountFactors }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellDiscountFactorModel);
  const fieldKey = getFields(SellDiscountFactorModel);
  const fields = SellDiscountFactorModel;

  const dispatch = useDispatch();
  useEffect(() => {
    sellDiscountFactorsUIProps.setIds([]);
    dispatch(actions.fetchSellDiscountFactors(sellDiscountFactorsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDiscountFactorsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.FactorNumber,
      text: t("SellDiscountFactor." + fields.FactorNumber.display),
      sort: fields.FactorNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.DiscountPercent,
      text: t("SellDiscountFactor." + fields.DiscountPercent.display),
      sort: fields.DiscountPercent.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellDiscountFactorPage: sellDiscountFactorsUIProps.openEditSellDiscountFactorPage,
        openDeleteSellDiscountFactorDialog: sellDiscountFactorsUIProps.openDeleteSellDiscountFactorDialog,
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
    sizePerPage: sellDiscountFactorsUIProps.queryParams.PageSize,
    page: sellDiscountFactorsUIProps.queryParams.PageNumber,
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
                  sellDiscountFactorsUIProps.setQueryParams
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