import { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");  
  const [translatedText, setTranslatedText] = useState("");  // Texto traduzido
  const [isLoading, setIsLoading] = useState(false);  
  const [error, setError] = useState("");  // Armazena erros
  const [charCount, setCharCount] = useState(0);  // Contagem de caracteres
  const [fromLanguage, setFromLanguage] = useState("pt-br");  // Idioma de origem
  const [toLanguage, setToLanguage] = useState("en-us");  // Idioma de destino

 
  const handleInputChange = (e) => {
    const text = e.target.value;
    if (text.length <= 250) {
      setInputText(text);
      setCharCount(text.length);
    }
  };

  
  const handleTranslate = async (text) => {
    if (!text.trim()) return;

    setIsLoading(true);  
    setError("");  
    setTranslatedText("");  // Reseta o texto traduzido

    try {
      // Chamada à API MyMemory para tradução
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLanguage}|${toLanguage}`
      );
      const data = await response.json();

      if (data.responseStatus !== 200) {
        throw new Error("Erro ao traduzir o texto. Tente novamente.");
      }

      // Atualiza o estado com o texto traduzido
      setTranslatedText(data.responseData.translatedText);
    } catch (err) {
      setError(err.message || "Erro desconhecido.");
    } finally {
      setIsLoading(false);  // Desativa o indicador de carregamento
    }
  };

  // useEffect para chamar a tradução automaticamente toda vez que o inputText mudar
  useEffect(() => {
    if (inputText.trim()) {
      handleTranslate(inputText);  // Chama a tradução
    } else {
      setTranslatedText("");  
    }
  }, [inputText, fromLanguage, toLanguage]);  // Dependências: texto de entrada e idiomas

  // Função para alternar os idiomas
  const handleSwitchLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
          <h1 className="text-headerColor text-2xl font-bold">Tradutor</h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <select
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)}
            >
              <option value="pt-br">Português</option>
              <option value="en-us">Inglês</option>
            </select>

            <button
              className="p-2 rounded-full hover:bg-gray-100 outline-none"
              onClick={handleSwitchLanguages}
            >
              <svg
                className="w-5 h-5 text-headerColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <select
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
            >
              <option value="pt-br">Português</option>
              <option value="en-us">Inglês</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea
                className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none"
                placeholder="Digite seu texto..."
                value={inputText}
                onChange={handleInputChange}
              ></textarea>
              <div className="text-sm text-gray-500 mt-2">
                {charCount} / 250 caracteres
              </div>
            </div>

            <div className="relative p-4 bg-secondaryBackground border-l border-gray-200">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-blue-500 border-t-2"></div>
                </div>
              ) : (
                <p className="text-lg text-textColor">
                  {translatedText || "A tradução aparecerá aqui..."}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-100 border-t border-red-400 text-red-700">
              {error}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-headerColor">
          &copy; {new Date().getFullYear()} Tradutor
        </div>
      </footer>
    </div>
  );
}

export default App;
