var dbPromised = idb.open("news-reader", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("articles", {
      keyPath: "tla"
    });
    articlesObjectStore.createIndex("name", "address", { unique: false });
  });

function saveForLater(article) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("articles", "readwrite");
        var store = tx.objectStore("articles");
        console.log(article);
        store.put(article);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("articles", "readonly");
          var store = tx.objectStore("articles");
          return store.getAll();
        })
        .then(function(articles) {
          resolve(articles);
        });
    });
  }

  function getById(tla) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("articles", "readonly");
          var store = tx.objectStore("articles");
          return store.get(tla);
        })
        .then(function(article) {
          resolve(article);
        });
    });
  }

  function deleteById(tla) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("articles", "readwrite");
          var store = tx.objectStore("articles");
          store.delete(tla);
          return tx.complete;
        })
        .then(function(article) {
          resolve(article);
          console.log('item dihapus');
          getSavedArticles();
        });
    });
  }
