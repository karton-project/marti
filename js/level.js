let womenParticipationLevelMode = false;

function openWomenParticipationDialog() {
    womenParticipationLevelMode = true;
    $('#womenParticipation').html(_women_participation_1_text);
    $('#womenParticipation').dialog({
        title: _women_participation_1_title,
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
    $('#womenParticipation').html(_women_participation_2_text);
    $('#womenParticipation').dialog({
        title: _women_participation_2_title,
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

function openWomenParticipationChart() {
    $('#womenParticipation').html(_women_participation_3_text);
    $('#womenParticipation').dialog({
        title: _women_participation_3_title,
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


