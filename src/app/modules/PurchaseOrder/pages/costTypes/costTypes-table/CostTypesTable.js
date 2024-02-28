import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/costTypes/costTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCostTypesUIContext } from "../CostTypesUIContext";
import { CostTypeModel } from "../../../../../../core/_models/PurchaseOrder/CostTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CostTypesTable() {
  const { t } = useTranslation();

  const costTypesUIContext = useCostTypesUIContext();

  const costTypesUIProps = useMemo(() => {
    return {
      ids: costTypesUIContext.ids,
      setIds: costTypesUIContext.setIds,
      queryParams: costTypesUIContext.queryParams,
      setQueryParams: costTypesUIContext.setQueryParams,
      openEditCostTypePage: costTypesUIContext.openEditCostTypePage,
      openDeleteCostTypeDialog: costTypesUIContext.openDeleteCostTypeDialog,
    };
  }, [costTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.costTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CostTypeModel);
  const fieldKey = getFields(CostTypeModel);
  const fields = CostTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    costTypesUIProps.setIds([]);
    dispatch(actions.fetchCostTypes(costTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("CostType." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Describtion,
      text: t("CostType." + fields.Describtion.display),
      sort: fields.Describtion.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCostTypePage: costTypesUIProps.openEditCostTypePage,
        openDeleteCostTypeDialog: costTypesUIProps.openDeleteCostTypeDialog,
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
    sizePerPage: costTypesUIProps.queryParams.PageSize,
    page: costTypesUIProps.queryParams.PageNumber,
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
                  costTypesUIProps.setQueryParams
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
