
import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { AddressCategoriesPage } from "./addressCategories/AddressCategoriesPage";
import { BanksPage } from "./banks/BanksPage";
import { CalendarsPage } from "./calendars/CalendarsPage";
import { CashsPage } from "./cashs/CashsPage";
import { CitiesPage } from "./cities/CitiesPage";
import { CoffeeShopsPage } from "./coffeeShops/CoffeeShopsPage";
import { CostsPage } from "./costs/CostsPage";
import { CountriesPage } from "./countries/CountriesPage";
import { CurrenciesPage } from "./currencies/CurrenciesPage";
import { CurrencyRatesPage } from "./currencyRates/CurrencyRatesPage";
import { DiscountTypesPage } from "./discountTypes/DiscountTypesPage";
import { EducationsPage } from "./educations/EducationsPage";
import { MajorsPage } from "./majors/MajorsPage";
import { PersonSpecialDaysPage } from "./personSpecialDays/PersonSpecialDaysPage";
import { PhoneTypesPage } from "./phoneTypes/PhoneTypesPage";
import { PosesPage } from "./poses/PosesPage";
import { PosUsersPage } from "./posUsers/PosUsersPage";
import { ProvincesPage } from "./provinces/ProvincesPage";
import { SettingPage } from "./setting/SettingPage";
import { TownshipsPage } from "./townships/TownshipsPage";
import { UnitsPage } from "./units/UnitsPage";
import { UnitConversionsPage } from "./unitConversions/UnitConversionsPage";
import { UnitMeasureGroupsPage } from "./unitMeasureGroups/UnitMeasureGroupsPage";
import { WarehousesPage } from "./warehouses/WarehousesPage";
import { PersonGroupsPage } from "./personGroups/PersonGroupsPage";
import { YearsPage } from "./years/YearsPage";
import { ScalesPage } from "./scales/ScalesPage";

import { GeneralDashboard } from "../dashboard/GeneralDashboard";

