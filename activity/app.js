function addDataCard(id, photoURL, title, context, fileURL) {
    $('#' + id).append(
        '<div class="card card-up">\n' +
        '        <img src="' + photoURL + '">\n' +
        '        <h2>' + title + '</h2>\n' +
        '        <p>' + context + '</p>\n' +
        '        <br>\n' +
        '        <a href="' + fileURL + '"><i class="far fa-file-alt"></i>Görüntüle</i></a>\n' +
        '    </div>'
    )
}