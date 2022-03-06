var request = require('request');
const isbn = require('isbn3');

var defaultOptions = {
	ttbkey: null,
	itemIdType: 'ISBN13',
	itemid: null,
	Cover: 'Big',
	output: 'js',
	includekey: 0,
	version: '20131101'
};

var API_BASE_URL = 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx';

function setkey(ttbkey) {
	defaultOptions.ttbkey = ttbkey;
};

function itemlookup(itemid) {
	console.log("ISBN CHECK", isbn.audit(itemid).validIsbn);
	defaultOptions.itemid = itemid;

	var query = { uri: API_BASE_URL, qs: defaultOptions };

	function callback (error, response, body) {
		if (!error && response.statusCode == 200) {
			const info = JSON.parse(body)
			console.log(info.item[0].title);
		} else {
			console.log(error);
		}
	}

	request(query, callback);
};

module.exports = {
  init: setkey,
  itemlookup: itemlookup
}