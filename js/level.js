let womenParticipationLevelMode = false;

function openWomenParticipationDialog() {
    womenParticipationLevelMode = true;
    $('#womenParticipation1').dialog({
        modal: true,
        width: 400,
        open: function () {
            $('#_dataset_link').addClass('color-change-anim');
            $(".ui-dialog .ui-dialog-content").css("font-size", "1.4em");
        },
        buttons: {
            OK: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}

function openWomenParticipationFilter() {
    $('#womenParticipation2').dialog({
        modal: true,
        width: 400,
        open: function () {
            // XXX
            $(".ui-dialog .ui-dialog-content").css("font-size", "1.4em");
        },
        buttons: {
            OK: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}


