$(function () {
    $('#users').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'https://api.github.com/search/users',
                data: { q: request.term },
                dataType: 'json',
                success: function (data) {
                    response($.map(data.items, (item) => item.login));
                }
            })
        },
        minLength: 2,
        select: function () {
            $.ajax({
                url: `https://api.github.com/users/${this.value}`,
                success: function (data) { renderData(data) }
            })
        }
    });

    function formatDate(string) {
        const reg = /\d+-\d+-\d+/g;
        const date = string.match(reg);
        return date[0]
    }

    function renderData(obj) {
        $('#login').val(obj.login);
        $('#date').val(formatDate(obj.created_at));
        $('#link').text('Link').attr('href', `https://github.com/${obj.login}`);
    }
});