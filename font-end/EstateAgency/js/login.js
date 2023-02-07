let container = document.getElementById('container')

    toggle = () => {
        container.classList.toggle('sign-in')
        container.classList.toggle('sign-up')
    }

function login() {
    let username = $("#username").val()
    let password = $("#password").val()
    let user = {
        username: username,
        password: password
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            if (data.id != null) {
                window.localStorage.setItem("user", JSON.stringify(data));
                window.location.href = "index.html"
            }
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Incorrect account or password',
                text: 'Log In Failed',
            })
        }
    })
    event.preventDefault();


}

function getUser() {
    user = JSON.parse(window.localStorage.getItem("user"));
    document.getElementById("UserDropdown").innerHTML = "<span>" + user.name + "</span>";
    $(".user_name").text(user.name);
    $("#user_phone").text(user.phone);
    $("#user_email").text(user.email);
    if (user.role.id === 1) {
        $(".setProfile").attr("href", "agent-single.html")

    } else {
        $(".setProfile").attr("href", "guest-single.html")
        $(".notiUser").hide()

    }
    let srcImg = user.img;
    if (document.getElementById("personal_avatar") !== null) {
        document.getElementById("personal_avatar").innerHTML = '<img style="width: 540px;height: 604px" src="' + srcImg + '" alt="" className="agent-avatar img-fluid">'
    }
    displayNotification();
}

let house

function getHouse() {
    house = JSON.parse(window.localStorage.getItem("house"));
    $("#title-price").text(house.price);
    $("#title-name").text(house.name);
    $("#title-name2").text(house.name);
    $("#title-address").text(house.address);
    $("#title-address2").text(house.address);
    $("#title-agent").text(house.host.name);
    $("#title-id").text(house.id);
    $("#title-description").text(house.description);
    $("#title-phone").text(house.host.phone);
    $("#title-email").text(house.host.email);
    document.getElementById("img-agent").src = house.host.img
    getImgPersonalHouse()
    getListGuestRent()
    getUser()
    getListComment()
    getRentHouseByHouse()

}

function signUp() {
    let name = $("#name_signup").val()
    let username = $("#username_signup").val()
    let role = $("#role_signup").val()
    let email = $("#email_signup").val()
    let password = $("#password_signup").val()
    let newUser = {
        name: name,
        username: username,
        role: {
            id: role
        },
        email: email,
        password: password
    }
    if (newUser.name === ""){
        document.getElementById("regex-name-signup").hidden = false;
        document.getElementById("regex-username-signup").hidden = true;
        document.getElementById("regex-email-signup").hidden = true;
        document.getElementById("regex-password-signup").hidden = true;
        document.getElementById("regex-role-signup").hidden = true;
    }else if (newUser.username === ""){
        document.getElementById("regex-name-signup").hidden = true;
        document.getElementById("regex-username-signup").hidden = false;
        document.getElementById("regex-email-signup").hidden = true;
        document.getElementById("regex-password-signup").hidden = true;
        document.getElementById("regex-role-signup").hidden = true;

    }else if (!newUser.email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)){
        document.getElementById("regex-name-signup").hidden = true;
        document.getElementById("regex-username-signup").hidden = true;
        document.getElementById("regex-email-signup").hidden = false;
        document.getElementById("regex-password-signup").hidden = true;
        document.getElementById("regex-role-signup").hidden = true;

    }else if (newUser.password.length <6 || newUser.password.length > 8 ){
        document.getElementById("regex-name-signup").hidden = true;
        document.getElementById("regex-username-signup").hidden = true;
        document.getElementById("regex-email-signup").hidden = true;
        document.getElementById("regex-password-signup").hidden = false;
        document.getElementById("regex-role-signup").hidden = true;

    }else if (newUser.role.id >2 ){
        document.getElementById("regex-name-signup").hidden = true;
        document.getElementById("regex-username-signup").hidden = true;
        document.getElementById("regex-email-signup").hidden = true;
        document.getElementById("regex-password-signup").hidden = true;
        document.getElementById("regex-role-signup").hidden = false;
    }

    else {

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8080/signUp",
        data: JSON.stringify(newUser),
        dataType: "text",
        success: function (data) {
            $("#name_signup").val("")
            $("#username_signup").val("")
            $("#role_signup").val("3")
            $("#email_signup").val("")
            $("#password_signup").val("")
            Swal.fire(data, '', 'success')
            document.getElementById("clickLogIn").click();
        },

        error: function () {

            Swal.fire({
                icon: 'error',
                title: 'Username already exists',
                text: 'registration Failed',
            })
        }
    })
    }
    event.preventDefault();
}

