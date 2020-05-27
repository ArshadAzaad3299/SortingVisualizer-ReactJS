import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms'

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

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

    MainWindow(e) {
        e.preventDefault();
        window.location = '/'
    }

    //this method resets the array (Generate New Array)
    //allows duplicate values..
    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            //push random value between 5 - 1000
            array.push(randomIntFromInterval(5, 700));
        }
        this.setState({ array });
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

    async bubbleSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
        const array = this.state.array;
        const animations = sortingAlgorithms.getBubbleSortAnimations(array);
        console.log(animations);
        const arrayBars = document.getElementsByClassName("array-bar");

        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                var [oldPosition, newPosition] = animations[i];

                var oldBarStyle = arrayBars[oldPosition].style;
                var newBarStyle = arrayBars[newPosition].style;

                var temp = this.state.array[oldPosition];
                this.state.array[oldPosition] = this.state.array[newPosition];
                this.state.array[newPosition] = temp;

                oldBarStyle.height = `${this.state.array[oldPosition]}px`;
                newBarStyle.height = `${this.state.array[newPosition]}px`;

                oldBarStyle.backgroundColor = "red";
                newBarStyle.backgroundColor = "green";

                var currentPosition = oldPosition;
                for (let j = 0; j < currentPosition; j++) {
                    var jBarStyle = arrayBars[j].style;
                    jBarStyle.backgroundColor = "red";
                }
                if (i === animations.length - 1) {
                    this.makeAllBarsGreen();
                }
            }, i * ANIMATION_SPEED_MS);
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
                        <button className="buttonsMergeSort" onClick={() => this.bubbleSort()}>Bubble Sort</button>

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

