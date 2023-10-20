import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/provinces/provincesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useProvincesUIContext } from "../ProvincesUIContext";
import { ProvinceModel } from "../../../../../../core/_models/General/ProvinceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ProvincesTable() {
  const { t } = useTranslation();

  const provincesUIContext = useProvincesUIContext();

  const provincesUIProps = useMemo(() => {
    return {
      ids: provincesUIContext.ids,
      setIds: provincesUIContext.setIds,
      queryParams: provincesUIContext.queryParams,
      setQueryParams: provincesUIContext.setQueryParams,
      openEditProvincePage: provincesUIContext.openEditProvincePage,
      openDeleteProvinceDialog: provincesUIContext.openDeleteProvinceDialog,
    };
  }, [provincesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.provinces }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ProvinceModel);
  const fieldKey = getFields(ProvinceModel);
  const fields = ProvinceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    provincesUIProps.setIds([]);
    dispatch(actions.fetchProvinces(provincesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provincesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Province." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Province." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProvincePage: provincesUIProps.openEditProvincePage,
        openDeleteProvinceDialog: provincesUIProps.openDeleteProvinceDialog,
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
    sizePerPage: provincesUIProps.queryParams.PageSize,
    page: provincesUIProps.queryParams.PageNumber,
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
                  provincesUIProps.setQueryParams
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