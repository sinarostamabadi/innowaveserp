import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getAllRestaurants } from "../../../General/_redux/Restaurants/RestaurantsCrud";
import {
  getStorage,
  setStorage,
} from "../../../../../core/_helpers/LocalStorageHelpers";

export default function DefaultRestaurant() {
  const { t } = useTranslation();

  const [selectedRestaurant, setSelectedRestaurant] = useState(
    !!getStorage("defaultRestaurant")
      ? JSON.parse(getStorage("defaultRestaurant")).RestaurantId
      : ""
  );
  useEffect(() => {
    if (!!selectedRestaurant && !!restaurants && restaurants.length)
      setStorage(
        "defaultRestaurant",
        JSON.stringify({
          RestaurantId: selectedRestaurant,
          Title: restaurants.filter(
            (x) => x.RestaurantId == selectedRestaurant
          )[0].Title,
        })
      );
  }, [selectedRestaurant]);

  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getAllRestaurants().then(({ data }) => {
      setRestaurants((restaurants) => [
        { RestaurantId: "", Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, []);

  return (
    <Card className="card-custom card-stretch gutter-b">
      <Card.Header className="border-0 pt-5">
        <Card.Title className="font-weight-bolder">
          <h3>{t("msg.SelectDefaultRestaurant")}</h3>
        </Card.Title>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Row>
          <Col xs="12">
            <p className="text-center font-weight-normal font-size-lg pb-7">
            Note: It is mandatory to select the default restaurant
              <br />
              Please select the relevant restaurant.
            </p>
            <select
              id="RestaurantId"
              name="RestaurantId"
              label={t("Restaurant.Entity")}
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="form-control w-100"
            >
              {restaurants.map((restaurant) => (
                <option
                  key={restaurant.RestaurantId}
                  value={restaurant.RestaurantId}
                >
                  {restaurant.Title}
                </option>
              ))}
            </select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
