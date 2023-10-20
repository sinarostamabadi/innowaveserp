import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, CardDeck } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getAllYears } from "../../../General/_redux/years/yearsCrud";
import { getStorage, setStorage } from "src/core/_helpers/LocalStorageHelpers";

export default function DefaultYear() {
  const { t } = useTranslation();

  const [selectedYear, setSelectedYear] = useState(
    !!getStorage("defaultYear") ? JSON.parse(getStorage("defaultYear")).YearId: ""
  );
  useEffect(() => {
    if (!!selectedYear && !!years && years.length)
      setStorage("defaultYear",
        JSON.stringify({
          YearId: selectedYear,
          Title: years.filter((x) => x.YearId == selectedYear)[0]
            .Title,
        })
      );
  }, [selectedYear]);

  const [years, setYears] = useState([]);
  useEffect(() => {
    getAllYears().then(({ data }) => {
      setYears((years) => [
        { YearId: "", Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, []);

  return (
  
      <Card className="card-custom card-stretch gutter-b">
        <Card.Header className="border-0 pt-5">
          <Card.Title className="font-weight-bolder">
            <h3>{t("msg.SelectDefaultYear")}</h3>
          </Card.Title>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <Row>
            <Col xs="12">
              <p className="text-center font-weight-normal font-size-lg pb-7">
                توجه: انتخاب سال مالی پیشفرض الزامی می‌باشد
                <br />
                لطفا سال مربوطه را انتخاب نمایید.
              </p>
              <select
                id="YearId"
                name="YearId"
                label={t("Year.Entity")}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="form-control w-100"
              >
                {years.map((year) => (
                  <option
                    key={year.YearId}
                    value={year.YearId}
                  >
                    {year.Title}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Card.Body>
      </Card>
  );
}
