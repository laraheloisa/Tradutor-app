import { useState, useEffect } from 'react'

const languages = [
  {code: 'en', name:'Inglês'},
  {code: 'es', name:'Espanhol'},
  {code: 'fr', name:'Francês'},
  {code: 'de', name:'Alemão'},
  {code: 'it', name:'Italiano'},
  {code: 'pt', name:'Português'},

]

function App() {
  const [sourceLang, setSorceLang] = useState('pt')
  const [targetLang, SetSorceLang] = useState('en')
  const [sourceText, setSorceText] = useState(' ')
  const [isLoading, setIsLoading] = useState('false')

  useEffect(() => {



  },  [sourceText])


  return (
    <div className='min-h-screen bg-background1 flex flex-col'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-5xl mx-auto px-4 py-3 flex items-center'>
          <h1 className='text-headerColor text-2xl font-bold'>Tradutor</h1>
        </div> 
      </header>
      <main className='flex-grow flex items-start justify-center px-4 py-8'>
        <div className='w-full max-w-5xl bg-white rounded-md shadow-sm overflow-hidden'>
          <div className='flex items-center justify-between p-4 border-b border-gray-200'>
            <select value={sourceLang} onChange={ event =>  setSorceLang (event.target.value)} className='text-sm text-textColor bg-transparent focus:outline-none cursor-pointer'> //o usuário pode escolher uma opção
                {languages.map((lang) => ( //Para cada elemento (que é um objeto) dentro de languages, o map() passará o item atual para a variável lang.  chave para identificar a forma única de cada item. E o value para retornar o valor que será enviado quando o usuário selecionar essa opção. 
                  <option key={lang.code} value={lang.code}> 
                    {lang.name}
                  </option>
              ))}
            </select>

            <button className='p-2 rounded-full hover:bg-gray-100 outline-none'>
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

            <select value={targetLang} onChange={ event =>  setSorceLang (event.target.value)} className='text-sm text-textColor bg-transparent focus:outline-none cursor-pointer'> //o usuário pode escolher uma opção
                {languages.map((lang) => ( //Para cada elemento (que é um objeto) dentro de languages, o map() passará o item atual para a variável lang.  chave para identificar a forma única de cada item. E o value para retornar o valor que será enviado quando o usuário selecionar essa opção. 
                  <option key={lang.code} value={lang.code}> 
                    {lang.name}
                  </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2'>

              <div className='p-4'> 
              {/* por padrão ele tem uma coluna, telas grandes/médias dois colunas */}
                <textarea 
                value={sourceText}
                onChange={event =>  setSorceText (event.target.value)}
                placeholder="Digite seu texto..." 
                className='w-full h-40 text-lg text-textColor bg-tranparent resize-none border-none'>
                </textarea>
              </div>
             
              <div className='p-4 relative bg-background1 border-1 border-gray-200'>
                <div className='absolute inset-0 flex items-center justify-center'>


                    
                    
                    <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500'> 
                    <p className='text-lg text-textColor'></p>
                    </div>
                </div>
              </div>
              

          </div>
        </div>
      </main>

      <footer className='bg-white border-t border-gray-200 mt-auto'>
        <div className='max-w-5xl mz-auto px-4 py-3 text-sm text-headerColor'>
          &copy; Tradutor {new Date().getFullYear()}
        </div>
      </footer>

    </div>
  )
}

export default App
