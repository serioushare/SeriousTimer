# Stopwatch: Step 4 - Output Formatting
### Formatting the output time
That's it, we have a Stopwatch. But it only shows us milliseconds, fine for a few seconds, but not very usefull on the long run. So we need a formatting function to turn those milliseconds into something better readable.

#### Creating the format function
This function has to do a few things. It needs to distribute the milliseconds over the different time units, and put those back together as a string.
```javascript
// This function formats the time into a readable format.
function format(time){
  var hours = Math.floor(time/3600000);
  var minutes = ("0" + Math.floor(time/60000)%60).substr(-2);
  var seconds = ("0" + Math.floor(time/1000)%60).substr(-2);
  var milliseconds = ("00" + (time % 1000)).substr(-3);
  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
```

#### New update function
Now we need to add the format function to the update function;
```javascript
function update(){
  // Now we can output the formatted time
  document.getElementById("display").value = format(timer.time);
}
```

#### [Previous: Step 3 - Interface][step_3] | [Next: Step 4 - Output Formatting][step_4]

[step_3]: Step%203%20-%20Interface.md
[step_4]: Step%204%20-%20Output%20Formatting.md
