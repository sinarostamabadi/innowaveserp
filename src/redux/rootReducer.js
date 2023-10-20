import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

// Accounting
import { accountsSlice } from "../app/modules/Accounting/_redux/accounts/accountsSlice";
import { documentsSlice } from "../app/modules/Accounting/_redux/documents/documentsSlice";
import { accountFloatingsSlice } from "../app/modules/Accounting/_redux/accountFloating/accountFloatingSlice";
import { accountFloatingGroupsSlice } from "../app/modules/Accounting/_redux/accountFloatingGroups/accountFloatingGroupsSlice";
import { accountTypesSlice } from "../app/modules/Accounting/_redux/accountTypes/accountTypesSlice";
import { accountFloatingTypesSlice } from "../app/modules/Accounting/_redux/accountFloatingTypes/accountFloatingTypesSlice";
import { accountFloatingGroupTypesSlice } from "../app/modules/Accounting/_redux/accountFloatingGroupTypes/accountFloatingGroupTypesSlice";
import { accountFloatingGroupRelationsSlice } from "../app/modules/Accounting/_redux/accountFloatingGroupRelations/accountFloatingGroupRelationsSlice";
import { documentTypesSlice } from "../app/modules/Accounting/_redux/documentTypes/documentTypesSlice";
import { costCentersSlice } from "../app/modules/Accounting/_redux/costCenters/costCentersSlice";

// Auth
import * as auth from "../app/modules/Auth/_redux/authRedux";

// Billiard
import { billiardCentersSlice } from "../app/modules/Billiard/_redux/billiardCenters/billiardCentersSlice";

// Dashboard Reducer
import { dashboardsSlice } from "../app/modules/General/_redux/dashboard/dashboardsSlice";

// Bowling Entities Reducers
import { centersSlice } from "../app/modules/Bowling/_redux/centers/centersSlice";
import { discountsSlice } from "../app/modules/Bowling/_redux/discounts/discountsSlice";
import { linesSlice } from "../app/modules/Bowling/_redux/lines/linesSlice";
import { reservesSlice } from "../app/modules/Bowling/_redux/reserves/reservesSlice";
import { setPricingSlice } from "../app/modules/Bowling/_redux/setPricing/setPricingSlice";
import { timePriceingSlice } from "../app/modules/Bowling/_redux/timePriceing/timePriceingSlice";
import { bowlingTeamsSlice } from "../app/modules/Bowling/_redux/bowlingTeams/bowlingTeamsSlice";
import { bowlingCompetitionsSlice } from "../app/modules/Bowling/_redux/bowlingCompetitions/bowlingCompetitionsSlice";

// BodyBuilding Entities Reducers
import { bodyBuildingCentersSlice } from "../app/modules/BodyBuilding/_redux/bodyBuildingCenters/bodyBuildingCentersSlice";
import { closetsSlice } from "../app/modules/BodyBuilding/_redux/closets/closetsSlice";
import { employeeTypesSlice } from "../app/modules/BodyBuilding/_redux/EmployeeTypes/EmployeeTypesSlice";
import { packsSlice } from "../app/modules/BodyBuilding/_redux/Packs/PacksSlice";
import { timeSetsSlice } from "../app/modules/BodyBuilding/_redux/TimeSets/TimeSetsSlice";
import { servicesSlice } from "../app/modules/BodyBuilding/_redux/Services/ServicesSlice";
import { bodyBuildingDiscountsSlice } from "../app/modules/BodyBuilding/_redux/Discounts/DiscountsSlice";
import { employeesSlice } from "../app/modules/BodyBuilding/_redux/Employees/EmployeesSlice";
import { contractsSlice } from "../app/modules/BodyBuilding/_redux/Contracts/ContractsSlice";

// Calendars Entities Reducers
import { calendarsSlice } from "src/app/modules/General/_redux/calendars/calendarsSlice";

// Cash Entities Reducers
import { cashDocumentsSlice } from "../app/modules/Cash/_redux/cashDocuments/cashDocumentsSlice";
import { posTransactionsSlice } from "../app/modules/Cash/_redux/posTransactions/posTransactionsSlice";
import { chequeBooksSlice } from "../app/modules/Cash/_redux/chequeBooks/chequeBooksSlice";
import { chequePapersSlice } from "../app/modules/Cash/_redux/chequePapers/chequePapersSlice";
import { bankCardsSlice } from "../app/modules/Cash/_redux/bankCards/bankCardsSlice";
import { couponsSlice } from "../app/modules/Cash/_redux/coupons/couponsSlice";

