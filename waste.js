$( document ).ready(function() {

    function hideFavouritesIfNoneExist() {
        let number = $(".fav").length
        if (number <= 0) {
            $(".favourite-area").css("display", "none")
        } else {
            $(".favourite-area").css("display", "block")
        }
    }

    function clickEvent() {

            // the clicked star
            const star = $(this)

            // the uid of the star
            const uid = star.data("uid")

            // if the star is already favourited...
            if (star.hasClass("fav")) {

                // ... unfavourite the star in the DB
                setFavourite(uid, "false", function() {

                    $(this).removeClass("fav");

                    // remove from favourites list
                    if ($(this).hasClass("fav-area")) $(this).parent().remove();

                    // update all results shown with given uid
                    $(".fav").each(function() {

                        if ($(this).data("uid") == uid) {
                            $(this).removeClass("fav");
                            if ($(this).hasClass("fav-area")) $(this).parent().remove();
                        }
                    });

                    hideFavouritesIfNoneExist()

                }.bind(this));

            } else {

                setFavourite(uid, "true", function() {

                    // get list of current favourites
                    let exisiting_favs = []
                    $(".fav-area").each(function() {
                        exisiting_favs.push($(this).data("uid"))
                    })

                    // favourite the clicked star
                    $(this).addClass("fav")

                    if (!(exisiting_favs.includes(uid))) {
                        // clone the result row
                        let result_clone = $(this).parent().clone()

                        // get ref to star
                        let star_clone = $(result_clone.find(".fa-star")[0])

                        // mark this clone as belonging to favourite area
                        star_clone.addClass("fav-area")

                        // add click handeler
                        star_clone.click(clickEvent.bind(this))

                        // add to favourite results area for display
                        result_clone.appendTo(".favourite-result-area")
                    }

                    hideFavouritesIfNoneExist()

                }.bind(this));
            }
    }

    // set-up click handelers on stars
    function setClickHandlers() {
        $(".fa-star").each(function() {
            $(this).click(clickEvent.bind(this))
        });
    }

    //
    // main
    //
    getData(function(data) {

        // load auto complete data list
        let dup = {}
        for (let item of data) {
            for (let word of item.keywords) {
                if (!dup[word]) {
                    $("#keywords").append(`<option value="${word}">`)
                    dup[word] = true
                }
            }
        }

        // click handeler for search button
        $(".search-box").click(function() {
            getFavourites(function(fav) {

                // parse search query and get results
                let words = $(".search-field").val().split(" ")
                let results = searchData(data, words)

                // render results and set click handelers
                render(results, fav, false);
                setClickHandlers();
            });
        });

        $(".search-field").keyup(function() {

            if ($(this).val() == "") {
                // clear results area if search-field is cleared
                //$(".favourite-result-area").html("")
                $(".result-area").html("")
            }
        });

        // initial render of favourites
        getFavourites(function(fav) {
            render(data, fav, true);
            setClickHandlers();
            hideFavouritesIfNoneExist()
        });

    });
});
