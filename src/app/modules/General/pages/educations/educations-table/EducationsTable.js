import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/educations/educationsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEducationsUIContext } from "../EducationsUIContext";
import { EducationModel } from "../../../../../../core/_models/General/EducationModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EducationsTable() {
  const { t } = useTranslation();

  const educationsUIContext = useEducationsUIContext();

  const educationsUIProps = useMemo(() => {
    return {
      ids: educationsUIContext.ids,
      setIds: educationsUIContext.setIds,
      queryParams: educationsUIContext.queryParams,
      setQueryParams: educationsUIContext.setQueryParams,
      openEditEducationPage: educationsUIContext.openEditEducationPage,
      openDeleteEducationDialog: educationsUIContext.openDeleteEducationDialog,
    };
  }, [educationsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.educations }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EducationModel);
  const fieldKey = getFields(EducationModel);
  const fields = EducationModel;

  const dispatch = useDispatch();
  useEffect(() => {
    educationsUIProps.setIds([]);
    dispatch(actions.fetchEducations(educationsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [educationsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Education." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Education." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEducationPage: educationsUIProps.openEditEducationPage,
        openDeleteEducationDialog: educationsUIProps.openDeleteEducationDialog,
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
    sizePerPage: educationsUIProps.queryParams.PageSize,
    page: educationsUIProps.queryParams.PageNumber,
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
                  educationsUIProps.setQueryParams
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