import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/poses/posesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { usePosesUIContext } from "../PosesUIContext";
import { PosModel } from "src/core/_models/General/PosModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PosesTable() {
  const { t } = useTranslation();

  const posesUIContext = usePosesUIContext();

  const posesUIProps = useMemo(() => {
    return {
      ids: posesUIContext.ids,
      setIds: posesUIContext.setIds,
      queryParams: posesUIContext.queryParams,
      setQueryParams: posesUIContext.setQueryParams,
      openEditPosPage: posesUIContext.openEditPosPage,
      openDeletePosDialog: posesUIContext.openDeletePosDialog,
    };
  }, [posesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.poses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PosModel);
  const fieldKey = getFields(PosModel);
  const fields = PosModel;

  const dispatch = useDispatch();
  useEffect(() => {
    posesUIProps.setIds([]);
    dispatch(actions.fetchPoses(posesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.SerialNo,
      text: t("Pos." + fields.SerialNo.display),
      sort: fields.SerialNo.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Bank.TitleFa,
      text: t("Pos." + fields.Bank.display),
      sort: fields.BankId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "DefaultBankAccount.Title",
      text: t("Pos." + fields.DefaultBankAccount.display),
      sort: fields.DefaultBankAccountId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.PosIpAddress,
      text: t("Pos." + fields.PosIpAddress.display),
      sort: fields.PosIpAddress.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TerminalId,
      text: t("Pos." + fields.TerminalId.display),
      sort: fields.TerminalId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPosPage: posesUIProps.openEditPosPage,
        openDeletePosDialog: posesUIProps.openDeletePosDialog,
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
    sizePerPage: posesUIProps.queryParams.PageSize,
    page: posesUIProps.queryParams.PageNumber,
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
                  posesUIProps.setQueryParams
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
