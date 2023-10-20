import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coding/codingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCodingUIContext } from "../CodingUIContext";
import { CodingModel } from "../../../../../../core/_models/Accounting/CodingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CodingTable() {
  const { t } = useTranslation();

  const codingUIContext = useCodingUIContext();

  const codingUIProps = useMemo(() => {
    return {
      ids: codingUIContext.ids,
      setIds: codingUIContext.setIds,
      queryParams: codingUIContext.queryParams,
      setQueryParams: codingUIContext.setQueryParams,
      openEditCodingPage: codingUIContext.openEditCodingPage,
      openDeleteCodingDialog: codingUIContext.openDeleteCodingDialog,
    };
  }, [codingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.coding }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CodingModel);
  const fieldKey = getFields(CodingModel);
  const fields = CodingModel;

  const dispatch = useDispatch();
  useEffect(() => {
    codingUIProps.setIds([]);
    dispatch(actions.fetchCoding(codingUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Coding." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Coding." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCodingPage: codingUIProps.openEditCodingPage,
        openDeleteCodingDialog: codingUIProps.openDeleteCodingDialog,
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
    sizePerPage: codingUIProps.queryParams.PageSize,
    page: codingUIProps.queryParams.PageNumber,
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
                  codingUIProps.setQueryParams
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