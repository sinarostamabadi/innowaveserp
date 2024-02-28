import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, CardDeck } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getAllWarehouses } from "../../../General/_redux/warehouses/warehousesCrud";
import { getStorage, setStorage } from "src/core/_helpers/LocalStorageHelpers";

export default function DefaultWarehouse() {
  const { t } = useTranslation();

  const [selectedWarehouse, setSelectedWarehouse] = useState(
    !!getStorage("defaultWarehouse") ? JSON.parse(getStorage("defaultWarehouse")).WarehouseId: ""
  );
  useEffect(() => {
    if (!!selectedWarehouse && !!warehouses && warehouses.length)
      setStorage("defaultWarehouse",
        JSON.stringify({
          WarehouseId: selectedWarehouse,
          Title: warehouses.filter((x) => x.WarehouseId == selectedWarehouse)[0]
            .Title,
        })
      );
  }, [selectedWarehouse]);

  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    getAllWarehouses().then(({ data }) => {
      setWarehouses((warehouses) => [
        { WarehouseId: "", Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, []);

  return (
      <Card className="card-custom card-stretch gutter-b">
        <Card.Header className="border-0 pt-5">
          <Card.Title className="font-weight-bolder">
            <h3>{t("msg.SelectDefaultWarehouse")}</h3>
          </Card.Title>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <Row>
            <Col xs="12">
              <p className="text-center font-weight-normal font-size-lg pb-7">
              Note: It is mandatory to select the default warehouse
                <br />
                Please select the relevant warehouse.
              </p>
              <select
                id="WarehouseId"
                name="WarehouseId"
                label={t("Warehouse.Entity")}
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                className="form-control w-100"
              >
                {warehouses.map((warehouse) => (
                  <option
                    key={warehouse.WarehouseId}
                    value={warehouse.WarehouseId}
                  >
                    {warehouse.Title}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Card.Body>
      </Card>
  );
}
