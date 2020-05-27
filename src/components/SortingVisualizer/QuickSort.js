import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms'

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            array: [],
        }
    }

    //when this component loads for the first time the reset array method is called
    componentDidMount() {
        this.resetArray();
    }

    //this method resets the array (Generate New Array)
    //allows duplicate values
    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            //push random value between 5 - 1000
            array.push(randomIntFromInterval(5, 700));
        }
        this.setState({ array });
    }

    
    //MergeSort Method 
    quickSort() {
        const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
        const sortedArray = sortingAlgorithms.bubbleSortWithoutAnime(this.state.array);


        //log True or False if Sorting ouput is equal as JS In-Built Sorting
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));

        this.setState({ array: sortedArray });
    }

    MainWindow(e) {
        e.preventDefault();
        window.location = '/'
    }
    quickSortwithAnim() {
        // We leave it as an exercise to the viewer of this code to implement this method.
        const array = this.state.array;
        const animations = sortingAlgorithms.getQuickSortAnimations(array);
        console.log(animations);
        const arrayBars = document.getElementsByClassName("array-bar");
    
        for (let i = 0; i < animations.length; i++) {
          setTimeout(() => {
            var [oldPosition, newPosition] = animations[i];
    
            var oldBarStyle = arrayBars[oldPosition].style;
            var newBarStyle = arrayBars[newPosition].style;
            var index;
            const dummyAnimations = [];
            if (array.length > 1) {
              index = sortingAlgorithms.quickSortPartition(
                array,
                0,
                array.length - 1,
                dummyAnimations
              ); //index returned from partition
              if (0 < index - 1) {
                //more elements on the left side of the pivot
                sortingAlgorithms.doQuickSort(dummyAnimations, array, 0, index - 1);
              }
              if (index < array.length) {
                //more elements on the right side of the pivot
                sortingAlgorithms.doQuickSort(dummyAnimations, array, 0, array.length - 1);
              }
            }
    
            oldBarStyle.height = `${this.state.array[oldPosition]}px`;
            newBarStyle.height = `${this.state.array[newPosition]}px`;
    
            oldBarStyle.backgroundColor = "green";
            newBarStyle.backgroundColor = "red";
    
            var currentPosition = oldPosition;
            for (let j = 0; j < currentPosition; j++) {
              var jBarStyle = arrayBars[j].style;
              jBarStyle.backgroundColor = "green";
            }
            if (i === animations.length - 1) {
              this.AllBarsGreen();
            }
          }, 0.5);
        }
      }
      AllBarsGreen() {
        console.log("Sorted");
        const arrayBars = document.getElementsByClassName("array-bar");
        var arrayLength = arrayBars.length;
        for (let j = 0; j < arrayLength; j++) {
            var jBarStyle = arrayBars[j].style;
            jBarStyle.backgroundColor = "limegreen";
        }
    }

    render() {
        const { array } = this.state;

        return (
            <div>
                <div className="array-container">
                    {array.map((value, idx) =>
                        //mapping values from array 
                        <div className="array-bar"
                            key={idx}
                            style={{ height: value + "px" }}>
                        </div>)}
                    <br></br>
                    <div className="button-merge-container">
                        <button className="buttonsMergeSort" onClick={() => this.quickSort()}>Quick Sort</button>

                        <button className="buttonsMergeSort" onClick={() => this.quickSortwithAnim()}>Quick Sort with Anim</button>

                        <button className="buttonsMergeSort" onClick={() => this.resetArray()}>Generate New Array</button>


                        <button className="buttonsMergeSort" onClick={e => this.MainWindow(e)}>Main Window</button>
                    </div>
                </div>

            </div>

        );
    }
}


//Function to return Random Value
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


//Function That Allows to Check User Defined Sorting Method and JS inBuilt Sorting are Equal
function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false
    }

    return true;
}