// Core Entities Reducers
import { realPersonsSlice } from "../app/modules/Core/_redux/realPersons/realPersonsSlice";
import { companiesSlice } from "../app/modules/Core/_redux/companies/companiesSlice";
import { bankAccountsSlice } from "../app/modules/Core/_redux/bankAccounts/bankAccountsSlice";
import { phonesSlice } from "../app/modules/Core/_redux/phones/phonesSlice";
import { addressesSlice } from "../app/modules/Core/_redux/addresses/addressesSlice";
import { personSpecialDaysSlice } from "../app/modules/General/_redux/personSpecialDays/personSpecialDaysSlice";
import { creditsSlice } from "../app/modules/Core/_redux/credits/creditsSlice";
import { walletsSlice } from "../app/modules/Core/_redux/wallets/walletsSlice";

// Futsal Entities Reducers
import { futsalReservesSlice } from "../app/modules/Futsal/_redux/futsalReserves/futsalReservesSlice";
import { futsalCentersSlice } from "../app/modules/Futsal/_redux/futsalCenters/futsalCentersSlice";

// General Entities Reducers
import { addressCategoriesSlice } from "../app/modules/General/_redux/addressCategories/addressCategoriesSlice";
import { banksSlice } from "../app/modules/General/_redux/banks/banksSlice";
import { cashsSlice } from "../app/modules/General/_redux/cashs/cashsSlice";
import { costsSlice } from "../app/modules/General/_redux/costs/costsSlice";
import { countriesSlice } from "../app/modules/General/_redux/countries/countriesSlice";
import { coffeeShopsSlice } from "../app/modules/General/_redux/coffeeShops/coffeeShopsSlice";
import { currenciesSlice } from "../app/modules/General/_redux/currencies/currenciesSlice";
import { currencyRatesSlice } from "../app/modules/General/_redux/currencyRates/currencyRatesSlice";
import { discountTypesSlice } from "../app/modules/General/_redux/discountTypes/discountTypesSlice";
import { specialDayTypesSlice } from "../app/modules/General/_redux/specialDayTypes/specialDayTypesSlice";
import { scalesSlice } from "../app/modules/General/_redux/scales/scalesSlice";
import { personGroupsSlice } from "../app/modules/General/_redux/personGroups/personGroupsSlice";
import { phoneTypesSlice } from "../app/modules/General/_redux/phoneTypes/phoneTypesSlice";
import { warehousesSlice } from "../app/modules/General/_redux/warehouses/warehousesSlice";
import { yearsSlice } from "../app/modules/General/_redux/years/yearsSlice";
import { majorsSlice } from "../app/modules/General/_redux/majors/majorsSlice";
import { unitMeasureGroupsSlice } from "../app/modules/General/_redux/unitMeasureGroups/unitMeasureGroupsSlice";
import { unitsSlice } from "../app/modules/General/_redux/units/unitsSlice";
import { unitConversionsSlice } from "../app/modules/General/_redux/unitConversions/unitConversionsSlice";
import { posesSlice } from "../app/modules/General/_redux/poses/posesSlice";
import { provincesSlice } from "../app/modules/General/_redux/provinces/provincesSlice";
import { educationsSlice } from "src/app/modules/General/_redux/educations/educationsSlice";
import { citiesSlice } from "../app/modules/General/_redux/cities/citiesSlice";
import { townshipsSlice } from "../app/modules/General/_redux/townships/townshipsSlice";

// Massages Entities Reducers
import { massageCentersSlice } from "../app/modules/Massage/_redux/massageCenters/massageCentersSlice";

// PosUsers Entities Reducers
import { posUsersSlice } from "src/app/modules/General/_redux/posUsers/posUsersSlice";

