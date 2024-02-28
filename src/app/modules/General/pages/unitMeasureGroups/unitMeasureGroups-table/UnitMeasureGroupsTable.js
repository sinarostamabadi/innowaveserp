import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/unitMeasureGroups/unitMeasureGroupsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useUnitMeasureGroupsUIContext } from "../UnitMeasureGroupsUIContext";
import { UnitMeasureGroupModel } from "../../../../../../core/_models/General/UnitMeasureGroupModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function UnitMeasureGroupsTable() {
  const { t } = useTranslation();

  const unitMeasureGroupsUIContext = useUnitMeasureGroupsUIContext();

  const unitMeasureGroupsUIProps = useMemo(() => {
    return {
      ids: unitMeasureGroupsUIContext.ids,
      setIds: unitMeasureGroupsUIContext.setIds,
      queryParams: unitMeasureGroupsUIContext.queryParams,
      setQueryParams: unitMeasureGroupsUIContext.setQueryParams,
      openEditUnitMeasureGroupPage:
        unitMeasureGroupsUIContext.openEditUnitMeasureGroupPage,
      openDeleteUnitMeasureGroupDialog:
        unitMeasureGroupsUIContext.openDeleteUnitMeasureGroupDialog,
    };
  }, [unitMeasureGroupsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.unitMeasureGroups }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(UnitMeasureGroupModel);
  const fieldKey = getFields(UnitMeasureGroupModel);
  const fields = UnitMeasureGroupModel;

  const dispatch = useDispatch();
  useEffect(() => {
    unitMeasureGroupsUIProps.setIds([]);
    dispatch(
      actions.fetchUnitMeasureGroups(unitMeasureGroupsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitMeasureGroupsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.UnitGroupName,
      text: t("UnitMeasureGroup." + fields.UnitGroupName.display),
      sort: fields.UnitGroupName.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUnitMeasureGroupPage:
          unitMeasureGroupsUIProps.openEditUnitMeasureGroupPage,
        openDeleteUnitMeasureGroupDialog:
          unitMeasureGroupsUIProps.openDeleteUnitMeasureGroupDialog,
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
    sizePerPage: unitMeasureGroupsUIProps.queryParams.PageSize,
    page: unitMeasureGroupsUIProps.queryParams.PageNumber,
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
                  unitMeasureGroupsUIProps.setQueryParams
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
