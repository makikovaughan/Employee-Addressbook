//initialize the values
const resetScreen = function () {

    //Make the view screen viewable
    const statusShow = "show";
    const statusActive = "active";

    $("#v-pills-view").removeClass(statusShow);
    $("#v-pills-view").removeClass(statusActive);

    //Make the screen viewable based on what is clicked on the left screen
    if (this.text === "Add") {

        //Make add screen viewable
        $("#v-pills-add").addClass(statusActive);
        $("#v-pills-add").addClass(statusShow);

        //Make the rest of screen faded(not viewable)
        $("#v-pills-verify").removeClass(statusShow);
        $("#v-pills-verify").removeClass(statusActive);

        $("#v-pills-update").removeClass(statusActive);
        $("#v-pills-update").removeClass(statusShow);

        $("#v-pills-delete").removeClass(statusActive);
        $("#v-pills-delete").removeClass(statusShow);
    }
    else if (this.text === "Verify") {

        //Make add screen viewable
        $("#v-pills-verify").addClass(statusActive);
        $("#v-pills-verify").addClass(statusShow);

        //Make the rest of screen faded(not viewable)
        $("#v-pills-update").removeClass(statusShow);
        $("#v-pills-update").removeClass(statusActive);

        $("#v-pills-add").removeClass(statusActive);
        $("#v-pills-add").removeClass(statusShow);

        $("#v-pills-delete").removeClass(statusActive);
        $("#v-pills-delete").removeClass(statusShow);
    }
    else if (this.text === "Update") {

        //Make update screen viewable
        $("#v-pills-update").addClass(statusActive);
        $("#v-pills-update").addClass(statusShow);

        //Make the rest of screen faded(not viewable)
        $("#v-pills-verify").removeClass(statusShow);
        $("#v-pills-verify").removeClass(statusActive);

        $("#v-pills-add").removeClass(statusActive);
        $("#v-pills-add").removeClass(statusShow);

        $("#v-pills-delete").removeClass(statusActive);
        $("#v-pills-delete").removeClass(statusShow);
    }
    else if (this.text === "Delete") {

        //Make the delete view available
        $("#v-pills-delete").addClass(statusActive);
        $("#v-pills-delete").addClass(statusShow);

        //Make the rest of screen faded
        $("#v-pills-update").removeClass(statusShow);
        $("#v-pills-update").removeClass(statusActive);

        $("#v-pills-add").removeClass(statusActive);
        $("#v-pills-add").removeClass(statusShow);

        $("#v-pills-verify").removeClass(statusActive);
        $("#v-pills-verify").removeClass(statusShow);
    }
    else { //Make the rest of screen faded to be able to view the list
        $("#v-pills-verify").removeClass(statusShow);
        $("#v-pills-verify").removeClass(statusActive);

        $("#v-pills-update").removeClass(statusActive);
        $("#v-pills-update").removeClass(statusShow);

        $("#v-pills-delete").removeClass(statusActive);
        $("#v-pills-delete").removeClass(statusShow);

        $("#v-pills-add").removeClass(statusActive);
        $("#v-pills-add").removeClass(statusShow);

        //Display the list
        renderList();
    }


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

    //Change the add button viewable
    const statusShow = "show";
    const statusActive = "active";

    //Make the view screen viewable
    $("#v-pills-view").addClass(statusShow);
    $("#v-pills-view").addClass(statusActive);

    for (let i = 0; i < employeeList.length; i++) {

        $("#v-pills-view").append(`<div class="border border-info pl-3 mt-3 mb-3"> 
        <p>${employeeList[i].name}</p>
        <p>${employeeList[i].officeNum}</p>
        <p>${employeeList[i].phoneNum} </p></div>`);

    }

}


//Return the index of employee name. If not, returns -1
const findEmployee = function (employee) {

    function findIndexNumber(element) {

        return element.name.toLowerCase() === employee.trim().toLowerCase();

    }

    //Returns the index of matched employee name. If not, returns -1
    return employeeList.findIndex(findIndexNumber);

}


//Add the new data to the employee list and list it again.
const addEmployee = function () {

    const nameVal = $("#name").val();
    const officeVal = $("#officeNum").val();
    const phoneVal = $("#phoneNum").val();

    if (nameVal.trim() === "" || officeVal.trim() === "" || phoneVal.trim() === "") {
        alert("Please enter values to all spaces");
    }
    else if (findEmployee(nameVal.trim()) >= 0) {
        alert("The employee already exists. Please check the information");
    }
    else {
        const employeeVal = { name: nameVal.trim(), officeNum: officeVal.trim(), phoneNum: phoneVal.trim() };

        console.log(employeeVal);

        employeeList.push(employeeVal);


        //Call function to render the updated list
        renderList();
    }

}

//Verify if the employee exists or not
const verifyEmployee = function () {

    //Store the name of verification
    const employeeName = $("#verifyName").val();

    if (employeeName.trim() === "") {
        alert("Please enter the name of employee");
    }
    else {
        //Returns the index of student's name 
        const matchedEmployee = findEmployee(employeeName.trim());

        //Found the matched name
        if (matchedEmployee >= 0) {
            $("#result").text("Yes");
        }
        else { //Matched name not found
            $("#result").text("No");
        }
    }

}

//Update the information of employee
const updateEmployee = function () {

    const updateName = $("#newName").val();
    const updateOffice = $("#newOfficeNum").val();
    const updatePhone = $("#newPhoneNum").val();

    //Returns the index of matched employee name. If not, returns -1
    const matchedEmployee = findEmployee(updateName.trim());

    //Check if the value of employee name was input
    if (updateName.trim() === "") {
        alert("Please enter the name of employee");
    }
    else if (matchedEmployee < 0) {

        //Alert if the student's name doesn't match
        alert(`There is no student named ${updateName}`);
    }
    else if((updateOffice.trim() === "") && (updatePhone.trim() === "")) {
        alert("Please make sure to input update office number or/and updated phone information");
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

        //Display the student list
        renderList();

    }

}

//Delete the employee name from the list
const deleteEmployee = function () {

    //Get the name of employee to delete
    const employeeName = $("#deleteName").val();

    //Returns the index of matched employee name. If not, returns -1
    const matchedEmployee = findEmployee(employeeName.trim());

    if (matchedEmployee < 0) {
        alert("The employee does not exist. Please try again");
    }
    else {
        //Delete the employee information
        employeeList.splice(matchedEmployee, 1);

        //Display the employee list
        renderList();

    }

}


//When View is clicked on the left screen, change to the view screen on the right window
$("#v-pills-view-tab").on("click", resetScreen);

//When Add is clicked on the left screen, change to Add screen on the right window
$("#v-pills-add-tab").on("click", resetScreen);

//EventListener when the add button was clicked
$("#add").on("click", addEmployee);

//When Verify is clicked on the left screen, change to Verify screen on the right window
$("#v-pills-verify-tab").on("click", resetScreen);

//EventListner when the verify button is clicked on the right window.
$("#verifyButton").on("click", verifyEmployee);

//When Update is clicked on the left screen, change to update screen on the right window
$("#v-pills-update-tab").on("click", resetScreen);

//EventListner when the update button is clicked on the right window.
$("#updateButton").on("click", updateEmployee);

//When Delete is clicked on the left screen, change to delete screen on the right window
$("#v-pills-delete-tab").on("click", resetScreen);

//EventListner when the delete button is clicked on the right window.
$("#deleteButton").on("click", deleteEmployee);