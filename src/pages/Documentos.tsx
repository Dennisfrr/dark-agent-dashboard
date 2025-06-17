import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreVertical,
  Folder,
  File,
  Image,
  FileSpreadsheet
} from "lucide-react";

const documentosData = [
  {
    id: 1,
    nome: "Proposta_Comercial_TechCorp.pdf",
    tipo: "PDF",
    tamanho: "2.4 MB",
    data: "2024-01-15",
    categoria: "Propostas",
    cliente: "Tech Corp",
    status: "Enviado"
  },
  {
    id: 2,
    nome: "Contrato_DigitalInc.docx",
    tipo: "DOCX",
    tamanho: "1.8 MB",
    data: "2024-01-14",
    categoria: "Contratos",
    cliente: "Digital Inc",
    status: "Assinado"
  },
  {
    id: 3,
    nome: "Apresentacao_Produto.pptx",
    tipo: "PPTX",
    tamanho: "5.2 MB",
    data: "2024-01-12",
    categoria: "Apresentações",
    cliente: "Innovation Ltd",
    status: "Rascunho"
  },
  {
    id: 4,
    nome: "Planilha_Orcamento.xlsx",
    tipo: "XLSX",
    tamanho: "890 KB",
    data: "2024-01-10",
    categoria: "Orçamentos",
    cliente: "Future Tech",
    status: "Aprovado"
  }
];

const categorias = [
  { nome: "Propostas", quantidade: 15, cor: "primary" },
  { nome: "Contratos", quantidade: 8, cor: "success" },
  { nome: "Apresentações", quantidade: 12, cor: "warning" },
  { nome: "Orçamentos", quantidade: 6, cor: "accent" },
  { nome: "Relatórios", quantidade: 20, cor: "secondary" }
];

const getFileIcon = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-500" />;
    case 'docx':
    case 'doc':
      return <FileText className="w-5 h-5 text-blue-500" />;
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    case 'pptx':
    case 'ppt':
      return <File className="w-5 h-5 text-orange-500" />;
    case 'jpg':
    case 'png':
    case 'gif':
      return <Image className="w-5 h-5 text-purple-500" />;
    default:
      return <File className="w-5 h-5 text-muted-foreground" />;
  }
};

const Documentos = () => {
  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documentos</h1>
            <p className="text-muted-foreground">Gerencie seus arquivos e documentos</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">247</div>
                  <p className="text-muted-foreground text-sm">Total de Arquivos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">18.5 GB</div>
              <p className="text-muted-foreground text-sm">Espaço Usado</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">23</div>
              <p className="text-muted-foreground text-sm">Novos Esta Semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">12</div>
              <p className="text-muted-foreground text-sm">Pendentes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categorias.map((categoria, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center">
                      <Folder className="w-5 h-5 text-primary mr-3" />
                      <span className="font-medium text-foreground">{categoria.nome}</span>
                    </div>
                    <Badge variant="secondary">{categoria.quantidade}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Arquivos Recentes</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Buscar documentos..."
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nome</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cliente</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoria</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tamanho</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Data</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentosData.map((documento) => (
                        <tr key={documento.id} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              {getFileIcon(documento.tipo)}
                              <span className="ml-3 font-medium text-foreground">{documento.nome}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">{documento.cliente}</td>
                          <td className="py-4 px-4">
                            <Badge variant="outline">{documento.categoria}</Badge>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">{documento.tamanho}</td>
                          <td className="py-4 px-4 text-muted-foreground">{documento.data}</td>
                          <td className="py-4 px-4">
                            <Badge 
                              variant={
                                documento.status === "Assinado" ? "default" :
                                documento.status === "Aprovado" ? "default" :
                                documento.status === "Enviado" ? "secondary" : "outline"
                              }
                            >
                              {documento.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Rápido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                    <p className="text-xs text-muted-foreground">Suporta PDF, DOC, XLS, PPT, imagens</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-muted-foreground">Contrato assinado por Digital Inc</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                      <span className="text-muted-foreground">Proposta enviada para Tech Corp</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                      <span className="text-muted-foreground">Orçamento aprovado por Future Tech</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span className="text-muted-foreground">Nova apresentação criada</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </CRMLayout>
  );
};

export default Documentos;