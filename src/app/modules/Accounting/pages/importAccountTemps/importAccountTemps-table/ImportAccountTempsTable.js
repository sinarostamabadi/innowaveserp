import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/importAccountTemps/importAccountTempsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useImportAccountTempsUIContext } from "../ImportAccountTempsUIContext";
import { ImportAccountTempModel } from "../../../../../../core/_models/Accounting/ImportAccountTempModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ImportAccountTempsTable() {
  const { t } = useTranslation();

  const importAccountTempsUIContext = useImportAccountTempsUIContext();

  const importAccountTempsUIProps = useMemo(() => {
    return {
      ids: importAccountTempsUIContext.ids,
      setIds: importAccountTempsUIContext.setIds,
      queryParams: importAccountTempsUIContext.queryParams,
      setQueryParams: importAccountTempsUIContext.setQueryParams,
      openEditImportAccountTempPage:
        importAccountTempsUIContext.openEditImportAccountTempPage,
      openDeleteImportAccountTempDialog:
        importAccountTempsUIContext.openDeleteImportAccountTempDialog,
    };
  }, [importAccountTempsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.importAccountTemps }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ImportAccountTempModel);
  const fieldKey = getFields(ImportAccountTempModel);
  const fields = ImportAccountTempModel;

  const dispatch = useDispatch();
  useEffect(() => {
    importAccountTempsUIProps.setIds([]);
    dispatch(
      actions.fetchImportAccountTemps(importAccountTempsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importAccountTempsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ImportAccountTemp." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ImportAccountTemp." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditImportAccountTempPage:
          importAccountTempsUIProps.openEditImportAccountTempPage,
        openDeleteImportAccountTempDialog:
          importAccountTempsUIProps.openDeleteImportAccountTempDialog,
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
    sizePerPage: importAccountTempsUIProps.queryParams.PageSize,
    page: importAccountTempsUIProps.queryParams.PageNumber,
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
                  importAccountTempsUIProps.setQueryParams
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
