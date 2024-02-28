import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/specialDayTypes/specialDayTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSpecialDayTypesUIContext } from "../SpecialDayTypesUIContext";
import { SpecialDayTypeModel } from "../../../../../../core/_models/General/SpecialDayTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SpecialDayTypesTable() {
  const { t } = useTranslation();

  const specialDayTypesUIContext = useSpecialDayTypesUIContext();

  const specialDayTypesUIProps = useMemo(() => {
    return {
      ids: specialDayTypesUIContext.ids,
      setIds: specialDayTypesUIContext.setIds,
      queryParams: specialDayTypesUIContext.queryParams,
      setQueryParams: specialDayTypesUIContext.setQueryParams,
      openEditSpecialDayTypePage:
        specialDayTypesUIContext.openEditSpecialDayTypePage,
      openDeleteSpecialDayTypeDialog:
        specialDayTypesUIContext.openDeleteSpecialDayTypeDialog,
    };
  }, [specialDayTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.specialDayTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SpecialDayTypeModel);
  const fieldKey = getFields(SpecialDayTypeModel);
  const fields = SpecialDayTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    specialDayTypesUIProps.setIds([]);
    dispatch(actions.fetchSpecialDayTypes(specialDayTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specialDayTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SpecialDayType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SpecialDayType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSpecialDayTypePage:
          specialDayTypesUIProps.openEditSpecialDayTypePage,
        openDeleteSpecialDayTypeDialog:
          specialDayTypesUIProps.openDeleteSpecialDayTypeDialog,
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
    sizePerPage: specialDayTypesUIProps.queryParams.PageSize,
    page: specialDayTypesUIProps.queryParams.PageNumber,
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
                  specialDayTypesUIProps.setQueryParams
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