let user = "";

function changePassword() {
    let newPassword = $("#newPass").val()
    let oldPassword = $("#oldPass").val()
    let autPassword = $("#passConfirm").val()
    let newUser = {
        id: user.id,
        oldPassword: oldPassword,
        newPassword: newPassword,
        autPassword: autPassword
    }
    if (newUser.oldPassword.length < 6 || newUser.oldPassword.length >8){
        document.getElementById("regex-password-change").hidden = false;
        document.getElementById("regex-new-password").hidden = true;
        document.getElementById("regex-new-password-2").hidden = true;
    }else if(newUser.newPassword.toString() === newUser.oldPassword.toString() || newUser.newPassword.length < 6 || newUser.newPassword.length >8){
        document.getElementById("regex-password-change").hidden = true;
        document.getElementById("regex-new-password").hidden = false;
        document.getElementById("regex-new-password-2").hidden = true;
    }else if (newUser.autPassword !== newUser.newPassword){
        document.getElementById("regex-password-change").hidden = true;
        document.getElementById("regex-new-password").hidden = true;
        document.getElementById("regex-new-password-2").hidden = false;
    }else {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/changePw",
        data: JSON.stringify(newUser),
        dataType: "text",
        success: function (data) {
            $('#exampleModal').modal('hide');
            Swal.fire(data, '', 'success')
        },
        error: function () {
            $('#exampleModal').modal('hide');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Change password Failed',
            })
        }
    })
    }
    event.preventDefault();
}

function getAllHouse() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses",
        success: function (houses) {
            let content = '';
            for (let i = 0; i < houses.length; i++) {
                content += displayHouse(houses[i]);
            }
            document.getElementById('list-house').innerHTML = content;
            list = document.getElementsByClassName('house_pagination');
            loadItem();
        }
    });
    getUser();
}

function getPersonalHouse() {
    let count =0;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses",
        success: function (houses) {
            let content = '';

            for (let i = houses.length - 1; i >= 0; i--) {
                if (houses[i].host.id === user.id) {
                    content += displayPersonalHouse(houses[i]);
                    count++;
                }
            }
            document.getElementById('list-house').innerHTML = content;
            document.getElementById('house-length').innerText = count.toString();
            list = document.getElementsByClassName('house_pagination');
            loadItem();
        }
    });
    getUser();
    statistical();
}

let a =""
let b =""
let c =""


function getHouseHome() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses",
        success: function (houses) {

            $('.bg-image1').css('background-image', 'url(' + houses[0].avatar + ')');
            $('.bg-image2').css('background-image', 'url(' + houses[1].avatar + ')');
            $('.bg-image3').css('background-image', 'url(' + houses[2].avatar + ')');
            $('.address1 ').text(houses[0].address);
            $('.address2 ').text(houses[1].address);
            $('.address3 ').text(houses[2].address);
            $('.id1 ').text(houses[0].id);
            $('.id2 ').text(houses[1].id);
            $('.id3 ').text(houses[2].id);
            $('.price1 ').text(houses[0].price);
            $('.price2 ').text(houses[1].price);
            $('.price3 ').text(houses[2].price);
            $('.name-house1 ').text(houses[0].name);
            $('.name-house2 ').text(houses[1].name);
            $('.name-house3 ').text(houses[2].name);

            a = houses[0].id
            b = houses[1].id
            c = houses[2].id

            let content = '';
            for (let i = houses.length - 1; i >= houses.length - 3; i--) {
                content += displayHouse(houses[i]);
            }
            document.getElementById('list-house').innerHTML = content;
        }
    });
    getUser();
    getTop3();
}

function getTop3() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/rent/top3",
        success: function (houses) {
            let content = '';
            for (let i = 0; i < houses.length; i++) {
                content += displayHouse(houses[i]);
            }
            document.getElementById('top3').innerHTML = content;
        }
    });
}


