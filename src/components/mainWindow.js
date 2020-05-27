import React from 'react'
import './mainWindow.css'

export default class MainWindow extends React.Component {

  MergeSortWindow(e) {
    e.preventDefault();
    window.location = 'https://eager-dubinsky-e7f73e.netlify.app/mergeSort'
  }

  BubbleSortWindow(e) {
    e.preventDefault();
    window.location = '/bubbleSort'
  }

  QuickSortWindow(e) {
    e.preventDefault();
    window.location = '/quicksort'
  }
  render() {
    return (
      <div>
        <h2 className="header">Sorting Visualizer</h2>
        <div className="MainWindow-Buttons">
          <button className="mButtons" onClick={e => this.MergeSortWindow(e)}>Merge Sort</button>
          <button className="mButtons" onClick={e => this.BubbleSortWindow(e)}>Bubble Sort</button>
          <button className="mButtons" onClick={e => this.QuickSortWindow(e)}>Quick Sort</button>
          <button className="mButtons">Heap Sort</button>
        </div>
        <footer>
          <p className="done-by">Arshad Azaad</p>
        </footer>

      </div>
    )
  }
}

