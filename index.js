import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


//ToDoItem Constructor
let currentId = 0;
class ToDoItem {
    constructor(title, description, dueDate, priority, isNewItemForm=false) {
        this.id = currentId++;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isNewItemForm = isNewItemForm;
    }
}

//data management
let todoList = [];
let startedList = [];
let doneList = [];


// Correct usage of Date.UTC
todoList.push(new ToDoItem("Brunch Planning", "Select a venue and create a menu", new Date(Date.UTC(2024, 1, 10)), "Medium")); // February 10, 2024
todoList.push(new ToDoItem("Team Meeting", "Discuss Q1 targets and team restructuring", new Date(Date.UTC(2024, 1, 15)), "Medium")); // February 15, 2024
todoList.push(new ToDoItem("Code Review", "Review the latest PRs and update documentation", new Date(Date.UTC(2024, 1, 20)), "Low")); // February 20, 2024

startedList.push(new ToDoItem("Marketing Campaign", "Prepare the campaign brief and initial designs", new Date(Date.UTC(2024, 2, 1)), "High")); // March 1, 2024
startedList.push(new ToDoItem("Budget Analysis", "Complete the Q1 budget review and forecast Q2 expenses", new Date(Date.UTC(2024, 2, 5)), "Medium")); // March 5, 2024

doneList.push(new ToDoItem("Recruitment Drive", "Complete the interview process for new hires", new Date(Date.UTC(2024, 0, 20)), "High")); // January 20, 2024
doneList.push(new ToDoItem("Software Update", "Deploy the latest software update to production", new Date(Date.UTC(2024, 0, 25)), "Medium")); // January 25, 2024
doneList.push(new ToDoItem("Data Migration", "Ensure all customer data is migrated to the new system", new Date(Date.UTC(2024, 0, 30)), "Low")); // January 30, 2024


app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", {todoList: todoList, startedList: startedList, doneList: doneList});
});

app.get('/length-of-lists', (req,res)=>{
    res.send({todoListLength : todoList.length, startedListLength : startedList.length, doneListLength : doneList.length})
});

app.get("/generate-new-item-form", (req, res) => {
    let theresAlreadyANewItemForm = false;
    // Loop through all 3 arrays
    [todoList, startedList, doneList].forEach((list) => {
        list.forEach((listItem) => {
            if (listItem.isNewItemForm==true) {
                theresAlreadyANewItemForm = true;
            }
        });
    });
    console.log("Was there a form? " + theresAlreadyANewItemForm);

    if(!theresAlreadyANewItemForm){
        let newPost = new ToDoItem("New To Do", "Build product roadmap", new Date(Date.UTC(2024, 1, 10)), "Low", true);
        todoList.unshift(newPost);
        res.render('partials/todolistitem-div-form.ejs', {item:newPost, list:'todo'});
        console.log("we sent something");
    }else{
        console.log("the user requested to generate a new to do item, but one already exists.");
        res.send("try again!");
    }
    
})

app.listen(port, () => {
    console.log("Server started on port " + port);
});

app.post("/move-to", express.json(), (req, res) => {
    const itemId = parseInt(req.body.id, 10);
    console.log(itemId);
    //find curent list
    let curList;
    switch (req.body.currentList) {
        case 'to-dos-column':
            curList = todoList;
            break;
        case 'started-column':
            curList = startedList;
            break;
        case 'done-column':
            curList = doneList;
            break;
        default:
            curList = todoList;
            break;
    }
    //find targetList
    let targetList;
    switch (req.body.targetList) {
        case 'todosList':
            targetList = todoList;
            break;
        case 'startedList':
            targetList = startedList;
            break;
        case 'doneList':
            targetList = doneList;
            break;
        default:
            targetList = todoList;
            break;
    }
    console.log(curList);
    console.log(targetList);

    //remove todo item from current list and add it to target list
    const itemIndex = curList.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        const [item] = curList.splice(itemIndex, 1);
        targetList.push(item);
    }
    res.json({ todoList: todoList, startedList: startedList, doneList: doneList });
});

app.put("/update-todo-item", express.json(), (req, res) => {
    console.log(req.body);
    // Loop through all 3 arrays
    [todoList, startedList, doneList].forEach((list) => {
        list.forEach((listItem) => {
            if (listItem.id == req.body.itemId) {
                passReqToListItem(listItem, req);
                if(listItem.isNewItemForm=true){
                    res.send({wasANewItem:true});
                    listItem.isNewItemForm=false;
                }
            }
        });
    });
});

function passReqToListItem(listItem, req){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    listItem.title = req.body.title;
    listItem.description = req.body.description;

    // Parse the date string
    let dateParts = req.body.dueDate.split(' ');
    let month = monthNames.indexOf(dateParts[0]);
    let day = parseInt(dateParts[1].replace(',', ''));
    let year = parseInt(dateParts[2]);

    // Create the Date object
    listItem.dueDate = new Date(Date.UTC(year, month, day));

    listItem.priority = req.body.priority;
}