function dateValidate(dt) {
    var regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g;
    return regex.test(dt);
}

function nameValidate(name) {
    let regex = /^[가-힝]{2,50}$/g;
    return regex.test(name);
}
function phoneNumberValidate(phone)     {
    let regex = /[0-9]{9,12}$/;
    return regex.test(phone);
}

function isEmpty(str, wscheck=true) {
    //아무것도 입력하지 않았는지 체크
    if(str == '')return true;
    
    // 공백만 입력되었는지 체크
    let whitespace=/^\s|\s+$/g;
    if(whitespace.test(str)) return true;
    if(str.replace(whitespace, '') == "") return true;
    if(str.match(/\s/g) && wscheck) return true;
    
    return false;
}

function makeDateString(date) {
    return date.getFullYear()+"-"+leadingZero(date.getMonth()+1)+"-"+leadingZero(date.getDate());
}

function leadingZero(n) {
    return n<10?"0"+n:n;
}



// $("#mi_birth").datepicker({
//     dateFormat:"yy-mm-dd",
//     monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
//     monthNamesShort:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
//     dayNames:["일","월","화","수","목","금","토"],
//     dayNamesShort:["일","월","화","수","목","금","토"],
//     dayNamesMin:["일","월","화","수","목","금","토"],
//     yearSuffix:"년",
//     showMonthAfterYear: true,
//     changeYear:true,
//     changeMonth:true,
// });