//console.log("Hello World");
// const state = {
//     taskList: [
//         // const taskList = [
//         {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//          {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//          {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//          {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//          {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//     ]
// }


const state = {
    taskList: [],
};

// DOM 
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

console.log(taskContents);
console.log(taskModal);


const htmlTaskContent = ({id, title, description, type, url}) => `
    <div class='col-md-6 col-lg-4 mt-3'  id=${id} key=${id}>
        <div class='card shadow task__card'>
            <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
                <button type='button' class='btn btn-outline-info mr-2' name=${id} onclick="editTask.apply(this, arguments)"><i class='fas fa-pencil-alt'></i></button>
                <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
                <i class='fas fa-trash-alt'></i></button>
            </div>
            <div class='card-body'>
                ${
                    url ?
                     `<img src=${url} alt='card image class='card-img-top md-3 rounded-md' />`
                     :
                     `<img src="https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180" alt='card image class='card-img-top md-3 rounded-md' />`
                }
                <h4 class='card-title'>${title}</h4>
                <p class='card-text text-muted'>${description}</p>
                <div class='tags d-flex flex-wrap'>
                    <span class='badge text-white bg-primary m-1'>${type}</span>
                </div>
            </div>
           <div class='card-footer'>
                <button type='button' class='btn btn-outline-primary float-end' data-bs-toggle='modal' 
                data-bs-target='#showTask' id=${id} onclick='openTask.apply(this, arguments)'>Open Task</button>
            </div>
        </div>
    </div>
