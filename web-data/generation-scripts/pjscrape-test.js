pjs.addSuite({
    url: 'http://en.wikipedia.org/wiki/List_of_towns_in_Vermont',
    scraper: function() {
        return $('sortable wikitable jquery-tablesorter tr').slice(1).map(function() {
            var name = $('td:nth-child(2)', this).text(),
                county = $('td:nth-child(3)', this).text(),
                // convert relative URLs to absolute
                link = _pjs.toFullUrl(
                    $('td:nth-child(2) a', this).attr('href')
                );
            return {
                model: "myapp.town",
                fields: {
                    name: name,
                    county: county,
                    link: link
                }
            }
        }).toArray(); // don't forget .toArray() if you're using .map()
    }
});
