import { Route } from "react-router-dom";
import { ServicesLoadingDialog } from "./Services-loading-dialog/ServicesLoadingDialog";
import { ServiceDeleteDialog } from "./Service-delete-dialog/ServiceDeleteDialog";
import { ServicesCard } from "./ServicesCard";
import { ServicesUIProvider } from "./ServicesUIContext";

export function ServicesPage({ history }) {
  const servicesUIEvents = {
    newServiceButtonClick: () => {
      history.push("/BodyBuilding/Services/new");
    },
    openEditServicePage: (id) => {
      history.push(`/BodyBuilding/Services/${id}/edit`);
    },
    openDeleteServiceDialog: (id) => {
      history.push(`/BodyBuilding/Services/${id}/delete`);
    },
    openDeleteServicesDialog: () => {
      history.push(`/BodyBuilding/Services/deleteServices`);
    },
    openFetchServicesDialog: () => {
      history.push(`/BodyBuilding/Services/fetch`);
    },
    openUpdateServicesStatusDialog: () => {
      history.push("/BodyBuilding/Services/updateStatus");
    },
  };
  
  return (
    <ServicesUIProvider servicesUIEvents={servicesUIEvents}>
      <ServicesLoadingDialog />
      <Route path="/BodyBuilding/Services/:id/delete">
        {({ history, match }) => (
          <ServiceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/Services");
            }}
          />
        )}
      </Route>
      <ServicesCard />
    </ServicesUIProvider>
  );
}