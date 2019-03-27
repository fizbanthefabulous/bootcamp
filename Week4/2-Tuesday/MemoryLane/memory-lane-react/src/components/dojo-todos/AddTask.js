import React from 'react';

const AddTask = (props) => {
    return (
        <div id="addTask">
            <input type="text" placeholder="What do you need to do?" id="addTask" onKeyDown={(e) => props.addTask(e)}></input>
        </div>
    )
}

export default AddTask;