// Restaurant Entities Reducers
import { restaurantInvoicesSlice } from "../app/modules/Restaurant/_redux/RestaurantInvoices/RestaurantInvoicesSlice";
import { restaurantMenuItemsSlice } from "../app/modules/Restaurant/_redux/RestaurantMenuItems/RestaurantMenuItemsSlice";
import { restaurantMenuItemPricesSlice } from "../app/modules/Restaurant/_redux/RestaurantMenuItemPrices/RestaurantMenuItemPricesSlice";
import { restaurantDiscountTypesSlice } from "../app/modules/Restaurant/_redux/RestaurantDiscountTypes/RestaurantDiscountTypesSlice";

// Warehouse Entities Reducers
import { packageTypesSlice } from "../app/modules/Warehouse/_redux/packageTypes/packageTypesSlice";
import { productsSlice } from "../app/modules/Warehouse/_redux/products/productsSlice";
import { productGroupsSlice } from "../app/modules/Warehouse/_redux/productGroups/productGroupsSlice";
import { receiptsSlice } from "../app/modules/Warehouse/_redux/receipts/receiptsSlice";
import { assignmentsSlice } from "../app/modules/Warehouse/_redux/assignments/assignmentsSlice";
import { brandsSlice } from "../app/modules/Warehouse/_redux/brands/brandsSlice";

// PurchaseOrder Entities Reducers
import { costTypesSlice } from "../app/modules/PurchaseOrder/_redux/costTypes/costTypesSlice";
import { inquiryStatusesSlice } from "../app/modules/PurchaseOrder/_redux/inquiryStatuses/inquiryStatusesSlice";
import { inquiriesSlice } from "../app/modules/PurchaseOrder/_redux/inquiries/inquiriesSlice";
import { buysSlice } from "../app/modules/PurchaseOrder/_redux/buys/buysSlice";
import { buyReturnsSlice } from "../app/modules/PurchaseOrder/_redux/buyReturns/buyReturnsSlice";
import { buyRequestsSlice } from "../app/modules/PurchaseOrder/_redux/buyRequests/buyRequestsSlice";
import { buySettlementTypesSlice } from "../app/modules/PurchaseOrder/_redux/buySettlementTypes/buySettlementTypesSlice";

// Pool Entities Reducers
import { poolCentersSlice } from "../app/modules/Pool/_redux/poolCenters/poolCentersSlice";

// Sell Entities Reducers
import { sellDiscountsSlice } from "../app/modules/Sell/_redux/sellDiscounts/sellDiscountsSlice";
import { sellPricingSlice } from "../app/modules/Sell/_redux/sellPricing/sellPricingSlice";
import { sellDocumentsSlice } from "../app/modules/Sell/_redux/sellDocuments/sellDocumentsSlice";
import { sellDiscountFactorsSlice } from "../app/modules/Sell/_redux/sellDiscountFactors/sellDiscountFactorsSlice";

// Crm Entities Reducers
import { entityPointsSlice } from "../app/modules/Crm/_redux/entityPoints/entityPointsSlice";

// TakeAway Entities Reducers
import { takeAwayRequestsSlice } from "../app/modules/TakeAway/_redux/takeAwayRequests/takeAwayRequestsSlice";

// Security Entities Reducers
import { usersSlice } from "../app/modules/Security/_redux/users/usersSlice";

