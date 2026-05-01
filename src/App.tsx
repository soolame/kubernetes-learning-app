import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PlaygroundPage from './pages/PlaygroundPage'
import DocsPage from './pages/DocsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
  )
}
