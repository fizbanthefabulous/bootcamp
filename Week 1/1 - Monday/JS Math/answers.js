//Math 1

function zero_negativity(x)
{
    let answer = true;

    for(let i = 0; i < x.length; ++i)
    {
        if(x[i] < 0)
        {
            answer = false;
            break;
        }
    }
    return answer;
}

console.log(zero_negativity([2,3,4]));
console.log(zero_negativity([2,-3,4]));



//Math 2

function is_even(x)
{
    let answer = true;

    if(x % 2 > 0)
    {
        answer = false;
    }

    return answer;
}

console.log(is_even(2));
console.log(is_even(3));


//Math 3

function how_many_even(x)
{
    let count = 0;
    for(let i = 0; i < x.length; ++i)
    {
        if(is_even(x[i]))
        {
            count++;
        }
    }

    return count;
}

console.log(how_many_even([2,2,3]));
console.log(how_many_even([3,3,3]));


//Math 4

function create_dummy_array(x)
{
    let array = [];
    let temp;

    for(let i = 0; i < x; ++i)
    {
        temp = Math.random() * 10;
        array.push(Math.floor(temp));
    }

    return array;
}

console.log(create_dummy_array(5));


//Math 5

function random_choice(x)
{
    return x[(Math.floor(Math.random() * (x.length)) + 1) - 1];
}

console.log(random_choice([1,2,3,4,5]));