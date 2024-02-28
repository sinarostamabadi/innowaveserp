import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/units/unitsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useUnitsUIContext } from "../UnitsUIContext";
import { UnitModel } from "../../../../../../core/_models/General/UnitModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function UnitsTable() {
  const { t } = useTranslation();

  const unitsUIContext = useUnitsUIContext();

  const unitsUIProps = useMemo(() => {
    return {
      ids: unitsUIContext.ids,
      setIds: unitsUIContext.setIds,
      queryParams: unitsUIContext.queryParams,
      setQueryParams: unitsUIContext.setQueryParams,
      openEditUnitPage: unitsUIContext.openEditUnitPage,
      openDeleteUnitDialog: unitsUIContext.openDeleteUnitDialog,
    };
  }, [unitsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.units }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(UnitModel);
  const fieldKey = getFields(UnitModel);
  const fields = UnitModel;

  const dispatch = useDispatch();
  useEffect(() => {
    unitsUIProps.setIds([]);
    dispatch(actions.fetchUnits(unitsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Name,
      text: t("Unit." + fields.Name.display),
      sort: fields.Name.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.UnitGroupId,
      text: t("Unit." + fields.UnitGroupId.display),
      sort: fields.UnitGroupId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUnitPage: unitsUIProps.openEditUnitPage,
        openDeleteUnitDialog: unitsUIProps.openDeleteUnitDialog,
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
    sizePerPage: unitsUIProps.queryParams.PageSize,
    page: unitsUIProps.queryParams.PageNumber,
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
                  unitsUIProps.setQueryParams
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
