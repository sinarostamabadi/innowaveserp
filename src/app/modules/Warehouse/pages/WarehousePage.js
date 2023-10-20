

import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { AssignmentsPage } from "./assignments/AssignmentsPage";
import { AssignmentDtlsPage } from "./assignmentDtls/AssignmentDtlsPage";
import { AssignmentSerialsPage } from "./assignmentSerials/AssignmentSerialsPage";
import { PackageTypesPage } from "./packageTypes/PackageTypesPage";
import { ProductsPage } from "./products/ProductsPage";
import { ProductsByGroupPage } from "./products/ProductsByGroupPage";
import { ProductGroupsPage } from "./productGroups/ProductGroupsPage";
import { ProductUnitsPage } from "./productUnits/ProductUnitsPage";
import { ProductWarehousesPage } from "./productWarehouses/ProductWarehousesPage";
import { ReceiptsPage } from "./receipts/ReceiptsPage";
import { ReceiptDtlsPage } from "./receiptDtls/ReceiptDtlsPage";
import { ReceiptSerialsPage } from "./receiptSerials/ReceiptSerialsPage";
import { BrandsPage } from "./brands/BrandsPage";

import { WarehouseDashboard } from "../dashboard/WarehouseDashboard";

import { AssignmentEdit } from "./assignments/assignment-edit/AssignmentEdit";
import { AssignmentDtlEdit } from "./assignmentDtls/assignmentDtl-edit/AssignmentDtlEdit";
import { AssignmentSerialEdit } from "./assignmentSerials/assignmentSerial-edit/AssignmentSerialEdit";
import { PackageTypeEdit } from "./packageTypes/packageType-edit/PackageTypeEdit";
import { ProductEdit } from "./products/product-edit/ProductEdit";
import { ProductGroupEdit } from "./productGroups/productGroup-edit/ProductGroupEdit";
import { ProductUnitEdit } from "./productUnits/productUnit-edit/ProductUnitEdit";
import { ProductWarehouseEdit } from "./productWarehouses/productWarehouse-edit/ProductWarehouseEdit";
import { ReceiptEdit } from "./receipts/receipt-edit/ReceiptEdit";
import { ReceiptDtlEdit } from "./receiptDtls/receiptDtl-edit/ReceiptDtlEdit";
import { ReceiptSerialEdit } from "./receiptSerials/receiptSerial-edit/ReceiptSerialEdit";
import { BrandEdit } from "./brands/brand-edit/BrandEdit";

import { Cardex } from "./reports/Cardex/Cardex";
import { InventoryOnReceipt } from "./reports/InventoryOnReceipt/InventoryOnReceipt";
import { InventoryOnTotal } from "./reports/InventoryOnTotal/InventoryOnTotal";
import { CommodityTurnover } from "./reports/CommodityTurnover/CommodityTurnover";
import { WarehouseHandling } from "./reports/WarehouseHandling/WarehouseHandling";

import { getStorage } from "src/core/_helpers";

