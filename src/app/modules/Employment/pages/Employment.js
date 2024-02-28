import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { BudgetsPage } from "./budgets/BudgetsPage";
import { ContractEndTypesPage } from "./contractEndTypes/ContractEndTypesPage";
import { ContractTypesPage } from "./contractTypes/ContractTypesPage";
import { EmployeesPage } from "./employees/EmployeesPage";
import { EmployeeChildsPage } from "./employeeChilds/EmployeeChildsPage";
import { EmployeeContractsPage } from "./employeeContracts/EmployeeContractsPage";
import { EmployeeEducarionsPage } from "./employeeEducarions/EmployeeEducarionsPage";
import { EmployeeInIODevicesPage } from "./employeeInIODevices/EmployeeInIODevicesPage";
import { EmployeeInsurancesPage } from "./employeeInsurances/EmployeeInsurancesPage";
import { EmployeeLeavesPage } from "./employeeLeaves/EmployeeLeavesPage";
import { EmployeeLeaveChangesPage } from "./employeeLeaveChanges/EmployeeLeaveChangesPage";
import { EmployeeMissionsPage } from "./employeeMissions/EmployeeMissionsPage";
import { EmployeeMonthlyCalculatedsPage } from "./employeeMonthlyCalculateds/EmployeeMonthlyCalculatedsPage";
import { EmployeePhysicalConditionsPage } from "./employeePhysicalConditions/EmployeePhysicalConditionsPage";
import { EmployeePromissoryNotesPage } from "./employeePromissoryNotes/EmployeePromissoryNotesPage";
import { EmployeeRelationsPage } from "./employeeRelations/EmployeeRelationsPage";
import { EmployeeRewardPenaltiesPage } from "./employeeRewardPenalties/EmployeeRewardPenaltiesPage";
import { EmployeeSoldiershipsPage } from "./employeeSoldierships/EmployeeSoldiershipsPage";
import { EmployeeSpecialDatesPage } from "./employeeSpecialDates/EmployeeSpecialDatesPage";
import { EmployeeWorkExperiencesPage } from "./employeeWorkExperiences/EmployeeWorkExperiencesPage";
import { EmployeeWorkShiftsPage } from "./employeeWorkShifts/EmployeeWorkShiftsPage";
import { EmploymentStatusesPage } from "./employmentStatuses/EmploymentStatusesPage";
import { EmploymentTypesPage } from "./employmentTypes/EmploymentTypesPage";
import { HomeStatusesPage } from "./homeStatuses/HomeStatusesPage";
import { InfoAreasPage } from "./infoAreas/InfoAreasPage";
import { InsurancesPage } from "./insurances/InsurancesPage";
import { InsuranceCompaniesPage } from "./insuranceCompanies/InsuranceCompaniesPage";
import { InsuranceJobsPage } from "./insuranceJobs/InsuranceJobsPage";
import { InsuranceTypesPage } from "./insuranceTypes/InsuranceTypesPage";
import { IODevicesPage } from "./iODevices/IODevicesPage";
import { IODeviceTransactionTypesPage } from "./iODeviceTransactionTypes/IODeviceTransactionTypesPage";
import { IODeviceTypesPage } from "./iODeviceTypes/IODeviceTypesPage";
import { IOTransactionsPage } from "./iOTransactions/IOTransactionsPage";
import { IOTransactionTypesPage } from "./iOTransactionTypes/IOTransactionTypesPage";
import { JobsPage } from "./jobs/JobsPage";
import { LeaveTypesPage } from "./leaveTypes/LeaveTypesPage";
import { MarridationTypesPage } from "./marridationTypes/MarridationTypesPage";
import { MonthlyEmployeeIOsPage } from "./monthlyEmployeeIOs/MonthlyEmployeeIOsPage";
import { OrganizationChartsPage } from "./organizationCharts/OrganizationChartsPage";
import { OrganizationChartEmployeesPage } from "./organizationChartEmployees/OrganizationChartEmployeesPage";
import { OrganizationChartLevelsPage } from "./organizationChartLevels/OrganizationChartLevelsPage";
import { OrganizationPostsPage } from "./organizationPosts/OrganizationPostsPage";
import { OrganizationUnitsPage } from "./organizationUnits/OrganizationUnitsPage";
import { PhysicalConditionTypesPage } from "./physicalConditionTypes/PhysicalConditionTypesPage";
import { RelationTypesPage } from "./relationTypes/RelationTypesPage";
import { RewardOrPenaltyTypesPage } from "./rewardOrPenaltyTypes/RewardOrPenaltyTypesPage";
import { SoldiershipExemptionsPage } from "./soldiershipExemptions/SoldiershipExemptionsPage";
import { SoldiershipTypesPage } from "./soldiershipTypes/SoldiershipTypesPage";
import { TaxUnitsPage } from "./taxUnits/TaxUnitsPage";
import { TechnicalTypesPage } from "./technicalTypes/TechnicalTypesPage";
import { WorkShiftsPage } from "./workShifts/WorkShiftsPage";
import { WorkShiftCalendersPage } from "./workShiftCalenders/WorkShiftCalendersPage";

