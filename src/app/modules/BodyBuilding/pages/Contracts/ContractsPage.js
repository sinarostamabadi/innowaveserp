import { Route } from "react-router-dom";
import { ContractsLoadingDialog } from "./Contracts-loading-dialog/ContractsLoadingDialog";
import { ContractDeleteDialog } from "./Contract-delete-dialog/ContractDeleteDialog";
import { ContractFactorDialog } from "./Contract-factor-dialog/ContractFactorDialog";
import { ContractsCard } from "./ContractsCard";
import { ContractsUIProvider } from "./ContractsUIContext";

export function ContractsPage({ history }) {
  const contractsUIEvents = {
    newContractButtonClick: () => {
      history.push("/BodyBuilding/Contracts/new");
    },
    openEditContractPage: (id) => {
      history.push(`/BodyBuilding/Contracts/${id}/edit`);
    },
    openDeleteContractDialog: (id) => {
      history.push(`/BodyBuilding/Contracts/${id}/delete`);
    },
    openShowContractDialog: (id) => {
      history.push(`/BodyBuilding/Contracts/${id}/show`);
    },
  };

  return (
    <ContractsUIProvider contractsUIEvents={contractsUIEvents}>
      <ContractsLoadingDialog />
      <Route path="/BodyBuilding/Contracts/:id/delete">
        {({ history, match }) => (
          <ContractDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/Contracts");
            }}
          />
        )}
      </Route>
      <Route path="/BodyBuilding/Contracts/:id/show">
        {({ history, match }) => (
          <ContractFactorDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/Contracts");
            }}
          />
        )}
      </Route>
      <ContractsCard />
    </ContractsUIProvider>
  );
}
