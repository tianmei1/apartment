// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;


$( document ).ready(function() {
    $('#myModal').modal('show');
    $('#applyMoveInBtn').click(function(){
        $('#myModal').modal('toggle');
    });
});