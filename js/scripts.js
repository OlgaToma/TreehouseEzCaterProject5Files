// Access HTML element with the ID of 'gallery' and store it in the variable 'gallery'. 
var gallery = $('#gallery');

// Declare function to clear previous gallery data and display the current gallery data on the page when it is reloaded.
function initializeGallery() {
    gallery.empty()
    getUserData();
}

// Declare function to get user data from the random user API using an asynchronous Ajax request and then loop through the json data
// and then call a function to add each user's data to the gallery.
function getUserData() {
    $.ajax({
        url: 'https://randomuser.me/api/?results=12&inc=picture,name,cell,email,dob,location&nat=ch',
        dataType: 'json',
        success: function(data) {
            $(data.results).each(function() {
                addUserToGallery(this);   
            });
        }
    });   
} 

// Declare a function to store user's data in the template variable html, then create a jquery element, add an event listener to it
// and call a function to add user's data to modal window when it's clicked. Then add the jquery element to html element with id of 'gallery'.
function addUserToGallery(user) {
    var html = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first}, ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    </div>`;
    var card = $(html);
    card.click(user, function(){
        addUserToModalWindow(user);
    });
    gallery.append(card);
}

// Declare a function to remove the modal window when the close button is clicked.
function removeModalWindow(){
    var modalWin = $('.modal-container');
    if(modalWin){
        modalWin.remove();
    }
} 

// Declare a function to add a modal window to the screen once a partucular user's box is clicked by storing the additional html data in a variable windowHTML,
// and appending it to the body of html document.
function addUserToModalWindow(user) {
    removeModalWindow();
    var windowHtml = `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first}, ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.cell}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city} ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>`;
    $("body").append(windowHtml);
    $('#modal-close-btn').click(function(){
        removeModalWindow();
    });
}

// Call initializeGallery function.
initializeGallery();