function displayPersonalHouse(house) {
    return `  <div  class="col-lg-12 house_pagination">
          <div class="card-box-a card-shadow">
            <div class="img-box-a">
              <img width="360px" height="480px" src="${house.avatar}" alt="" class="col-lg-14">
            </div>
            <div class="card-overlay">
              <div class="card-overlay-a-content">
                <div class="card-header-a">
                  <h2 class="card-title-a">
                    <a href="#">${house.name}</a>
                  </h2>
                </div>
                <div class="card-body-a">
                  <div class="price-box d-flex">
                    <span class="price-a">rent | ${house.price}</span>
                  </div>
                  <button onclick="houseDetail(${house.id})" style="background: none;cursor: pointer;outline: none;border: none" class="link-a">Click here to view
                    <span class="ion-ios-arrow-forward"></span>
                  </button>
                </div>
                <div class="card-footer-a">
                  <ul class="card-info d-flex justify-content-around">
                    <li style="width: 200px">
                      <h4 class="card-info-title">Description</h4>
                      <span>${house.description} </span>
                    </li>
                    
                                          <li>
                                            <button id="btn-edit-house" data-bs-toggle="modal" data-bs-target="#modalUpdateHouse" data-bs-whatever="@mdo"
                                                    onclick="passIdUpdate(${house.id})" style="background: none;cursor: pointer;outline: none;border: none"><i
                                                    class='fas fa-pen-alt' style='font-size:16px'></i></button>
                                        </li>
                                         <li>
                                            <button  id="btn-delete-house"
                                                    style="background: none;cursor: pointer;outline: none;border: none" onclick="deleteHouse(${house.id})"><i
                                                    class='fas fa-trash' style='font-size:16px'></i></button>
                                        </li>
                                        
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>`
}


function displayHouse(house) {
    return `  <div  class="col-md-12 house_pagination">
          <div class="card-box-a card-shadow">
            <div class="img-box-a">
              <img width="360px" height="480px" src="${house.avatar}" alt="" class="col-lg-14">
            </div>
            <div class="card-overlay">
              <div class="card-overlay-a-content">
                <div class="card-header-a">
                  <h2 class="card-title-a">
                    <a href="#">${house.name}</a>
                  </h2>
                </div>
                <div class="card-body-a">
                  <div class="price-box d-flex">
                    <span class="price-a">rent | ${house.price}</span>
                  </div>
                  <button onclick="houseDetail(${house.id})" style="background: none;cursor: pointer;outline: none;border: none" class="link-a">Click here to view
                    <span class="ion-ios-arrow-forward"></span>
                  </button>
                </div>
                <div class="card-footer-a">
                  <ul class="card-info d-flex justify-content-around">
                    <li style="margin-right:100px;width: 200px">
                      <h4 class="card-info-title">Description</h4>
                      <span>${house.description} </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>`
}

function updateUser() {
    let name = $("#name").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let newUser = {
        id: user.id,
        name: name,
        username: user.username,
        password: user.password,
        phone: phone,
        email: email,
        role: user.role,
        img: ""
    }
    let formData = new FormData();
    formData.append("file", $('#avatar')[0].files[0])
    formData.append("user", new Blob([JSON.stringify(newUser)]
        , {type: 'application/json'}))


    if (newUser.name === ""){
        document.getElementById("regex-name").hidden = false;
        document.getElementById("regex-phone").hidden = true;
        document.getElementById("regex-email").hidden = true;
    }else if (!newUser.phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)){
        document.getElementById("regex-name").hidden = true;
        document.getElementById("regex-phone").hidden = false;
        document.getElementById("regex-email").hidden = true;

    }else if (!newUser.email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)){
        document.getElementById("regex-name").hidden = true;
        document.getElementById("regex-phone").hidden = true;
        document.getElementById("regex-email").hidden = false;

    }
    else {


        $.ajax({
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
                processData: false,
                contentType: false,
                enctype: "multipart/form-data",
                type: "PUT",
                url: "http://localhost:8080/update_user",
                data: formData,
                success: function (data) {
                    $("#name").val("");
                    $("#phone").val("");
                    $("#email").val("");
                    $("#avatar").val("");
                    window.localStorage.setItem("user", JSON.stringify(data));
                    getUser();
                    $('#ModalEdit').modal('hide');
                    Swal.fire('Changed!', '', 'success')
                }
            }
        )
    }

    event.preventDefault();
    removeUpload()
}

