// results - the results to render
// fav - the currently favourites objects
function render(results, fav, onlyFav) {

    // clear results area
    //$(".favourite-result-area").html("")
    $(".result-area").html("")

    // get list of current favourites
    let exisiting_favs = []
    $(".fav-area").each(function() {
        exisiting_favs.push($(this).data("uid"))
    })

    for (let item of results) {

        // R3JlZW4gQmluIChwYWNrYWdpbmcp
        let favClass = (fav.includes(item.uid))? "fav" : "";

        // place in favourites
        if (favClass == "fav" && !(exisiting_favs.includes(item.uid))) {
            let result = `<div class="result-row">`;
    		result += `<i class="fas fa-star fav-area ${favClass}" data-uid="${item.uid}"></i>`;
    		result += `<div class="result-title">${item.title}</div>`;
    		result += `<div class="result-body">${item.body}</div>`;
    		result += `</div>`;
    		$(".favourite-result-area").append(result);
        }

        // always place in results
        if (!onlyFav) {
            let result = `<div class="result-row">`;
            result += `<i class="fas fa-star ${favClass}" data-uid="${item.uid}"></i>`;
            result += `<div class="result-title">${item.title}</div>`;
            result += `<div class="result-body">${item.body}</div>`;
            result += `</div>`;
            $(".result-area").append(result);
        }

    }
}
