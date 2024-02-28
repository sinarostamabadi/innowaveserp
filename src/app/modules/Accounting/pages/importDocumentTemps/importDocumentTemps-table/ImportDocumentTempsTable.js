import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/importDocumentTemps/importDocumentTempsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useImportDocumentTempsUIContext } from "../ImportDocumentTempsUIContext";
import { ImportDocumentTempModel } from "../../../../../../core/_models/Accounting/ImportDocumentTempModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ImportDocumentTempsTable() {
  const { t } = useTranslation();

  const importDocumentTempsUIContext = useImportDocumentTempsUIContext();

  const importDocumentTempsUIProps = useMemo(() => {
    return {
      ids: importDocumentTempsUIContext.ids,
      setIds: importDocumentTempsUIContext.setIds,
      queryParams: importDocumentTempsUIContext.queryParams,
      setQueryParams: importDocumentTempsUIContext.setQueryParams,
      openEditImportDocumentTempPage:
        importDocumentTempsUIContext.openEditImportDocumentTempPage,
      openDeleteImportDocumentTempDialog:
        importDocumentTempsUIContext.openDeleteImportDocumentTempDialog,
    };
  }, [importDocumentTempsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.importDocumentTemps }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ImportDocumentTempModel);
  const fieldKey = getFields(ImportDocumentTempModel);
  const fields = ImportDocumentTempModel;

  const dispatch = useDispatch();
  useEffect(() => {
    importDocumentTempsUIProps.setIds([]);
    dispatch(
      actions.fetchImportDocumentTemps(importDocumentTempsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importDocumentTempsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ImportDocumentTemp." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ImportDocumentTemp." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditImportDocumentTempPage:
          importDocumentTempsUIProps.openEditImportDocumentTempPage,
        openDeleteImportDocumentTempDialog:
          importDocumentTempsUIProps.openDeleteImportDocumentTempDialog,
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
    sizePerPage: importDocumentTempsUIProps.queryParams.PageSize,
    page: importDocumentTempsUIProps.queryParams.PageNumber,
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
                  importDocumentTempsUIProps.setQueryParams
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
