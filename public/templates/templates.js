this["JST"] = this["JST"] || {};

this["JST"]["actorDetailsTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3 class="app-heading"><i class="fa fa-info"></i> Szczegóły aktora</h3>\r\n\r\n<div class="app-item-info">\r\n    <p><span>Imię i nazwisko:</span>' +
((__t = ( name )) == null ? '' : __t) +
'</p>\r\n\r\n    <button type="button" class="btn edit">Edytuj</button>\r\n</div>';

}
return __p
};

this["JST"]["actorEditNewViewTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(this.model.isNew()) { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-plus"></i> Nowy aktor</h3>\r\n';
 } else { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-edit"></i> Edycja aktora</h3>\r\n';
 } ;
__p += '\r\n\r\n\r\n<div class="app-form">\r\n    <form action="" id="new-actor">\r\n        <div class="app-form-field">\r\n            <label for="actor-name">Nazwa</label>\r\n            <input type="text" id="actor-name" value="">\r\n        </div>\r\n\r\n\r\n        <div class="app-form-submit">\r\n            <button type="submit" class="btn">Zapisz</button>\r\n            ';
 if(!this.model.isNew()) { ;
__p += '\r\n            <button type="button" class="btn special delete">Usuń</button>\r\n            ';
 } ;
__p += '\r\n        </div>\r\n    </form>\r\n</div>';

}
return __p
};

this["JST"]["actorListItemTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li>\r\n    <span class="name">' +
((__t = ( name )) == null ? '' : __t) +
'</span>\r\n    <span class="btn-rounded details">\r\n        <i class="fa fa-search"></i>\r\n    </span>\r\n</li>';

}
return __p
};

this["JST"]["breadcrumbsWidgetTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 for(var i = 0; i < pathItems.length; i++) { ;
__p += '\r\n<span class="app-status-item">' +
((__t = ( pathItems[i] )) == null ? '' : __t) +
'</span>\r\n';
 } ;


}
return __p
};

this["JST"]["categoryDetailsTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3 class="app-heading"><i class="fa fa-info"></i> Szczegóły kategorii</h3>\r\n\r\n<div class="app-item-info">\r\n    <p><span>Nazwa:</span>' +
((__t = ( name )) == null ? '' : __t) +
'</p>\r\n\r\n    <button type="button" class="btn edit">Edytuj</button>\r\n</div>';

}
return __p
};

this["JST"]["categoryEditNewViewTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(this.model.isNew()) { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-plus"></i> Nowa kategoria</h3>\r\n';
 } else { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-edit"></i> Edycja kategorii</h3>\r\n';
 } ;
__p += '\r\n<div class="app-form">\r\n    <form action="" id="new-category">\r\n        <div class="app-form-field">\r\n            <label for="category-name">Nazwa</label>\r\n            <input type="text" id="category-name" value="">\r\n        </div>\r\n\r\n\r\n        <div class="app-form-submit">\r\n            <button type="submit" class="btn">Zapisz</button>\r\n            ';
 if(!this.model.isNew()) { ;
__p += '\r\n            <button type="button" class="btn special delete">Usuń</button>\r\n            ';
 } ;
__p += '\r\n        </div>\r\n    </form>\r\n</div>';

}
return __p
};

this["JST"]["categoryListItemTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li>\r\n    <span class="name">' +
((__t = ( name )) == null ? '' : __t) +
'</span>\r\n    <span class="btn-rounded details">\r\n        <i class="fa fa-search"></i>\r\n    </span>\r\n</li>';

}
return __p
};

this["JST"]["clientDetailsTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3 class="app-heading"><i class="fa fa-info"></i> Szczegóły klienta</h3>\r\n\r\n<div class="app-item-info">\r\n    <p><span>Imię:</span>' +
((__t = ( first_name )) == null ? '' : __t) +
'</p>\r\n    <p><span>Nazwisko:</span>' +
((__t = ( last_name )) == null ? '' : __t) +
'</p>\r\n    <p><span>Data urodzenia:</span>' +
((__t = ( birthdate )) == null ? '' : __t) +
'</p>\r\n    <p><span>Number dowodu:</span>' +
((__t = ( idc_number )) == null ? '' : __t) +
'</p>\r\n    <p><span>Adres:</span> <i>' +
((__t = ( address )) == null ? '' : __t) +
'</i></p>\r\n    <p><span>Kod pocztowy:</span>' +
((__t = ( zip_code )) == null ? '' : __t) +
'</p>\r\n    <p><span>Miasto:</span>' +
((__t = ( city )) == null ? '' : __t) +
'</p>\r\n\r\n    <button type="button" class="btn edit">Edytuj</button>\r\n</div>';

}
return __p
};

this["JST"]["clientEditNewViewTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(this.model.isNew()) { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-plus"></i> Nowy klient</h3>\r\n';
 } else { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-edit"></i> Edycja klienta</h3>\r\n';
 } ;
