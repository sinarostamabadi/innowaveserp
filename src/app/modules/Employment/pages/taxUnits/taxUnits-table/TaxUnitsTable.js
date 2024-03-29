import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/taxUnits/taxUnitsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useTaxUnitsUIContext } from "../TaxUnitsUIContext";
import { TaxUnitModel } from "../../../../../../core/_models/Employment/TaxUnitModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function TaxUnitsTable() {
  const { t } = useTranslation();

  const taxUnitsUIContext = useTaxUnitsUIContext();

  const taxUnitsUIProps = useMemo(() => {
    return {
      ids: taxUnitsUIContext.ids,
      setIds: taxUnitsUIContext.setIds,
      queryParams: taxUnitsUIContext.queryParams,
      setQueryParams: taxUnitsUIContext.setQueryParams,
      openEditTaxUnitPage: taxUnitsUIContext.openEditTaxUnitPage,
      openDeleteTaxUnitDialog: taxUnitsUIContext.openDeleteTaxUnitDialog,
    };
  }, [taxUnitsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.taxUnits }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(TaxUnitModel);
  const fieldKey = getFields(TaxUnitModel);
  const fields = TaxUnitModel;

  const dispatch = useDispatch();
  useEffect(() => {
    taxUnitsUIProps.setIds([]);
    dispatch(actions.fetchTaxUnits(taxUnitsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxUnitsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("TaxUnit." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("TaxUnit." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTaxUnitPage: taxUnitsUIProps.openEditTaxUnitPage,
        openDeleteTaxUnitDialog: taxUnitsUIProps.openDeleteTaxUnitDialog,
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
    sizePerPage: taxUnitsUIProps.queryParams.PageSize,
    page: taxUnitsUIProps.queryParams.PageNumber,
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
                  taxUnitsUIProps.setQueryParams
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
