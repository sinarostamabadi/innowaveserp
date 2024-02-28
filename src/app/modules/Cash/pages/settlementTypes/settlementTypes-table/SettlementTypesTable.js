import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/settlementTypes/settlementTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSettlementTypesUIContext } from "../SettlementTypesUIContext";
import { SettlementTypeModel } from "../../../../../../core/_models/Cash/SettlementTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SettlementTypesTable() {
  const { t } = useTranslation();

  const settlementTypesUIContext = useSettlementTypesUIContext();

  const settlementTypesUIProps = useMemo(() => {
    return {
      ids: settlementTypesUIContext.ids,
      setIds: settlementTypesUIContext.setIds,
      queryParams: settlementTypesUIContext.queryParams,
      setQueryParams: settlementTypesUIContext.setQueryParams,
      openEditSettlementTypePage:
        settlementTypesUIContext.openEditSettlementTypePage,
      openDeleteSettlementTypeDialog:
        settlementTypesUIContext.openDeleteSettlementTypeDialog,
    };
  }, [settlementTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.settlementTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SettlementTypeModel);
  const fieldKey = getFields(SettlementTypeModel);
  const fields = SettlementTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    settlementTypesUIProps.setIds([]);
    dispatch(actions.fetchSettlementTypes(settlementTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settlementTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SettlementType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SettlementType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSettlementTypePage:
          settlementTypesUIProps.openEditSettlementTypePage,
        openDeleteSettlementTypeDialog:
          settlementTypesUIProps.openDeleteSettlementTypeDialog,
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
    sizePerPage: settlementTypesUIProps.queryParams.PageSize,
    page: settlementTypesUIProps.queryParams.PageNumber,
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
                  settlementTypesUIProps.setQueryParams
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
