1) 5
2) [2,2,5], [2,2,5], [6,8,5],[6,8,5]
3) [2,2,5]
4) true
5) Invalid
6) Invalid
7) 10
8) no output

9) 

function printAverage(x){
    sum = 0;
    // your code here

    for(var i = 0; i < x.length; i++)
    {
        sum += x[i];
    }

    return sum / x.length;
 }
 y = printAverage([1,2,3]);
 console.log(y); // should log 2
   
 y = printAverage([2,5,8]);
 console.log(y); // should log 5


 10)

 function returnOddArray(){
    var arr = [];

    for (var i = 1; i <= 255; i=i+2)
    {
        arr.push(i);
    }

    return arr;
 }
 y = returnOddArray();
 console.log(y); // should log [1,3,5,...,253,255]

 11)

 function squareValue(x){
    for(var i = 0; i < x.length; ++i)
    {
        x[i] *= x[i];
    }
    return x;
 }
 y = squareValue([1,2,3]);
 console.log(y); // should log [1,4,9]
   
 y = squareValue([2,5,8]);
 console.log(y); // should log [4,25,64]