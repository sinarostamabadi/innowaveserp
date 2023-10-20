import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/infoAreas/infoAreasActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useInfoAreasUIContext } from "../InfoAreasUIContext";
import { InfoAreaModel } from "../../../../../../core/_models/Employment/InfoAreaModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function InfoAreasTable() {
  const { t } = useTranslation();

  const infoAreasUIContext = useInfoAreasUIContext();

  const infoAreasUIProps = useMemo(() => {
    return {
      ids: infoAreasUIContext.ids,
      setIds: infoAreasUIContext.setIds,
      queryParams: infoAreasUIContext.queryParams,
      setQueryParams: infoAreasUIContext.setQueryParams,
      openEditInfoAreaPage: infoAreasUIContext.openEditInfoAreaPage,
      openDeleteInfoAreaDialog: infoAreasUIContext.openDeleteInfoAreaDialog,
    };
  }, [infoAreasUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.infoAreas }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(InfoAreaModel);
  const fieldKey = getFields(InfoAreaModel);
  const fields = InfoAreaModel;

  const dispatch = useDispatch();
  useEffect(() => {
    infoAreasUIProps.setIds([]);
    dispatch(actions.fetchInfoAreas(infoAreasUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoAreasUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("InfoArea." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("InfoArea." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditInfoAreaPage: infoAreasUIProps.openEditInfoAreaPage,
        openDeleteInfoAreaDialog: infoAreasUIProps.openDeleteInfoAreaDialog,
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
    sizePerPage: infoAreasUIProps.queryParams.PageSize,
    page: infoAreasUIProps.queryParams.PageNumber,
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
                  infoAreasUIProps.setQueryParams
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