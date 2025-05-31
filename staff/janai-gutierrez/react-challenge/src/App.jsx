const useState = React.useState 
const useEffect = React.useEffect 

  

const App = () => {
    const [showForm, setShowForm] = useState(true)
    const [words, setWords] = useState([]);
    const [timeStamp, setTimeStamp] = useState(Date.now());
    const [numbers, setNumbers] = useState([]);

    useEffect(() => {const retrievedWords = data.words.getAll();setWords(retrievedWords);}, [timeStamp]);
    useEffect(() => {const retrievedNumbers = data.numbers.getAll();setNumbers(retrievedNumbers);}, [timeStamp]);

    const handleNavClick = () => {
        setShowForm(!showForm)
        setTimeStamp(Date.now())
    }
    const handleSubmit = (formData) => {
        handleSendNewWord(formData);
        handleSendNewNumber(formData);
      }

    const handleSendNewNumber = (newNumberFormData) => {
        const newNumber = newNumberFormData.number;
        data.numbers.addNew(newNumber);

        setShowForm(!showForm);
        setTimeStamp(Date.now());
    }

    const handleSendNewWord = (newWordFormData) => {
        const newWord = newWordFormData.word;
        data.words.addNew(newWord);
    
        setShowForm(!showForm);
        setTimeStamp(Date.now());
    }
    
    const handleDeleteNumber = (numberIndex) => {
        data.numbers.deleteByIndex(numberIndex);
        setTimeStamp(Date.now());
    }
    

    const handleDeleteWord = (wordIndex) => {
        data.words.deleteByIndex(wordIndex)
        setTimeStamp(Date.now())
    }

    return (<div className="main-container">
        <Btn
            className={'navigation-button'}
            btnCallback={handleNavClick}
            btnContent={showForm ? 'Ir a lista de palabras' : 'Añadir más palabras'}
        />
        { 
        showForm && <Form
            inputs = {[
                { type: 'text', placeholder: 'Nueva palabra', id: 'word', className: 'input' },
                { type: 'number', placeholder: 'Nuevo numero', id: 'number', className: 'input' }
            ]}
            onsSubmitCallback = {handleSubmit}
            submitText = 'Guardar'
            className = 'form'            
        />      
        }
        { 
  !showForm && (
    <div className='main-container'>
      <List
          items={words}
          onItemClick={handleDeleteWord}
      />
      <List
          items={numbers}
          onItemClick={handleDeleteNumber}
      />
    </div> //ha d'estar dins d'un element div perque dos sueltos no deixa
  )
}


    </div>);
}
