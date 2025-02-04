import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Router, Switch } from "wouter";

import { CommandBar, CommandBarProvider } from "./components/CommandBar";
import { HomePage } from "./components/HomePage";
import { JsonKeystoreUnlockDialog } from "./components/JsonKeystoreUnlockDialog";
import { Navbar } from "./components/Navbar";
import { ProviderNetworks } from "./components/ProviderNetworks";
import { ProviderTheme } from "./components/ProviderTheme";
import { ProviderWallets } from "./components/ProviderWallets";
import { TxReviewDialog } from "./components/TxReviewDialog";
import { WagmiWrapper } from "./components/WagmiWrapper";

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});

export default function App() {
  return (
    <CommandBarProvider>
      <ProviderTheme>
        <CssBaseline>
          <QueryClientProvider client={queryClient}>
            <WagmiWrapper>
              <ProviderWallets>
                <ProviderNetworks>
                  <Router>
                    <Switch>
                      <Route path="/dialog/tx-review/:id">
                        {({ id }: { id: string }) => (
                          <TxReviewDialog id={parseInt(id)} />
                        )}
                      </Route>

                      <Route path="/dialog/jsonkeystore-unlock/:id">
                        {({ id }: { id: string }) => (
                          <JsonKeystoreUnlockDialog id={parseInt(id)} />
                        )}
                      </Route>

                      <Route>
                        <CommandBar>
                          <Navbar />
                          <HomePage />
                        </CommandBar>
                      </Route>
                    </Switch>
                  </Router>
                </ProviderNetworks>
              </ProviderWallets>
            </WagmiWrapper>
          </QueryClientProvider>
        </CssBaseline>
      </ProviderTheme>
    </CommandBarProvider>
  );
}
