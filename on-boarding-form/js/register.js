$(document).ready(function () {
   $("#toggle").change(function() {
      if ($(this).is(':checked')) {
          $("#form_password").attr("type", "text");
          $("#toggleText").text("Hide Password");
      } else {
          $("#form_password").attr("type", "password");
          $("#toggleText").text("Show Password");
      }

  });

   $(function () {
      $("#fname_error_message").hide();
      $("#lname_error_message").hide();
      $("#email_error_message").hide();
      $("#contact_error_message").hide();
      $("#date_error_message").hide();
      $("#password_error_message").hide();
      
      var error_fname = false;
      var error_lname = false;
      var error_email = false;
      var error_contact = false;
      var error_date = false
      var error_password = false;

      $("#form_fname").focusout(function () {
         check_fname();
      });
      $("#form_lname").focusout(function () {
         check_lname();
      });
      $("#form_email").focusout(function () {
         check_email();
      });
      $("#form_contact").focusout(function () {
         check_contact();
      });
      $("#form_date").focusout(function () {
         check_date();
      });
      $("#form_password").focusout(function () {
         check_password();
      });

      function check_fname() {
         var pattern = /^[a-zA-Z]*$/;
         const fname = $("#form_fname").val();
         if (pattern.test(fname) && fname !== '') {
            $("#fname_error_message").hide();
            $("#form_fname").css("border-bottom", "2px solid #34F458");
         } else {
            $("#fname_error_message").html("Should contain only Characters");
            $("#fname_error_message").show();
            $("#form_fname").css("border-bottom", "2px solid #F90A0A");
            error_fname = true;
         }
      }
      function check_lname() {
         var pattern = /^[a-zA-Z]*$/;
         const lname = $("#form_lname").val();
         if (pattern.test(lname) && lname !== '') {
            $("#lname_error_message").hide();
            $("#form_lname").css("border-bottom", "2px solid #34F458");
         } else {
            $("#lname_error_message").html("Should contain only Characters");
            $("#lname_error_message").show();
            $("#form_lname").css("border-bottom", "2px solid #F90A0A");
            error_lname = true;
         }
      }
      function check_email() {
         var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
         const email = $("#form_email").val();
         if (pattern.test(email) && email !== '') {
            $("#email_error_message").hide();
            $("#form_email").css("border-bottom", "2px solid #34F458");
         } else {
            $("#email_error_message").html("Invalid Email");
            $("#email_error_message").show();
            $("#form_email").css("border-bottom", "2px solid #F90A0A");
            error_email = true;
         }
      }
      function check_contact() {
         const contact = $("#form_contact").val();
         if (contact !== '' && contact.length == 10) {
            $("#contact_error_message").hide();
            $("#form_contact").css("border-bottom", "2px solid #34F458");
         } else {
            $("#contact_error_message").html("Phone number is required");
            $("#contact_error_message").show();
            $("#form_contact").css("border-bottom", "2px solid #F90A0A");
            error_contact = true;
         }
      }
      function check_date() {
         const date = $("#form_date").val();
         if (date !== '') {
            $("#date_error_message").hide();
            $("#form_date").css("border-bottom", "2px solid #34F458");
         } else {
            $("#date_error_message").html("Date is required");
            $("#date_error_message").show();
            $("#form_date").css("border-bottom", "2px solid #F90A0A");
            error_date = true;
         }
      }
      function check_password() {
         const password = $("#form_password").val().length;
         if (password < 8) {
            $("#password_error_message").html("Atleast 8 Characters");
            $("#password_error_message").show();
            $("#form_password").css("border-bottom", "2px solid #F90A0A");
            error_password = true;
         } else {
            $("#password_error_message").hide();
            $("#form_password").css("border-bottom", "2px solid #34F458");
         }

      }
      
      $("#signup").click(function () {
         error_fname = false;
         error_lname = false;
         error_email = false;
         error_contact = false;
         error_date = false;
         error_password = false;

         check_fname();
         check_lname();
         check_email();
         check_contact();
         check_date();
         check_password();

         const fname = $("#form_fname").val();
         const lname = $("#form_lname").val();
         const email = $("#form_email").val();
         const contact = $("#form_contact").val();
         const date = $("#form_date").val();
         const password = $("#form_password").val();

         if (error_fname === false && error_lname === false && error_email === false && error_contact === false && error_date === false && error_password === false ) {

            $.ajax({
               type: 'POST',
               url: './php/model_register.php',
               data: { "fname": fname, "lname": lname, "email": email, "contact": contact, "date": date, "password": password },
               dataType: 'JSON',
               success: function (feedback) {
                  if (feedback.status === "error") {
                     $("#email_error_message").html("Sorry this email already exist");
                     $("#email_error_message").show();
                     $("#form_email").css("border-bottom", "2px solid #F90A0A");
                  } else if (feedback.status === "success") {
                     window.location = "./login.html";
                  }
                  else{
                     $("#email_error_message").hide();
                  }
               }
            })
         } else {
            alert("Please Fill the form Correctly");
            return false;
         }
      });
   })
})
$(window).bind("pageshow", function() {
   var form = $('form');
   form[0].reset();
});