`



const htmlModalContent = ({id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
        ${
                    url ?
                     `<img src=${url} alt='card image class='img-fluid rounded place__holder__image mb-3'  />`
                     :
                       `<img src="https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180" alt='card image class='card-img-top md-3 rounded-md' />`
                }
                <br>
        <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>    
         <h4 class='my-2'>${title}</h4>  
          <p class='lead text-muted'>${description}</p>  
    </div>
    `
};


const updateLocalStorage = () => {
    localStorage.setItem('task', JSON.stringify({
        tasks:  state.taskList,
    }));
};


const loadInitialData = () => {
 const localStorageCopy = JSON.parse(localStorage.task);

 if(localStorageCopy) state.taskList = localStorageCopy.tasks;

//  <!-- beforebegin -->
// <p>
//   <!-- afterbegin -->
//   foo
//   <!-- beforeend -->
// </p>
// <!-- afterend -->
// https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML


 state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
 });
};


const handleSubmit = () =>{
    const id = `${Date.now()}`
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        type: document.getElementById('tags').value,
    };

    if(input.title === '' || input.description=== '' || input.type===''){
        return alert("Please fill out the all the necessary fileds!");
    }
    taskContents.insertAdjacentHTML(
        "beforeend", htmlTaskContent({...input, id, })
    );

    state.taskList.push({...input, id});
    updateLocalStorage();
}


// Default img
// https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180



// Opening modal from the cards
const openTask = (event) => {
    if (!event) event = window.event;
    // if (!event) event = window.event; ye line bhi akeli chal sakti h aur dusra option opentask() ki jagah opentask(this , arguements)
    // bhi chal sakta h abhi maine dono chala k dikha diye h ek saath 

    const getTask = state.taskList.find(({id})=> id === event.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
}



// CRUD => Delete Operation
const deleteTask = (e) => {
    if(!e) e = window.event;
    const targetID = e.target.getAttribute("name");
    // console.log(e.target);
    const type = e.target.tagName;
    console.log(type);
    const removeTask = state.taskList.filter(({id}) => id !== targetID);
    // console.log(removeTask);
    state.taskList = removeTask;
    
    // console.log("updated arr", state.taskList);

    updateLocalStorage();
// I tag was not working fine
    if(type === "BUTTON"){
        // console.log(e.target.parentNode.parentNode.parentNode);
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
          e.target.parentNode.parentNode.parentNode.parentNode
        );
        
//  updateLocalStorage();
}


const editTask = (event) => {
    if(!event) event = window.event;

    const targetId = event.target.id;
    const type=event.target.tagName;

    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;

    if(type === "BUTTON")
    {
        parentNode = event.target.parentNode.parentNode;   
    }
    else if (type === "I")
    {
        parentNode = event.target.parentNode.parentNode.parentNode;
    }

    // taskTitle = parentNode.childNodes[3].childNodes;
    // 3 pe h stored card body toh hum usko call kar rhe h us
    // arrays stored h odd integers pe mai jab 1 likh rha hu toh card header aa rha h 
    // console.log(taskTitle);


    // NodeList(7) [text, div.card-header.d-flex.justify-content-end.task__card__header, text, div.card-body, text, div.card-footer, text]
    //     0: text
    //     1: div.card-header.d-flex.justify-content-end.task__card__header
    //     2: text
    //     3: div.card-body
    //     4: text
    //     5: div.card-footer
    //     6: text
    //     length: 7

    // AB HUME 3 CHAHIYE TO SELECT CARD BODY 

    // 0: text
    // 1: img.card-img-top.md-3.rounded-lg
    // 2: text
    // 3: h4.card-title.task__card__title
    // 4: text
    // 5: p.description.trim-3-lines.text-muted
    // 6: text
    // 7: div.tags.text-white.d-flex.flex-wrap
    // 8: text
    // length: 9

    // AUR CARD BODY K ANDAR SE 3-TASKTITLE , 5-TASKDESCRIPTION AUR 7-TYPE 


    taskTitle = parentNode.childNodes[3].childNodes[3];
    // parent node card h uske array k second pe yani 1 fer 3 pe card_body h 
    // uss card_body k andar bhi array h uske first pe image jo editable nhi h , 3rd pe title h 

    taskDescription = parentNode.childNodes[3].childNodes[5];
    // body k 5th yani 3rd k next pe description hua 

    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    // 7th pe tasktype hua but vo div mai h so uske liye ek child aur

    submitButton = parentNode.childNodes[5].childNodes[1];
    // footer was on 5 , accessing open task button to change it which was on 1

    // console.log(taskTitle , taskDescription , taskType , submitButton); ye karke dekhoge toh pta chalega ki card ki sari info fetch hogyi h 

    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    // setAttribute lets you edit things , basically ab tum ferse set kar sakte ho
    // ab mai normally click karu toh edit ka cursor aata h but edit nhi hota but 
    // when i click on pencil toh vo edit ho rha h but save nhi ho rha h uske liye function likhna padega

    submitButton.setAttribute("onclick","saveEdit.apply(this , arguments)");
    // submitButton mai humne vo openTask wale button ko daal rakha h toh ab hum
    // SAVE CHANGES PE JAB CLICK KARENGE TOH YE SAVE EDIT CALL HOGA AUR CHANGE HOJAYEGA SAB

    // i want ki open task aa raha h abhi toh vo pencil yani editTask k trigger pe vo change hoke SAVE CHANGES wale button mai convert ho
    // fer info edit ho rhi h , save ho toh modal open hone ki jagah saveEdit function call ho aur save karle 
    // fer vapis save change wala button open task mai convert ho aur modal khul jaye

    // data-bs-toggle="modal" data-bs-target="#showTask"
    submitButton.removeAttribute("data-bs-toggle"); 
    submitButton.removeAttribute("data-bs-target");
    // ab open nhi hoga modal on large screen humne vo attribute hata diya pencil k click pe
    submitButton.innerHTML="Save Changes";
    // on click of pencil Open Task converts to Save Changes

}

// EDIT TASK FUNCTION

const saveEdit = (e) => {
    if(!e) e=window.event;

    const targetID = e.target.id;
    const parentNode = e.target.parentNode.parentNode;
    // console.log(parentNode);

   const taskTitle = parentNode.childNodes[3].childNodes[3];
   const taskDescription =  parentNode.childNodes[3].childNodes[5];
   const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
   const submitButton = parentNode.childNodes[5].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML,
    };
    // console.log(updateData);

    // updating the latest data on our local array
    let stateCopy = state.taskList;

   
    stateCopy = stateCopy.map((task)=> 
    task.id === targetID
    ? {
        id: task.id,
        title: updateData.taskTitle,
        description: updateData.taskDescription,
        type: updateData.taskType,
    }
    : task
     );
     state.taskList = stateCopy;
     console.log(state.taskList);

     updateLocalStorage();
    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");



    submitButton.setAttribute('onclick', "openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    submitButton.innerHTML = "Open Task";
};


// Search Functionality
const searchTask = (e) =>{
    if(!e) e = window.event;
    
    while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild);
    }

    const resultData = state.taskList.filter(({title})=>  title.includes(e.target.value));

    console.log(resultData);
    resultData.map((cardData) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
}