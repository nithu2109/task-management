const taskContainer=document.querySelector(".taskcontainer");
let globalTaskData =[];

const generateHTML =(taskData)=>
  `<div id=${taskData.id} class="col-md-6 col-lg-4 mt-3" >
    <div class="card">
      <div class="card-header ">
        <div class="d-flex justify-content-end gap-2">
         <button type="button" class="btn btn-outline-info" onclick="editTask(this)">
           <i class="fas fa-pencil-alt"></i>
         </button>
         <button type="button" class="btn btn-outline-danger" name=${taskData.id} onclick="deleteTask(this)">
           <i class="far fa-trash-alt"  ></i>
         </button>
        </div> 
      </div>
      <div>
        <img src=${taskData.url} class="card-img-top" alt="image">
      </div>
      <div class="card-body">
        <h5 class="card-title">${taskData.title}</h5>
        <p class="card-text">${taskData.description}</p>
        <span class="badge bg-primary">${taskData.type}</span>
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-primary float-end" name=${taskData.id}>
          Open Task
        </button>
      </div>
    </div>
   </div>`;
    
const injectDOM=(content)=>
taskContainer.insertAdjacentHTML("beforeend",content);

const saveToLocalStorage = ()=>
localStorage.setItem("taskyCA", JSON.stringify({ card: globalTaskData }));
 
const addNewCard=()=>{
    const taskData ={
        id:`${Date.now()}`,
        url:document.getElementById("imgurl").value,
        title:document.getElementById("tasktitle").value,
        type:document.getElementById("tasktype").value,
        description:document.getElementById("taskdescription").value,
    };
       //pushing data to globalTaskData array
      globalTaskData.push(taskData);
       //updating the local storage
     saveToLocalStorage();

    //generate  html code 
    const newCard=generateHTML(taskData);
    //Inject it to dom
     injectDOM(newCard);
    //clear form
    document.getElementById("imgurl").value="";
    document.getElementById("tasktitle").value="";
    document.getElementById("tasktype").value="";
    document.getElementById("taskdescription").value="";

    return;
};

const loadExistingCards =()=>{

    //check local storage
    const getData=localStorage.getItem("taskyCA")

    //if data in  local storage exist Parse that data
    if(!getData) return;
    const taskCards = JSON.parse(getData);
    globalTaskData=taskCards.card;


    //generate html code for that data
    globalTaskData.map((taskData)=>{
        const newCard=generateHTML(taskData);

       //inject that data to Dom
        injectDOM(newCard);
    });
    return;
    
};

const deleteTask = (e) => {
  const targetID = e.getAttribute("name");
  globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
  saveToLocalStorage();
  window.location.reload();
}

const editTask = (e) => {
  const targetID = e.getAttribute("name");
  
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")

  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", " saveEditTask(this)")
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
}

const saveEditTask=(e)=>{
  const targetID=e.getAttribute("name");
  const updatedData = {
    title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
    type: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
    description:e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
  };

  
  const updateGlobalTasks = globalTaskData.map((task) => {
    if (task.id === targetID) {
    
      return { ...task, ...updatedData };
    }
    return task;
  });

  globalTaskData = updateGlobalTasks;

  saveToLocalStorage();
  e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "false");
  e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "false");
  e.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "false");
  e.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "Open Task"


}
