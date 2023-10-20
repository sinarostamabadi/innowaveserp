import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/unitConversions/unitConversionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useUnitConversionsUIContext } from "../UnitConversionsUIContext";
import { UnitConversionModel } from "../../../../../../core/_models/General/UnitConversionModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function UnitConversionsTable() {
  const { t } = useTranslation();

  const unitConversionsUIContext = useUnitConversionsUIContext();

  const unitConversionsUIProps = useMemo(() => {
    return {
      ids: unitConversionsUIContext.ids,
      setIds: unitConversionsUIContext.setIds,
      queryParams: unitConversionsUIContext.queryParams,
      setQueryParams: unitConversionsUIContext.setQueryParams,
      openEditUnitConversionPage: unitConversionsUIContext.openEditUnitConversionPage,
      openDeleteUnitConversionDialog: unitConversionsUIContext.openDeleteUnitConversionDialog,
    };
  }, [unitConversionsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.unitConversions }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(UnitConversionModel);
  const fieldKey = getFields(UnitConversionModel);
  const fields = UnitConversionModel;

  const dispatch = useDispatch();
  useEffect(() => {
    unitConversionsUIProps.setIds([]);
    dispatch(actions.fetchUnitConversions(unitConversionsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitConversionsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "BaseUnit.Name",
      text: t("UnitConversion." + fields.BaseUnitId.display),
      sort: fields.BaseUnitId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "ConvertedUnit.Name",
      text: t("UnitConversion." + fields.ConvertedUnitId.display),
      sort: fields.ConvertedUnitId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Amount,
      text: t("UnitConversion." + fields.Amount.display),
      sort: fields.Amount.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUnitConversionPage: unitConversionsUIProps.openEditUnitConversionPage,
        openDeleteUnitConversionDialog: unitConversionsUIProps.openDeleteUnitConversionDialog,
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
    sizePerPage: unitConversionsUIProps.queryParams.PageSize,
    page: unitConversionsUIProps.queryParams.PageNumber,
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
                  unitConversionsUIProps.setQueryParams
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