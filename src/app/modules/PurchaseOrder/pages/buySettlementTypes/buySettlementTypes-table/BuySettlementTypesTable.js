import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/buySettlementTypes/buySettlementTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBuySettlementTypesUIContext } from "../BuySettlementTypesUIContext";
import { BuySettlementTypeModel } from "../../../../../../core/_models/PurchaseOrder/BuySettlementTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BuySettlementTypesTable() {
  const { t } = useTranslation();

  const buySettlementTypesUIContext = useBuySettlementTypesUIContext();

  const buySettlementTypesUIProps = useMemo(() => {
    return {
      ids: buySettlementTypesUIContext.ids,
      setIds: buySettlementTypesUIContext.setIds,
      queryParams: buySettlementTypesUIContext.queryParams,
      setQueryParams: buySettlementTypesUIContext.setQueryParams,
      openEditBuySettlementTypePage:
        buySettlementTypesUIContext.openEditBuySettlementTypePage,
      openDeleteBuySettlementTypeDialog:
        buySettlementTypesUIContext.openDeleteBuySettlementTypeDialog,
    };
  }, [buySettlementTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.buySettlementTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BuySettlementTypeModel);
  const fieldKey = getFields(BuySettlementTypeModel);
  const fields = BuySettlementTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    buySettlementTypesUIProps.setIds([]);
    dispatch(
      actions.fetchBuySettlementTypes(buySettlementTypesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buySettlementTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("BuySettlementType." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBuySettlementTypePage:
          buySettlementTypesUIProps.openEditBuySettlementTypePage,
        openDeleteBuySettlementTypeDialog:
          buySettlementTypesUIProps.openDeleteBuySettlementTypeDialog,
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
    sizePerPage: buySettlementTypesUIProps.queryParams.PageSize,
    page: buySettlementTypesUIProps.queryParams.PageNumber,
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
                  buySettlementTypesUIProps.setQueryParams
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
