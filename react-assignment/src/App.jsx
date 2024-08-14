import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RandomUP from './Components/RandomUP'
import RandomJT from './Components/RandomJT'
import CatL from './Components/CatL'

function App() {

  return (
   <div className="app">
      <Router>
        <Routes>
          <Route exact path='/' element={<RandomUP />} />
          <Route exact path='/random-jokes' element={<RandomJT />} />
          <Route exact path='/cats-listing' element={<CatL />} />
        </Routes>
      </Router>
   </div>
  )
}

export default App
