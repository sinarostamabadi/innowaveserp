import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/buyRequests/buyRequestsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../core/_helpers";
import {ActionsColumnFormatter} from "./actions/ActionsColumnFormatter";
import {DateFaColumnFormatter} from "../../../../../core/_formatters";
import { Pagination, Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../../../core/_partials/controls";
import { useBuyRequestsUIContext } from "../buyRequests/BuyRequestsUIContext";
import { BuyRequestModel } from "../../../../../core/_models/PurchaseOrder/BuyRequestModel";
import {
  getConfig,
  getFields,
} from "../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export default function WarehouseCartable({
  history
}) {
  const { t } = useTranslation();

  const { currentState } = useSelector(
    (state) => ({ currentState: state.buyRequests }),
    shallowEqual
  );

  const defaultFilter = {
    Property: "BuyRequestStatusId",
    Operation: 5,
    Values: ["2"]
  };
  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BuyRequestModel, "BuyRequestDate", "desc");
  const [queryParams, setQueryParams] = useState({...configs.initialFilter, Filters: [defaultFilter]});
  const fieldKey = getFields(BuyRequestModel);
  const fields = BuyRequestModel;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchBuyRequests(queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, dispatch]);

  const columns = [
    {
      dataField: "CreateBy.FullNameFa",
      text: t("BuyRequest.CreateBy"),
      sort: fields.CreateBy.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Warehouse.Title",
      text: t("BuyRequest.Warehouse"),
      sort: fields.WarehouseId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "BuyRequestStatus.Title",
      text: t("BuyRequest.BuyRequestStatus"),
      sort: fields.BuyRequestStatusId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.BuyRequestDate,
      text: t("BuyRequest." + fields.BuyRequestDate.display),
      sort: fields.BuyRequestDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "Description",
      text: t("BuyRequest.Description"),
      sort: fields.Description.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        approve: null,
        deny: null,
        show: (id)=> {
          history.push(`/PurchaseOrder/buyRequests/${id}/warehouse`);
        },
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
    sizePerPage: configs.initialFilter.pageSize,
    page: configs.initialFilter.pageNumber,
  };
  return (
    <>
      <Card>
        <CardHeader title={t("Common.WarehouseCartable")}/>
        <CardBody>
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
                    onTableChange={getHandlerTableChange(setQueryParams)}
                    {...paginationTableProps}
                  >
                    <PleaseWaitMessage entities={entities} />
                    <NoRecordsFoundMessage entities={entities} />
                  </BootstrapTable>
                </Pagination>
              );
            }}
          </PaginationProvider>
        </CardBody>
      </Card>
    </>
  );
}
