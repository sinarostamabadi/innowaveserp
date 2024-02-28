import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/importXMLKeies/importXMLKeiesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useImportXMLKeiesUIContext } from "../ImportXMLKeiesUIContext";
import { ImportXMLKeyModel } from "../../../../../../core/_models/Accounting/ImportXMLKeyModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ImportXMLKeiesTable() {
  const { t } = useTranslation();

  const importXMLKeiesUIContext = useImportXMLKeiesUIContext();

  const importXMLKeiesUIProps = useMemo(() => {
    return {
      ids: importXMLKeiesUIContext.ids,
      setIds: importXMLKeiesUIContext.setIds,
      queryParams: importXMLKeiesUIContext.queryParams,
      setQueryParams: importXMLKeiesUIContext.setQueryParams,
      openEditImportXMLKeyPage:
        importXMLKeiesUIContext.openEditImportXMLKeyPage,
      openDeleteImportXMLKeyDialog:
        importXMLKeiesUIContext.openDeleteImportXMLKeyDialog,
    };
  }, [importXMLKeiesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.importXMLKeies }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ImportXMLKeyModel);
  const fieldKey = getFields(ImportXMLKeyModel);
  const fields = ImportXMLKeyModel;

  const dispatch = useDispatch();
  useEffect(() => {
    importXMLKeiesUIProps.setIds([]);
    dispatch(actions.fetchImportXMLKeies(importXMLKeiesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importXMLKeiesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ImportXMLKey." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ImportXMLKey." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditImportXMLKeyPage:
          importXMLKeiesUIProps.openEditImportXMLKeyPage,
        openDeleteImportXMLKeyDialog:
          importXMLKeiesUIProps.openDeleteImportXMLKeyDialog,
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
    sizePerPage: importXMLKeiesUIProps.queryParams.PageSize,
    page: importXMLKeiesUIProps.queryParams.PageNumber,
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
                  importXMLKeiesUIProps.setQueryParams
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
