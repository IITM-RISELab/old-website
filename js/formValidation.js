var namePattern = /^[^\`\~\!\@\#\$\%\^\&\*\(\)\+\=\[\{\]\}\|\\\'\<\,\>\?\/\""\;\:0-9]+$/;
var emailPattern = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
var mobileNumberPattern = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
var nameField = $('#name-input');
var emailField = $('#email-input');
var numberField = $('#number-input');
var purposeField = $('#purpose-input');
var messageField = $('#message-input');
var nameWarning = $('#name-container > .warning');
var numberWarning = $('#number-container > .warning');
var emailWarning = $('#email-container > .warning');
var purposeWarning = $('#purpose-container > .warning');
var messageWarning = $('#message-container > .warning');


nameField.focusout(function(){
    var name = nameField.val();
    if(validateName(name)){
        nameWarning.text("");
    }else{
        nameWarning.text("No special characters except spaces and dots allowed");
    }
    if(validateAll()){
        $('#submit-btn').prop('disabled',false);
    }else{
        $('#submit-btn').prop('disabled',true);
    }
});

numberField.focusout(function(){
    var number = numberField.val();
    if(validateNumber(number)){
        numberWarning.text("");
    }else{
        numberWarning.text("Please enter a valid mobile number");
    }
    if(validateAll()){
        $('#submit-btn').prop('disabled',false);
    }else{
        $('#submit-btn').prop('disabled',true);
    }
});

emailField.focusout(function(){
    var email = emailField.val();
    if(validateEmail(email)){
        emailWarning.text("");
    }else{
        emailWarning.text("Please enter a valid email id");
    }
    if(validateAll()){
        $('#submit-btn').prop('disabled',false);
    }else{
        $('#submit-btn').prop('disabled',true);
    }
});

purposeField.focusout(function(){
    var purpose = purposeField.val();
    if(validatePurpose(purpose)){
        purposeWarning.text("");
    }else{
        purposeWarning.text("The purpose must be at least 10 characters long");
    }
    if(validateAll()){
        $('#submit-btn').prop('disabled',false);
    }else{
        $('#submit-btn').prop('disabled',true);
    }
});

messageField.focusout(function(){
    var message = messageField.val();
    if(validateMessage(message)){
        messageWarning.text("");
    }else{
        messageWarning.text("Message must be atleast 30 characters long");
    }
    if(validateAll()){
        $('#submit-btn').prop('disabled',false);
    }else{
        $('#submit-btn').prop('disabled',true);
    }
});

function validateAll(){
    var name = nameField.val();
    var message = messageField.val();
    var number = numberField.val();
    var email = emailField.val();
    var purpose = purposeField.val();
    return(validateName(name) 
    && validateEmail(email) && validateMessage(message) 
    && validatePurpose(purpose) && validateNumber(number));
}

function validateName(name){
    return namePattern.test(name);
}

function validateNumber(number){
    return mobileNumberPattern.test(number);
}

function validateEmail(email){
    return emailPattern.test(email);
}

function validatePurpose(purpose){
    return(purpose.length > 10);
}

function validateMessage(message){
    return(message.length > 30);
}