function deleteBook(idBook) {
    if (!confirm('Are you sure you want to delete this book?')) {
        return;
    }
    const origin = location.origin;
    $.ajax({
        url: `${origin}/admin/books/${idBook}/delete`,
        method: 'GET',
        success: function (response) {
            $('#book-' + idBook).remove();

        }
    })
}