function getRentHouseByHouse(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/rent/" + house.id,
        success: function (data) {
            window.localStorage.setItem("rentHouse", JSON.stringify(data));
        }
    });
}

function houseDetail(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/" + id,
        success: function (house) {
            window.localStorage.setItem("house", JSON.stringify(house));
            if (user.role.id === 1) {
                window.location.href = "property-single.html"
            } else {
                window.location.href = "property-guest.html"
            }

        }
    });
}

function getDataInUpdateForm() {
    let id = user.id
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/" + id,
        success: function (data) {
            $("#name").val(data.name);
            $("#phone").val(data.phone);
            $("#email").val(data.email);
        }
    });
}

function getListComment() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/comment",
        success: function (comment) {
            let listComment = comment.reverse()
            let sumRate = 0
            let count = 0
            let countComment = 0
            let content = '';
            for (let i = 0; i <  listComment.length; i++) {
                    if (comment[i].house.id === house.id ){
                     content += displayComment(comment[i]);
                        countComment++
                        sumRate += comment[i].rating
                if (comment[i].rating > 0 ){
                    count++
                }

                    }


            }

            if (countComment ===0){
                    $(".listPage"). hide()
            }else {
                $(".listPage").show()
            }

            document.getElementById('list-comment').innerHTML = content;
            document.getElementById('title-comment').innerHTML = "Comments "+"("+ countComment +")";
            let avgRate = sumRate/count
            let rating =""
            for (let i=0;i<Math.round(avgRate);i++){
                rating += `<span style="color: #deb217">★</span>`
            }
            if (avgRate > 0 ){
                document.getElementById('avgRate').innerHTML = rating +" " + "("+Math.round(avgRate *10)/10+")";
            }else {
                document.getElementById('avgRate').innerHTML = " ";

            }

            list = document.getElementsByClassName('comment-detail');
            loadItem();

        }
    });
}
function displayComment(comment){
    let content = `
    <div id="list-comment" class="comment-detail">
                    <ul class="list-comments">
                        <li>
                            <div class="comment-avatar">
                                <img  id="img-comment" src="${comment.guest.img}" alt="">
                            </div>
                            <div class="comment-details">
                            <h4 id="name-comment" class="comment-author">${comment.guest.name}</h4>
                                <span id="date-comment">${comment.date}</span>
                            
                                 <div  class="rate-comment" style="display:flex;align-items: flex-start;height: 10px ">`
                                 
                                 for (let i = 0; i <comment.rating ; i++) {
                                          content+= ` <p style="color: #deb217">★</p>`
                                     }


                               content+= ` </div>
                          
                                
                                <p id="content-comment" class="comment-description">
                                    ${comment.content}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
    `
    return content;
}
let rate;
let rentHouse1
function createComment1() {
    rentHouse1 = JSON.parse(window.localStorage.getItem("rentHouse"));
    for (let i=0;i<rentHouse1.length; i++ ){
    if (user.id === rentHouse1[i].guest.id && rentHouse1[i].checkIn === true && house.id === rentHouse1[i].house.id){
    let comment = $("#textComment").val();
    let star1 = document.getElementById("star1")
    let star2 = document.getElementById("star2")
    let star3 = document.getElementById("star3")
    let star4 = document.getElementById("star4")
    let star5 = document.getElementById("star5")
    if(star1.checked){
        rate = 1
    }else if(star2.checked){
        rate = 2
    }else if(star3.checked){
        rate = 3
    }else if(star4.checked){
        rate = 4
    }else if(star5.checked){
        rate = 5
    }else {
        rate = 0
    }
    let newComment = {
        guest:{
            id: user.id
        },
        house:{
            id: house.id
        },
        content: comment,
        rating : rate
    }


    if (newComment.content === "" && newComment.rating ===0 ){
        Swal.fire('Comments or reviews cannot be left blank', '', 'error')
    }else {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/comment",
            data: JSON.stringify(newComment),
            success: function () {
                comment = $("#textComment").val("");
                star1.checked = false
                star2.checked = false
                star3.checked = false
                star4.checked = false
                star5.checked = false

                getListComment()

                let rateInput = ''
                for (let j=0; j<newComment.rating;j++){
                    rateInput += `<span style="color: #deb217">★</span>`
                }
                $(".rate-comment").html(rateInput);
                Swal.fire('Successfully!', '', 'success')
                createNotification(newComment.guest.id, newComment.house.id, 3);
            }
        })
    }


        break;
    }
        Swal.fire('You cannot comment as you have never rented this property', '', 'error')

    event.preventDefault();
    }
}




