import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { DateFaColumnFormatter } from "./column-formatters/DateFaColumnFormatter";
import * as uiHelpers from "./PersonSpecialDaysUIHelper";
import { Pagination } from "../../../../../../core/_partials/controls";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { usePersonSpecialDaysUIContext } from "./PersonSpecialDaysUIContext";
import { useTranslation } from "react-i18next";

export function PersonSpecialDaysTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const uiContext = usePersonSpecialDaysUIContext();
  const uiProps = useMemo(() => {
    return {
      personSpecialDays: uiContext.personSpecialDays,
      addPersonSpecialDay: uiContext.addPersonSpecialDay,
      totalCount: uiContext.totalCount,
      actionsLoading: uiContext.actionsLoading,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditPersonSpecialDayDialog: uiContext.openEditPersonSpecialDayDialog,
      openDeletePersonSpecialDayDialog:
        uiContext.openDeletePersonSpecialDayDialog,
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      personId: uiContext.personId,
    };
  }, [uiContext]);

  const columns = [
    {
      dataField: "SpecialDayType.TitleFa",
      text: t("PersonSpecialDay.SpecialDayType"),
      sort: false,
    },
    {
      dataField: "PersonSpecialDayDate",
      text: t("PersonSpecialDay.PersonSpecialDayDate"),
      formatter: DateFaColumnFormatter,
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditPersonSpecialDayDialog: uiProps.openEditPersonSpecialDayDialog,
        openDeletePersonSpecialDayDialog:
          uiProps.openDeletePersonSpecialDayDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: uiProps.totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: uiProps.queryParams.PageSize,
    page: uiProps.queryParams.PageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={uiProps.listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bordered={false}
                bootstrap4
                remote
                keyField="PersonSpecialDayId"
                data={
                  !!uiProps.personSpecialDays === false
                    ? []
                    : uiProps.personSpecialDays
                }
                columns={columns}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={uiProps.personSpecialDays} />
                <NoRecordsFoundMessage entities={uiProps.personSpecialDays} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
