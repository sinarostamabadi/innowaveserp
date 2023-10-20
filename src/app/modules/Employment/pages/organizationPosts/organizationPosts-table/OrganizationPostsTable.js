import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/organizationPosts/organizationPostsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useOrganizationPostsUIContext } from "../OrganizationPostsUIContext";
import { OrganizationPostModel } from "../../../../../../core/_models/Employment/OrganizationPostModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function OrganizationPostsTable() {
  const { t } = useTranslation();

  const organizationPostsUIContext = useOrganizationPostsUIContext();

  const organizationPostsUIProps = useMemo(() => {
    return {
      ids: organizationPostsUIContext.ids,
      setIds: organizationPostsUIContext.setIds,
      queryParams: organizationPostsUIContext.queryParams,
      setQueryParams: organizationPostsUIContext.setQueryParams,
      openEditOrganizationPostPage: organizationPostsUIContext.openEditOrganizationPostPage,
      openDeleteOrganizationPostDialog: organizationPostsUIContext.openDeleteOrganizationPostDialog,
    };
  }, [organizationPostsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.organizationPosts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(OrganizationPostModel);
  const fieldKey = getFields(OrganizationPostModel);
  const fields = OrganizationPostModel;

  const dispatch = useDispatch();
  useEffect(() => {
    organizationPostsUIProps.setIds([]);
    dispatch(actions.fetchOrganizationPosts(organizationPostsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationPostsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("OrganizationPost." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("OrganizationPost." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOrganizationPostPage: organizationPostsUIProps.openEditOrganizationPostPage,
        openDeleteOrganizationPostDialog: organizationPostsUIProps.openDeleteOrganizationPostDialog,
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
    sizePerPage: organizationPostsUIProps.queryParams.PageSize,
    page: organizationPostsUIProps.queryParams.PageNumber,
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
                  organizationPostsUIProps.setQueryParams
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