1)

function countBigger(arr, y)
{
    var count = 0;

    for(var i = 0; i < arr.length; i++)
    {
        if(arr[i] > y)
        {
            count +=1;
        }
    }
    return count;
}

var b = countBigger([1,2,3,4,5], 3);
console.log(b);


2)

function stats(arr)
{
    var max = arr[0];
    var min = arr[0];
    var avg = arr[0];

    for(var i = 1; i < arr.length; ++i)
    {
        if(arr[i] > max)
        {
            max = arr[i];
        }
        else if(arr[i] < min)
        {
            min = arr[i];
        }

        avg += arr[i];
    }

    console.log("Min is: " + min);
    console.log("Max is: " + max);
    console.log("Avg is: " + (avg/arr.length));
}

stats([1,2,3,4,5]);


3)

function noNegatives(arr)
{
    for(var i=0; i< arr.length; ++i)
    {
        if(arr[i] < 0)
        {
            arr[i] = "Dojo";
        }
    }

    return arr;
}

console.log(noNegatives([1,2,-3,-5,5]));


4)

function removeSubstring(arr, start, end)
{
    arr.splice(start, (end-start+1));
    return arr;
}

console.log(removeSubstring([20,30,40,50,60,70],2,4));