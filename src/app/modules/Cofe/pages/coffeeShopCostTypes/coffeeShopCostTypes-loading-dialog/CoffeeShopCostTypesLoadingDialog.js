import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../core/_partials/controls";
export function CoffeeShopCostTypesLoadingDialog() {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.coffeeShopCostTypes.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="در حال بارگذاری..." />;
}
