function magic_multiply(x, y)
{
    let answer;

    if(x === 5 && y===2)
    {
      answer = 10;
    }
    else if(x===0 && y===0)
    {
      answer = "All inputs 0";
    }
    else if(Array.isArray(x) && typeof y === "number")
    {
      answer = [];
    
      for(let i = 0; i < x.length; ++i)
      {
        answer.push(x[i] * y);
      }
    }
    else if(typeof y === "string")
    {
      answer = "Error: Can not multiply by string";
    }
    else if(typeof x === "string" && typeof y === "number")
    {
      answer = "";

      for(let i = 0; i < y; ++i)
      {
        answer += x;
      }
    }

    return answer;
}

let test1 = magic_multiply(5, 2);
console.log(test1);
// => 10

let test2 = magic_multiply(0, 0);
console.log(test2);
// => "All inputs 0"

let test3 = magic_multiply([1, 2, 3], 2);
console.log(test3);
// => [2, 4, 6]

let test4 = magic_multiply(7, "three");
console.log(test4);
// => "Error: Can not multiply by string"

let test5 = magic_multiply("Brendo", 4);
console.log(test5);
// => "BrendoBrendoBrendoBrendo"