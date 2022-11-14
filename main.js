let myUl = document.getElementById("Box");

//load if the array exist
function loadArr() {
  if (localStorage.getItem("dataArray")) {
    let arr = JSON.parse(localStorage.getItem("dataArray"));
    return arr;
  }
}

//this will load the data from the local storage
function preLoader() {
  if (localStorage.getItem("dataArray")) {
    let arr = loadArr();
    arr.forEach((element) => {
      createTheElement(myUl, element);
    });
  }
  console.log("we are set to go");
}

//this function will be called only once when the page is reloaded
preLoader();

//This will create the single list element of the work
function createTheElement(ulElement, textValue) {
  let theLi = document.createElement("li");
  let ContentHolder = document.createElement("p");

  ContentHolder.textContent = textValue;
  theLi.classList.add("liElement");

  let deleteButton = document.createElement("button");
  deleteButton.id = "deleteMe";

  deleteButton.classList.add("fa-solid");
  deleteButton.classList.add("fa-trash-can");

  // adding event listener to remove the element
  removeTask(deleteButton);

  theLi.appendChild(ContentHolder);
  theLi.appendChild(deleteButton);

  // myUl.appendChild(theLi);
  ulElement.prepend(theLi);
}

//Here we are adding this to the --ul-- list
function addToList() {
  let Data = document.getElementById("fetchedData").value;
  // console.log(Data);
  if (Data == "") {
    alert("Hello! Did you miss to ENTER the work!!");
  } else {
    createTheElement(myUl, Data);
    addDataToLocalStorage(Data);
    document.getElementById("fetchedData").value = "";
  }
}

//checking the data in local storage and inserting or updating the data
function addDataToLocalStorage(data) {
  if (localStorage.getItem("dataArray")) {
    let arr = loadArr();
    arr.push(data);
    localStorage.setItem("dataArray", JSON.stringify(arr));
    console.log(arr);
  } else {
    let arr = [data];
    localStorage.setItem("dataArray", JSON.stringify(arr));
    console.log("created new array");
  }
}

//delete funcction of the button
function removeTask(deleteButton) {
  deleteButton.addEventListener("click", function (e) {
    let arr = loadArr();
    let text = e.target.previousElementSibling.innerText;
    arr.forEach((_, i) => {
      if (arr[i] === text) {
        console.log(_, i, text);
        arr.splice(i, 1);
      }
    });

    localStorage.setItem("dataArray", JSON.stringify(arr));
    console.log(arr);
    e.target.parentElement.remove();
  });
}