__p += '\r\n<div class="app-form">\r\n    <form action="" id="new-movie">\r\n        <div class="app-form-field">\r\n            <label for="client-first-name">Imię</label>\r\n            <input type="text" id="client-first-name" value="" placeholder="Imię">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="client-last-name">Nazwisko</label>\r\n            <input type="text" id="client-last-name" class="short" placeholder="Nazwisko">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="client-birthdate">Data urodzenia</label>\r\n            <input type="text" class="medium" id="client-birthdate" placeholder="Data urodzenia">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="client-idc-number">Numer dowodu</label>\r\n            <input type="text" class="medium" id="client-idc-number" placeholder="Numer dowodu">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="client-address">Adres</label>\r\n            <input type="text" class="medium" id="client-address" placeholder="Adres">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="client-zip-code">Kod pocztowy</label>\r\n            <input type="text" class="medium" id="client-zip-code" placeholder="Kod pocztowy">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="client-city">Miasto</label>\r\n            <input type="text" class="medium" id="client-city" placeholder="Miasto">\r\n        </div>\r\n\r\n        <div class="app-form-submit">\r\n            <button type="submit" class="btn">Zapisz</button>\r\n            ';
 if(!this.model.isNew()) { ;
__p += '\r\n            <button type="button" class="btn special delete">Usuń</button>\r\n            ';
 } ;
__p += '\r\n        </div>\r\n    </form>\r\n</div>';

}
return __p
};

this["JST"]["clientListItemTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li>\r\n    <span class="name">' +
((__t = ( name )) == null ? '' : __t) +
'</span>\r\n    <span class="btn-rounded details">\r\n        <i class="fa fa-search"></i>\r\n    </span>\r\n</li>';

}
return __p
};

this["JST"]["latestRentsWidgetListItemTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class="client">' +
((__t = ( client_name )) == null ? '' : __t) +
'</span>\r\n<span class="movie">' +
((__t = ( movie_title )) == null ? '' : __t) +
'</span>\r\n<span class="date">' +
((__t = ( APP.Utils.formatDateMoment(date) )) == null ? '' : __t) +
'</span>';

}
return __p
};

this["JST"]["latestRentsWidgetTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>\r\n    <i class="fa fa-thumbs-o-up"></i>\r\n    Ostatnie wypożyczenia\r\n</h3>';

}
return __p
};

this["JST"]["listActionsTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="app-search">\r\n    <input type="text" placeholder="' +
((__t = ( placeholder )) == null ? '' : __t) +
'">\r\n</div>\r\n\r\n<span class="btn-rounded active add">\r\n    <i class="fa fa-plus"></i>\r\n</span>\r\n\r\n<ul class="app-sort">\r\n    ';
 if(order == "1") { ;
__p += '\r\n    <li data-order="1">Rosnąco</li>\r\n    <li data-order="-1">Malejąco</li>\r\n    ';
 } else { ;
__p += '\r\n    <li data-order="-1">Malejąco</li>\r\n    <li data-order="1">Rosnąco</li>\r\n    ';
 } ;
__p += '\r\n</ul>';

}
return __p
};

this["JST"]["listPaginationTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 for(var i = 1; i<= anchors; i ++) { ;
__p += '\r\n<a href=\'#\' class=\'';
 i == active ? print("active") : "" ;
__p += '\' data-page="' +
((__t = ( i )) == null ? '' : __t) +
'">' +
((__t = ( i )) == null ? '' : __t) +
'</a>\r\n';
 } ;


}
return __p
};

this["JST"]["movieDetailsTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3 class="app-heading"><i class="fa fa-info"></i> Szczegóły filmu</h3>\r\n\r\n<div class="app-item-info">\r\n    <p><span>Tytuł:</span>' +
((__t = ( title )) == null ? '' : __t) +
'</p>\r\n    <p><span>Data wydania:</span>' +
((__t = ( date )) == null ? '' : __t) +
'</p>\r\n    <p><span>Kategorie:</span>' +
((__t = ( categories.join(", ") )) == null ? '' : __t) +
'</p>\r\n    <p><span>Aktorzy:</span>' +
((__t = ( actors.join(", ") )) == null ? '' : __t) +
'</p>\r\n    <p><span>Opis:</span> <i>' +
((__t = ( description )) == null ? '' : __t) +
'</i></p>\r\n    <p><span>Ilość płyt:</span>' +
((__t = ( quantity )) == null ? '' : __t) +
'</p>\r\n    <p><span>Wypożyczonych:</span> ' +
((__t = ( rent_number )) == null ? '' : __t) +
' </p>\r\n    <p><span>Dostępny:</span> ';
 available ? print("tak") : print("nie") ;
__p += ' </p>\r\n\r\n    <button type="button" class="btn edit">Edytuj</button>\r\n</div>';

}
return __p
};

