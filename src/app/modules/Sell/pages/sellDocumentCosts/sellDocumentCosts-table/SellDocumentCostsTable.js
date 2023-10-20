import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDocumentCosts/sellDocumentCostsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellDocumentCostsUIContext } from "../SellDocumentCostsUIContext";
import { SellDocumentCostModel } from "../../../../../../core/_models/Sell/SellDocumentCostModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SellDocumentCostsTable() {
  const { t } = useTranslation();

  const sellDocumentCostsUIContext = useSellDocumentCostsUIContext();

  const sellDocumentCostsUIProps = useMemo(() => {
    return {
      ids: sellDocumentCostsUIContext.ids,
      setIds: sellDocumentCostsUIContext.setIds,
      queryParams: sellDocumentCostsUIContext.queryParams,
      setQueryParams: sellDocumentCostsUIContext.setQueryParams,
      openEditSellDocumentCostPage: sellDocumentCostsUIContext.openEditSellDocumentCostPage,
      openDeleteSellDocumentCostDialog: sellDocumentCostsUIContext.openDeleteSellDocumentCostDialog,
    };
  }, [sellDocumentCostsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellDocumentCosts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellDocumentCostModel);
  const fieldKey = getFields(SellDocumentCostModel);
  const fields = SellDocumentCostModel;

  const dispatch = useDispatch();
  useEffect(() => {
    sellDocumentCostsUIProps.setIds([]);
    dispatch(actions.fetchSellDocumentCosts(sellDocumentCostsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDocumentCostsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SellDocumentCost." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SellDocumentCost." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellDocumentCostPage: sellDocumentCostsUIProps.openEditSellDocumentCostPage,
        openDeleteSellDocumentCostDialog: sellDocumentCostsUIProps.openDeleteSellDocumentCostDialog,
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
    sizePerPage: sellDocumentCostsUIProps.queryParams.PageSize,
    page: sellDocumentCostsUIProps.queryParams.PageNumber,
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
                  sellDocumentCostsUIProps.setQueryParams
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