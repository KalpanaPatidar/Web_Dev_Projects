const todos=require('../data/todos');

function getTodos(req,res) {
    res.status(200).json(todos);
}

function  createTodo(req,res){
    const task=req.body.task;
    if(!task || task.trim()==""){
        res.status(400).json({message:"task is required"});
    }
    const newTodo={
        id:todos.length+1,
        task:task,
        completed:false
    }
    todos.push(newTodo);
    res.status(201).json({
        message:"Todo created successfully",
        todo:newTodo
    });
}

function updateTodo(req,res){
    const id=Number(req.params.id);
    const task=req.body.task;

    const todo=todos.find((todo)=>todo.id===id);
    if(!todo){
        res.status(404).json({message:"Todo not found"});
    }
    todo.task=task;
    res.status(200).json({
        message:"Todo updated successfully",
        todo:todo
    })
}

function deleteTodo(req,res){
    const id=Number(req.params.id);
    const index=todos.findIndex((todo)=>todo.id===id);
    if(index===-1){
        res.status(404).json({message:"Todo not found"});
    }

    const deletedTodo=todos.splice(index,1);

    res.status(200).json({
        message:"Todo deleted successfully",
        todo:deletedTodo[0]});

}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};