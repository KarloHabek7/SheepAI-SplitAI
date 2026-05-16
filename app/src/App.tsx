import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('welcome')}</h1>
      <p>Start building your hackathon project here!</p>
    </>
  )
}

export default App
