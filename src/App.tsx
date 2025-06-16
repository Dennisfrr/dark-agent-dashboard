import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contatos from "./pages/Contatos";
import ContatoDetalhes from "./pages/ContatoDetalhes";
import Inbox from "./pages/Inbox";
import Pipeline from "./pages/Pipeline";
import Vendas from "./pages/Vendas";
import Relatorios from "./pages/Relatorios";
import DesempenhoAgente from "./pages/DesempenhoAgente";
import Calendario from "./pages/Calendario";
import Configuracoes from "./pages/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/contatos" element={<Contatos />} />
          <Route path="/contatos/:id" element={<ContatoDetalhes />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/relatorios/desempenho-agente" element={<DesempenhoAgente />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
