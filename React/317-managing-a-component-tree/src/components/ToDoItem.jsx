import React from "react";

function ToDoItem(props){
    //#region Code for striking off the list item when clicking

    // const [isDone, setIsDone] = React.useState(false);
 
    // function handleClick(){
    //     setIsDone(prev => {
    //         return !prev;
    //     });
    // }

    // const customStyle = isDone ? {
    //     textDecoration: "line-through"
    // } : {};
    
    // return <li onClick={handleClick} style={customStyle}>{props.todoItem}</li>
    //#endregion

    return <li onClick={ () => 
        {
            props.onChecked(props.id)
        }
    }>{props.todoItem}</li>
}

export default ToDoItem;