//Make the view screen viewable
const statusShow = "show";
const statusActive = "active";

//Display the add screen and make other tabs not displayable
const renderAdd = function () {

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

    $("#v-pills-view").removeClass(statusShow);
    $("#v-pills-view").removeClass(statusActive);

}

//Render Veify screen on the right side of window
const renderVerify = function () {

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

    $("#v-pills-view").removeClass(statusShow);
    $("#v-pills-view").removeClass(statusActive);

}

//Make the update screen viewable on the right window
const renderUpdate = function () {

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

    $("#v-pills-view").removeClass(statusShow);
    $("#v-pills-view").removeClass(statusActive);

}

//Make the delete screen viewable on the right window
const renderDelete = function () {
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

    $("#v-pills-view").removeClass(statusShow);
    $("#v-pills-view").removeClass(statusActive);
}

//Make the view screen viewable on the right window
const renderView = function () {

    //Make other windows not viewable
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

//Clear all add input values
const clearAddInput = function () {

    //Clear the value inside input tags
    $("#name").val("");
    $("#officeNum").val("");
    $("#phoneNum").val("");

}

//Clear all verify input values
const clearVerifyInput = function () {
    //Clear the previous value of verification when it is initially clicked
    $("#result").empty();
    $("#verifyName").val("");
}

// Clear all update input values
const clearUpdateInput = function () {
    //Clear the previous value of update when it is initially clicked
    $("#newName").val("");
    $("#newOfficeNum").val("");
    $("#newPhoneNum").val("");
}

//Clear delete input value
const clearDeleteInput = function () {

    //Clear the previous value of deleted employee's name when it is initially clicked
    $("#deleteName").val("");

}


//initialize the values
const changeScreen = function () {

    //Make the screen viewable based on what is clicked on the left screen
    if (this.text === "Add") {
        //Displays add screen on the right screen
        renderAdd();
    }
    else if (this.text === "Verify") {

        renderVerify();
    }
    else if (this.text === "Update") {
        renderUpdate();
    }
    else if (this.text === "Delete") {
        renderDelete();
    }
    else { //Make the rest of screen faded to be able to view the list
        renderView();
    }

    //Clear the value inside input tags
    clearAddInput();

    //Clear the previous value of verification when it is initially clicked
    clearVerifyInput();

    //Clear the previous value of update when it is initially clicked
    clearUpdateInput();

    //Clear the previous value of deleted employee's name when it is initially clicked
    clearDeleteInput();
}



//Render the list of employee
function renderList() {

    $("#v-pills-view").empty();

    //Make the view screen viewable
    $("#v-pills-view").addClass(statusShow);
    $("#v-pills-view").addClass(statusActive);

    //Display the list of empoyees
    employeeList.forEach(function(employee){
        $("#v-pills-view").append(`<div class="border border-info pl-3 mt-3 mb-3">
        <p>${employee.name}</p>
        <p>${employee.officeNum}</p>
        <p>${employee.phoneNum} </p></div>`);
    });

}


//Return the index of employee name. If not, returns -1
const findEmployee = function (employee) {

    function findIndexNumber(element) {

        return element.name.toLowerCase() === employee.trim().toLowerCase();

    }

    //Returns the index of matched employee name. If not, returns -1
    return employeeList.findIndex(findIndexNumber);

}

//Check if the office number exists already
//Return the index of employee name. If not, returns -1
const findOffice = function (officeNum) {

    function findIndexNumber(element) {

        return element.officeNum === parseInt(officeNum);

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
    else if (!parseInt(officeVal.trim())) {
        alert("Please enter number");
    }
    else if (findEmployee(nameVal.trim()) >= 0) {
        alert("The employee already exists. Please check the information");
    }
    else if (findOffice(officeVal.trim()) >= 0) {
        alert("The office number already exists. Please select another number");
    }
    else if ((!parseInt(phoneVal.slice(0, 3))) || (!parseInt(phoneVal.slice(4, 7))) || (!parseInt(phoneVal.slice(8, 12)))
        || (phoneVal.slice(3, 4) !== "-") || (phoneVal.slice(7, 8) !== "-") || phoneVal.length !== 12) {
        alert("Please enter the phone number by this format. XXX-XXX-XXXX");
    }
    else {
        const employeeVal = { name: nameVal.trim(), officeNum: officeVal.trim(), phoneNum: phoneVal.trim() };

        employeeList.push(employeeVal);

        //Clear the value inside input tags
        clearAddInput();

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
        alert(`There is no employee named ${updateName}`);
    }
    else if (findOffice(updateOffice.trim()) >= 0) {
        alert("The office number already exists. Please select another number");
    }
    else if ((updateOffice.trim() === "") && (updatePhone.trim() === "")) {
        alert("Please make sure to input update office number or/and updated phone information");
    }
    else if ((!parseInt(updateOffice.trim())) && (updateOffice.trim() !== "")) {
        alert("Please enter number");
    }
    else if ((!parseInt(updatePhone.slice(0, 3))) || (!parseInt(updatePhone.slice(4, 7))) || (!parseInt(updatePhone.slice(8, 12)))
        || (updatePhone.slice(3, 4) !== "-") || (updatePhone.slice(7, 8) !== "-") || updatePhone.length !== 12) {
        alert("Please enter the phone number by this format. XXX-XXX-XXXX");
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

        //Clear the previous value of update when it is initially clicked
        clearUpdateInput();

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

        //Clear the previous value of deleted employee's name when it is initially clicked
        clearDeleteInput();

        //Display the employee list
        renderList();

    }

}


//The right screen changes based on the selection on the left window
$(".nav-link").on("click", changeScreen);

//EventListener when the add button was clicked
$("#add").on("click", addEmployee);

//EventListner when the verify button is clicked on the right window.
$("#verifyButton").on("click", verifyEmployee);

//EventListner when the update button is clicked on the right window.
$("#updateButton").on("click", updateEmployee);

//EventListner when the delete button is clicked on the right window.
$("#deleteButton").on("click", deleteEmployee);

