
var url = 'http://www.baidu.com';

var cheerio = require('cheerio'),
	request = require('request'),
	Promise = require('promise');


// var arr = []

// request('http://www.baidu.com', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//   	var $ = cheerio.load(body);
//   	var links = $('a');

// 	links.each(function(i, elem) {
// 	 	arr[i] = {}
// 	 	arr[i].name = $(this).text();
// 	  arr[i].link = $(this).attr('href');
// 	});
// 	console.log(arr);
//   }
// })


var urlArr = ['http://www.baidu.com', 'http://www.163.com/'];

var arrOut = [], arrIn = [];
var arrPromise = []

// arrPromise[0] = new Promise(function(resolve, reject) {
// 	request('http://www.baidu.com', function(err, res, body) {
// 		if(err) {
// 			reject(null);
// 		} else {
// 			var $ = cheerio.load(body);
// 		  	var links = $('a');
// 		  	var arr = []
// 			links.each(function(j, elem) {
// 			 	arr[j] = {}
// 			 	arr[j].name = $(this).text();
// 			  arr[j].link = $(this).attr('href');
// 			});
// 			arrOut[0] = arr;
// 			resolve(null)
// 		}
// 	})
// })

// arrPromise[1] = new Promise(function(resolve, reject) {
// 	request('http://www.163.com', function(err, res, body) {
// 		if(err) {
// 			reject(null);
// 		} else {
// 			var $ = cheerio.load(body);
// 		  	var links = $('a');
// 		  	var arr = []
// 			links.each(function(j, elem) {
// 			 	arr[j] = {}
// 			 	arr[j].name = $(this).text();
// 			  arr[j].link = $(this).attr('href');
// 			});
// 			arrOut[1] = arr;
// 			resolve(null)
// 		}
// 	})
// })

for (var i = urlArr.length - 1; i >= 0; i--) {
	(function(index) {
		arrPromise[index] = new Promise(function(resolve, reject) {
			request(urlArr[i], function(err, res, body) {
				if(err) {
					reject(null);
				} else {
					var $ = cheerio.load(body);
				  	var links = $('a');
				  	var arr = []
					links.each(function(j, elem) {
					 	arr[j] = {}
					 	arr[j].name = $(this).text();
					  arr[j].link = $(this).attr('href');
					});
					arrOut[index] = arr;
					resolve(null)
				}
			})
		})
	})(i)
}

console.log(arrPromise)

Promise.all(arrPromise).then(function(posts) {
	console.log(arrOut)
}).catch(function(reason) {
	console.log(reason)
})
 


