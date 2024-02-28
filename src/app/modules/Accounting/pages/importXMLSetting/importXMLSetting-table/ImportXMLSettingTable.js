import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/importXMLSetting/importXMLSettingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useImportXMLSettingUIContext } from "../ImportXMLSettingUIContext";
import { ImportXMLSettingModel } from "../../../../../../core/_models/Accounting/ImportXMLSettingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ImportXMLSettingTable() {
  const { t } = useTranslation();

  const importXMLSettingUIContext = useImportXMLSettingUIContext();

  const importXMLSettingUIProps = useMemo(() => {
    return {
      ids: importXMLSettingUIContext.ids,
      setIds: importXMLSettingUIContext.setIds,
      queryParams: importXMLSettingUIContext.queryParams,
      setQueryParams: importXMLSettingUIContext.setQueryParams,
      openEditImportXMLSettingPage:
        importXMLSettingUIContext.openEditImportXMLSettingPage,
      openDeleteImportXMLSettingDialog:
        importXMLSettingUIContext.openDeleteImportXMLSettingDialog,
    };
  }, [importXMLSettingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.importXMLSetting }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ImportXMLSettingModel);
  const fieldKey = getFields(ImportXMLSettingModel);
  const fields = ImportXMLSettingModel;

  const dispatch = useDispatch();
  useEffect(() => {
    importXMLSettingUIProps.setIds([]);
    dispatch(
      actions.fetchImportXMLSetting(importXMLSettingUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importXMLSettingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ImportXMLSetting." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ImportXMLSetting." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditImportXMLSettingPage:
          importXMLSettingUIProps.openEditImportXMLSettingPage,
        openDeleteImportXMLSettingDialog:
          importXMLSettingUIProps.openDeleteImportXMLSettingDialog,
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
    sizePerPage: importXMLSettingUIProps.queryParams.PageSize,
    page: importXMLSettingUIProps.queryParams.PageNumber,
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
                  importXMLSettingUIProps.setQueryParams
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