export default function GeneralPage({ history }) {
	const defaultWarehouse = !!getStorage("defaultWarehouse")
		? JSON.parse(getStorage("defaultWarehouse"))
		: null;
	const defaultYear = !!getStorage("defaultYear")
		? JSON.parse(getStorage("defaultYear"))
		: null;
	if((!!defaultWarehouse == false || !!defaultYear == false) && (history.location.pathname != "/Warehouse/dashboard" && history.location.pathname != "/Warehouse"))
	{
		history.push("/Warehouse");
	}
		
	return (
		<Suspense fallback={<LayoutSplashScreen />}>
			<Switch>
				{<Redirect exact={true} from="/Warehouse" to="/Warehouse/dashboard" />}

				{/* begin WarehouseDashboard */}
				<ContentRoute path="/Warehouse/dashboard" component={WarehouseDashboard} />
				{/* end WarehouseDashboard */}

				{/* begin Assignments */}
				<ContentRoute path="/Warehouse/assignments/2" render={(props) => <AssignmentsPage {...props} mode={2} />}/>
				<ContentRoute path="/Warehouse/assignments/3" render={(props) => <AssignmentsPage {...props} mode={3} />}/>
				<ContentRoute path="/Warehouse/assignments/new/2" render={(props) => <AssignmentEdit {...props} mode={2} />}/>
				<ContentRoute path="/Warehouse/assignments/new/3" render={(props) => <AssignmentEdit {...props} mode={3} />}/>
				<ContentRoute path="/Warehouse/assignments/new" component={AssignmentEdit} />
				<ContentRoute path="/Warehouse/assignments/:id/edit" component={AssignmentEdit} />
				<ContentRoute path="/Warehouse/assignments" component={AssignmentsPage} />
				{/* end Assignments */}

				{/* begin AssignmentDtls */}
				<ContentRoute path="/Warehouse/assignmentDtls/new" component={AssignmentDtlEdit} />
				<ContentRoute path="/Warehouse/assignmentDtls/:id/edit" component={AssignmentDtlEdit} />
				<ContentRoute path="/Warehouse/assignmentDtls" component={AssignmentDtlsPage} />
				{/* end AssignmentDtls */}

				{/* begin AssignmentSerials */}
				<ContentRoute path="/Warehouse/assignmentSerials/new" component={AssignmentSerialEdit} />
				<ContentRoute path="/Warehouse/assignmentSerials/:id/edit" component={AssignmentSerialEdit} />
				<ContentRoute path="/Warehouse/assignmentSerials" component={AssignmentSerialsPage} />
				{/* end AssignmentSerials */}

				{/* begin PackageTypes */}
				<ContentRoute path="/Warehouse/packageTypes/new" component={PackageTypeEdit} />
				<ContentRoute path="/Warehouse/packageTypes/:id/edit" component={PackageTypeEdit} />
				<ContentRoute path="/Warehouse/packageTypes" component={PackageTypesPage} />
				{/* end PackageTypes */}

				{/* begin Products */}
				<ContentRoute path="/Warehouse/products/new/:groupId" component={ProductEdit} />
				<ContentRoute path="/Warehouse/products/new" component={ProductEdit} />
				<ContentRoute path="/Warehouse/products/:id/edit" component={ProductEdit} />
				<ContentRoute path="/Warehouse/products/group/:id" render={(props) => <ProductsByGroupPage {...props} mode={1} />} />
				<ContentRoute path="/Warehouse/products" component={ProductsPage} />
				{/* end Products */}

				{/* begin ProductGroups */}
				<ContentRoute path="/Warehouse/productGroups/new" component={ProductGroupEdit} />
				<ContentRoute path="/Warehouse/productGroups/:id/edit" component={ProductGroupEdit} />
				<ContentRoute path="/Warehouse/productGroups" component={ProductGroupsPage} />
				{/* end ProductGroups */}

				{/* begin ProductUnits */}
				<ContentRoute path="/Warehouse/productUnits/new" component={ProductUnitEdit} />
				<ContentRoute path="/Warehouse/productUnits/:id/edit" component={ProductUnitEdit} />
				<ContentRoute path="/Warehouse/productUnits" component={ProductUnitsPage} />
				{/* end ProductUnits */}

				{/* begin ProductWarehouses */}
				<ContentRoute path="/Warehouse/productWarehouses/new" component={ProductWarehouseEdit} />
				<ContentRoute path="/Warehouse/productWarehouses/:id/edit" component={ProductWarehouseEdit} />
				<ContentRoute path="/Warehouse/productWarehouses" component={ProductWarehousesPage} />
				{/* end ProductWarehouses */}

				{/* begin Receipts */}
				<ContentRoute path="/Warehouse/receipts/2" render={(props) => <ReceiptsPage {...props} mode={2} />}/>
				<ContentRoute path="/Warehouse/receipts/3" render={(props) => <ReceiptsPage {...props} mode={3} />}/>
				<ContentRoute path="/Warehouse/receipts/5" render={(props) => <ReceiptsPage {...props} mode={5} />}/>
				<ContentRoute path="/Warehouse/receipts/new/2" render={(props) => <ReceiptEdit {...props} mode={2} />}/>
				<ContentRoute path="/Warehouse/receipts/new/3" render={(props) => <ReceiptEdit {...props} mode={3} />}/>
				<ContentRoute path="/Warehouse/receipts/new/5" render={(props) => <ReceiptEdit {...props} mode={5} />}/>
				<ContentRoute path="/Warehouse/receipts/new" component={ReceiptEdit} />
				<ContentRoute path="/Warehouse/receipts/:id/edit" component={ReceiptEdit} />
				<ContentRoute path="/Warehouse/receipts" component={ReceiptsPage}/>
				{/* end Receipts */}

				{/* begin ReceiptDtls */}
				<ContentRoute path="/Warehouse/receiptDtls/new" component={ReceiptDtlEdit} />
				<ContentRoute path="/Warehouse/receiptDtls/:id/edit" component={ReceiptDtlEdit} />
				<ContentRoute path="/Warehouse/receiptDtls" component={ReceiptDtlsPage} />
				{/* end ReceiptDtls */}

				{/* begin ReceiptSerials */}
				<ContentRoute path="/Warehouse/receiptSerials/new" component={ReceiptSerialEdit} />
				<ContentRoute path="/Warehouse/receiptSerials/:id/edit" component={ReceiptSerialEdit} />
				<ContentRoute path="/Warehouse/receiptSerials" component={ReceiptSerialsPage} />
				{/* end ReceiptSerials */}

				{/* begin Brands */}
				<ContentRoute path="/Warehouse/brands/new" component={BrandEdit} />
				<ContentRoute path="/Warehouse/brands/:id/edit" component={BrandEdit} />
				<ContentRoute path="/Warehouse/brands" component={BrandsPage} />
				{/* end Brands */}

				{/* begin Reports */}
				<ContentRoute path="/Warehouse/reports/cardex" component={Cardex} />
				<ContentRoute path="/Warehouse/reports/inventoryOnReceipt" component={InventoryOnReceipt} />
				<ContentRoute path="/Warehouse/reports/inventoryOnTotal" component={InventoryOnTotal} />
				<ContentRoute path="/Warehouse/reports/commodityTurnover" component={CommodityTurnover} />
				<ContentRoute path="/Warehouse/reports/warehouseHandling" component={WarehouseHandling} />
				{/* end Reports */}

			</Switch>
		</Suspense>
	);
}
