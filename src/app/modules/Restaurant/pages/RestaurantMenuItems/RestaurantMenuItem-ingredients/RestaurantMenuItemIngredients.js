import React from "react";
import { Row, Col } from "react-bootstrap";
import { RestaurantMenuItemIngredientsToolbar } from "./RestaurantMenuItemIngredientsToolbar";
import { RestaurantMenuItemIngredientsTable } from "./RestaurantMenuItemIngredientsTable";
import { RestaurantMenuItemIngredientDeleteDialog } from "./RestaurantMenuItemIngredientDeleteDialog";
import { RestaurantMenuItemIngredientEditDialog } from "./RestaurantMenuItemIngredient-edit-dialog/RestaurantMenuItemIngredientEditDialog";

export function RestaurantMenuItemIngredients() {
  return (
    <Row>
      <Col lg={12}>
        <RestaurantMenuItemIngredientEditDialog />
        <RestaurantMenuItemIngredientDeleteDialog />
        <div className="form margin-b-30">
          <RestaurantMenuItemIngredientsToolbar />
        </div>
        <RestaurantMenuItemIngredientsTable />
      </Col>
    </Row>
  );
}
