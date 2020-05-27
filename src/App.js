import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainWindow from './components/mainWindow'
import MergeSort from './components/SortingVisualizer/MergeSort'
import BubbleSort from './components/SortingVisualizer/BubbleSort'
import QuickSort from './components/SortingVisualizer/QuickSort'

//App...
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={MainWindow}/>
        <Route path="https://eager-dubinsky-e7f73e.netlify.app/mergeSort" exact component={MergeSort}/>
        <Route path ="/bubbleSort" exact component ={BubbleSort}/>
        <Route path ="/quickSort" exact component ={QuickSort}/>

      </Router>
    </div>

  )
}

export default App;