/* Author: Yann Esposito */

/* Functions for autoclear input textfields */
function clear() {
    this.value='';
    this.select();
    $(this).removeClass('inactive');
}
function inputDefaultValue(o,defaultValue) {
    if (o.value == '') {
        o.value=defaultValue; 
        $(o).addClass('inactive')
    }
}
function autoclear(id, defaultValue) {
    $('#'+id).click( clear );
    $('#'+id).focus( clear );
    $('#'+id).blur( function() { inputDefaultValue(this,defaultValue) } );
}

$(document).ready( function() {
    autoclear('addtasktextfield','Add a task...');
});
