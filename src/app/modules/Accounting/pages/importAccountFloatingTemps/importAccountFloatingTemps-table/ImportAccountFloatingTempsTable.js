import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/importAccountFloatingTemps/importAccountFloatingTempsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useImportAccountFloatingTempsUIContext } from "../ImportAccountFloatingTempsUIContext";
import { ImportAccountFloatingTempModel } from "../../../../../../core/_models/Accounting/ImportAccountFloatingTempModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ImportAccountFloatingTempsTable() {
  const { t } = useTranslation();

  const importAccountFloatingTempsUIContext = useImportAccountFloatingTempsUIContext();

  const importAccountFloatingTempsUIProps = useMemo(() => {
    return {
      ids: importAccountFloatingTempsUIContext.ids,
      setIds: importAccountFloatingTempsUIContext.setIds,
      queryParams: importAccountFloatingTempsUIContext.queryParams,
      setQueryParams: importAccountFloatingTempsUIContext.setQueryParams,
      openEditImportAccountFloatingTempPage: importAccountFloatingTempsUIContext.openEditImportAccountFloatingTempPage,
      openDeleteImportAccountFloatingTempDialog: importAccountFloatingTempsUIContext.openDeleteImportAccountFloatingTempDialog,
    };
  }, [importAccountFloatingTempsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.importAccountFloatingTemps }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ImportAccountFloatingTempModel);
  const fieldKey = getFields(ImportAccountFloatingTempModel);
  const fields = ImportAccountFloatingTempModel;

  const dispatch = useDispatch();
  useEffect(() => {
    importAccountFloatingTempsUIProps.setIds([]);
    dispatch(actions.fetchImportAccountFloatingTemps(importAccountFloatingTempsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importAccountFloatingTempsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ImportAccountFloatingTemp." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ImportAccountFloatingTemp." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditImportAccountFloatingTempPage: importAccountFloatingTempsUIProps.openEditImportAccountFloatingTempPage,
        openDeleteImportAccountFloatingTempDialog: importAccountFloatingTempsUIProps.openDeleteImportAccountFloatingTempDialog,
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
    sizePerPage: importAccountFloatingTempsUIProps.queryParams.PageSize,
    page: importAccountFloatingTempsUIProps.queryParams.PageNumber,
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
                  importAccountFloatingTempsUIProps.setQueryParams
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