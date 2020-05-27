import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms'


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// This is the main color of the array bars.
const PRIMARY_COLOR = "red";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)

        //array stored in state
        this.state = {
            array: [],
        };
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
    mergeSort() {
        const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
        const sortedArray = sortingAlgorithms.mergeSortwithoutAnim(this.state.array);


        //log True or False if Sorting ouput is equal as JS In-Built Sorting
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));

        this.setState({ array: sortedArray });
    }


    mergeSortwithAnim() {
        const animations = sortingAlgorithms.getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    if (i === animations.length - 1) {
                        this.makeAllBarsGreen();
                    }
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    if (i === animations.length - 1) {
                        this.makeAllBarsGreen();
                    }
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    MainWindow(e) {
        e.preventDefault();
        window.location = '/'
    }

    makeAllBarsGreen() {
        console.log("Sorted");
        const arrayBars = document.getElementsByClassName("array-bar");
        var arrayLength = arrayBars.length;
        for (let j = 0; j < arrayLength; j++) {
            var jBarStyle = arrayBars[j].style;
            jBarStyle.backgroundColor = "limegreen";
        }
    }
    //Method to Test A Hundred Arrays with random lengths and random values 
    testingAlgortihms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
            const MergeSortsortedArray = sortingAlgorithms.mergeSortwithoutAnim(this.state.array);
            console.log(arraysAreEqual(javaScriptSortedArray, MergeSortsortedArray));
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
                        <button className="buttonsMergeSort" onClick={() => this.mergeSort()}>Merge Sort</button>

                        <button className="buttonsMergeSort" onClick={() => this.mergeSortwithAnim()}>Merge Sort with Anim</button>

                        <button className="buttonsMergeSort" onClick={() => this.resetArray()}>Generate New Array</button>

                        <button className="buttonsMergeSort" onClick={() => this.testingAlgortihms()}>Testing Algorithms</button>

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