this["JST"]["movieEditNewViewTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(this.model.isNew()) { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-plus"></i> Nowy film</h3>\r\n';
 } else { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-edit"></i> Edycja filmu</h3>\r\n';
 } ;
__p += '\r\n<div class="app-form">\r\n    <form action="" id="new-movie">\r\n        <div class="app-form-field">\r\n            <label for="movie-title">Tytuł</label>\r\n            <input type="text" id="movie-title" value="">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="movie-date">Data</label>\r\n            <input type="text" id="movie-date" class="short" placeholder="dd-mm-rrrr">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="ms-movie-categories">Kategorie</label>\r\n            <input type="text" class="medium" id="ms-movie-categories" placeholder="Wybierz kategorie">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="ms-movie-actors">Aktorzy</label>\r\n            <input type="text" class="medium" id="ms-movie-actors" placeholder="Wybierz aktorów">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="movie-description">Opis</label>\r\n            <textarea id="movie-description"></textarea>\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="movie-quantity">Ilość</label>\r\n            <input type="text" id="movie-quantity" class="short" placeholder="20">\r\n        </div>\r\n\r\n        <div class="app-form-submit">\r\n            <button type="submit" class="btn">Zapisz</button>\r\n            ';
 if(!this.model.isNew()) { ;
__p += '\r\n            <button type="button" class="btn special delete">Usuń</button>\r\n            ';
 } ;
__p += '\r\n\r\n        </div>\r\n    </form>\r\n</div>';

}
return __p
};

this["JST"]["movieListItemTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li>\r\n    <span class="title">' +
((__t = ( title )) == null ? '' : __t) +
'</span>\r\n    <span class="btn-rounded details">\r\n        <i class="fa fa-search"></i>\r\n    </span>\r\n</li>';

}
return __p
};

this["JST"]["rentDetailsTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3 class="app-heading"><i class="fa fa-info"></i> Szczegóły wypożyczenia</h3>\r\n\r\n<div class="app-item-info">\r\n    <p><span>Film:</span> ' +
((__t = ( movie_title )) == null ? '' : __t) +
' </p>\r\n    <p><span>Klient:</span> ' +
((__t = ( client_name )) == null ? '' : __t) +
' </p>\r\n    <p><span>Data:</span> ' +
((__t = ( date )) == null ? '' : __t) +
' </p>\r\n\r\n    <button type="button" class="btn edit">Edytuj</button>';

}
return __p
};

this["JST"]["rentEditNewViewTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(this.model.isNew()) { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-plus"></i> Nowe wypożyczenie</h3>\r\n';
 } else { ;
__p += '\r\n<h3 class="app-heading"><i class="fa fa-edit"></i> Edycja wypożyczenia</h3>\r\n';
 } ;
__p += '\r\n<div class="app-form">\r\n    <form action="" id="new-rent">\r\n        <div class="app-form-field">\r\n            <label for="ms-movie-id">Film</label>\r\n            <input type="text" class="medium" id="ms-movie-id" placeholder="Wybierz film">\r\n        </div>\r\n\r\n        <div class="app-form-field">\r\n            <label for="ms-client-id">Klient</label>\r\n            <input type="text" class="medium" id="ms-client-id" placeholder="Wybierz klienta">\r\n        </div>\r\n\r\n        <div class="app-form-submit">\r\n            <button type="submit" class="btn">Zapisz</button>\r\n            ';
 if(!this.model.isNew()) { ;
__p += '\r\n            <button type="button" class="btn special delete">Zwróć</button>\r\n            ';
 } ;
__p += '\r\n        </div>\r\n    </form>\r\n</div>';

}
return __p
};

this["JST"]["rentListItemTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li>\r\n    <span class="title">' +
((__t = ( movie_title )) == null ? '' : __t) +
'</span>\r\n    <span class="client">\r\n        <i class="fa fa-user"></i>' +
((__t = ( client_name )) == null ? '' : __t) +
'\r\n    </span>\r\n    <span class="date">\r\n        <i class="fa fa-calendar"></i>' +
((__t = ( APP.Utils.formatDate(date) )) == null ? '' : __t) +
'\r\n    </span>\r\n    <span class="btn-rounded details">\r\n        <i class="fa fa-search"></i>\r\n    </span>\r\n</li>';

}
return __p
};

this["JST"]["statisticsWidgetTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class="app-status-item"><i class="fa fa-film"></i> Filmów <strong>' +
((__t = ( movies )) == null ? '' : __t) +
'</strong></span>\r\n<span class="app-status-item"><i class="fa fa-thumbs-o-up"></i> Wypożyczeń<strong>' +
((__t = ( rents )) == null ? '' : __t) +
'</strong></span>\r\n<span class="app-status-item"><i class="fa fa-user"></i> Klientów <strong>' +
((__t = ( clients )) == null ? '' : __t) +
'</strong></span>';

}
return __p
};