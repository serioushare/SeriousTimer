# Stopwatch: Step 2 - Interface
### Creating the interface

The first thing we need for the stopwatch is an interface. We'll start with the most basic elements that we need; A display, to show us the time and a start/stop button. A reset button would also be handy, so we don't have to keep reloading to reset the timer. We also need a panel to put everything in so we can style it more easily later on.

#### HTML Layout
First we create the form that will house the stopwatch, and add the first controls.
I made the choise to use input/button tags because it already has some styling.
```HTML
<div id="stopwatch">
  <input id="display" readonly="readonly" value="0" />
  <br />
  <button id="start_stop">Start</button>
  <button id="mark_reset">Reset</button>
</div>
```
The input field will display the time, and the 2 buttons will control the stopwatch. The reset button is called `mark_reset`, we'll get to the reason for that in a later step.

#### CSS-Styling
If you want you can use the following css-code to apply some simple styling.
```CSS
#stopwatch {
  display: inline-block;
  margin: 25px;
  padding: 15px;
  background-color: #d2d2d2;
}

#display {
  width: 266px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 20px;
  text-align: center;
}

#stopwatch>button {
  width: 135px;
  padding: 6px;
  margin-right:-4px;
  text-align: center;
}
```

#### [Previous: Step 1 - Setup][step_1]
#### [Next: Step 3 - Basic Functions][step_3]

[step_1]: Step%201%20-%20Setup.md
[step_3]: Step%203%20-%20Basic%20Functions.md
