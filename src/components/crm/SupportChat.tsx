import { useState } from "react";
import { X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface SupportChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportChat({ isOpen, onClose }: SupportChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Olá! Sou o assistente virtual do CRM. Como posso ajudá-lo hoje?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simular resposta do bot
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("cliente") || input.includes("lead")) {
      return "Posso ajudá-lo com informações sobre clientes e leads. Você pode acessar a lista completa na seção 'Clientes' ou adicionar novos leads clicando em 'Novo Cliente'.";
    }
    
    if (input.includes("vendas") || input.includes("receita")) {
      return "Para informações sobre vendas, confira o dashboard principal onde você encontra métricas de receita, conversões e o pipeline de vendas atualizado.";
    }
    
    if (input.includes("relatório") || input.includes("análise")) {
      return "Os relatórios estão disponíveis na seção 'Relatórios'. Lá você pode gerar análises detalhadas de performance, vendas e atividades.";
    }
    
    if (input.includes("problema") || input.includes("erro")) {
      return "Descreva o problema que está enfrentando e tentarei ajudá-lo a resolvê-lo. Você também pode entrar em contato com o suporte técnico.";
    }
    
    return "Entendi sua pergunta. Posso ajudá-lo com navegação no CRM, relatórios, gestão de clientes e muito mais. Seja mais específico sobre o que precisa.";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Card className={cn(
        "w-80 shadow-lg transition-all duration-300",
        isMinimized ? "h-14" : "h-96"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Suporte CRM</span>
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-6 h-6 p-0"
              >
                {isMinimized ? (
                  <Maximize2 className="w-3 h-3" />
                ) : (
                  <Minimize2 className="w-3 h-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="w-6 h-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start space-x-2",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-primary">
                          <Bot className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={cn(
                        "max-w-[200px] rounded-lg px-3 py-2 text-sm",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {message.content}
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="w-6 h-6">
                        <AvatarFallback>
                          <User className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}