function createHouse() {
    let name = $("#nameHouse").val();
    let address = $("#addressHouse").val();
    let description = $("#descriptionHouse").val();
    let price = $("#priceHouse").val();
    let newHome = {
        name: name,
        address: address,
        description: description,
        price: price,
        host: user,
        avatar: ""
    }
    let formData = new FormData();
    formData.append("file", $('#avatar-House')[0].files[0])
    formData.append("house", new Blob([JSON.stringify(newHome)]
        , {type: 'application/json'}))

    if (newHome.name === ""){
        document.getElementById("regex-name-house").hidden = false;
        document.getElementById("regex-price-house").hidden = true;
        document.getElementById("regex-address-house").hidden = true;
        document.getElementById("regex-description-house").hidden = true;
    }else if (!newHome.price.match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/) || newHome.price < 1){
        document.getElementById("regex-name-house").hidden = true;
        document.getElementById("regex-price-house").hidden = false;
        document.getElementById("regex-address-house").hidden = true;
        document.getElementById("regex-description-house").hidden = true;

    }else if (newHome.address === ""){
        document.getElementById("regex-name-house").hidden = true;
        document.getElementById("regex-price-house").hidden = true;
        document.getElementById("regex-address-house").hidden = false;
        document.getElementById("regex-description-house").hidden = true;
    }else if (newHome.description === ""){
        document.getElementById("regex-name-house").hidden = true;
        document.getElementById("regex-price-house").hidden = true;
        document.getElementById("regex-address-house").hidden = true;
        document.getElementById("regex-description-house").hidden = false;
    }
    else {


        $.ajax({
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
            },
            processData: false,
            contentType: false,
            enctype: "multipart/form-data",
            type: "POST",
            url: "http://localhost:8080/api/houses",
            data: formData,
            success: function () {
                $("#nameHouse").val("")
                $("#addressHouse").val("")
                $("#descriptionHouse").val("")
                $("#priceHouse").val("")
                $("#avatar-House").val("")
                getPersonalHouse()
                $('#modalAddHouse').modal('hide');
                Swal.fire('Successfully!', '', 'success')
            }
        })
    }
    event.preventDefault();
}

function deleteHouse(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/api/houses/" + id,
                success: function () {
                    getPersonalHouse()
                }
            })
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

        }
    })
}

function updateHouse(id) {
    let name = $("#nameUpdateHouse").val();
    let address = $("#addressUpdateHouse").val();
    let description = $("#descriptionUpdateHouse").val();
    let price = $("#priceUpdateHouse").val();
    let newHome = {
        id: id,
        name: name,
        address: address,
        description: description,
        price: price,
        host: user,
        avatar: ""
    }
    let formData = new FormData();
    formData.append("file", $('#avatar-UpdateHouse')[0].files[0])
    formData.append("house", new Blob([JSON.stringify(newHome)]
        , {type: 'application/json'}))

    if (newHome.name === ""){
        document.getElementById("regex-name-house-update").hidden = false;
        document.getElementById("regex-price-house-update").hidden = true;
        document.getElementById("regex-address-house-update").hidden = true;
        document.getElementById("regex-description-house").hidden = true;
    }else if (!newHome.price.match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/) || newHome.price < 1){
        document.getElementById("regex-name-house-update").hidden = true;
        document.getElementById("regex-price-house-update").hidden = false;
        document.getElementById("regex-address-house-update").hidden = true;
        document.getElementById("regex-description-house").hidden = true;

    }else if (newHome.address === ""){
        document.getElementById("regex-name-house-update").hidden = true;
        document.getElementById("regex-price-house-update").hidden = true;
        document.getElementById("regex-address-house-update").hidden = false;
        document.getElementById("regex-description-house").hidden = true;
    }else if (newHome.description === ""){
        document.getElementById("regex-name-house-update").hidden = true;
        document.getElementById("regex-price-house-update").hidden = true;
        document.getElementById("regex-address-house-update").hidden = true;
        document.getElementById("regex-description-house-update").hidden = false;
    }
    else {

    $.ajax({
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json'
        },
        processData: false,
        contentType: false,
        enctype: "multipart/form-data",
        type: "PUT",
        url: "http://localhost:8080/api/houses/" + id,
        data: formData,
        success: function () {
            $("#nameUpdateHouse").val("")
            $("#addressUpdateHouse").val("")
            $("#descriptionUpdateHouse").val("")
            $("#priceUpdateHouse").val("")
            $("#avatar-UpdateHouse").val("")
            getPersonalHouse()
            $('#modalUpdateHouse').modal('hide');
            Swal.fire('Successfully!', '', 'success')
        }
    })
    }

    event.preventDefault();
    removeUpload()
}

