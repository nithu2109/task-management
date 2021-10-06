const taskContainer=document.querySelector(".taskcontainer");
let globalTaskData =[];

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
    localStorage.setItem("taskyCA",JSON.stringify({cards:globalTaskData}));

    //generate  html code 
    const newCard=`<div id=${taskData.id} class="col-md-6 col-lg-4 mt-3" >
    <div class="card">
      <div class="card-header ">
        <div class="d-flex justify-content-end gap-2">
         <button type="button" class="btn btn-outline-info" onclick="editTask(this)">
           <i class="fas fa-pencil-alt"></i>
         </button>
         <button type="button" class="btn btn-outline-danger"  onclick="deleteTask(this)">
           <i class="far fa-trash-alt" ></i>
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
        <button class="btn btn-outline-primary float-end">
          Open Task
        </button>
      </div>
    </div>
   </div>`
    //Inject it to dom
     taskContainer.insertAdjacentHTML('beforeend',newCard);
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
    globalTaskData=taskCards.cards;


    //generate html code for that data
    globalTaskData.map((taskData)=>{
        const newCard=`<div id=${taskData.id} class="col-md-6 col-lg-4 mt-3" >
        <div class="card">
          <div class="card-header ">
            <div class="d-flex justify-content-end gap-2">
             <button type="button" class="btn btn-outline-info" onclick="editTask(this)">
               <i class="fas fa-pencil-alt"></i>
             </button>
             <button type="button" class="btn btn-outline-danger"  onclick="deleteTask(this)">
               <i class="far fa-trash-alt" ></i>
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
            <button class="btn btn-outline-primary float-end">
              Open Task
            </button>
          </div>
        </div>
       </div>`;

       //inject that data to Dom
    taskContainer.insertAdjacentHTML("beforeend",newCard);
    });
    return;
    
};