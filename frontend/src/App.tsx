import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Layout /> }>
            <Route path="search" element={<p>search</p>} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
