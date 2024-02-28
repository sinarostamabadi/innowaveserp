import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { CoffeeInvoicesPage } from "./coffeeInvoices/CoffeeInvoicesPage";
import { CoffeeInvoiceCostsPage } from "./coffeeInvoiceCosts/CoffeeInvoiceCostsPage";
import { CoffeeInvoiceDiscountsPage } from "./coffeeInvoiceDiscounts/CoffeeInvoiceDiscountsPage";
import { CoffeeInvoiceDtlsPage } from "./coffeeInvoiceDtls/CoffeeInvoiceDtlsPage";
import { CoffeeShopCostTypesPage } from "./coffeeShopCostTypes/CoffeeShopCostTypesPage";
import { CoffeeShopDiscountTypesPage } from "./coffeeShopDiscountTypes/CoffeeShopDiscountTypesPage";
import { MenuGroupsPage } from "./menuGroups/MenuGroupsPage";
import { MenuItemsPage } from "./menuItems/MenuItemsPage";
import { MenuItemAlbumsPage } from "./menuItemAlbums/MenuItemAlbumsPage";
import { MenuItemIngredientsesPage } from "./menuItemIngredientses/MenuItemIngredientsesPage";
import { MenuItemPricesPage } from "./menuItemPrices/MenuItemPricesPage";
import { MenuItemRatesPage } from "./menuItemRates/MenuItemRatesPage";

import { CofeDashboard } from "../dashboard/CofeDashboard";

