import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/buyRequests/buyRequestsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../core/_helpers";
import {ActionsColumnFormatter} from "./actions/ActionsColumnFormatter";
import {DateFaColumnFormatter, MoneyColumnFormatter} from "../../../../../core/_formatters";
import { Pagination, Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../../../core/_partials/controls";
import { useBuyRequestsUIContext } from "../buyRequests/BuyRequestsUIContext";
import { BuyRequestDetailModel } from "../../../../../core/_models/PurchaseOrder/BuyRequestDetailModel";
import {
  getConfig,
  getFields,
} from "../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { setStorage } from "../../../../../core/_helpers";

export default function BuyCartable({
  history
}) {
  const { t } = useTranslation();
  const defaultFilter = {
    Property: "BuyRequestStatusId",
    Operation: 5,
    Values: ["1"]
  };
  const [ids, setIds] = useState([]);
  const [entities, setEntities] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const configs = getConfig(BuyRequestDetailModel, "BuyRequestDetailId", "desc");
  const [queryParams, setQueryParams] = useState({...configs.initialFilter, Filters: [defaultFilter]});
  const fieldKey = getFields(BuyRequestDetailModel);
  const fields = BuyRequestDetailModel;

  const dispatch = useDispatch();
  useEffect(() => {
    setListLoading(true);

    axios.post("BuyRequestDetail/get", {
      Filters: [], //{ Property: "FullNameFa", Operation: 7, Values: [query] }
      OrderBy: "BuyRequestDetailId asc",
      PageNumber: 1,
      PageSize: 10,
    })
    .then(({ data }) => {
      setListLoading(false);
      setEntities(data.Items);
      setTotalCount(data.TotalCount);
    }).catch(()=> {
      setListLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entities.length , dispatch]);

  useEffect(() => {
    console.log("ids > ", ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const columns = [
    {
      dataField: "Product.Name",
      text: t("BuyRequestDetail.Product"),
      sort: fields.ProductId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.CreationDate,
      text: t("BuyRequestDetail.CreationDate"),
      sort: fields.CreationDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "Amount",
      text: t("BuyRequestDetail.Amount"),
      sort: fields.Amount.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "ManagerAmount",
      text: t("BuyRequestDetail.ManagerAmount"),
      sort: fields.ManagerAmount.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.MainWarehouseAmount,
      text: t("BuyRequestDetail.MainWarehouseAmount"),
      sort: fields.MainWarehouseAmount.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "ManagerDescription",
      text: t("BuyRequestDetail.ManagerDescription"),
      sort: fields.ManagerDescription.sortable,
      sortCaret: sortCaret,
    },
    // {
    //   dataField: "action",
    //   text: t("Common.Action"),
    //   formatter: ActionsColumnFormatter,
    //   formatExtraData: {
    //     approve: null,
    //     deny: null,
    //     show: (id)=> {
    //       history.push(`/PurchaseOrder/buyRequests/${id}/manager`);
    //     },
    //     t: t,
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
  ];

  function createBuyByRequestDetail() {
    const rndId = Math.floor(Math.random() * 100) + 1;
    setStorage("pack_" + rndId, ids);

    history.push("/PurchaseOrder/Buys/new/" + rndId);
  }

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
        <CardHeader title={t("Common.BuyCartable")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={createBuyByRequestDetail}
          >
            {t("Common.Register")} {' '} {t("Buy.Entity")}
          </button>
        </CardHeaderToolbar>
        </CardHeader>
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
                    selectRow={getSelectRow({
                      entities,
                      ids: ids,
                      setIds: setIds,
                      keyField: configs.id
                    })}
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
