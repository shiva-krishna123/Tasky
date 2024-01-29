//const taskContainer=document.getElementsByClassName("task_container"); appear in the form of array
// Parent element to store cards

const taskContainer=document.querySelector(".task_container");//directly accessing html element

//console.log(taskContainer);

//Global array storage
let globalStore=[];


//To make dynamic and insert dynamic data
const newCard = ({id,taskUrl,taskTitle,taskDescription,taskType}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-3">
    <button type="button" class="btn btn-outline-success"><i class="fa-solid fa-pencil"></i></button>
    <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments);"><i class="fa-solid fa-trash-can" onclick="deleteCard.apply(this, arguments);"></i></button>                  
  </div>
  <img src=${taskUrl} 
  class="card-img-top" 
  alt="..." 
  />
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <a href="#" class="btn btn-primary"><span class="badge bg-primary">${taskType}</span></a>
  </div>
  <div class="card-footer text-body-secondary ">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`;

const loadInitialTaskCards = () => {
  // access localstorage
  const getInitialData = localStorage.getItem("tasky"); //null
  if(!getInitialData) return; 
  // convert stringified object to object
  const { cards } = JSON.parse(getInitialData);
  
  //{ card: [{...}] }

  //map around the array to generate HTML card and inject it to DOM
  cards.map((cardObject) =>{
    const createNewCard = newCard(cardObject);    
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    globalStore.push(cardObject);
  });

};



const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, // unique number for card id 
        taskUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
    };
    //HTML CODE
    const createNewCard = newCard(taskData);    
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    
    // store the newcard data in global storage
    globalStore.push(taskData);

    // update it on the local storage we have to call local storage API
    // Application Programming Interface
    // localstorage -> interface -> programming
    // add to localstorage
    //convert to string FROM OBJECT using JSON.stringify
    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore}));
    //(key,data), key is like id

    //{ card: [{...}] }

    //array of object
    //console.log(globalStore);

    //loops
    //functions
    //foreach
    //map


};

const deleteCard = (event) => {
  //id
  event = Window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;//Button
  //console.log(targetID);

  // search the globalStore, remove the object which matches with the id
  // filter -> new array similar to map but filter out some objects in array
  const newUpdatedArray = globalStore.filter(
  (cardObject) => cardObject.id !== targetID);

  newUpdatedArray.map((cardObject) =>{
    const createNewCard = newCard(cardObject);    
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
  });
  globalStore = newUpdatedArray;
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}))

  // access DOM to remove them
  if(tagname==="BUTTON"){
    //task_container
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  }
  
  //task_container if it is a icon
  return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode
  );
  // loop over the new globalStore, and inject updated cards to DOM xxx doesn't work in DOM
};

// Parent object of Browser ->  Window
// Parent obect of html -> DOM -> document


// DOM Manipulation-2
// issues
// The modal was not closing upon adding new card. -->  [Solved]
// the cards were deleted after refresh --> localstorage (5MB of Data in each website) -> [Solved]

// features
// Delete modal feature
// open task
// edit task