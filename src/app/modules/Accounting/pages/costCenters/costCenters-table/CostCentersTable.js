import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/costCenters/costCentersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCostCentersUIContext } from "../CostCentersUIContext";
import { CostCenterModel } from "../../../../../../core/_models/Accounting/CostCenterModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CostCentersTable() {
  const { t } = useTranslation();

  const costCentersUIContext = useCostCentersUIContext();

  const costCentersUIProps = useMemo(() => {
    return {
      ids: costCentersUIContext.ids,
      setIds: costCentersUIContext.setIds,
      queryParams: costCentersUIContext.queryParams,
      setQueryParams: costCentersUIContext.setQueryParams,
      openEditCostCenterPage: costCentersUIContext.openEditCostCenterPage,
      openDeleteCostCenterDialog:
        costCentersUIContext.openDeleteCostCenterDialog,
    };
  }, [costCentersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.costCenters }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CostCenterModel);
  const fieldKey = getFields(CostCenterModel);
  const fields = CostCenterModel;

  const dispatch = useDispatch();
  useEffect(() => {
    costCentersUIProps.setIds([]);
    dispatch(actions.fetchCostCenters(costCentersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costCentersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Code,
      text: t("CostCenter." + fields.Code.display),
      sort: fields.Code.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Title,
      text: t("CostCenter." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Level,
      text: t("CostCenter." + fields.Level.display),
      sort: fields.Level.sortable,
      sortCaret: sortCaret,
    },
    {
      // dataField: fieldKey.ParentId,
      dataField: "Parent.Title",
      text: t("CostCenter.Parent"),
      sort: fields.ParentId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCostCenterPage: costCentersUIProps.openEditCostCenterPage,
        openDeleteCostCenterDialog:
          costCentersUIProps.openDeleteCostCenterDialog,
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
    sizePerPage: costCentersUIProps.queryParams.PageSize,
    page: costCentersUIProps.queryParams.PageNumber,
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
                  costCentersUIProps.setQueryParams
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
