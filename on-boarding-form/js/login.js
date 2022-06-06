$(document).ready(function () {
    $("#logtoggle").change(function () {
        if ($(this).is(':checked')) {
            $("#form_password").attr("type", "text");
            $("#logtoggleText").text("Hide");
        } else {
            $("#form_password").attr("type", "password");
            $("#logtoggleText").text("Show");
        }

    });

    $(function () {
        $("#email_error_message").hide();
        $("#password_error_message").hide();

        var error_email = false;
        var error_password = false;

        $("#form_email").focusout(function () {
            check_email();
        });
        $("#form_password").focusout(function () {
            check_password();
        });

        function check_email() {
            var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const email = $("#form_email").val();
            if (pattern.test(email) && email !== '') {
                $("#email_error_message").hide();
                $("#form_email").css("border-bottom", "2px solid #34F458");
            } else {
                $("#email_error_message").html("Email Required");
                $("#email_error_message").show();
                $("#form_email").css("border-bottom", "2px solid #F90A0A");
                error_email = true;
            }
        }
        function check_password() {
            const password = $("#form_password").val().length;
            if (password < 8) {
                $("#password_error_message").html("Password Required");
                $("#password_error_message").show();
                $("#form_password").css("border-bottom", "2px solid #F90A0A");
                error_password = true;
            } else {
                $("#password_error_message").hide();
                $("#form_password").css("border-bottom", "2px solid #34F458");
            }

        }
        $("#login").click(function(){
            error_email = false;
            error_password = false;

            check_email();
            check_password();

            const email = $("#form_email").val();
            const password = $("#form_password").val();

            if (error_email === false && error_password === false) {
                $.ajax({
                    type: 'POST',
                    url: './php/model_login.php',
                    data: { 'email': email, 'password': password },
                    dataType: 'JSON',
                    success: function (feedback) {
                        if (feedback.status === "success") {
                            window.location = "./viewprofile.html";
                        } 
                    }
                })
            }
        })
    })
})
$(window).bind("pageshow", function () {
    var form = $('form');
    form[0].reset();
});