import { EmploymentDashboard } from "../dashboard/EmploymentDashboard";

import { BudgetEdit } from "./budgets/budget-edit/BudgetEdit";
import { ContractEndTypeEdit } from "./contractEndTypes/contractEndType-edit/ContractEndTypeEdit";
import { ContractTypeEdit } from "./contractTypes/contractType-edit/ContractTypeEdit";
import { EmployeeEdit } from "./employees/employee-edit/EmployeeEdit";
import { EmployeeChildEdit } from "./employeeChilds/employeeChild-edit/EmployeeChildEdit";
import { EmployeeContractEdit } from "./employeeContracts/employeeContract-edit/EmployeeContractEdit";
import { EmployeeEducarionEdit } from "./employeeEducarions/employeeEducarion-edit/EmployeeEducarionEdit";
import { EmployeeInIODeviceEdit } from "./employeeInIODevices/employeeInIODevice-edit/EmployeeInIODeviceEdit";
import { EmployeeInsuranceEdit } from "./employeeInsurances/employeeInsurance-edit/EmployeeInsuranceEdit";
import { EmployeeLeaveEdit } from "./employeeLeaves/employeeLeave-edit/EmployeeLeaveEdit";
import { EmployeeLeaveChangeEdit } from "./employeeLeaveChanges/employeeLeaveChange-edit/EmployeeLeaveChangeEdit";
import { EmployeeMissionEdit } from "./employeeMissions/employeeMission-edit/EmployeeMissionEdit";
import { EmployeeMonthlyCalculatedEdit } from "./employeeMonthlyCalculateds/employeeMonthlyCalculated-edit/EmployeeMonthlyCalculatedEdit";
import { EmployeePhysicalConditionEdit } from "./employeePhysicalConditions/employeePhysicalCondition-edit/EmployeePhysicalConditionEdit";
import { EmployeePromissoryNoteEdit } from "./employeePromissoryNotes/employeePromissoryNote-edit/EmployeePromissoryNoteEdit";
import { EmployeeRelationEdit } from "./employeeRelations/employeeRelation-edit/EmployeeRelationEdit";
import { EmployeeRewardPenaltyEdit } from "./employeeRewardPenalties/employeeRewardPenalty-edit/EmployeeRewardPenaltyEdit";
import { EmployeeSoldiershipEdit } from "./employeeSoldierships/employeeSoldiership-edit/EmployeeSoldiershipEdit";
import { EmployeeSpecialDateEdit } from "./employeeSpecialDates/employeeSpecialDate-edit/EmployeeSpecialDateEdit";
import { EmployeeWorkExperienceEdit } from "./employeeWorkExperiences/employeeWorkExperience-edit/EmployeeWorkExperienceEdit";
import { EmployeeWorkShiftEdit } from "./employeeWorkShifts/employeeWorkShift-edit/EmployeeWorkShiftEdit";
import { EmploymentStatusEdit } from "./employmentStatuses/employmentStatus-edit/EmploymentStatusEdit";
import { EmploymentTypeEdit } from "./employmentTypes/employmentType-edit/EmploymentTypeEdit";
import { HomeStatusEdit } from "./homeStatuses/homeStatus-edit/HomeStatusEdit";
import { InfoAreaEdit } from "./infoAreas/infoArea-edit/InfoAreaEdit";
import { InsuranceEdit } from "./insurances/insurance-edit/InsuranceEdit";
import { InsuranceCompanyEdit } from "./insuranceCompanies/insuranceCompany-edit/InsuranceCompanyEdit";
import { InsuranceJobEdit } from "./insuranceJobs/insuranceJob-edit/InsuranceJobEdit";
import { InsuranceTypeEdit } from "./insuranceTypes/insuranceType-edit/InsuranceTypeEdit";
import { IODeviceEdit } from "./iODevices/iODevice-edit/IODeviceEdit";
import { IODeviceTransactionTypeEdit } from "./iODeviceTransactionTypes/iODeviceTransactionType-edit/IODeviceTransactionTypeEdit";
import { IODeviceTypeEdit } from "./iODeviceTypes/iODeviceType-edit/IODeviceTypeEdit";
import { IOTransactionEdit } from "./iOTransactions/iOTransaction-edit/IOTransactionEdit";
import { IOTransactionTypeEdit } from "./iOTransactionTypes/iOTransactionType-edit/IOTransactionTypeEdit";
import { JobEdit } from "./jobs/job-edit/JobEdit";
import { LeaveTypeEdit } from "./leaveTypes/leaveType-edit/LeaveTypeEdit";
import { MarridationTypeEdit } from "./marridationTypes/marridationType-edit/MarridationTypeEdit";
import { MonthlyEmployeeIOEdit } from "./monthlyEmployeeIOs/monthlyEmployeeIO-edit/MonthlyEmployeeIOEdit";
import { OrganizationChartEdit } from "./organizationCharts/organizationChart-edit/OrganizationChartEdit";
import { OrganizationChartEmployeeEdit } from "./organizationChartEmployees/organizationChartEmployee-edit/OrganizationChartEmployeeEdit";
import { OrganizationChartLevelEdit } from "./organizationChartLevels/organizationChartLevel-edit/OrganizationChartLevelEdit";
import { OrganizationPostEdit } from "./organizationPosts/organizationPost-edit/OrganizationPostEdit";
import { OrganizationUnitEdit } from "./organizationUnits/organizationUnit-edit/OrganizationUnitEdit";
import { PhysicalConditionTypeEdit } from "./physicalConditionTypes/physicalConditionType-edit/PhysicalConditionTypeEdit";
import { RelationTypeEdit } from "./relationTypes/relationType-edit/RelationTypeEdit";
import { RewardOrPenaltyTypeEdit } from "./rewardOrPenaltyTypes/rewardOrPenaltyType-edit/RewardOrPenaltyTypeEdit";
import { SoldiershipExemptionEdit } from "./soldiershipExemptions/soldiershipExemption-edit/SoldiershipExemptionEdit";
import { SoldiershipTypeEdit } from "./soldiershipTypes/soldiershipType-edit/SoldiershipTypeEdit";
import { TaxUnitEdit } from "./taxUnits/taxUnit-edit/TaxUnitEdit";
import { TechnicalTypeEdit } from "./technicalTypes/technicalType-edit/TechnicalTypeEdit";
import { WorkShiftEdit } from "./workShifts/workShift-edit/WorkShiftEdit";
import { WorkShiftCalenderEdit } from "./workShiftCalenders/workShiftCalender-edit/WorkShiftCalenderEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect
            exact={true}
            from="/Employment"
            to="/Employment/dashboard"
          />
        }

        {/* begin EmploymentDashboard */}
        <ContentRoute
          path="/Employment/dashboard"
          component={EmploymentDashboard}
        />
        {/* end EmploymentDashboard */}

        {/* begin Budgets */}
        <ContentRoute path="/Employment/budgets/new" component={BudgetEdit} />
        <ContentRoute
          path="/Employment/budgets/:id/edit"
          component={BudgetEdit}
        />
        <ContentRoute path="/Employment/budgets" component={BudgetsPage} />
        {/* end Budgets */}

        {/* begin ContractEndTypes */}
        <ContentRoute
          path="/Employment/contractEndTypes/new"
          component={ContractEndTypeEdit}
        />
        <ContentRoute
          path="/Employment/contractEndTypes/:id/edit"
          component={ContractEndTypeEdit}
        />
        <ContentRoute
          path="/Employment/contractEndTypes"
          component={ContractEndTypesPage}
        />
        {/* end ContractEndTypes */}

        {/* begin ContractTypes */}
        <ContentRoute
          path="/Employment/contractTypes/new"
          component={ContractTypeEdit}
        />
        <ContentRoute
          path="/Employment/contractTypes/:id/edit"
          component={ContractTypeEdit}
        />
        <ContentRoute
          path="/Employment/contractTypes"
          component={ContractTypesPage}
        />
        {/* end ContractTypes */}

        {/* begin Employees */}
        <ContentRoute
          path="/Employment/employees/new"
          component={EmployeeEdit}
        />
        <ContentRoute
          path="/Employment/employees/:id/edit"
          component={EmployeeEdit}
        />
        <ContentRoute path="/Employment/employees" component={EmployeesPage} />
        {/* end Employees */}

        {/* begin EmployeeChilds */}
        <ContentRoute
          path="/Employment/employeeChilds/new"
          component={EmployeeChildEdit}
        />
        <ContentRoute
          path="/Employment/employeeChilds/:id/edit"
          component={EmployeeChildEdit}
        />
        <ContentRoute
          path="/Employment/employeeChilds"
          component={EmployeeChildsPage}
        />
        {/* end EmployeeChilds */}

        {/* begin EmployeeContracts */}
        <ContentRoute
          path="/Employment/employeeContracts/new"
          component={EmployeeContractEdit}
        />
        <ContentRoute
          path="/Employment/employeeContracts/:id/edit"
          component={EmployeeContractEdit}
        />
        <ContentRoute
          path="/Employment/employeeContracts"
          component={EmployeeContractsPage}
        />
        {/* end EmployeeContracts */}

        {/* begin EmployeeEducarions */}
        <ContentRoute
          path="/Employment/employeeEducarions/new"
          component={EmployeeEducarionEdit}
        />
        <ContentRoute
          path="/Employment/employeeEducarions/:id/edit"
          component={EmployeeEducarionEdit}
        />
        <ContentRoute
          path="/Employment/employeeEducarions"
          component={EmployeeEducarionsPage}
        />
        {/* end EmployeeEducarions */}

        {/* begin EmployeeInIODevices */}
        <ContentRoute
          path="/Employment/employeeInIODevices/new"
          component={EmployeeInIODeviceEdit}
        />
        <ContentRoute
          path="/Employment/employeeInIODevices/:id/edit"
          component={EmployeeInIODeviceEdit}
        />
        <ContentRoute
          path="/Employment/employeeInIODevices"
          component={EmployeeInIODevicesPage}
        />
        {/* end EmployeeInIODevices */}

        {/* begin EmployeeInsurances */}
        <ContentRoute
          path="/Employment/employeeInsurances/new"
          component={EmployeeInsuranceEdit}
        />
        <ContentRoute
          path="/Employment/employeeInsurances/:id/edit"
          component={EmployeeInsuranceEdit}
        />
        <ContentRoute
          path="/Employment/employeeInsurances"
          component={EmployeeInsurancesPage}
        />
        {/* end EmployeeInsurances */}

        {/* begin EmployeeLeaves */}
        <ContentRoute
          path="/Employment/employeeLeaves/new"
          component={EmployeeLeaveEdit}
        />
        <ContentRoute
          path="/Employment/employeeLeaves/:id/edit"
          component={EmployeeLeaveEdit}
        />
        <ContentRoute
          path="/Employment/employeeLeaves"
          component={EmployeeLeavesPage}
        />
        {/* end EmployeeLeaves */}

        {/* begin EmployeeLeaveChanges */}
        <ContentRoute
          path="/Employment/employeeLeaveChanges/new"
          component={EmployeeLeaveChangeEdit}
        />
        <ContentRoute
          path="/Employment/employeeLeaveChanges/:id/edit"
          component={EmployeeLeaveChangeEdit}
        />
        <ContentRoute
          path="/Employment/employeeLeaveChanges"
          component={EmployeeLeaveChangesPage}
        />
        {/* end EmployeeLeaveChanges */}

        {/* begin EmployeeMissions */}
        <ContentRoute
          path="/Employment/employeeMissions/new"
          component={EmployeeMissionEdit}
        />
        <ContentRoute
          path="/Employment/employeeMissions/:id/edit"
          component={EmployeeMissionEdit}
        />
        <ContentRoute
          path="/Employment/employeeMissions"
          component={EmployeeMissionsPage}
        />
        {/* end EmployeeMissions */}

        {/* begin EmployeeMonthlyCalculateds */}
        <ContentRoute
          path="/Employment/employeeMonthlyCalculateds/new"
          component={EmployeeMonthlyCalculatedEdit}
        />
        <ContentRoute
          path="/Employment/employeeMonthlyCalculateds/:id/edit"
          component={EmployeeMonthlyCalculatedEdit}
        />
        <ContentRoute
          path="/Employment/employeeMonthlyCalculateds"
          component={EmployeeMonthlyCalculatedsPage}
        />
        {/* end EmployeeMonthlyCalculateds */}

        {/* begin EmployeePhysicalConditions */}
        <ContentRoute
          path="/Employment/employeePhysicalConditions/new"
          component={EmployeePhysicalConditionEdit}
        />
        <ContentRoute
          path="/Employment/employeePhysicalConditions/:id/edit"
          component={EmployeePhysicalConditionEdit}
        />
        <ContentRoute
          path="/Employment/employeePhysicalConditions"
          component={EmployeePhysicalConditionsPage}
        />
        {/* end EmployeePhysicalConditions */}

        {/* begin EmployeePromissoryNotes */}
        <ContentRoute
          path="/Employment/employeePromissoryNotes/new"
          component={EmployeePromissoryNoteEdit}
        />
        <ContentRoute
          path="/Employment/employeePromissoryNotes/:id/edit"
          component={EmployeePromissoryNoteEdit}
        />
        <ContentRoute
          path="/Employment/employeePromissoryNotes"
          component={EmployeePromissoryNotesPage}
        />
        {/* end EmployeePromissoryNotes */}

        {/* begin EmployeeRelations */}
        <ContentRoute
          path="/Employment/employeeRelations/new"
          component={EmployeeRelationEdit}
        />
        <ContentRoute
          path="/Employment/employeeRelations/:id/edit"
          component={EmployeeRelationEdit}
        />
        <ContentRoute
          path="/Employment/employeeRelations"
          component={EmployeeRelationsPage}
        />
        {/* end EmployeeRelations */}

        {/* begin EmployeeRewardPenalties */}
        <ContentRoute
          path="/Employment/employeeRewardPenalties/new"
          component={EmployeeRewardPenaltyEdit}
        />
        <ContentRoute
          path="/Employment/employeeRewardPenalties/:id/edit"
          component={EmployeeRewardPenaltyEdit}
        />
        <ContentRoute
          path="/Employment/employeeRewardPenalties"
          component={EmployeeRewardPenaltiesPage}
        />
        {/* end EmployeeRewardPenalties */}

        {/* begin EmployeeSoldierships */}
        <ContentRoute
          path="/Employment/employeeSoldierships/new"
          component={EmployeeSoldiershipEdit}
        />
        <ContentRoute
          path="/Employment/employeeSoldierships/:id/edit"
          component={EmployeeSoldiershipEdit}
        />
        <ContentRoute
          path="/Employment/employeeSoldierships"
          component={EmployeeSoldiershipsPage}
        />
        {/* end EmployeeSoldierships */}

        {/* begin EmployeeSpecialDates */}
        <ContentRoute
          path="/Employment/employeeSpecialDates/new"
          component={EmployeeSpecialDateEdit}
        />
        <ContentRoute
          path="/Employment/employeeSpecialDates/:id/edit"
          component={EmployeeSpecialDateEdit}
        />
        <ContentRoute
          path="/Employment/employeeSpecialDates"
          component={EmployeeSpecialDatesPage}
        />
        {/* end EmployeeSpecialDates */}

        {/* begin EmployeeWorkExperiences */}
        <ContentRoute
          path="/Employment/employeeWorkExperiences/new"
          component={EmployeeWorkExperienceEdit}
        />
        <ContentRoute
          path="/Employment/employeeWorkExperiences/:id/edit"
          component={EmployeeWorkExperienceEdit}
        />
        <ContentRoute
          path="/Employment/employeeWorkExperiences"
          component={EmployeeWorkExperiencesPage}
        />
        {/* end EmployeeWorkExperiences */}

        {/* begin EmployeeWorkShifts */}
        <ContentRoute
          path="/Employment/employeeWorkShifts/new"
          component={EmployeeWorkShiftEdit}
        />
        <ContentRoute
          path="/Employment/employeeWorkShifts/:id/edit"
          component={EmployeeWorkShiftEdit}
        />
        <ContentRoute
          path="/Employment/employeeWorkShifts"
          component={EmployeeWorkShiftsPage}
        />
        {/* end EmployeeWorkShifts */}

        {/* begin EmploymentStatuses */}
        <ContentRoute
          path="/Employment/employmentStatuses/new"
          component={EmploymentStatusEdit}
        />
        <ContentRoute
          path="/Employment/employmentStatuses/:id/edit"
          component={EmploymentStatusEdit}
        />
        <ContentRoute
          path="/Employment/employmentStatuses"
          component={EmploymentStatusesPage}
        />
        {/* end EmploymentStatuses */}

        {/* begin EmploymentTypes */}
        <ContentRoute
          path="/Employment/employmentTypes/new"
          component={EmploymentTypeEdit}
        />
        <ContentRoute
          path="/Employment/employmentTypes/:id/edit"
          component={EmploymentTypeEdit}
        />
        <ContentRoute
          path="/Employment/employmentTypes"
          component={EmploymentTypesPage}
        />
        {/* end EmploymentTypes */}

        {/* begin HomeStatuses */}
        <ContentRoute
          path="/Employment/homeStatuses/new"
          component={HomeStatusEdit}
        />
        <ContentRoute
          path="/Employment/homeStatuses/:id/edit"
          component={HomeStatusEdit}
        />
        <ContentRoute
          path="/Employment/homeStatuses"
          component={HomeStatusesPage}
        />
        {/* end HomeStatuses */}

        {/* begin InfoAreas */}
        <ContentRoute
          path="/Employment/infoAreas/new"
          component={InfoAreaEdit}
        />
        <ContentRoute
          path="/Employment/infoAreas/:id/edit"
          component={InfoAreaEdit}
        />
        <ContentRoute path="/Employment/infoAreas" component={InfoAreasPage} />
        {/* end InfoAreas */}

        {/* begin Insurances */}
        <ContentRoute
          path="/Employment/insurances/new"
          component={InsuranceEdit}
        />
        <ContentRoute
          path="/Employment/insurances/:id/edit"
          component={InsuranceEdit}
        />
        <ContentRoute
          path="/Employment/insurances"
          component={InsurancesPage}
        />
        {/* end Insurances */}

        {/* begin InsuranceCompanies */}
        <ContentRoute
          path="/Employment/insuranceCompanies/new"
          component={InsuranceCompanyEdit}
        />
        <ContentRoute
          path="/Employment/insuranceCompanies/:id/edit"
          component={InsuranceCompanyEdit}
        />
        <ContentRoute
          path="/Employment/insuranceCompanies"
          component={InsuranceCompaniesPage}
        />
        {/* end InsuranceCompanies */}

        {/* begin InsuranceJobs */}
        <ContentRoute
          path="/Employment/insuranceJobs/new"
          component={InsuranceJobEdit}
        />
        <ContentRoute
          path="/Employment/insuranceJobs/:id/edit"
          component={InsuranceJobEdit}
        />
        <ContentRoute
          path="/Employment/insuranceJobs"
          component={InsuranceJobsPage}
        />
        {/* end InsuranceJobs */}

        {/* begin InsuranceTypes */}
        <ContentRoute
          path="/Employment/insuranceTypes/new"
          component={InsuranceTypeEdit}
        />
        <ContentRoute
          path="/Employment/insuranceTypes/:id/edit"
          component={InsuranceTypeEdit}
        />
        <ContentRoute
          path="/Employment/insuranceTypes"
          component={InsuranceTypesPage}
        />
        {/* end InsuranceTypes */}

        {/* begin IODevices */}
        <ContentRoute
          path="/Employment/iODevices/new"
          component={IODeviceEdit}
        />
        <ContentRoute
          path="/Employment/iODevices/:id/edit"
          component={IODeviceEdit}
        />
        <ContentRoute path="/Employment/iODevices" component={IODevicesPage} />
        {/* end IODevices */}

        {/* begin IODeviceTransactionTypes */}
        <ContentRoute
          path="/Employment/iODeviceTransactionTypes/new"
          component={IODeviceTransactionTypeEdit}
        />
        <ContentRoute
          path="/Employment/iODeviceTransactionTypes/:id/edit"
          component={IODeviceTransactionTypeEdit}
        />
        <ContentRoute
          path="/Employment/iODeviceTransactionTypes"
          component={IODeviceTransactionTypesPage}
        />
        {/* end IODeviceTransactionTypes */}

        {/* begin IODeviceTypes */}
        <ContentRoute
          path="/Employment/iODeviceTypes/new"
          component={IODeviceTypeEdit}
        />
        <ContentRoute
          path="/Employment/iODeviceTypes/:id/edit"
          component={IODeviceTypeEdit}
        />
        <ContentRoute
          path="/Employment/iODeviceTypes"
          component={IODeviceTypesPage}
        />
        {/* end IODeviceTypes */}

        {/* begin IOTransactions */}
        <ContentRoute
          path="/Employment/iOTransactions/new"
          component={IOTransactionEdit}
        />
        <ContentRoute
          path="/Employment/iOTransactions/:id/edit"
          component={IOTransactionEdit}
        />
        <ContentRoute
          path="/Employment/iOTransactions"
          component={IOTransactionsPage}
        />
        {/* end IOTransactions */}

        {/* begin IOTransactionTypes */}
        <ContentRoute
          path="/Employment/iOTransactionTypes/new"
          component={IOTransactionTypeEdit}
        />
        <ContentRoute
          path="/Employment/iOTransactionTypes/:id/edit"
          component={IOTransactionTypeEdit}
        />
        <ContentRoute
          path="/Employment/iOTransactionTypes"
          component={IOTransactionTypesPage}
        />
        {/* end IOTransactionTypes */}

        {/* begin Jobs */}
        <ContentRoute path="/Employment/jobs/new" component={JobEdit} />
        <ContentRoute path="/Employment/jobs/:id/edit" component={JobEdit} />
        <ContentRoute path="/Employment/jobs" component={JobsPage} />
        {/* end Jobs */}

        {/* begin LeaveTypes */}
        <ContentRoute
          path="/Employment/leaveTypes/new"
          component={LeaveTypeEdit}
        />
        <ContentRoute
          path="/Employment/leaveTypes/:id/edit"
          component={LeaveTypeEdit}
        />
        <ContentRoute
          path="/Employment/leaveTypes"
          component={LeaveTypesPage}
        />
        {/* end LeaveTypes */}

        {/* begin MarridationTypes */}
        <ContentRoute
          path="/Employment/marridationTypes/new"
          component={MarridationTypeEdit}
        />
        <ContentRoute
          path="/Employment/marridationTypes/:id/edit"
          component={MarridationTypeEdit}
        />
        <ContentRoute
          path="/Employment/marridationTypes"
          component={MarridationTypesPage}
        />
        {/* end MarridationTypes */}

        {/* begin MonthlyEmployeeIOs */}
        <ContentRoute
          path="/Employment/monthlyEmployeeIOs/new"
          component={MonthlyEmployeeIOEdit}
        />
        <ContentRoute
          path="/Employment/monthlyEmployeeIOs/:id/edit"
          component={MonthlyEmployeeIOEdit}
        />
        <ContentRoute
          path="/Employment/monthlyEmployeeIOs"
          component={MonthlyEmployeeIOsPage}
        />
        {/* end MonthlyEmployeeIOs */}

        {/* begin OrganizationCharts */}
        <ContentRoute
          path="/Employment/organizationCharts/new"
          component={OrganizationChartEdit}
        />
        <ContentRoute
          path="/Employment/organizationCharts/:id/edit"
          component={OrganizationChartEdit}
        />
        <ContentRoute
          path="/Employment/organizationCharts"
          component={OrganizationChartsPage}
        />
        {/* end OrganizationCharts */}

        {/* begin OrganizationChartEmployees */}
        <ContentRoute
          path="/Employment/organizationChartEmployees/new"
          component={OrganizationChartEmployeeEdit}
        />
        <ContentRoute
          path="/Employment/organizationChartEmployees/:id/edit"
          component={OrganizationChartEmployeeEdit}
        />
        <ContentRoute
          path="/Employment/organizationChartEmployees"
          component={OrganizationChartEmployeesPage}
        />
        {/* end OrganizationChartEmployees */}

        {/* begin OrganizationChartLevels */}
        <ContentRoute
          path="/Employment/organizationChartLevels/new"
          component={OrganizationChartLevelEdit}
        />
        <ContentRoute
          path="/Employment/organizationChartLevels/:id/edit"
          component={OrganizationChartLevelEdit}
        />
        <ContentRoute
          path="/Employment/organizationChartLevels"
          component={OrganizationChartLevelsPage}
        />
        {/* end OrganizationChartLevels */}

        {/* begin OrganizationPosts */}
        <ContentRoute
          path="/Employment/organizationPosts/new"
          component={OrganizationPostEdit}
        />
        <ContentRoute
          path="/Employment/organizationPosts/:id/edit"
          component={OrganizationPostEdit}
        />
        <ContentRoute
          path="/Employment/organizationPosts"
          component={OrganizationPostsPage}
        />
        {/* end OrganizationPosts */}

        {/* begin OrganizationUnits */}
        <ContentRoute
          path="/Employment/organizationUnits/new"
          component={OrganizationUnitEdit}
        />
        <ContentRoute
          path="/Employment/organizationUnits/:id/edit"
          component={OrganizationUnitEdit}
        />
        <ContentRoute
          path="/Employment/organizationUnits"
          component={OrganizationUnitsPage}
        />
        {/* end OrganizationUnits */}

        {/* begin PhysicalConditionTypes */}
        <ContentRoute
          path="/Employment/physicalConditionTypes/new"
          component={PhysicalConditionTypeEdit}
        />
        <ContentRoute
          path="/Employment/physicalConditionTypes/:id/edit"
          component={PhysicalConditionTypeEdit}
        />
        <ContentRoute
          path="/Employment/physicalConditionTypes"
          component={PhysicalConditionTypesPage}
        />
        {/* end PhysicalConditionTypes */}

        {/* begin RelationTypes */}
        <ContentRoute
          path="/Employment/relationTypes/new"
          component={RelationTypeEdit}
        />
        <ContentRoute
          path="/Employment/relationTypes/:id/edit"
          component={RelationTypeEdit}
        />
        <ContentRoute
          path="/Employment/relationTypes"
          component={RelationTypesPage}
        />
        {/* end RelationTypes */}

        {/* begin RewardOrPenaltyTypes */}
        <ContentRoute
          path="/Employment/rewardOrPenaltyTypes/new"
          component={RewardOrPenaltyTypeEdit}
        />
        <ContentRoute
          path="/Employment/rewardOrPenaltyTypes/:id/edit"
          component={RewardOrPenaltyTypeEdit}
        />
        <ContentRoute
          path="/Employment/rewardOrPenaltyTypes"
          component={RewardOrPenaltyTypesPage}
        />
        {/* end RewardOrPenaltyTypes */}

        {/* begin SoldiershipExemptions */}
        <ContentRoute
          path="/Employment/soldiershipExemptions/new"
          component={SoldiershipExemptionEdit}
        />
        <ContentRoute
          path="/Employment/soldiershipExemptions/:id/edit"
          component={SoldiershipExemptionEdit}
        />
        <ContentRoute
          path="/Employment/soldiershipExemptions"
          component={SoldiershipExemptionsPage}
        />
        {/* end SoldiershipExemptions */}

        {/* begin SoldiershipTypes */}
        <ContentRoute
          path="/Employment/soldiershipTypes/new"
          component={SoldiershipTypeEdit}
        />
        <ContentRoute
          path="/Employment/soldiershipTypes/:id/edit"
          component={SoldiershipTypeEdit}
        />
        <ContentRoute
          path="/Employment/soldiershipTypes"
          component={SoldiershipTypesPage}
        />
        {/* end SoldiershipTypes */}

        {/* begin TaxUnits */}
        <ContentRoute path="/Employment/taxUnits/new" component={TaxUnitEdit} />
        <ContentRoute
          path="/Employment/taxUnits/:id/edit"
          component={TaxUnitEdit}
        />
        <ContentRoute path="/Employment/taxUnits" component={TaxUnitsPage} />
        {/* end TaxUnits */}

        {/* begin TechnicalTypes */}
        <ContentRoute
          path="/Employment/technicalTypes/new"
          component={TechnicalTypeEdit}
        />
        <ContentRoute
          path="/Employment/technicalTypes/:id/edit"
          component={TechnicalTypeEdit}
        />
        <ContentRoute
          path="/Employment/technicalTypes"
          component={TechnicalTypesPage}
        />
        {/* end TechnicalTypes */}

        {/* begin WorkShifts */}
        <ContentRoute
          path="/Employment/workShifts/new"
          component={WorkShiftEdit}
        />
        <ContentRoute
          path="/Employment/workShifts/:id/edit"
          component={WorkShiftEdit}
        />
        <ContentRoute
          path="/Employment/workShifts"
          component={WorkShiftsPage}
        />
        {/* end WorkShifts */}

        {/* begin WorkShiftCalenders */}
        <ContentRoute
          path="/Employment/workShiftCalenders/new"
          component={WorkShiftCalenderEdit}
        />
        <ContentRoute
          path="/Employment/workShiftCalenders/:id/edit"
          component={WorkShiftCalenderEdit}
        />
        <ContentRoute
          path="/Employment/workShiftCalenders"
          component={WorkShiftCalendersPage}
        />
        {/* end WorkShiftCalenders */}
      </Switch>
    </Suspense>
  );
}
