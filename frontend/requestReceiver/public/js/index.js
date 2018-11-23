$("#bookingBtn").click(function () {
    $("html, body").animate({ scrollTop: $(document).height() }, 1500);
});


//Kiểm tra các input của form request (ngoại trừ input note)
//Nếu có một input rỗng, disable button request
//ngược lại enable
function doCheck() {
    var allFilled = true;
    $('.request:not(#note)').each(function () {
        if ($(this).val() == '') {
            allFilled = false;
        }
    });
    $('#btnDatxe').prop('disabled', !allFilled);
    if (allFilled) {
        $('#btnDatxe').removeAttr('disabled');
    }
}

//ready event
$(document).ready(function () {
    //check
    doCheck();
    //event key up request form
    $('.request').keyup(doCheck);
    //check login
    // if (Cookies.get('user_auth') == "true") {
    //     //thêm tên user
    //     $("#userDropdown").append(Cookies.get('user_name'));
    //     //hidden login, signup dropdown item
    //     //show logout
    //     setDropDownItem(true);
    // } else {
    //     //show login, signup dropdown item
    //     //hidden logout
    //     setDropDownItem(false);
    // }
});


