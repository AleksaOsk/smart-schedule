import { Header } from './components/Header'
import { ScheduleExample } from './components/ScheduleExample'
import { FeedbackSection } from './components/FeedbackSection'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <ScheduleExample />
        <FeedbackSection />
      </main>
    </div>
  )
}

export default App