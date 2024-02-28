import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/marridationTypes/marridationTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMarridationTypesUIContext } from "../MarridationTypesUIContext";
import { MarridationTypeModel } from "../../../../../../core/_models/Employment/MarridationTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MarridationTypesTable() {
  const { t } = useTranslation();

  const marridationTypesUIContext = useMarridationTypesUIContext();

  const marridationTypesUIProps = useMemo(() => {
    return {
      ids: marridationTypesUIContext.ids,
      setIds: marridationTypesUIContext.setIds,
      queryParams: marridationTypesUIContext.queryParams,
      setQueryParams: marridationTypesUIContext.setQueryParams,
      openEditMarridationTypePage:
        marridationTypesUIContext.openEditMarridationTypePage,
      openDeleteMarridationTypeDialog:
        marridationTypesUIContext.openDeleteMarridationTypeDialog,
    };
  }, [marridationTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.marridationTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MarridationTypeModel);
  const fieldKey = getFields(MarridationTypeModel);
  const fields = MarridationTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    marridationTypesUIProps.setIds([]);
    dispatch(
      actions.fetchMarridationTypes(marridationTypesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marridationTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MarridationType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MarridationType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMarridationTypePage:
          marridationTypesUIProps.openEditMarridationTypePage,
        openDeleteMarridationTypeDialog:
          marridationTypesUIProps.openDeleteMarridationTypeDialog,
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
    sizePerPage: marridationTypesUIProps.queryParams.PageSize,
    page: marridationTypesUIProps.queryParams.PageNumber,
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
                  marridationTypesUIProps.setQueryParams
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
