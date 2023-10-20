import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/promissoryNotes/promissoryNotesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePromissoryNotesUIContext } from "../PromissoryNotesUIContext";
import { PromissoryNoteModel } from "../../../../../../core/_models/Cash/PromissoryNoteModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PromissoryNotesTable() {
  const { t } = useTranslation();

  const promissoryNotesUIContext = usePromissoryNotesUIContext();

  const promissoryNotesUIProps = useMemo(() => {
    return {
      ids: promissoryNotesUIContext.ids,
      setIds: promissoryNotesUIContext.setIds,
      queryParams: promissoryNotesUIContext.queryParams,
      setQueryParams: promissoryNotesUIContext.setQueryParams,
      openEditPromissoryNotePage: promissoryNotesUIContext.openEditPromissoryNotePage,
      openDeletePromissoryNoteDialog: promissoryNotesUIContext.openDeletePromissoryNoteDialog,
    };
  }, [promissoryNotesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.promissoryNotes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PromissoryNoteModel);
  const fieldKey = getFields(PromissoryNoteModel);
  const fields = PromissoryNoteModel;

  const dispatch = useDispatch();
  useEffect(() => {
    promissoryNotesUIProps.setIds([]);
    dispatch(actions.fetchPromissoryNotes(promissoryNotesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promissoryNotesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("PromissoryNote." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("PromissoryNote." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPromissoryNotePage: promissoryNotesUIProps.openEditPromissoryNotePage,
        openDeletePromissoryNoteDialog: promissoryNotesUIProps.openDeletePromissoryNoteDialog,
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
    sizePerPage: promissoryNotesUIProps.queryParams.PageSize,
    page: promissoryNotesUIProps.queryParams.PageNumber,
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
                  promissoryNotesUIProps.setQueryParams
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