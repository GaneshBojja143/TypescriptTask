var User = /** @class */ (function () {
    function User(args) {
        this.id = args.id;
        this.name = args.name;
        this.score = args.score;
        this.email = args.email;
    }
    return User;
}());
var dataFetch = /** @class */ (function () {
    function dataFetch() {
    }
    dataFetch.prototype.getInfo = function (url) {
        return fetch(url).then(function (response) { return response.json(); });
    };
    return dataFetch;
}());
var loadingDataIntoPage = /** @class */ (function () {
    function loadingDataIntoPage() {
        this.dataFetching = new dataFetch();
    }
    loadingDataIntoPage.prototype.initialize = function () {
        this.dataFetching.getInfo("userdetails.json").then(function (data) { dataEntry(data); });
    };
    return loadingDataIntoPage;
}());
var loadData = new loadingDataIntoPage();
loadData.initialize();
var userDetails = new Array();
var checkBoxes = document.getElementsByClassName("check-boxes");
var checkBoxHeader = document.getElementById("checkbox-header");
function dataEntry(details) {
    var individualInfo = details.map(function (u) { return new User(u); });
    UsersInfo(individualInfo);
}
function UsersInfo(individualInfo) {
    for (var i = 0; i < individualInfo.length; i++) {
        var singleUser = new User(individualInfo[i]);
        userDetails[i] = singleUser;
        addRow(singleUser);
    }
}
function addRow(userDetails) {
    var table = document.getElementById("person-details");
    var checkbox = document.createElement("div");
    checkbox.innerHTML = "<div class='child check-box'><span><input type='checkbox' name='' class='check-boxes' id='".concat(userDetails.id, "' onclick='onSelectOrDeselectUser()'></span></div>");
    table.appendChild(checkbox);
    addIndividualRow(table, "child name user", "field", userDetails.name);
    addIndividualRow(table, "child score user", "field", userDetails.score);
    addIndividualRow(table, "child email user", "field", userDetails.email);
    addIndividualRow(table, "child empty user", "field", "");
}
function addIndividualRow(parent, className, id, userData) {
    var dataField = document.createElement("div");
    dataField.innerHTML = "<div class='".concat(className, "' id='").concat(id, "'>").concat(userData, "</div>");
    parent.appendChild(dataField);
}
function checkHeaderStatus() {
    selectOrDeselectAll(checkBoxHeader.checked);
}
function selectOrDeselectAll(status) {
    userDetails.map(function (currentUser) { return document.getElementById(currentUser.id).checked = status; });
}
function onSelectOrDeselectUser() {
    checkBoxHeader.checked = (totalUsersSelected().length == userDetails.length) ? true : false;
}
function totalUsersSelected() {
    return userDetails.filter(function (value) { return document.getElementById(value.id).checked == true; });
}
function checkMatchedCharacters() {
    var x = document.getElementById("search");
    var inputText = x.value;
    // inputText=inputText.replace('.','\\.');
    inputText = inputText.replace(/\./g, '\\.');
    var regs = new RegExp("".concat(inputText), "gi");
    var userInfo = document.getElementsByClassName("user");
    for (var i = 0; i < userInfo.length; i++) {
        userInfo[i].innerHTML = inputText != "" ? userInfo[i].textContent.replaceAll(regs, function (match) { return "<mark>".concat(match, "</mark>"); }) : userInfo[i].textContent.replaceAll(regs, function (match) { return match; });
    }
}
function calculateMaxAndAverage() {
    var activeUsers = totalUsersSelected();
    sumScores(activeUsers);
    maxScore(activeUsers);
}
function sumScores(activeUsers) {
    var sum = activeUsers.reduce(function (totalSum, currentUser) { return +currentUser.score + +totalSum; }, 0);
    var average = sum / activeUsers.length;
    document.getElementById("average").innerText = "Average:" + average;
}
function maxScore(activeUsers) {
    var activeUserScores = activeUsers.map(function (currentUser) { return currentUser.score; });
    var maxScore = Math.max.apply(Math, activeUserScores);
    document.getElementById("max").innerText = "Max:" + maxScore;
}
