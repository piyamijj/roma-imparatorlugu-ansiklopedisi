"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Info, AlertTriangle } from "lucide-react";
import { AquilaIcon } from "../components/roman/RomanMotifs";

interface Message {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

// Helper function to safely parse basic markdown bold (**text**) into React elements
// without using dangerouslySetInnerHTML, avoiding XSS risks.
function parseMarkdownBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-serif font-bold text-porphyry-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function ChatInterface() {
  const searchParams = useSearchParams();
  const konuParam = searchParams.get("konu");

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pre-fill input if "konu" query parameter is present
  useEffect(() => {
    if (konuParam && konuParam.trim()) {
      setInputValue(`${konuParam.trim()} hakkında bana detaylı bilgi verir misin?`);
    }
  }, [konuParam]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const suggestedQuestions = [
    "Julius Caesar kimdir ve cumhuriyeti nasıl yıktı?",
    "Roma lejyonları nasıl örgütlenmişti ve savaş taktikleri nelerdi?",
    "Pax Romana nedir ve imparatorluğa ne kazandırdı?",
    "Batı Roma İmparatorluğu'nun çöküş nedenleri nelerdir?",
  ];

  const handleSuggestClick = (question: string) => {
    setInputValue(question);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message to state
    const userMsg: Message = { role: "user", content: trimmedInput };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmedInput,
          topicTitle: konuParam || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Yapay zeka asistanından yanıt alınırken bir hata oluştu.",
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sunucuyla bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col space-y-6">
      {/* Chat Window */}
      <div className="marble-surface rounded-2xl border border-marble-300/40 shadow-xl flex flex-col overflow-hidden flex-grow min-h-[450px] max-h-[65vh]">
        {/* Message List Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 bg-marble-50/30">
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              // Empty State Placeholder
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8 py-10"
              >
                <div className="text-bronze-500/20">
                  <Info size={64} />
                </div>
                <div className="space-y-2 max-w-md">
                  <h3 className="font-inscription text-lg font-bold text-porphyry-900 tracking-wider">
                    Roma Dünyasını Sorgulayın
                  </h3>
                  <p className="text-sm text-ink/60 font-body leading-relaxed">
                    Lejyon taktikleri, senato entrikaları, mitolojik efsaneler veya günlük yaşam... 
                    Antik Roma hakkında merak ettiğiniz her şeyi sorun, yapay zeka asistanımız yanıtlasın.
                  </p>
                </div>

                {/* Suggested Questions Chips */}
                <div className="space-y-3 max-w-xl w-full">
                  <span className="text-[10px] font-inscription tracking-widest text-gold-700 font-bold uppercase block">
                    Önerilen Sorular
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestClick(q)}
                        className="px-4 py-2 rounded-lg bg-marble-100 border border-marble-300/30 text-ink/80 text-xs font-body hover:bg-porphyry-900 hover:text-gold-300 hover:border-gold-500 transition-all duration-200 text-left shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              // Render Messages
              messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {/* Assistant Avatar */}
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full bg-porphyry-900 border border-gold-500/40 flex items-center justify-center text-gold-300 flex-shrink-0 shadow-md">
                        <AquilaIcon size={18} />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm sm:text-base leading-relaxed font-body shadow-sm ${
                        isUser
                          ? "bg-porphyry-900 text-marble-100 rounded-tr-none"
                          : msg.isError
                          ? "bg-red-50 border border-red-200 text-red-900 rounded-tl-none flex items-start gap-2"
                          : "bg-marble-50 border border-marble-300/30 text-ink rounded-tl-none"
                      }`}
                    >
                      {msg.isError && <AlertTriangle size={16} className="text-red-600 mt-1 flex-shrink-0" />}
                      <div className="space-y-2 whitespace-pre-wrap">
                        {parseMarkdownBold(msg.content)}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}

            {/* Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-porphyry-900 border border-gold-500/40 flex items-center justify-center text-gold-300 flex-shrink-0 shadow-md">
                  <AquilaIcon size={18} />
                </div>
                <div className="bg-marble-50 border border-marble-300/30 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-gold-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gold-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gold-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-marble-300/30 bg-marble-100/50 flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Roma hakkında bir soru sorun..."
            disabled={isLoading}
            className="flex-grow px-4 py-3 rounded-xl border border-marble-300/40 bg-marble-50 text-ink text-sm sm:text-base focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 disabled:opacity-50 font-body"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-gold-700 to-gold-500 text-ink font-inscription text-xs font-bold tracking-widest shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <Send size={14} />
            <span className="hidden sm:inline">GÖNDER</span>
          </button>
        </form>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[10px] sm:text-xs text-ink/40 font-body leading-relaxed max-w-2xl mx-auto">
        Yapay zeka asistanının yanıtları tarihsel sentezlere dayanmaktadır. Akademik araştırmalarınızda 
        birincil kaynakları (Tacitus, Livius vb.) referans almanız tavsiye edilir. Tarihsel belirsizlikler 
        ve tartışmalı konular asistan tarafından tarafsız bir dille sunulur.
      </p>
    </div>
  );
}

export default function SorPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Page Hero Band */}
      <section className="relative porphyry-surface py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-b border-gold-700/30 shadow-md">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10 flex flex-col items-center">
          <div className="transition-transform duration-300 hover:scale-110 mb-2">
            <AquilaIcon size={48} />
          </div>
          <span className="text-xs font-inscription tracking-widest text-gold-300 uppercase font-bold">
            ORACULUM ROMANUM
          </span>
          <h1 className="inscription-text text-3xl sm:text-4xl font-bold text-marble-50 tracking-wider leading-tight">
            Yapay Zekaya Sor
          </h1>
          <p className="text-xs sm:text-sm text-marble-300/80 leading-relaxed font-body max-w-xl mx-auto">
            Antik Roma medeniyetinin tarihi, dini, kültürü, ekonomisi, siyaseti ve askeri yapısı hakkında 
            istediğiniz her şeyi sorun, yapay zeka asistanımız detaylı ve akademik yanıtlar üretsin.
          </p>
        </div>
      </section>

      {/* Chat Interface wrapped in Suspense for useSearchParams */}
      <Suspense
        fallback={
          <div className="flex-grow flex items-center justify-center py-20 text-ink/40 font-body text-sm">
            Yükleniyor...
          </div>
        }
      >
        <ChatInterface />
      </Suspense>
    </div>
  );
}