let idUpdate = "";

function passIdUpdate(id) {
    idUpdate = id;
    getDataUpdateHouseForm()
}

function getDataUpdateHouseForm() {
    let id = idUpdate
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/" + id,
        success: function (data) {
            $("#nameUpdateHouse").val(data.name)
            $("#addressUpdateHouse").val(data.address)
            $("#descriptionUpdateHouse").val(data.description)
            $("#priceUpdateHouse").val(data.price)
        }
    });
}

function createImgHouse() {
    let newImg = {
        house: house,
        img: ""
    }
    let formData = new FormData();
    formData.append("file", $('#inputGroupFile01')[0].files[0])
    formData.append("img", new Blob([JSON.stringify(newImg)]
        , {type: 'application/json'}))

    $.ajax({
        processData: false,
        contentType: false,
        enctype: "multipart/form-data",
        type: "POST",
        url: "http://localhost:8080/img/house/",
        data: formData,
        success: function () {
            $("#inputGroupFile01").val("")
            document.getElementById("demo").click();
            getImgPersonalHouse()
            Swal.fire('Successfully!', '', 'success')

        },
    error: function () {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please add image',
        })
    }
    })
    removeUpload()
    event.preventDefault();
}

function getImgPersonalHouse() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "GET",
        url: "http://localhost:8080/img/house/" + house.id,
        success: function (data) {
            let content = "<div id=\"carouselExampleControls\" class=\"carousel slide\" data-bs-ride=\"carousel\">\n" +
                "            <div style='height: 650px;margin-bottom: 50px' class=\"carousel-inner\">";
            if (data === undefined){
                content += `<div class="carousel-item active" data-bs-interval="2000">
                <img  width="800px" src="img/default.png" class="d-block w-100" alt="...">
              </div>`
            }else {
                for (let i = data.length - 1; i >= 0; i--) {
                    if (i === data.length - 1) {
                        content += `<div class="carousel-item active" data-bs-interval="2000">
                <img  width="800px" src="` + data[i].img + `" class="d-block w-100" alt="...">
              </div>`
                    } else {
                        content += `<div class="carousel-item">
                <img width="800px" src="` + data[i].img + `" class="d-block w-100" alt="...">
              </div>`
                    }
                }
            }

            content += `</div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`
            $(".personalImgHouse").html(content);
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'registration Failed',
            })
        }
    })
    event.preventDefault();
}

function getListGuestRent() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "GET",
        url: "http://localhost:8080/rent/" + house.id,
        success: function (data) {


            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += "<tr>\n" +
                    "            <th scope=\"row\">" + (i + 1) + "</th>\n" +
                    "            <td>" + data[i].guest.name + "</td>\n" +
                    "            <td>" + data[i].startDay + "</td>\n" +
                    "            <td>" + data[i].endDay + "</td>\n"
                if (data[i].status === true) {
                    content += "<td>Booked</td>"
                } else {
                    content += "<td>Canceled</td>"
                }
                if (data[i].checkIn === true) {
                    content += "<td>Checked</td></tr>"
                } else {
                    content += "<td>Unchecked</td></tr>"
                }
                $("#listRentHouse").html(content);
            }
        },
        error: function () {
            let status = "<div style=\"background-color: #66a973;width: 280px; height: 30px;border-radius:15px;text-align:center;padding-top: 2px;color: white\">\n" +
                "              <span > The house has not been rented</span>\n" +
                "                </div>";
            $(".tableListRent").html(status);
        }
    })
    event.preventDefault();
}