import { CoffeeInvoiceEdit } from "./coffeeInvoices/coffeeInvoice-edit/CoffeeInvoiceEdit";
import { CoffeeInvoiceCostEdit } from "./coffeeInvoiceCosts/coffeeInvoiceCost-edit/CoffeeInvoiceCostEdit";
import { CoffeeInvoiceDiscountEdit } from "./coffeeInvoiceDiscounts/coffeeInvoiceDiscount-edit/CoffeeInvoiceDiscountEdit";
import { CoffeeInvoiceDtlEdit } from "./coffeeInvoiceDtls/coffeeInvoiceDtl-edit/CoffeeInvoiceDtlEdit";
import { CoffeeShopCostTypeEdit } from "./coffeeShopCostTypes/coffeeShopCostType-edit/CoffeeShopCostTypeEdit";
import { CoffeeShopDiscountTypeEdit } from "./coffeeShopDiscountTypes/coffeeShopDiscountType-edit/CoffeeShopDiscountTypeEdit";
import { MenuGroupEdit } from "./menuGroups/menuGroup-edit/MenuGroupEdit";
import { MenuItemEdit } from "./menuItems/menuItem-edit/MenuItemEdit";
import { MenuItemAlbumEdit } from "./menuItemAlbums/menuItemAlbum-edit/MenuItemAlbumEdit";
import { MenuItemIngredientsEdit } from "./menuItemIngredientses/menuItemIngredients-edit/MenuItemIngredientsEdit";
import { MenuItemPriceEdit } from "./menuItemPrices/menuItemPrice-edit/MenuItemPriceEdit";
import { MenuItemRateEdit } from "./menuItemRates/menuItemRate-edit/MenuItemRateEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Cofe" to="/Cofe/dashboard" />}

        {/* begin CofeDashboard */}
        <ContentRoute path="/Cofe/dashboard" component={CofeDashboard} />
        {/* end CofeDashboard */}

        {/* begin CoffeeInvoices */}
        <ContentRoute
          path="/Cofe/coffeeInvoices/new"
          component={CoffeeInvoiceEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeInvoices/:id/edit"
          component={CoffeeInvoiceEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeInvoices"
          component={CoffeeInvoicesPage}
        />
        {/* end CoffeeInvoices */}

        {/* begin CoffeeInvoiceCosts */}
        <ContentRoute
          path="/Cofe/coffeeInvoiceCosts/new"
          component={CoffeeInvoiceCostEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeInvoiceCosts/:id/edit"
          component={CoffeeInvoiceCostEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeInvoiceCosts"
          component={CoffeeInvoiceCostsPage}
        />
        {/* end CoffeeInvoiceCosts */}

        {/* begin CoffeeInvoiceDiscounts */}
        <ContentRoute
          path="/Cofe/coffeeInvoiceDiscounts/new"
          component={CoffeeInvoiceDiscountEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeInvoiceDiscounts/:id/edit"
          component={CoffeeInvoiceDiscountEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeInvoiceDiscounts"
          component={CoffeeInvoiceDiscountsPage}
        />
        {/* end CoffeeInvoiceDiscounts */}

        {/* begin CoffeeInvoiceDtls */}
        <ContentRoute
          path="/Cofe/coffeeInvoiceDtls/new"
          component={CoffeeInvoiceDtlEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeInvoiceDtls/:id/edit"
          component={CoffeeInvoiceDtlEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeInvoiceDtls"
          component={CoffeeInvoiceDtlsPage}
        />
        {/* end CoffeeInvoiceDtls */}

        {/* begin CoffeeShopCostTypes */}
        <ContentRoute
          path="/Cofe/coffeeShopCostTypes/new"
          component={CoffeeShopCostTypeEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeShopCostTypes/:id/edit"
          component={CoffeeShopCostTypeEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeShopCostTypes"
          component={CoffeeShopCostTypesPage}
        />
        {/* end CoffeeShopCostTypes */}

        {/* begin CoffeeShopDiscountTypes */}
        <ContentRoute
          path="/Cofe/coffeeShopDiscountTypes/new"
          component={CoffeeShopDiscountTypeEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeShopDiscountTypes/:id/edit"
          component={CoffeeShopDiscountTypeEdit}
        />
        <ContentRoute
          path="/Cofe/coffeeShopDiscountTypes"
          component={CoffeeShopDiscountTypesPage}
        />
        {/* end CoffeeShopDiscountTypes */}

        {/* begin MenuGroups */}
        <ContentRoute path="/Cofe/menuGroups/new" component={MenuGroupEdit} />
        <ContentRoute
          path="/Cofe/menuGroups/:id/edit"
          component={MenuGroupEdit}
        />
        <ContentRoute path="/Cofe/menuGroups" component={MenuGroupsPage} />
        {/* end MenuGroups */}

        {/* begin MenuItems */}
        <ContentRoute path="/Cofe/menuItems/new" component={MenuItemEdit} />
        <ContentRoute
          path="/Cofe/menuItems/:id/edit"
          component={MenuItemEdit}
        />
        <ContentRoute path="/Cofe/menuItems" component={MenuItemsPage} />
        {/* end MenuItems */}

        {/* begin MenuItemAlbums */}
        <ContentRoute
          path="/Cofe/menuItemAlbums/new"
          component={MenuItemAlbumEdit}
        />
        <ContentRoute
          path="/Cofe/menuItemAlbums/:id/edit"
          component={MenuItemAlbumEdit}
        />
        <ContentRoute
          path="/Cofe/menuItemAlbums"
          component={MenuItemAlbumsPage}
        />
        {/* end MenuItemAlbums */}

        {/* begin MenuItemIngredientses */}
        <ContentRoute
          path="/Cofe/menuItemIngredientses/new"
          component={MenuItemIngredientsEdit}
        />
        <ContentRoute
          path="/Cofe/menuItemIngredientses/:id/edit"
          component={MenuItemIngredientsEdit}
        />
        <ContentRoute
          path="/Cofe/menuItemIngredientses"
          component={MenuItemIngredientsesPage}
        />
        {/* end MenuItemIngredientses */}

        {/* begin MenuItemPrices */}
        <ContentRoute
          path="/Cofe/menuItemPrices/new"
          component={MenuItemPriceEdit}
        />
        <ContentRoute
          path="/Cofe/menuItemPrices/:id/edit"
          component={MenuItemPriceEdit}
        />
        <ContentRoute
          path="/Cofe/menuItemPrices"
          component={MenuItemPricesPage}
        />
        {/* end MenuItemPrices */}

        {/* begin MenuItemRates */}
        <ContentRoute
          path="/Cofe/menuItemRates/new"
          component={MenuItemRateEdit}
        />
        <ContentRoute
          path="/Cofe/menuItemRates/:id/edit"
          component={MenuItemRateEdit}
        />
        <ContentRoute
          path="/Cofe/menuItemRates"
          component={MenuItemRatesPage}
        />
        {/* end MenuItemRates */}
      </Switch>
    </Suspense>
  );
}
