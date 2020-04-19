$( "input" ).on('focus', function(e) {
    $(e.target).parent().addClass("blueLine");
});

$( "input" ).on('blur', update_value);


let pattern =  new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

function update_value(e) {
    $(e.target).parent().removeClass("blueLine");
    let text_value = e.target.value;
    let error_message = $(e.target).parent().parent().find('label').find('span.error');
    let text_type = $(e.target).parent().parent().find('label').find('span')[0].innerHTML;
    if (!text_value) {
        error_message.css('display','block');
        return;
    }
    if (text_type == "Phone number" && isNaN(text_value)) {
        error_message.css('display','block');
        return;
    }
    if (text_type == "E-mail" && (!text_value.match(/.+?\@.+/g))) {
        error_message.css('display','block');
        return;
    }
    error_message.css('display','none');
}

let selected_value;

$( ".craftSelect" ).on('click', function(e) {
    $( ".craftSelect--bottom").slideToggle();
    $("#contact-select").find("span").toggleClass("blueLine");
});

$( ".craftSelect--bottom div").on('click', function(e) {
    selected_value = e.target.innerText;
    $("#contact-select").find("span").text(selected_value);
});


$("#send").on('click', function() {
    if (!$(".error").is(':visible') && check_form()) {
        $( "#send").find("img").css('display', 'block').addClass('animation');
        $( "#send").find("span").css('display', 'none');
        let data = $('form').serializeArray();
        let arr= [];
        $.each(data , function() {
            let obj = {};
            obj.name = this.name;
            obj.text = this.value;
            arr.push(obj);
        });

        let select2 = $("#contact-select").find(".active").find("span").text();
        let obj_select = { "name":"subject", text: select2};
        arr.push(obj_select );

        localStorage.setItem('data', JSON.stringify(arr));

        setTimeout(function () {
            $(".formSend").css('display', 'none');
            $(".formSuccess").css('display', 'block');
        }, 5000);
    } else {
        if($(".error").is(':visible')){
            alert("Please, correct your errors")
        }
    }
    return false;
});

$(".button.buttonSuccess.buttonBig").on('click', function() {
    $('form').trigger('reset');
    $(".formSend").css('display', 'block');
    $(".formSuccess").css('display', 'none');
    $( "#send").find("img").css('display', 'none').removeClass('animation');
    $( "#send").find("span").css('display', 'block');
    $(".error").css("display", "none")
});
//
function check_form () {
    let data = $("input");
    for (let i = 0; i < data.length; i++ ) {
        console.log(data[i])
        if (!data[i].value) {
            console.log(data[i].innerText)
            alert("Please, put all fields")
            return false;
        }
    }
    return true;
};
