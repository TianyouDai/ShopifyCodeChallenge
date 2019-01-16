# Shopify App

Web developer challenge Shopify

# Application flow

1. Pull data from API
2. parse data into JSON
3. Hash title of object to obtain id
4. Store fav in database
5. See diagram for application flow

# todo

- [x] create AWS lambda
    - [x] get objects given word (getObjects [word])
    - [x] set fav (favorite [id, status])
    - [x] remove fav (favorite [id, status])
    - [x] get fav (favorite)
- [x] redo data-path (see notebook or photo)
- [x] use only keywords for lookup
- [x] separate db code into db.js
- [x] ignore empty string when searching
- [x] favorites should always persist (hide if there are none)
- [x] autocomplete functionality using dataset element and keywords
- [ ] make site responsive
