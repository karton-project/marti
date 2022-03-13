let womenParticipationLevelMode = false;

function openWomenParticipationDialog(title, text) {
    womenParticipationLevelMode = true;
    $('#womenParticipation').html(text);
    $('#womenParticipation').dialog({
        title: title,
        modal: true,
        width: 400,
        open: function () {
            //$('#_dataset_link').addClass('color-change-anim');
            $(".ui-dialog .ui-dialog-content").css("font-size", "1.4em");
        },
        buttons: {
            OK: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}
