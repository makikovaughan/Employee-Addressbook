//Switch to the view screen and clean the values
const renderScreen = function () {

    //Make the view screen viewable
    const statusShow = "show";
    const statusActive = "active";

    $("#v-pills-view").removeClass(statusShow);
    $("#v-pills-view").removeClass(statusActive);

    //Clear the value inside input tags
    $("#name").val("");
    $("#officeNum").val("");
    $("#phoneNum").val("");

    //Clear the previous value of verification when it is initially clicked
    $("#result").empty();
    $("#verifyName").val("");

    //Clear the previous value of verification when it is initially clicked
    $("#newName").val("");
    $("#newOfficeNum").val("");
    $("#newPhoneNum").val("");

    //Clear the previous value of deleted employee's name when it is initially clicked
    $("#deleteName").val("");
}

//Render the list of employee
function renderList() {

    $("#v-pills-view").empty();

    for (let i = 0; i < employeeList.length; i++) {

        $("#v-pills-view").append(`<div class="border border-info pl-3 mt-3 mb-3"> 
        <p>${employeeList[i].name}</p>
        <p>${employeeList[i].officeNum}</p>
        <p>${employeeList[i].phoneNum} </p></div>`);

    }

}


//Change to Add screen on the right window
$("#v-pills-view-tab").on("click", renderList);



//Add the new data to the employee list and list it again.
const addEmployee = function () {

    const nameVal = $("#name").val();
    const officeVal = $("#officeNum").val();
    const phoneVal = $("#phoneNum").val();

    if (nameVal.trim() === "" || officeVal.trim() === "" || phoneVal.trim() === "") {
        alert("Please enter values to all spaces");
    }
    else {
        const employeeVal = { name: nameVal.trim(), officeNum: officeVal.trim(), phoneNum: phoneVal.trim() };

        console.log(employeeVal);

        employeeList.push(employeeVal);


        //Change the add button viewable
        const statusShow = "show";
        const statusActive = "active";

        //Make the view screen viewable
        $("#v-pills-view").addClass(statusShow);
        $("#v-pills-view").addClass(statusActive);

        //Call function to render the updated list
        renderList();
    }

}

//Change to Add screen on the right window
$("#v-pills-add-tab").on("click", renderScreen);

//EventListener when the add was clicked
$("#add").on("click", addEmployee);


const verifyEmployee = function () {

    //Store the name of verification
    const employeeName = $("#verifyName").val();

    if (employeeName.trim() === "") {
        alert("Please enter the name of employee");
    }
    else {

        //Checking the employee list
        // for(let i=0; i< employeeList.length; i++){
        //     matchedEmployee = employeeList[i].name.includes(employeeName);
        // }

        function findIndexNumber(element) {

            return element.name.toLowerCase() === employeeName.trim().toLowerCase();

        }

        //Returns the index of matched employee name. If not, returns -1
        const matchedEmployee = employeeList.findIndex(findIndexNumber);

        //Found the matched name
        if (matchedEmployee >= 0) {
            $("#result").text("Yes");
        }
        else { //Matched name not found
            $("#result").text("No");
        }
    }

}

//Change to Verify screen on the right window
$("#v-pills-verify-tab").on("click", renderScreen);

//EventListner when the verify button is clicked on the right window.
$("#verifyButton").on("click", verifyEmployee);

const updateEmployee = function () {

    const updateName = $("#newName").val();
    const updateOffice = $("#newOfficeNum").val();
    const updatePhone = $("#newPhoneNum").val();

    function findIndexNumber(element) {

        return element.name.toLowerCase() === updateName.trim().toLowerCase();

    }

    //Returns the index of matched employee name. If not, returns -1
    const matchedEmployee = employeeList.findIndex(findIndexNumber);

    //Check if the value of employee name was input
    if (updateName.trim() === "") {
        alert("Please enter the name of employee");
    }
    else if (matchedEmployee < 0) {

        //Alert if the student's name doesn't match
        alert(`There is no student named ${updateName}`);
    }
    else {

        //Update the office information if the input is not blank
        if (updateOffice.trim() !== "") {
            employeeList[matchedEmployee].officeNum = updateOffice.trim();
        }

        //Update the phone information if the input is not blank
        if (updatePhone.trim() !== "") {
            employeeList[matchedEmployee].phoneNum = updatePhone.trim();
        }

        //Change the add button viewable
        const statusShow = "show";
        const statusActive = "active";

        //Make the view screen viewable
        $("#v-pills-view").addClass(statusShow);
        $("#v-pills-view").addClass(statusActive);

        //Display the student list
        renderList();

    }

}


//Change to update screen on the right window
$("#v-pills-update-tab").on("click", renderScreen);

//EventListner when the verify button is clicked on the right window.
$("#updateButton").on("click", updateEmployee);

//Delete the employee name from the list
const deleteEmployee = function () {

    //Get the name of employee to delete
    const employeeName = $("#deleteName").val();

    //Check if the name of employee matches
    function findIndexNumber(element) {

        return element.name.toLowerCase() === employeeName.trim().toLowerCase();

    }

    //Returns the index of matched employee name. If not, returns -1
    const matchedEmployee = employeeList.findIndex(findIndexNumber);

    if (matchedEmployee < 0) {
        alert("The employee does not exist. Please try again");
    }
    else {

        employeeList.splice(matchedEmployee, 1);

        //Change the add button viewable
        const statusShow = "show";
        const statusActive = "active";

        //Make the view screen viewable
        $("#v-pills-view").addClass(statusShow);
        $("#v-pills-view").addClass(statusActive);

        renderList();

    }

}


//Change to delete screen on the right window
$("#v-pills-delete-tab").on("click", renderScreen);

//EventListner when the delete button is clicked on the right window.
$("#deleteButton").on("click", deleteEmployee);