import { AddressCategoryEdit } from "./addressCategories/addressCategory-edit/AddressCategoryEdit";
import { BankEdit } from "./banks/bank-edit/BankEdit";
import { CalendarEdit } from "./calendars/calendar-edit/CalendarEdit";
import { CashEdit } from "./cashs/cash-edit/CashEdit";
import { CityEdit } from "./cities/city-edit/CityEdit";
import { CoffeeShopEdit } from "./coffeeShops/coffeeShop-edit/CoffeeShopEdit";
import { CostEdit } from "./costs/cost-edit/CostEdit";
import { CountryEdit } from "./countries/country-edit/CountryEdit";
import { CurrencyEdit } from "./currencies/currency-edit/CurrencyEdit";
import { CurrencyRateEdit } from "./currencyRates/currencyRate-edit/CurrencyRateEdit";
import { DiscountTypeEdit } from "./discountTypes/discountType-edit/DiscountTypeEdit";
import { EducationEdit } from "./educations/education-edit/EducationEdit";
import { MajorEdit } from "./majors/major-edit/MajorEdit";
import { PersonSpecialDayEdit } from "./personSpecialDays/personSpecialDay-edit/PersonSpecialDayEdit";
import { PhoneTypeEdit } from "./phoneTypes/phoneType-edit/PhoneTypeEdit";
import { PosEdit } from "./poses/pos-edit/PosEdit";
import { PosUserEdit } from "./posUsers/posUser-edit/PosUserEdit";
import { ProvinceEdit } from "./provinces/province-edit/ProvinceEdit";
import { SettingEdit } from "./setting/setting-edit/SettingEdit";
import { TownshipEdit } from "./townships/township-edit/TownshipEdit";
import { UnitEdit } from "./units/unit-edit/UnitEdit";
import { UnitConversionEdit } from "./unitConversions/unitConversion-edit/UnitConversionEdit";
import { UnitMeasureGroupEdit } from "./unitMeasureGroups/unitMeasureGroup-edit/UnitMeasureGroupEdit";
import { WarehouseEdit } from "./warehouses/warehouse-edit/WarehouseEdit";
import { PersonGroupEdit } from "./personGroups/personGroup-edit/PersonGroupEdit";
import { YearEdit } from "./years/year-edit/YearEdit";
import { ScaleEdit } from "./scales/scale-edit/ScaleEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/general" to="/general/dashboard" />}
        
        {/* begin GeneralDashboard */}
        <ContentRoute path="/general/dashboard" component={GeneralDashboard} />
        {/* end GeneralDashboard */}  
		

			{/* begin AddressCategories */}
			<ContentRoute path="/general/addressCategories/new" component={AddressCategoryEdit} />
			<ContentRoute path="/general/addressCategories/:id/edit" component={AddressCategoryEdit} />
			<ContentRoute path="/general/addressCategories" component={AddressCategoriesPage} />
			{/* end AddressCategories */}

			{/* begin Banks */}
			<ContentRoute path="/general/banks/new" component={BankEdit} />
			<ContentRoute path="/general/banks/:id/edit" component={BankEdit} />
			<ContentRoute path="/general/banks" component={BanksPage} />
			{/* end Banks */}

			{/* begin Calendars */}
			<ContentRoute path="/General/calendars/new" component={CalendarEdit} />
			<ContentRoute path="/General/calendars/:id/edit" component={CalendarEdit} />
			<ContentRoute path="/General/calendars" component={CalendarsPage} />
			{/* end Calendars */}

			{/* begin Cashs */}
			<ContentRoute path="/General/cashs/new" component={CashEdit} />
			<ContentRoute path="/General/cashs/:id/edit" component={CashEdit} />
			<ContentRoute path="/General/cashs" component={CashsPage} />
			{/* end Cashs */}

			{/* begin Cities */}
			<ContentRoute path="/General/cities/new" component={CityEdit} />
			<ContentRoute path="/General/cities/:id/edit" component={CityEdit} />
			<ContentRoute path="/General/cities" component={CitiesPage} />
			{/* end Cities */}

			{/* begin CoffeeShops */}
			<ContentRoute path="/General/coffeeShops/new" component={CoffeeShopEdit} />
			<ContentRoute path="/General/coffeeShops/:id/edit" component={CoffeeShopEdit} />
			<ContentRoute path="/General/coffeeShops" component={CoffeeShopsPage} />
			{/* end CoffeeShops */}

			{/* begin Costs */}
			<ContentRoute path="/General/costs/new" component={CostEdit} />
			<ContentRoute path="/General/costs/:id/edit" component={CostEdit} />
			<ContentRoute path="/General/costs" component={CostsPage} />
			{/* end Costs */}

			{/* begin Countries */}
			<ContentRoute path="/General/countries/new" component={CountryEdit} />
			<ContentRoute path="/General/countries/:id/edit" component={CountryEdit} />
			<ContentRoute path="/General/countries" component={CountriesPage} />
			{/* end Countries */}

			{/* begin Currencies */}
			<ContentRoute path="/General/currencies/new" component={CurrencyEdit} />
			<ContentRoute path="/General/currencies/:id/edit" component={CurrencyEdit} />
			<ContentRoute path="/General/currencies" component={CurrenciesPage} />
			{/* end Currencies */}

			{/* begin CurrencyRates */}
			<ContentRoute path="/General/currencyRates/new" component={CurrencyRateEdit} />
			<ContentRoute path="/General/currencyRates/:id/edit" component={CurrencyRateEdit} />
			<ContentRoute path="/General/currencyRates" component={CurrencyRatesPage} />
			{/* end CurrencyRates */}

			{/* begin DiscountTypes */}
			<ContentRoute path="/General/discountTypes/new" component={DiscountTypeEdit} />
			<ContentRoute path="/General/discountTypes/:id/edit" component={DiscountTypeEdit} />
			<ContentRoute path="/General/discountTypes" component={DiscountTypesPage} />
			{/* end DiscountTypes */}

			{/* begin Educations */}
			<ContentRoute path="/General/educations/new" component={EducationEdit} />
			<ContentRoute path="/General/educations/:id/edit" component={EducationEdit} />
			<ContentRoute path="/General/educations" component={EducationsPage} />
			{/* end Educations */}

			{/* begin Majors */}
			<ContentRoute path="/General/majors/new" component={MajorEdit} />
			<ContentRoute path="/General/majors/:id/edit" component={MajorEdit} />
			<ContentRoute path="/General/majors" component={MajorsPage} />
			{/* end Majors */}

			{/* begin PersonGroups */}
			<ContentRoute path="/General/personGroups/new" component={PersonGroupEdit} />
			<ContentRoute path="/General/personGroups/:id/edit" component={PersonGroupEdit} />
			<ContentRoute path="/General/personGroups" component={PersonGroupsPage} />
			{/* end PersonGroups */}

			{/* begin PersonSpecialDays */}
			<ContentRoute path="/General/personSpecialDays/new" component={PersonSpecialDayEdit} />
			<ContentRoute path="/General/personSpecialDays/:id/edit" component={PersonSpecialDayEdit} />
			<ContentRoute path="/General/personSpecialDays" component={PersonSpecialDaysPage} />
			{/* end PersonSpecialDays */}

			{/* begin PhoneTypes */}
			<ContentRoute path="/general/phoneTypes/new" component={PhoneTypeEdit} />
			<ContentRoute path="/general/phoneTypes/:id/edit" component={PhoneTypeEdit} />
			<ContentRoute path="/general/phoneTypes" component={PhoneTypesPage} />
			{/* end PhoneTypes */}

			{/* begin Poses */}
			<ContentRoute path="/General/poses/new" component={PosEdit} />
			<ContentRoute path="/General/poses/:id/edit" component={PosEdit} />
			<ContentRoute path="/General/poses" component={PosesPage} />
			{/* end Poses */}

			{/* begin PosUsers */}
			<ContentRoute path="/General/posUsers/new" component={PosUserEdit} />
			<ContentRoute path="/General/posUsers/:id/edit" component={PosUserEdit} />
			<ContentRoute path="/General/posUsers" component={PosUsersPage} />
			{/* end PosUsers */}

			{/* begin Provinces */}
			<ContentRoute path="/General/provinces/new" component={ProvinceEdit} />
			<ContentRoute path="/General/provinces/:id/edit" component={ProvinceEdit} />
			<ContentRoute path="/General/provinces" component={ProvincesPage} />
			{/* end Provinces */}

			{/* begin Setting */}
			<ContentRoute path="/General/setting/new" component={SettingEdit} />
			<ContentRoute path="/General/setting/:id/edit" component={SettingEdit} />
			<ContentRoute path="/General/setting" component={SettingPage} />
			{/* end Setting */}

			{/* begin Townships */}
			<ContentRoute path="/General/townships/new" component={TownshipEdit} />
			<ContentRoute path="/General/townships/:id/edit" component={TownshipEdit} />
			<ContentRoute path="/General/townships" component={TownshipsPage} />
			{/* end Townships */}

			{/* begin Units */}
			<ContentRoute path="/General/units/new" component={UnitEdit} />
			<ContentRoute path="/General/units/:id/edit" component={UnitEdit} />
			<ContentRoute path="/General/units" component={UnitsPage} />
			{/* end Units */}

			{/* begin UnitConversions */}
			<ContentRoute path="/General/unitConversions/new" component={UnitConversionEdit} />
			<ContentRoute path="/General/unitConversions/:id/edit" component={UnitConversionEdit} />
			<ContentRoute path="/General/unitConversions" component={UnitConversionsPage} />
			{/* end UnitConversions */}

			{/* begin UnitMeasureGroups */}
			<ContentRoute path="/General/unitMeasureGroups/new" component={UnitMeasureGroupEdit} />
			<ContentRoute path="/General/unitMeasureGroups/:id/edit" component={UnitMeasureGroupEdit} />
			<ContentRoute path="/General/unitMeasureGroups" component={UnitMeasureGroupsPage} />
			{/* end UnitMeasureGroups */}

			{/* begin Warehouses */}
			<ContentRoute path="/General/warehouses/new" component={WarehouseEdit} />
			<ContentRoute path="/General/warehouses/:id/edit" component={WarehouseEdit} />
			<ContentRoute path="/General/warehouses" component={WarehousesPage} />
			{/* end Warehouses */}

			{/* begin Years */}
			<ContentRoute path="/General/years/new" component={YearEdit} />
			<ContentRoute path="/General/years/:id/edit" component={YearEdit} />
			<ContentRoute path="/General/years" component={YearsPage} />
			{/* end Years */}

			{/* begin Scales */}
			<ContentRoute path="/General/scales/new" component={ScaleEdit} />
			<ContentRoute path="/General/scales/:id/edit" component={ScaleEdit} />
			<ContentRoute path="/General/scales" component={ScalesPage} />
			{/* end Scales */}
      </Switch>
    </Suspense>
  );
}
