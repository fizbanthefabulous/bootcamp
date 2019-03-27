import React from 'react';

const TaskFilters = (props) => {
    return (
        <div id="TaskFilters">
            <span id="task num">{props.tasksActive} tasks left</span>
            <button id="all" onClick={(e) => props.updateFilter(e)}>All</button>
            <button id="active" onClick={(e) => props.updateFilter(e)}>Active</button>
            <button id="completed" onClick={(e) => props.updateFilter(e)}>Completed</button>
        </div>
    )
}

export default TaskFilters;