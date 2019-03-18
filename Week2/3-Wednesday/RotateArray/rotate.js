function rotateSupreme(arr, num)
{
    let shiftNum = num % arr.length;
    let dir = "";
    let altShiftNum = 0;
    let decision = 0;
    let temp = 0;

    if(shiftNum < 0) {
        decision = shiftNum * -1;
    }
    else {
        decision = shiftNum;
    }

    altShiftNum = arr.length - decision;

    if(altShiftNum < decision && num > 0) {
        shiftNum = altShiftNum;
        dir = "left";
    }
    else if (altShiftNum < decision) {
        shiftNum = altShiftNum;
        dir = "right";
    }
    else if (decision < altShiftNum && num > 0) {
        dir = "right";
    }
    else {
        shiftNum = decision;
        dir = "left"
    }

    console.log(`Direction: ${dir} moving ${shiftNum} places`);
  
    if(dir === "left") {
        for(let i = 0; i < shiftNum; i+= 1) {
            temp = arr[0];
            for(let j = 1; j < arr.length; j+=1) {
                arr[j-1] = arr[j];
            }
            arr[arr.length - 1] = temp;
        }
    }
    else {
        for(let i = arr.length - 1; i > arr.length - (1+ shiftNum); i-=1) {
            temp = arr[arr.length-1];
            for(let j= arr.length-2; j >= 0 ; j-=1) {
                arr[j+1] = arr[j];
            }
            arr[0] = temp;
        }
    }

    return arr;
}

function rotate(arr, num) {
    let shiftNum = num % arr.length;
    let dir = "";

    if(shiftNum < 0) {
        shiftNum *= -1;
        dir = "left";
    }
    else {
        dir = "right";
    }

    console.log(`Regular rotate: ${dir} moving ${shiftNum} spaces`);

    if(dir === "left") {
        for(let i = 0; i < shiftNum; i+= 1) {
            temp = arr[0];
            for(let j = 1; j < arr.length; j+=1) {
                arr[j-1] = arr[j];
            }
            arr[arr.length - 1] = temp;
        }
    }
    else {
        for(let i = arr.length - 1; i > arr.length - (1+shiftNum); i-=1) {
            temp = arr[arr.length - 1];
            for(let j= arr.length-2; j >= 0 ; j-=1) {
                arr[j+1] = arr[j];
            }
            arr[0] = temp;
        }
    }

    return arr;
}


var testArr = [1,2,3,4,5];
console.log(`Original: ${testArr}`);

var t0 = performance.now();
var rotatedArr = rotateSupreme(testArr, 4);
var t1 = performance.now();

console.log(`Rotated: ${rotatedArr}`);
console.log(`SupremeRotate timed at: ${t1-t0}ms`);


testArr = [1,2,3,4,5];
t0 = performance.now();
rotatedArr = rotate(testArr, 4);
t1 = performance.now();

console.log(`Rotated: ${rotatedArr}`);
console.log(`Regular rotate timed at: ${t1-t0}ms`);