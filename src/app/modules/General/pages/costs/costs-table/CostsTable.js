import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/costs/costsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCostsUIContext } from "../CostsUIContext";
import { CostModel } from "../../../../../../core/_models/General/CostModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CostsTable() {
  const { t } = useTranslation();

  const costsUIContext = useCostsUIContext();

  const costsUIProps = useMemo(() => {
    return {
      ids: costsUIContext.ids,
      setIds: costsUIContext.setIds,
      queryParams: costsUIContext.queryParams,
      setQueryParams: costsUIContext.setQueryParams,
      openEditCostPage: costsUIContext.openEditCostPage,
      openDeleteCostDialog: costsUIContext.openDeleteCostDialog,
    };
  }, [costsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.costs }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CostModel);
  const fieldKey = getFields(CostModel);
  const fields = CostModel;

  const dispatch = useDispatch();
  useEffect(() => {
    costsUIProps.setIds([]);
    dispatch(actions.fetchCosts(costsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("Cost." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCostPage: costsUIProps.openEditCostPage,
        openDeleteCostDialog: costsUIProps.openDeleteCostDialog,
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
    sizePerPage: costsUIProps.queryParams.PageSize,
    page: costsUIProps.queryParams.PageNumber,
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
                  costsUIProps.setQueryParams
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
