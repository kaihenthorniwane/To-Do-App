

// t: current time, b: begInnIng value, c: change In value, d: duration
$.easing.jswing = $.easing.swing;

$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */


let riveInstances = {};

let dummyCard;

$(document).ready(function() {

    loadNewPost();
    

    //initialize dummy card
    dummyCard = new rive.Rive({
        src: "/assets/riv/dummy_card.riv",
        canvas: $('#dummy-card-rive')[0], // Refer to the dummy card
        autoplay: true,
        stateMachines: "Dummy Card",
        onLoad: () => {
            dummyCard.resizeDrawingSurfaceToCanvas();
            // Function to update canvas position
            const dummyCardElement = $('#dummy-card-rive');
            dummyCardElement.hide();

            // Event listener for mouse movement
            $(document).mousemove(function(event) {
                dummyCardElement.css({
                    'left': (event.pageX - 33) + 'px',
                    'top': (event.pageY - 110) + 'px'
                });
            });
        },
    });

    

    $('.edit-rive').each(function() {
        const r = new rive.Rive({
            src: "/assets/riv/edit_icon.riv",
            canvas: this, // Refer to the current canvas in the loop
            autoplay: true,
            stateMachines: "Edit Icon",
            onLoad: () => {
                r.resizeDrawingSurfaceToCanvas();
                const inputs = r.stateMachineInputs("Edit Icon");
                // Attach a mouseleave event listener to each canvas
                $(this).on('mouseenter', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(this).on('mouseleave', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
            },
        });
    });
    $('.move-rive').each(function() {
        const r = new rive.Rive({
            src: "/assets/riv/move_icon.riv",
            canvas: this, // Refer to the current canvas in the loop
            autoplay: true,
            stateMachines: "Move Icon",
            onLoad: () => {
                r.resizeDrawingSurfaceToCanvas();
                const inputs = r.stateMachineInputs("Move Icon");
                // Attach a mouseleave event listener to each canvas
                $(this).on('mouseenter', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(this).on('mouseleave', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
            },
        });
    });


    $('.new-to-do-rive').each(function() {
        const canvasId = $(this).attr('id');
        riveInstances[canvasId] = new rive.Rive({
            src: "/assets/riv/omni_check.riv",
            canvas: this, // Refer to the current canvas in the loop
            autoplay: true,
            stateMachines: "Omni Check",
            onLoad: () => {
                riveInstances[canvasId].resizeDrawingSurfaceToCanvas();
                const inputs = riveInstances[canvasId].stateMachineInputs("Omni Check");
                // Attach a mouseleave event listener to each canvas
                inputs[1].value = 4;
                $(this).on('mouseenter', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(this).on('mouseleave', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });

                const refCard = '.new-to-do-passive#todo-item-' + canvasId.split('-')[1];
                const $refCard = $(refCard);
                //setup an on hover effect for the New To Do card for each new to do rive canvas
                $(document).on('mouseenter', refCard, function() {
                    const passiveRefCard = $refCard.hasClass('new-to-do-passive');
                    if (inputs && inputs.length > 0 && passiveRefCard) {
                        inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(document).on('mouseleave', refCard, function() {
                    const passiveRefCard = $refCard.hasClass('new-to-do-passive');
                    if (inputs && inputs.length > 0 && passiveRefCard) {
                        inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                //setup an on hover effect for the New To Do card for each new to do rive canvas
                $(document).on('mousedown', refCard, function() {
                    const passiveRefCard = $refCard.hasClass('new-to-do-passive');
                    if (inputs && inputs.length > 0 && passiveRefCard) {
                        inputs[2].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(document).on('mouseup', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[2].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });

            },
        });
    });


    $('.todo-check-rive').each(function() {
        const canvasId = $(this).attr('id');
        riveInstances[canvasId] = new rive.Rive({
            src: "/assets/riv/omni_check.riv",
            canvas: this, // Refer to the current canvas in the loop
            autoplay: true,
            stateMachines: "Omni Check",
            onLoad: () => {
                riveInstances[canvasId].resizeDrawingSurfaceToCanvas();
                const inputs = riveInstances[canvasId].stateMachineInputs("Omni Check");
                // Attach a mouseleave event listener to each canvas
                inputs[1].value = 1;
                $(this).on('mouseenter', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(this).on('mouseleave', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
            },
        });
    });
    $('.started-check-rive').each(function() {
        const canvasId = $(this).attr('id');
        riveInstances[canvasId] = new rive.Rive({
            src: "/assets/riv/omni_check.riv",
            canvas: this, // Refer to the current canvas in the loop
            autoplay: true,
            stateMachines: "Omni Check",
            onLoad: () => {
                riveInstances[canvasId].resizeDrawingSurfaceToCanvas();
                const inputs = riveInstances[canvasId].stateMachineInputs("Omni Check");
                // Attach a mouseleave event listener to each canvas
                inputs[1].value = 2;
                $(this).on('mouseenter', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(this).on('mouseleave', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
            },
        });
    });
    $('.done-check-rive').each(function() {
        const canvasId = $(this).attr('id');
        riveInstances[canvasId] = new rive.Rive({
            src: "/assets/riv/omni_check.riv",
            canvas: this, // Refer to the current canvas in the loop
            autoplay: true,
            stateMachines: "Omni Check",
            onLoad: () => {
                riveInstances[canvasId].resizeDrawingSurfaceToCanvas();
                const inputs = riveInstances[canvasId].stateMachineInputs("Omni Check");
                // Attach a mouseleave event listener to each canvas
                inputs[1].value = 3;
                $(this).on('mouseenter', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(this).on('mouseleave', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
            },
        });
    });

    // Attach a click event handler to elements with the 'task-check' class
    $('#to-dos-column').on('click', '.task-check:not(.new-to-do-passive .task-check, .new-to-do-composing .task-check)', function() {
        var itemId = this.id.split('-')[1];
        
        $.ajax({
            url: '/move-to',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: itemId, targetList : 'startedList', currentList : $('#todo-item-' + itemId).closest('.to-do-item-list').attr('id') }),
            success: function(response) {
                // Update the DOM here
                updateLists(response.todoList, response.startedList, response.doneList);
            },
            error: function(xhr, status, error) {
                console.error('Error moving item:', error);
            }
        });
    });
    $('#started-column').on('click', '.task-check:not(.new-to-do-passive .task-check, .new-to-do-composing .task-check)', function() {
        console.log("click");
        var itemId = this.id.split('-')[1];
    
        $.ajax({
            url: '/move-to',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: itemId, targetList : 'doneList', currentList : $('#todo-item-' + itemId).closest('.to-do-item-list').attr('id') }),
            success: function(response) {
                // Update the DOM here
                updateLists(response.todoList, response.startedList, response.doneList);
            },
            error: function(xhr, status, error) {
                console.error('Error moving item:', error);
            }
        });
    });
    $('#done-column').on('click', '.task-check:not(.new-to-do-passive .task-check, .new-to-do-composing .task-check)', function() {
        var itemId = this.id.split('-')[1];
    
        $.ajax({
            url: '/move-to',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: itemId, targetList : 'startedList', currentList : $('#todo-item-' + itemId).closest('.to-do-item-list').attr('id') }),
            success: function(response) {
                // Update the DOM here
                updateLists(response.todoList, response.startedList, response.doneList);
            },
            error: function(xhr, status, error) {
                console.error('Error moving item:', error);
            }
        });
    });

    //edit function attach a click event handler to elements with the 'edit-rive' class
    $(document).on('click', '.edit-rive', function() {
        var itemId = this.id.split('-')[2];
        if($("#todo-item-"+itemId).hasClass('editing-mode')){
            cancelEdits(itemId);
        }else{
            toggleEditMode(itemId);
        }
    });
    //cancel button click event 
    $(document).on('click', '.action-button.secondary', function() {
        var itemId = $(this).closest(".task-card").attr('id').split('-')[2];
        cancelEdits(itemId);
    });

    //primary button click event 
    $(document).on('click', '.action-button.primary', function() {
        var itemId = $(this).closest(".task-card").attr('id').split('-')[2];
        toggleEditMode(itemId);
    });

    // Drag function
    $('.draggable').draggable({
        revert: "invalid", // This will cause the element to return to its original position if not dropped into a valid droppable
        helper: "clone", // This will clone the element when dragging
        cursor: "move",
        start: function(event, ui) {
            // Reduce opacity of the entire card while dragging
            $(this).closest('.task-card').css('opacity', 0.25);

            
            // Find dummy card
            const dummyCardElement = $('#dummy-card-rive');
            const dummyInputs = dummyCard.stateMachineInputs("Dummy Card");
            dummyCardElement.toggle(); // This will toggle the visibility of the canvas
            dummyInputs[0].fire();
            console.log(dummyCardElement);
        },
        stop: function(event, ui) {
            // Reset opacity of the entire card once dragging stops
            $(this).closest('.task-card').css('opacity', 1);
            
            // Find dummy card
            const dummyCardElement = $('#dummy-card-rive');
            dummyCardElement.toggle(); // This will toggle the visibility of the canvas
            console.log(dummyCardElement);
        }
    });


    // Initialize droppable areas
    $('.to-do-item-list').droppable({
        hoverClass: "drop-hover", // Optional: Define a class to be added to the droppable area on hover
        accept: ".draggable", // Specify that this droppable only accepts elements with the class 'draggable'
        over: function(event, ui) {
            console.log("Hovered over droppable");
            // Call your custom function for hover
            const dummyInputs = dummyCard.stateMachineInputs("Dummy Card");
            dummyInputs[1].value = true;
        },
        // Event fired when a draggable is moved out of the droppable
        out: function(event, ui) {
            console.log("Draggable moved out of droppable");
            // Call your custom function for hover out
            const dummyInputs = dummyCard.stateMachineInputs("Dummy Card");
            dummyInputs[1].value = false;
        },
        drop: function(event, ui) {
            const draggableId = ui.draggable.data('id'); // Get the data-id attribute of the dragged element
            const droppedOnColumn = $(this).attr('id'); // Get the id of the column where the element is dropped
            let targetList;
            switch (droppedOnColumn) {
                case 'to-dos-column':
                    targetList = 'todoList';
                    break;
                case 'started-column':
                    targetList = 'startedList';
                    break;
                case 'done-column':
                    targetList = 'doneList';
                    break;
                default:
                    targetList = 'todoList';
                    break;
            }

            //Change the rive animation based on the destination
            const checkBoxRive = riveInstances["check-"+draggableId]
            const inputs = checkBoxRive.stateMachineInputs("Omni Check");
            switch (droppedOnColumn) {
                case "to-dos-column":
                    inputs[1].value=1;
                    break;
                case "started-column":
                    inputs[1].value=2;
                    break;
                case "done-column":
                    inputs[1].value=3;
                    break;
            
                default:
                    break;
            }

            //do the node.js call

            $.ajax({
                url: '/move-to',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ id: draggableId, targetList : targetList, currentList : $('#todo-item-' + draggableId).closest('.to-do-item-list').attr('id') }),
                success: function(response) {
                    // Update the DOM here
                    updateLists(response.todoList, response.startedList, response.doneList);
                },
                error: function(xhr, status, error) {
                    console.error('Error moving item:', error);
                }
            });

            // Find the original element by id and append it to the dropped column
            $('#todo-item-' + draggableId).appendTo('#' + droppedOnColumn);

            //hide item
            $('#todo-item-' + draggableId).hide();
            $('#todo-item-' + draggableId).slideDown();

            // After appending, you may want to update your server with the new state of the list
    
            
        }
    });

    //clicking on priority list
    $(document).on('click', '.priority-list', function(){
        const itemId = $(this).closest('.task-card').attr('id').split('-')[2];
        if($("#todo-item-"+itemId).hasClass("editing-mode") &&  $("#todo-item-"+itemId+" .priority-list").hasClass("clickable-priority-dropdown")==false){
            openPriorityDropdown(itemId);
        }
    });

    //clicking on priority item
    $(document).on('click', '.priority-list-item', function(){
        const itemId = $(this).closest('.task-card').attr('id').split('-')[2];

        if($("#todo-item-"+itemId).hasClass("editing-mode") && $("#todo-item-"+itemId+" .priority-list").hasClass("clickable-priority-dropdown")){
            if($(this).hasClass("low-priority")){
                closePriorityDropdown(itemId, "Low");
            }else if($(this).hasClass("medium-priority")){
                closePriorityDropdown(itemId, "Medium");
            }else if($(this).hasClass("high-priority")){
                closePriorityDropdown(itemId, "High");
            }
        }
    });

    //opening new-to-do item
    $(document).on('click', '.new-to-do-passive', function(){
        const itemId = $(this).attr('id').split('-')[2];
        if($(this).hasClass('new-to-do-passive')){
            openNewToDo(itemId, riveInstances);
        }
    })

    //clicking save button in new-to-do-composing
    $(document).on('click', '.action-button.primary', function(){
        const itemId = $(this).closest('.task-card').attr('id').split('-')[2];
        if($(this).closest('.task-card').hasClass('new-to-do-composing')){
            saveNewToDo(itemId, riveInstances);
        }
    })


    //submit button
    $(document).on('submit', '.task-contents', function(e) {

        //split task-form-X
        const idNum = $(this).attr('id').split('-')[2];
        //find val of editable divs
        const titleVal = $('#title-'+idNum).text();
        const detailsVal = $('#task-details-'+idNum).text();
        //assign to hidden fields
        $('#title-content-'+idNum).val(titleVal);
        $('#details-content-'+idNum).val(detailsVal);

        //calculate the priority data
        let selectedPriority;
        if($("#todo-item-"+idNum + " .low-priority").hasClass('selected-priority')){
            selectedPriority = "Low";
        }else if($("#todo-item-"+idNum + " .medium-priority").hasClass('selected-priority')){
            selectedPriority = "Medium";
        }else if($("#todo-item-"+idNum + " .high-priority").hasClass('selected-priority')){
            selectedPriority = "High";
        }
        switch(selectedPriority){
            case "High":
                $("#todo-item-"+idNum + " select.priority option[value='High']").prop('selected', true);
                $("#todo-item-"+idNum + " select.priority option[value='Medium']").prop('selected', false);
                $("#todo-item-"+idNum + " select.priority option[value='Low']").prop('selected', false);
                break;
            case "Medium":
                $("#todo-item-"+idNum + " select.priority option[value='High']").prop('selected', false);
                $("#todo-item-"+idNum + " select.priority option[value='Medium']").prop('selected', true);
                $("#todo-item-"+idNum + " select.priority option[value='Low']").prop('selected', false);
                break;
            case "Low":
                $("#todo-item-"+idNum + " select.priority option[value='High']").prop('selected', false);
                $("#todo-item-"+idNum + " select.priority option[value='Medium']").prop('selected', false);
                $("#todo-item-"+idNum + " select.priority option[value='Low']").prop('selected', true);
                break;
        }

        e.preventDefault(); // Prevents the default form submission action
    
        // Serialize the form data into an object
        var formData = {};
        $(this).serializeArray().forEach(function(item) {
            formData[item.name] = item.value;
        });

        //force date to the form Data
        formData['dueDate'] = $('#due-date-' + idNum).val();

        //force id to the form Data
        formData['itemId'] = idNum;
    
        // The URL to which the request is sent
        var requestUrl = '/update-todo-item';

        // AJAX call
        $.ajax({
            url: requestUrl,
            type: 'PUT', // Type of request
            contentType: 'application/json', // Specifies the content type of the request
            data: JSON.stringify(formData), // Convert the form data into JSON
            success: function(response) {
                // Code to execute upon success
                console.log('Success:', response);
                if(response.wasANewItem==true){
                    console.log('will attempt to load new post');
                    loadNewPost();
                }
            },
            error: function(xhr, status, error) {
                // Code to execute if there's an error
                console.error('Error:', error);
            }
        });
    });

    // obsolete height adjust textarea functions
    $('input').each(function() {
        // Initially adjust the height
        adjustWidth(this);
    });
    
    $(window).resize(function() {
        $('input').each(function() {
            adjustWidth(this);
        });
    });

    $(".button-wrapper").hide();

});

function loadNewPost() {
    console.log("load new post called");
    $.get("/generate-new-item-form", function(html) {
        console.log("html received");
        if(html==="try again!"){

        }else{
            $('#to-dos-column').prepend(html);
            $('.new-to-do-passive .new-to-do-rive').each(function() {
                const canvasId = $(this).attr('id');
                riveInstances[canvasId] = new rive.Rive({
                    src: "/assets/riv/omni_check.riv",
                    canvas: this, // Refer to the current canvas in the loop
                    autoplay: true,
                    stateMachines: "Omni Check",
                    onLoad: () => {
                        riveInstances[canvasId].resizeDrawingSurfaceToCanvas();
                        const inputs = riveInstances[canvasId].stateMachineInputs("Omni Check");
                        // Attach a mouseleave event listener to each canvas
                        inputs[1].value = 4;
                        $(this).on('mouseenter', function() {
                            if (inputs && inputs.length > 0) {
                                inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                            }
                        });
                        $(this).on('mouseleave', function() {
                            if (inputs && inputs.length > 0) {
                                inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                            }
                        });
        
                        const refCard = '.new-to-do-passive#todo-item-' + canvasId.split('-')[1];
                        const $refCard = $(refCard);
                        //setup an on hover effect for the New To Do card for each new to do rive canvas
                        $(document).on('mouseenter', refCard, function() {
                            const passiveRefCard = $refCard.hasClass('new-to-do-passive');
                            if (inputs && inputs.length > 0 && passiveRefCard) {
                                inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                            }
                        });
                        $(document).on('mouseleave', refCard, function() {
                            const passiveRefCard = $refCard.hasClass('new-to-do-passive');
                            if (inputs && inputs.length > 0 && passiveRefCard) {
                                inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                            }
                        });
                        //setup an on hover effect for the New To Do card for each new to do rive canvas
                        $(document).on('mousedown', refCard, function() {
                            const passiveRefCard = $refCard.hasClass('new-to-do-passive');
                            if (inputs && inputs.length > 0 && passiveRefCard) {
                                inputs[2].value = true;  // Set the first input to false when the mouse leaves the canvas
                            }
                        });
                        $(document).on('mouseup', function() {
                            if (inputs && inputs.length > 0) {
                                inputs[2].value = false;  // Set the first input to false when the mouse leaves the canvas
                            }
                        });
        
                    },
                });
                
            });
            // Drag function
            $('.draggable').draggable({
                revert: "invalid", // This will cause the element to return to its original position if not dropped into a valid droppable
                helper: "clone", // This will clone the element when dragging
                cursor: "move",
                start: function(event, ui) {
                    // Reduce opacity of the entire card while dragging
                    $(this).closest('.task-card').css('opacity', 0.25);

                    
                    // Find dummy card
                    const dummyCardElement = $('#dummy-card-rive');
                    const dummyInputs = dummyCard.stateMachineInputs("Dummy Card");
                    dummyCardElement.toggle(); // This will toggle the visibility of the canvas
                    dummyInputs[0].fire();
                    console.log(dummyCardElement);
                },
                stop: function(event, ui) {
                    // Reset opacity of the entire card once dragging stops
                    $(this).closest('.task-card').css('opacity', 1);
                    
                    // Find dummy card
                    const dummyCardElement = $('#dummy-card-rive');
                    dummyCardElement.toggle(); // This will toggle the visibility of the canvas
                    console.log(dummyCardElement);
                }
            });
        }
        
    }).fail(function(error) {
        console.error('Error:', error);
    });

    
}

function openNewToDo(cardId, riveInstances){

    console.log("new to do opened on card " + cardId);
    $('#todo-item-'+cardId).removeClass('new-to-do-passive');
    $('#todo-item-'+cardId).addClass('new-to-do-composing');
    const inputs = riveInstances["check-"+cardId].stateMachineInputs('Omni Check');
    inputs[1].value = 5;
    toggleEditMode(cardId);

}

function saveNewToDo(cardId, riveInstances){
    console.log("new to do saved on card " + cardId);
    $('#todo-item-'+cardId).removeClass('new-to-do-composing');
    const inputs = riveInstances["check-"+cardId].stateMachineInputs('Omni Check');
    inputs[1].value = 1;

    //initialize rive files
    console.log('#todo-item-' + cardId  + ' .edit-rive');
    $('#todo-item-' + cardId  + ' .edit-rive').height('28px');
    $('#todo-item-' + cardId  + ' .move-rive').height('28px');
    $('#todo-item-' + cardId  + ' .edit-rive').each(function() {
        const r = new rive.Rive({
            src: "/assets/riv/edit_icon.riv",
            canvas: this, // Refer to the current canvas in the loop
            autoplay: true,
            stateMachines: "Edit Icon",
            onLoad: () => {
                r.resizeDrawingSurfaceToCanvas();
                const inputs = r.stateMachineInputs("Edit Icon");
                // Attach a mouseleave event listener to each canvas
                $(this).on('mouseenter', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(this).on('mouseleave', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
            },
        });
    });
    $('#todo-item-' + cardId  + ' .move-rive').each(function() {
        const r = new rive.Rive({
            src: "/assets/riv/move_icon.riv",
            canvas: this, // Refer to the current canvas in the loop
            autoplay: true,
            stateMachines: "Move Icon",
            onLoad: () => {
                r.resizeDrawingSurfaceToCanvas();
                const inputs = r.stateMachineInputs("Move Icon");
                // Attach a mouseleave event listener to each canvas
                $(this).on('mouseenter', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = true;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
                $(this).on('mouseleave', function() {
                    if (inputs && inputs.length > 0) {
                        inputs[0].value = false;  // Set the first input to false when the mouse leaves the canvas
                    }
                });
            },
        });
    });
}


//revert the values to the previous and terminate edit mode
function cancelEdits(cardId){
    
    $("#todo-item-" + cardId).removeClass('editing-mode');

    //if it's a new post thingy
    if($('#todo-item-'+cardId).hasClass('new-to-do-composing')){
        $('#todo-item-'+cardId).removeClass('new-to-do-composing');
        $('#todo-item-'+cardId).addClass('new-to-do-passive');
        const inputs = riveInstances["check-"+cardId].stateMachineInputs('Omni Check');
        inputs[1].value = 4;
    }

    //show the action buttons
    //set action button height to 1
    //show action button
    $("#todo-item-" + cardId + " .button-wrapper").slideUp({
        duration: 100
    });

    //disable title and details fields
    $("#title-" + cardId).attr("contenteditable", "false");

    $("#task-details-" + cardId).attr("contenteditable", "false");

    //set text to prior data
    $("#title-" + cardId).text($("#title-" + cardId).attr('priorData'));
    $("#task-details-" + cardId).text($("#task-details-" + cardId).attr('priorData'));

    //delete prior data attribute
    $("#title-" + cardId).removeAttr("priorData");
    $("#task-details-" + cardId).removeAttr("priorData");


    //calculate the natural date to input date, or input date to natural date
    const $dateSelectInput = $("#due-date-" + cardId);
    const $calendarIcon = $("#todo-item-" + cardId + " .icon-calendar");

    //change the calendar picker between date and text field
    $dateSelectInput.attr("type","text");
    $dateSelectInput.prop("readonly", true);

    const oldDateData = $dateSelectInput.attr('olddatedata');
    $dateSelectInput.val(oldDateData);
    

    //hide Calendar icon and due/due soon text
    if($calendarIcon.width()==0){
        $calendarIcon.css({ width: '0', visibility: 'visible', position: 'static' });

        $calendarIcon.show();
        $calendarIcon.animate({ width: "17px"}, 150);
    }

    
    //collapse priority dropdown
    const selectedPriority = $("#todo-item-"+cardId + " .priority-list").attr('oldpriority');
    closePriorityDropdown(cardId, selectedPriority);
    showPriority(cardId, selectedPriority);
    

}

function toggleEditMode(cardId){
    
    $("#todo-item-" + cardId).toggleClass('editing-mode');

    //show the action buttons
    //set action button height to 1
    //show action button
    if($("#todo-item-" + cardId + " .button-wrapper").is(':hidden')){
        $("#todo-item-" + cardId + " .button-wrapper").css('display', 'flex').hide().slideDown(100);
    }else{
        $("#todo-item-" + cardId + " .button-wrapper").slideDown(100, function(){
            $("#todo-item-" + cardId + " .button-wrapper").css('display', 'none');
        });
    }
    

    //enable title and details fields

    $("#title-" + cardId).attr("contenteditable", function(index, attr){
        return attr == "true" ? null : "true";
    });

    $("#task-details-" + cardId).attr("contenteditable", function(index, attr){
        return attr == "true" ? null : "true";
    });

    //preserve the title and details old values in a value attribute
    $("#title-" + cardId).attr("priorData", function(index, attr){
        return attr == $("#title-" + cardId).text() ? null : $("#title-" + cardId).text();
    });
    $("#task-details-" + cardId).attr("priorData", function(index, attr){
        return attr == $("#task-details-" + cardId).text() ? null : $("#task-details-" + cardId).text();
    });


    //calculate the natural date to input date, or input date to natural date
    const $dateSelectInput = $("#due-date-" + cardId);
    const $calendarIcon = $("#todo-item-" + cardId + " .icon-calendar");
    const $dueDateText = $("#todo-item-" + cardId + " .due-date label");

    //change the calendar picker between date and text field
    if($dateSelectInput.attr("type")==="date"){ //saving changes
        $dateSelectInput.attr("type","text");
        $dateSelectInput.prop("readonly", true);

        //check if input date is less than 2 months away and if so then changed to "Due Soon"
        // if it's more than 2 months away just set as Due
        const inputDateData = $dateSelectInput.val();
        if(isInputDueSoon(inputDateData)){
            $dueDateText.text("Due Soon:");
            $dueDateText.addClass("high");
            $calendarIcon.attr('src', 'assets/svg/Calendar Icon Alert.svg')
        }else{
            $dueDateText.text("Due");
            $dueDateText.removeClass("high");
            $calendarIcon.attr('src', 'assets/svg/Calendar Icon.svg')
        }

        const naturalFormatDate = inputDateToNatural(inputDateData);

        $dateSelectInput.val(naturalFormatDate);
        $dateSelectInput.removeAttr("olddatedata");
    }else{

        //add the olddatedata property
        const inputFormatDate = naturalDateToInput($dateSelectInput.val());
        $dateSelectInput.attr("olddatedata", $dateSelectInput.val());
        $dateSelectInput.attr("type","date");
        $dateSelectInput.prop("readonly", false);
        $dateSelectInput.val(inputFormatDate);
    }

    //hide Calendar icon and due/due soon text
    if($calendarIcon.width()==0){
        $calendarIcon.css({ width: '0', visibility: 'visible', position: 'static' });

        $calendarIcon.show();
        $calendarIcon.animate({ width: "17px"}, 150);
    }else{
        $calendarIcon.animate({ width: "0"}, 100, function() {
            // This function is the callback that executes after the animation completes
            $(this).hide();
        });
    }

    //process or clear oldpriority on priority dropdown
    if($("#todo-item-" + cardId).hasClass('editing-mode')){
        if($("#todo-item-"+cardId + " .low-priority").hasClass('selected-priority')){
            $("#todo-item-"+cardId + " .priority-list").attr("oldpriority", "Low");
        }else if($("#todo-item-"+cardId + " .medium-priority").hasClass('selected-priority')){
            $("#todo-item-"+cardId + " .priority-list").attr("oldpriority", "Medium");
        }else if($("#todo-item-"+cardId + " .high-priority").hasClass('selected-priority')){
            $("#todo-item-"+cardId + " .priority-list").attr("oldpriority", "High");
        }
    }else{
        $("#todo-item-"+cardId + " .priority-list").removeAttr('oldpriority');
        let selectedPriority;
        if($("#todo-item-"+cardId + " .low-priority").hasClass('selected-priority')){
            selectedPriority = "Low";
        }else if($("#todo-item-"+cardId + " .medium-priority").hasClass('selected-priority')){
            selectedPriority = "Medium";
        }else if($("#todo-item-"+cardId + " .high-priority").hasClass('selected-priority')){
            selectedPriority = "High";
        }
        closePriorityDropdown(cardId, selectedPriority);
    }
    

}

function openPriorityDropdown(cardId){
    console.log(cardId + " dropdown open");
    //store current data, and prepare the hidden layers for sliedown
    if($("#todo-item-"+cardId + " .low-priority").hasClass('selected-priority')){
        console.log("low");
        $("#todo-item-"+cardId + " .medium-priority").css({display:'flex'}).hide();
        $("#todo-item-"+cardId + " .high-priority").css({display:'flex'}).hide();
    }else if($("#todo-item-"+cardId + " .medium-priority").hasClass('selected-priority')){
        console.log("med");
        $("#todo-item-"+cardId + " .low-priority").css({display:'flex'}).hide();
        $("#todo-item-"+cardId + " .high-priority").css({display:'flex'}).hide();
    }else if($("#todo-item-"+cardId + " .high-priority").hasClass('selected-priority')){
        console.log("high");
        $("#todo-item-"+cardId + " .low-priority").css({display:'flex'}).hide();
        $("#todo-item-"+cardId + " .medium-priority").css({display:'flex'}).hide();
    }
    //add open priority dropdown style
    //show missing things
    $("#todo-item-"+cardId + " .priority-list").addClass("open-priority-dropdown");
    $("#todo-item-"+cardId + " .priority-list-item").slideDown(100, function(){
        $("#todo-item-"+cardId + " .priority-list").addClass("clickable-priority-dropdown");
    });
}

function closePriorityDropdown(cardId, selectedPriority){
    console.log(cardId + " dropdown close");
    //remove open priority dropdown style
    //remove missing things
    $("#todo-item-"+cardId + " .priority-list").removeClass("open-priority-dropdown");
    function removeOpenPriorityClass(){
        $("#todo-item-"+cardId + " .priority-list").removeClass("clickable-priority-dropdown");
    }
    switch(selectedPriority){
        case "High":
            $("#todo-item-"+cardId + " .low-priority").slideUp(100);
            $("#todo-item-"+cardId + " .medium-priority").slideUp(100, removeOpenPriorityClass);

            $("#todo-item-"+cardId + " .high-priority").addClass('selected-priority').removeClass('not-selected-priority');
            $("#todo-item-"+cardId + " .low-priority").addClass('not-selected-priority').removeClass('selected-priority');
            $("#todo-item-"+cardId + " .medium-priority").addClass('not-selected-priority').removeClass('selected-priority');
            break;
        case "Medium":
            $("#todo-item-"+cardId + " .low-priority").slideUp(100);
            $("#todo-item-"+cardId + " .high-priority").slideUp(100, removeOpenPriorityClass);

            $("#todo-item-"+cardId + " .medium-priority").addClass('selected-priority').removeClass('not-selected-priority');
            $("#todo-item-"+cardId + " .low-priority").addClass('not-selected-priority').removeClass('selected-priority');
            $("#todo-item-"+cardId + " .high-priority").addClass('not-selected-priority').removeClass('selected-priority');
            break;
        case "Low":
            $("#todo-item-"+cardId + " .medium-priority").slideUp(100);
            $("#todo-item-"+cardId + " .high-priority").slideUp(100, removeOpenPriorityClass);
            
            $("#todo-item-"+cardId + " .low-priority").addClass('selected-priority').removeClass('not-selected-priority');
            $("#todo-item-"+cardId + " .medium-priority").addClass('not-selected-priority').removeClass('selected-priority');
            $("#todo-item-"+cardId + " .high-priority").addClass('not-selected-priority').removeClass('selected-priority');
            break;
    }
   
}

function showPriority(cardId, selectedPriority){
    switch(selectedPriority){
        case "High":
            $("#todo-item-"+cardId + " .high-priority").css({display:'flex'}).hide().slideDown(100);
            break;
        case "Medium":
            $("#todo-item-"+cardId + " .medium-priority").css({display:'flex'}).hide().slideDown(100);
            break;
        case "Low":
            $("#todo-item-"+cardId + " .low-priority").css({display:'flex'}).hide().slideDown(100);
            break;
    }
}

function isInputDueSoon(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const twoMonthsLater = new Date(currentDate.setMonth(currentDate.getMonth() + 2));

    return inputDate <= twoMonthsLater;
}

function inputDateToNatural(inputDate) {
    // Parse the input date string
    const date = new Date(inputDate + 'T00:00');

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Get the day, month, and year
    const day = date.getDate();
    const monthIndex = date.getMonth(); // getMonth() returns 0-11
    const year = date.getFullYear();

    // Format into "MMM DD, YYYY"
    return `${monthNames[monthIndex]} ${day}, ${year}`;
}

function naturalDateToInput(inputDate) {
    // Parse the input date string
    const date = new Date(inputDate);

    // Get the year, month, and day
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth() returns 0-11
    let day = date.getDate();

    // Ensure month and day are two digits
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    // Format into YYYY-MM-DD
    return `${year}-${month}-${day}`;
}

function adjustWidth(textarea) {
    const $textarea = $(textarea);
    $textarea.width("100%");
}

function updateLists(todoList, startedList, doneList) {
    // Assuming 'todoList', 'startedList', and 'doneList' are arrays of item IDs
    todoList.forEach((item) => {
        moveItemToList(item.id, 'to-dos');
    });

    startedList.forEach((item) => {
        moveItemToList(item.id, 'started');
    });

    doneList.forEach((item) => {
        moveItemToList(item.id, 'done');
    });
    updateListTitles(todoList.length, startedList.length, doneList.length);
}

function updateListTitles(todoListLength, startedListLength, doneListLength){
    //update the counter text at the top of each column
    $('#to-do-title').text("To do - " + (todoListLength-1));
    $('#started-title').text("Started - " + startedListLength);
    $('#done-title').text("Finished - " + doneListLength);
}

//this animates the movement of cards between lists when you click the checkbox.
function moveItemToList(itemId, listName) {
    const itemElement = $('#todo-item-' + itemId);
    const currentList = itemElement.closest('.to-do-item-list').attr('id');
    //check to make sure the currentlist and the destination lists are different. if not, then don't animate them.
    if (itemElement.length && currentList !== listName + '-column') {
        // Ensure both the original and the new parent have `position: relative`
        const originalParent = itemElement.parent();
        const tempDestination = $('#' + listName + '-column.to-do-item-list');

        // Calculate current position relative to the parent
        const startPos = itemElement.position();


        // Move to the new list without visibility and force a reflow
        tempDestination.append(itemElement);
        itemElement[0].offsetHeight; // force a reflow
        // Calculate new position relative to the new parent
        const endPos = itemElement.position();
        
        // itemElement.css('visibility', 'hidden');

        // Move the item back to its original position
        itemElement.css({
            position: 'absolute',
            left: startPos.left,
            top: startPos.top,
            width: 250,
            visibility: 'visible'
        }).appendTo(originalParent);

        //Change the rive animation based on the destination
        const checkBoxRive = riveInstances["check-"+itemId]
        const inputs = checkBoxRive.stateMachineInputs("Omni Check");
        switch (listName) {
            case "to-dos":
                inputs[1].value=1;
                break;
            case "started":
                inputs[1].value=2;
                break;
            case "done":
                inputs[1].value=3;
                break;
        
            default:
                break;
        }

        // Delay the animation to ensure the browser recognizes the starting position
        setTimeout(function() {
            itemElement.animate({
                left: endPos.left,
                top: endPos.top
            }, {
                duration: 150,
                easing: 'easeOutQuad',
                queue: false,
                complete: function() {
                    // After animation, reset the style and append to the new list
                    itemElement.hide().removeAttr('style').appendTo(tempDestination).fadeIn();
                    //also change the id to whatever the new id is
                }
            });
        }, 0); // setTimeout with 0 delay allows the browser to recognize the change
    }
}
