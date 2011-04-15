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

/* Model */
var TodoList = function() {
    this.undone = [
            {id: 1, text: "Read \"Founder at Work\""},
            {id: 2, text: "Eat lunch"},
            {id: 3, text: "Pick up Sally from the airport"},
            {id: 4, text: "Get fresh fruit from the grocery store"},
        ];
    this.done = [
            {id: 5, text: "Brush your teeth"},
            {id: 6, text: "Walk the dog"},
        ];
    this.nextId=7;
}
TodoList.prototype.addTodo= function(text) {
    var self = this;
    self.undone += { id: self.nextId, text: text };
    self.nextId += 1;
}

/* Controller */
var MainController = function() {
    this.todolist=new TodoList();
}
MainController.prototype.addDone = function(text, id) {
    var self=this;
    if (id === null) {
        id=self.todolist.nextId;
        self.todolist.nextId+=1;
        self.todolist.undone += {id: id, text: text};
    }
    $('#todolist').prepend('<div id="item_'+id+'" class="item done">'+
                            '<input type="checkbox" checked></input>' +
                            '<label class="text">'+text+
                            '</div>');
}
MainController.prototype.addTodo = function(text, id) {
    var self=this;
    $('#todolist').prepend('<div id="item_'+id+'" class="item">'+
            '<input type="checkbox"></input>' +
            '<label class="text">'+text+'</label>' +
            '</div>');
    $('#item_'+id).click(function() {self.finished(id);});
}

MainController.prototype.finished = function(item_id) {
    var self=this;
    $.each( self.todolist.undone, function (i,v) {
                if (v['id'] == item_id) {
                    element=v;
                    self.todolist.undone.splice(i,1);
                    self.todolist.done.push(v);
                    return false;
                }
            });
    mainController.initialization();
}

MainController.prototype.initialization = function() {
    var self=this;
    $('.item').remove();
    $.each( self.todolist.done.reverse(), function(i,v) {
            self.addDone(v['text'], v['id']);
    });
    self.todolist.done.reverse();
    $.each( self.todolist.undone.reverse(), function(i,v) {
            self.addTodo(v['text'],v['id']);
    });
    self.todolist.undone.reverse();
}
MainController.prototype.addTask = function(text) {
    var self=this;
    self.todolist.undone.push(
            {id: self.todolist.nextId, text: text}
            );
    self.todolist.nextId += 1;
    self.initialization();
}
MainController.prototype.addSomeTask = function() {
    if ($('#addtasktextfield').val() == 'Add a task...') {
        return false;
    }
    this.addTask( $('#addtasktextfield').val() );
}

var mainController = new MainController();

/* Starting loop */
$(document).ready( function() {
    autoclear('addtasktextfield','Add a task...');
    mainController.initialization();
    $('#addtaskbutton').click( function(){mainController.addSomeTask()} );
    $('#addtasktextfield').keypress( function(k){
        if (k.which == 13) {
            mainController.addSomeTask();
            $('#addtasktextfield').val('');
        }
    } );
});
