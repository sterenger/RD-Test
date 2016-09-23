$(document).on('ready', function() {
    $("#form").html("<img src='img/loader.gif' class='center-block' />");
    setTimeout(constructForm, 1000);
});

function constructForm() {
    $("#form").empty();
    $("#form").append("<div class'page-header'><h4><strong>Lead Register</strong></h4></div>");
    $("#form").append("<form class='form-horizontal' id='formSend' method='POST' action=''>");
    $("#form").append("<div class'form-group'>\n\
							<label class'control-label'>Name <i style='color:red'>*</i></label>\n\
							<input type='text' class='form-control' required='required' id='LeadName' placeholder='Lead Name' />\n\
						</div>\n\
						<div class'form-group'>\n\
							<label class'control-label'>Email <i style='color:red'>*</i></label>\n\
							<input type='email' class='form-control' required='required' id='LeadEmail' placeholder='Lead Email' />\n\
						</div>\n\
						<div class'form-group'>\n\
							<label class'control-label'>State</label>\n\
							<input type='text' class='form-control' id='LeadState' placeholder='Lead State' />\n\
						</div>\n\
						<div class'form-group'>\n\
							<label class'control-label'>Level</label>\n\
							<input type='text' class='form-control' id='LeadLevel' placeholder='Lead Level' />\n\
						</div>\n\
						<div class'form-group'>\n\
							<button type='submit' class='btn btn-success pull-right' id='sendProfile'>Send</button>\n\
						</div>\n\
						</form>");
    setTimeout(sendForm, 500);

}

function sendForm() {
    $("#sendProfile").on('click', function(e) {
        e.preventDefault();
        if (validateForm() == true) {
            var url = "http://localhost/salahjquery/services/data.json";
            var userData = {
                lead: {
                    name: $("#LeadName").val(),
                    email: $("#LeadEmail").val(),
                    state: $("#LeadState").val(),
                    level: $("#LeadLevel").val()
                }
            };
            $.ajax({
                url: url,
                type: "POST",
                data: userData,
                beforeSend: function(xhr) {

                },
                success: function(response) {
                    toastr.info("Request Done");
                    $(response).each(function(i, v) {
                        console.log(v.lead.name);
                    });
                },
                error: function(response) {
                    console.log(response);
                }
            });
        } else {

            //validateForm();
        }
    });
}

function validEmail(v) {
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}

function validateForm() {
    response = true;
    if ($("#LeadName").val() === "") {
        toastr.error("Name Required");
        response = false;
    }
    if ($("#LeadEmail").val() === "") {
        toastr.error("Email Required");
        response = false;
    }
    if (validEmail($("#LeadEmail").val()) == false) {
        toastr.error("Incorrect Email Format");
        response = false;
    }
    return response;
}
