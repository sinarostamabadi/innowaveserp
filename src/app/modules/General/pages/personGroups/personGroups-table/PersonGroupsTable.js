import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/personGroups/personGroupsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePersonGroupsUIContext } from "../PersonGroupsUIContext";
import { PersonGroupModel } from "../../../../../../core/_models/General/PersonGroupModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PersonGroupsTable() {
  const { t } = useTranslation();

  const personGroupsUIContext = usePersonGroupsUIContext();

  const personGroupsUIProps = useMemo(() => {
    return {
      ids: personGroupsUIContext.ids,
      setIds: personGroupsUIContext.setIds,
      queryParams: personGroupsUIContext.queryParams,
      setQueryParams: personGroupsUIContext.setQueryParams,
      openEditPersonGroupPage: personGroupsUIContext.openEditPersonGroupPage,
      openDeletePersonGroupDialog:
        personGroupsUIContext.openDeletePersonGroupDialog,
    };
  }, [personGroupsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.personGroups }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PersonGroupModel);
  const fieldKey = getFields(PersonGroupModel);
  const fields = PersonGroupModel;

  const dispatch = useDispatch();
  useEffect(() => {
    personGroupsUIProps.setIds([]);
    dispatch(actions.fetchPersonGroups(personGroupsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personGroupsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("PersonGroup." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPersonGroupPage: personGroupsUIProps.openEditPersonGroupPage,
        openDeletePersonGroupDialog:
          personGroupsUIProps.openDeletePersonGroupDialog,
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
    sizePerPage: personGroupsUIProps.queryParams.PageSize,
    page: personGroupsUIProps.queryParams.PageNumber,
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
                  personGroupsUIProps.setQueryParams
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
