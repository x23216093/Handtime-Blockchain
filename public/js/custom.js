// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


$('.nav-item').click(function(){
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
});

