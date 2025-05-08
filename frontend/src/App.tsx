import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout children={
            <>
              <p>Hello world</p>
            </>
            }/>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