// pagination
let thisPage = 1;
let limit = 3;
let list = [];

function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    for (let i = 0; i < list.length; i++) {
        if (i >= beginGet && i <= endGet) {
            list[i].style.display = 'grid';
        } else {
            list[i].style.display = 'none';
        }
    }
    listPage();
}

function listPage() {
    let count = Math.ceil(list.length / limit);
    if (document.querySelector('.listPage') !== null){
    document.querySelector('.listPage').innerHTML = '';
    }
    if (thisPage !== 1) {
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for (i = 1; i <= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if (i === thisPage) {
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    if (thisPage !== count) {
        let next = document.createElement('li');
        next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}

function changePage(i) {
    thisPage = i;
    loadItem();
}

// ---------------------------------------------------------------------------------------------------
function rentHouse() {
    let money = bill();
    Swal.fire({
        title: 'Are you sure?',
        text: "the rent is " + money,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let startDay = $("#dateStart").val()
            let endDay = $("#dateEnd").val()
            let newRentHouse = {
                guest: user,
                house: house,
                startDay: startDay,
                endDay: endDay,
                status: true,
                checkIn: false
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://localhost:8080/rent",
                data: JSON.stringify(newRentHouse),
                dataType: "text",
                success: function (data) {
                    document.getElementById("dateStart").value = ""
                    document.getElementById("dateEnd").value = ""
                    document.getElementById("closeRent").click();
                    Swal.fire(data, '', 'success')
                    createNotification(newRentHouse.guest.id, newRentHouse.house.id, 1);
                },
                error: function () {
                    document.getElementById("dateStart").value = ""
                    document.getElementById("dateEnd").value = ""
                    document.getElementById("closeRent").click();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Can't rent house on this day",
                    })
                }
            })
            event.preventDefault();
        }
    })

}

function rentalHistory(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/rent/guest/" + id,
        success: function (rent) {
            let content = '';
            for (let i = 0; i < rent.length; i++) {
                content += `<tr>
                        <th scope="col">` + (i + 1) + `</th>
                        <th style="cursor: pointer" onclick="houseDetail(${rent[i].house.id})" scope="col">` + rent[i].house.name + `</th>
                        <th scope="col">` + rent[i].house.address + `</th>
                        <th scope="col">` + rent[i].startDay + `</th>
                        <th scope="col">` + rent[i].endDay + `</th>
                        <th scope="col">` + rentBill(rent[i].startDay, rent[i].endDay) * rent[i].house.price + `</th>`
                if (rent[i].status === false) {
                    content += `<th scope="col">Canceled</th>
                        <th scope="col">Unchecked</th>
                    </tr>`
                } else if (rent[i].status === true && rent[i].checkIn === false) {
                    content += `<th scope="col"><button onclick="cancel(`+ rent[i].id +`)" type="button" class="btn btn-danger">Cancel</button></th>
                        <th scope="col"><button onclick="checkin(`+ rent[i].id +`)" type="button" class="btn btn-success">Check In</button></th></tr>`;
                } else if (rent[i].status === true && rent[i].checkIn === true) {
                    content += `<th scope="col">Booked</th>
                        <th scope="col">Checked</th></tr>`;
                }

            }
            document.getElementById('rentPersonalList').innerHTML = content;
        }
    });
}

function checkin(id){
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/rent/checkin/" + id,
        success: function () {
            rentalHistory(user.id)
            Swal.fire('Check In Successfully!', '', 'success')
    }
    });
}

function cancel(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/rent/cancel/" + id,
                success: function (data) {
                    rentalHistory(user.id)
                    Swal.fire('Canceled!', '', 'success')
                    createNotification(data.guest.id, data.house.id, 2);
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "it's too late for you to cancel",
                    })
                }
            });
        }
    })

}

function bill() {
    let startDay = $("#dateStart").val()
    let endDay = $("#dateEnd").val()
    let date_1 = new Date(startDay);
    let date_2 = new Date(endDay);
    let difference = (date_2.getTime() - date_1.getTime()) / (1000 * 3600 * 24);
    if (difference === 0){
        return house.price;
    }
    return difference * house.price;
}

