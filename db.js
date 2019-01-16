//
// DB helper functions
//

// return data from API
function getData(callback) {
    $.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000", function( data ) {
        callback(_process(data));
    });
}

// convert special characters to HTML
function _process(data) {
    for (let item of data) {
        let parser = new DOMParser;
        let dom = parser.parseFromString('<!doctype html><body>' + item.body, 'text/html');
        item.body = dom.body.textContent;

        // extract keywords
        let keywords = []
        for (let word_block of item.keywords.split(", ")) {
            let words = word_block.replace("(", "").replace(")", "").split(" ")
            for (let word of words) keywords.push(word)
        }
        item.keywords = keywords

        // create dictionary for faster lookup
        let dict = {}
        for (let word of item.keywords) dict[word] = true;
        item.keywordsDict = dict

        // assumption is made that titles are unique
        // base64 of title is used as uid for object
        item.uid = btoa(item.title)
    }
    return data;
}

// uid    = the identifier of the object to favourite
// status = true/false indicating if the given uid should be favourited
// returns status code 200 and true on success
function setFavourite(uid, status, callback) {

    // request validation
    if (status != "true" && status != "false") return false;
    if (typeof uid != "string") return false;

    const url    = "https://75v21ryjb0.execute-api.us-east-2.amazonaws.com/default/setFavourite?";
    const params = `uid=${uid}&status=${status}`;

    $.get( url + params, function( data ) {
        callback(data);
    });
}

// returns list of uids of current favourites
function getFavourites(callback) {

    const url = "https://75v21ryjb0.execute-api.us-east-2.amazonaws.com/default/getFavourites";

    $.get( url, function( data ) {
        callback(data.map(x => x.uid));
    });
}

function searchData(data, words) {

    let results = []
    for (let item of data) {

        let found = false
        for (let word of words) {

            if (word == "") continue

            if (word in item.keywordsDict) {

                results.push(item)
                found = true
                break;

            }
        }

        if (found) continue;
    }
    return results;
}

//
// tests
//
/*
getObjects("pot", function(data) {
    console.log(data);
});

setFavourite(35, "true", function(data) {
    console.log(data);
});

getFavourites(function(data) {
    console.log(data);
}); */