export const rootReducer = combineReducers({
  //Accounting
  accounts: accountsSlice.reducer,
  documents: documentsSlice.reducer,
  accountFloatings: accountFloatingsSlice.reducer,
  accountFloatingGroups: accountFloatingGroupsSlice.reducer,
  accountTypes: accountTypesSlice.reducer,
  accountFloatingTypes: accountFloatingTypesSlice.reducer,
  accountFloatingGroupTypes: accountFloatingGroupTypesSlice.reducer,
  documentTypes: documentTypesSlice.reducer,
  costCenters: costCentersSlice.reducer,
  accountFloatingGroupRelations: accountFloatingGroupRelationsSlice.reducer,

  // Auth
  auth: auth.reducer,

  // Billiard
  billiardCenters: billiardCentersSlice.reducer,

  // Calendars
  calendars: calendarsSlice.reducer,

  // Dashboard
  dashboards: dashboardsSlice.reducer,

  // Bowling
  centers: centersSlice.reducer,
  discounts: discountsSlice.reducer,
  lines: linesSlice.reducer,
  reserves: reservesSlice.reducer,
  setPricings: setPricingSlice.reducer,
  timePriceings: timePriceingSlice.reducer,
  bowlingTeams: bowlingTeamsSlice.reducer,
  bowlingCompetitions: bowlingCompetitionsSlice.reducer,

  // BodyBuilding
  closets: closetsSlice.reducer,
  employeeTypes: employeeTypesSlice.reducer,
  packs: packsSlice.reducer,
  timeSets: timeSetsSlice.reducer,
  services: servicesSlice.reducer,
  bodyBuildingDiscounts: bodyBuildingDiscountsSlice.reducer,
  employees: employeesSlice.reducer,
  contracts: contractsSlice.reducer,
  bodyBuildingCenters: bodyBuildingCentersSlice.reducer,
  
  // Cash
  cashDocuments: cashDocumentsSlice.reducer,
  posTransactions: posTransactionsSlice.reducer,
  chequeBooks: chequeBooksSlice.reducer,
  chequePapers: chequePapersSlice.reducer,
  bankCards: bankCardsSlice.reducer,
  coupons: couponsSlice.reducer,

  // Core
  realPersons: realPersonsSlice.reducer,
  companies: companiesSlice.reducer,
  bankAccounts: bankAccountsSlice.reducer,
  phones: phonesSlice.reducer,
  addresses: addressesSlice.reducer,
  personSpecialDays: personSpecialDaysSlice.reducer,
  credits: creditsSlice.reducer,
  wallets: walletsSlice.reducer,

  // Futsal
  futsalReserves: futsalReservesSlice.reducer,
  futsalCenters: futsalCentersSlice.reducer,

  // General
  phoneTypes: phoneTypesSlice.reducer,
  banks: banksSlice.reducer,
  addressCategories: addressCategoriesSlice.reducer,
  educations: educationsSlice.reducer,
  cashs: cashsSlice.reducer,
  specialDayTypes: specialDayTypesSlice.reducer,
  warehouses: warehousesSlice.reducer,
  years: yearsSlice.reducer,
  costs: costsSlice.reducer,
  countries: countriesSlice.reducer,
  coffeeShops: coffeeShopsSlice.reducer,
  discountTypes: discountTypesSlice.reducer,
  majors: majorsSlice.reducer,
  unitMeasureGroups: unitMeasureGroupsSlice.reducer,
  units: unitsSlice.reducer,
  unitConversions: unitConversionsSlice.reducer,
  personGroups: personGroupsSlice.reducer,
  scales: scalesSlice.reducer,
  poses: posesSlice.reducer,
  provinces: provincesSlice.reducer,
  cities: citiesSlice.reducer,
  townships: townshipsSlice.reducer,
  currencies: currenciesSlice.reducer,
  currencyRates: currencyRatesSlice.reducer,

  // Massages
  massageCenters: massageCentersSlice.reducer,

  // PosUsers
  posUsers: posUsersSlice.reducer,

  // Restaurant
  restaurantInvoices: restaurantInvoicesSlice.reducer,
  restaurantMenuItems: restaurantMenuItemsSlice.reducer,
  restaurantMenuItemPrices: restaurantMenuItemPricesSlice.reducer,
  restaurantDiscountTypes: restaurantDiscountTypesSlice.reducer,

  // Warehouse
  packageTypes: packageTypesSlice.reducer,
  products: productsSlice.reducer,
  productGroups: productGroupsSlice.reducer,
  receipts: receiptsSlice.reducer,
  assignments: assignmentsSlice.reducer,
  brands: brandsSlice.reducer,

  // PurchaseOrder
  costTypes: costTypesSlice.reducer,
  inquiryStatuses: inquiryStatusesSlice.reducer,
  inquiries: inquiriesSlice.reducer,
  buys: buysSlice.reducer,
  buyReturns: buyReturnsSlice.reducer,
  buyRequests: buyRequestsSlice.reducer,
  buySettlementTypes: buySettlementTypesSlice.reducer,

  // Pool
  poolCenters: poolCentersSlice.reducer,

  // Sell
  sellDiscounts: sellDiscountsSlice.reducer,
  sellPricings: sellPricingSlice.reducer,
  sellDocuments: sellDocumentsSlice.reducer,
  sellDiscountFactors: sellDiscountFactorsSlice.reducer,

  // Crm
  entityPoints: entityPointsSlice.reducer,

  // TakeAway
  takeAwayRequests: takeAwayRequestsSlice.reducer,
  
  // Security
  users: usersSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