function rentBill(startDay, endDay) {
    let date_1 = new Date(startDay);
    let date_2 = new Date(endDay);
    let difference = (date_2.getTime() - date_1.getTime()) / (1000 * 3600 * 24);
    return difference;
}

function guestSingle() {
    getUser()
    rentalHistory(user.id)
}

function statistical() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/rent/income/" + user.id,
        success: function (data) {
            let content = `<th style="color: #66a973" scope="col">Money($)</th>`
            for (let i = 0; i < data.length; i++){
                content += `<th width="100px" scope="col">`+ data[i] + `</th>`
            }
            $("#tr-money").html(content);
        },
    });
}

function showSearch(){
    $(".hideSearch").show();
}

function search(){

    let startDay = $("#startSearch").val();
    let endDay = $("#endSearch").val();
    let searchObject = {
        startDay: startDay,
        endDay: endDay
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/rent/search",
        data: JSON.stringify(searchObject),
        success: function (houses){
            $("#body").attr("class", "box-collapse-close");
            let content1 = '';
            for (let i = 0; i < houses.length; i++) {
                content1 += displayHouse(houses[i]);
            }
            document.getElementById('list-house').innerHTML = content1;
            list = document.getElementsByClassName('house_pagination');
            loadItem();
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "There are no rentals available during this period!",
            })
        }
    })
    event.preventDefault();
}

function createNotification(guestId, houseId, typeId){
    let guest = {
        "id": guestId
    }
    let house = {
        "id": houseId
    }
    let type = {
        "id": typeId
    }
    let newNotification = {
        guest: guest,
        house: house,
        type: type,
        status: false
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/notification",
        data: JSON.stringify(newNotification),
        dataType: "text",
        success: function (){
        }
    })
    event.preventDefault();
}

function displayNotification(){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8080/notification/" + user.id,
        success: function (data){
            let count=0
            for (i=0;i<data.length;i++) {
                if (data[i].status === false) {
                    count++;
                }
            }
            if (count > 0){
                // $("#icon-noti").css("color","red")
                $("#sub-noti").show()
                document.getElementById("sub-noti").hidden = false;
            }else {
                $("#sub-noti").hide()
                // $("#icon-noti").css("color","#66a973")
            }

            let content = "<span style='margin: 10px;color: #0d5b1c'>Unread (<span>"+count+"</span>)</span>";
            $("#sub-noti").text(count)
            for (let i=data.length -1 ;i>=0;i--){
                content+= displayNotification1(data[i]);
            }
            if (data.length === 0){
                $(".notification-div").css("height","100px")
            }else {
                $(".notification-div").css("height","180px")
                $(".notification-div").css("weight","380px")

            }

            $(".notification-div").html(content)
            setTimeout(displayNotification, 4000)
        },
        error: function () {
            setTimeout(displayNotification, 4000)
        }
    })
}
function displayNotification1(notification){
    let content = '';
    if (notification.status === false){
        content += `
     <div id=""  style="margin: 2px 3px 2px 10px;width: 300px;height: 50px;display: grid;grid-template-columns: 20% 80%;background-color: #f6f6f6">
                            <img style="" width="50px" height="50px" src="${notification.guest.img}">
                            <p style="border: none;cursor: pointer"  onclick="seenNotification(${notification.id},${notification.house.id})" ><span style="color:#66a973;">${notification.guest.name} </span><span>${notification.type.type} </span><span style="color: #66a973">${notification.house.name}</span></p>
                        </div>
    `
    }else {
        content += `
     <div id=""  style="margin: 2px 3px 2px 10px;width: 300px;height: 50px;display: grid;grid-template-columns: 20% 80%;background-color: white">
                            <img style="" width="50px" height="50px" src="${notification.guest.img}">
                            <p style="border: none;cursor: pointer"  onclick="seenNotification(${notification.id},${notification.house.id})" ><span style="color:#66a973;">${notification.guest.name} </span><span>${notification.type.type} </span><span style="color: #66a973">${notification.house.name}</span></p>
                        </div>
    `
    }
    return content;
}
function seenNotification(id, houseId){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/notification/" + id,
        success: function (){
            $("#noti-detail").css("background-color", "white")
        }
    })
            houseDetail(houseId);
    event.preventDefault();
}

