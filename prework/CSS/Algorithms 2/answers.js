1) 2,3, undefined
2) 6, 10
3) 3,7
4) 15,15,10,15
5) 0,2,4,6,8,10,12,14
6) 0,0,0,1,0,2
7) 0,0,0,0,1,2,0,2,4,undefined
8) 0,0,0,0,0,0,1,2,3,4,0,2,4,6,8,15


9)

function printUpTo(x){
    // your code here
    if (x < 0) {
        return "false";
    }
    else {
        for(var i = 1; i =< x; i++)
        {
            console.log(i);
        }
    }
  }
  printUpTo(1000); // should print all the integers from 1 to 1000
  y = printUpTo(-10); // should return false
  console.log(y); // should print false


  10)

  function printSum(x){
    var sum = 0;
    //your code here
    for(var i = 0; i <= x; i++)
    {
        sum += i;
        console.log(i + "  Sum so far: " + sum);
    }
    return sum
  }
  y = printSum(255) // should print all the integers from 0 to 255 and with each integer print the sum so far.
  console.log(y) // should print 32640

  11)

  function printSumArray(x){
    var sum = 0;
    for(var i=0; i<x.length; i++) {
      //your code here
      sum += x[i];
    }
    return sum;
  }
  console.log( printSumArray([1,2,3]) ); // should log 6


  Bonus)

  function biggest(x){
    if(x.length > 0)
    {
        var big = x[0];

        for (var i = 1; i < x.length; i++)
        {
            if(x[i] > big){
                big = x[i];
            }
        }

        return big;
    }  
    else{
        return "No elements in array";
    }
  }

  var arr = [1,30,5,7];
  console.log(biggest(arr));


