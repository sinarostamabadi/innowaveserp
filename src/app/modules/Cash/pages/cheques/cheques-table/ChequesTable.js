import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cheques/chequesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useChequesUIContext } from "../ChequesUIContext";
import { ChequeModel } from "../../../../../../core/_models/Cash/ChequeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ChequesTable() {
  const { t } = useTranslation();

  const chequesUIContext = useChequesUIContext();

  const chequesUIProps = useMemo(() => {
    return {
      ids: chequesUIContext.ids,
      setIds: chequesUIContext.setIds,
      queryParams: chequesUIContext.queryParams,
      setQueryParams: chequesUIContext.setQueryParams,
      openEditChequePage: chequesUIContext.openEditChequePage,
      openDeleteChequeDialog: chequesUIContext.openDeleteChequeDialog,
    };
  }, [chequesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.cheques }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ChequeModel);
  const fieldKey = getFields(ChequeModel);
  const fields = ChequeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    chequesUIProps.setIds([]);
    dispatch(actions.fetchCheques(chequesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Cheque." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Cheque." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditChequePage: chequesUIProps.openEditChequePage,
        openDeleteChequeDialog: chequesUIProps.openDeleteChequeDialog,
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
    sizePerPage: chequesUIProps.queryParams.PageSize,
    page: chequesUIProps.queryParams.PageNumber,
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
                  chequesUIProps.setQueryParams
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