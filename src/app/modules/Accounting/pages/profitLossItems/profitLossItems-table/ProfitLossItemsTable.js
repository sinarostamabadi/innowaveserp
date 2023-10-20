import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/profitLossItems/profitLossItemsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useProfitLossItemsUIContext } from "../ProfitLossItemsUIContext";
import { ProfitLossItemModel } from "../../../../../../core/_models/Accounting/ProfitLossItemModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ProfitLossItemsTable() {
  const { t } = useTranslation();

  const profitLossItemsUIContext = useProfitLossItemsUIContext();

  const profitLossItemsUIProps = useMemo(() => {
    return {
      ids: profitLossItemsUIContext.ids,
      setIds: profitLossItemsUIContext.setIds,
      queryParams: profitLossItemsUIContext.queryParams,
      setQueryParams: profitLossItemsUIContext.setQueryParams,
      openEditProfitLossItemPage: profitLossItemsUIContext.openEditProfitLossItemPage,
      openDeleteProfitLossItemDialog: profitLossItemsUIContext.openDeleteProfitLossItemDialog,
    };
  }, [profitLossItemsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.profitLossItems }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ProfitLossItemModel);
  const fieldKey = getFields(ProfitLossItemModel);
  const fields = ProfitLossItemModel;

  const dispatch = useDispatch();
  useEffect(() => {
    profitLossItemsUIProps.setIds([]);
    dispatch(actions.fetchProfitLossItems(profitLossItemsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profitLossItemsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ProfitLossItem." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ProfitLossItem." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProfitLossItemPage: profitLossItemsUIProps.openEditProfitLossItemPage,
        openDeleteProfitLossItemDialog: profitLossItemsUIProps.openDeleteProfitLossItemDialog,
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
    sizePerPage: profitLossItemsUIProps.queryParams.PageSize,
    page: profitLossItemsUIProps.queryParams.PageNumber,
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
                  profitLossItemsUIProps.setQueryParams
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