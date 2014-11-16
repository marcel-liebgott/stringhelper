/**
 * @author Marcel Liebgott <marcel@mliebgott.de>
 * @version 1.00
 *
 * this jQuery plugin helps you to work with text
 *
 * @require jQuery
 */
(function($){
	$.Stringhelper = {
		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * this function parsed your input text for links and replaced them with a clickable anchor-tag
		 *
		 * @param {String} input text, that will be parsed
		 * @return {String} replaced text
		 */
		parseTextReplaceUrlToLink: function(text){
			var resultString = "";
			var stringArray = text.split(/\s+/);
			var regexHttp = /^((http|https|ftp):\/\/)?([a-zA-Z0-9]+:[a-zA-Z0-9]+\@)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?$/g;
			var regexProtocol = /^((http|https|ftp):\/\/)/i;

			// check each word if that an verified link
			$.each(stringArray, function(key, value){
				if(regexHttp.test(value)){
					var protocol = "";

					if(!(regexProtocol.test(regexProtocol))){
						protocol = "http://";	
					}

					resultString += value.replace(regexHttp, "<a href='" + (protocol.length > 0 ? protocol : "") + value + "' target='_blank'>" + value + "</a> ");
				}else{
					resultString += value + " ";
				}
			});

			return resultString;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * this function parsed your text for mail links and replaces them with a clickable anchor-mail-link
		 *
		 * @param {String} input text, that will be parsed
		 * @return {String} replaced text
		 */
		parseTextReplaceMailToLink: function(text){
			var resultString = "";
			var stringArray = text.split(/\s+/);
			var regexMail = /^(mailto:)?([a-zA-Z0-9_.+~])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/g;
			var regexStartWithMailto = /^mailto:/i;

			// check each word if that an verified mail-link
			$.each(stringArray, function(key, value){
				if(regexMail.test(value)){
					var checkMailHrefMailto = value.match(regexStartWithMailto);
					var startMailHref = "mailto:";

					// when this mail starts with 'mailto' then set default prefix to null
					if(checkMailHrefMailto !== null){
						startMailHref = "";
					}

					resultString += value.replace(regexMail, "<a href='" + startMailHref + value + "'>" + value + "</a> ");
				}else{
					resultString += value + " ";
				}
			});

			return resultString;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * this function count words in your given text
		 *
		 * @param {String} input text
		 * @return {Integer} counted words
		 */
		countWords: function(text){
			return text.split(/\s+/).length;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * this function return the average word length of your text
		 *
		 * @param {String} input text
		 * @param {Integer} number of decimal places [optional, default = 2]
		 * @return {Float} average word length
		 */
		averageWordLength: function(text, decimal_places){
			if(typeof decimal_places == "undefined" || decimal_places === null){
				decimal_places = 2;
			}

			var punctuationCharacter = [',', '.', '!', '?', ':', '`', '\'', '#', ';', '-', '_', '*', '~', '+', '/', '\\', '=', '<', '>'];
			var countWords = this.countWords(text);
			var stringArray = null;
			var sumWordLength = 0;
			var averageWordLength = 0;

			// replace all special characters
			$.each(punctuationCharacter, function(key){
				text.replace(punctuationCharacter[key], '');
			});

			stringArray = text.split(/\s+/);

			$.each(stringArray, function(key, value){
				sumWordLength += value.length;
			});

			averageWordLength = sumWordLength / countWords;

			return averageWordLength.toFixed(decimal_places);
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * return your text upper case
		 *
		 * @param {String} input text
		 * @return {String} your text upper case
		 */
		toUpper: function(text){
			return text.toUpperCase();
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * return your text lower case
		 *
		 * @param {String} input text
		 * @return {String} your text lower case
		 */
		toLower: function(text){
			return text.toLowerCase();
		},

		/**
		 * @author Marcel Liebgott <marcel|mliebgott.de>
		 * @since 1.10
		 *
		 * return a integer random between 0 and {@see max}
		 *
		 * @param {Integer} maximum
		 * @return {Integer} random
		 */
		getIntRandom: function(max){
			if(typeof max === "undefined" || max === null){
				max = 10;
			}

			return (1 + Math.floor(Math.random() * max));
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * return a random string with integer and characters
		 *
		 * @param {Integer} length of random
		 * @param {Boolean} if true return string extends upper case characters too
		 * @param {String} random
		 */
		getIntStringRandom: function(length, caseSensitive){
			if(typeof length === "undefined" || length === null){
				length = 15;
			}

			if(typeof caseSensitive === "undefined" || caseSensitive === null){
				caseSensitive = true;
			}

			var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
			var upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			var randomString = '';

			if(caseSensitive){
				chars += upperChars;
			}

			for(var i = 0; i < length; i++){
				var idx = Math.floor(Math.random() * chars.length);
				randomString += chars.substring(idx, idx + 1);
			}

			return randomString;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * return a string random
		 *
		 * @param {Integer} length of random
		 * @param {Boolean} if true return string extends upper case characters too
		 * @param {String} random
		 */
		getStringRandom: function(length, caseSensitive){
			if(typeof length === "undefined" || length === null){
				length = 15;
			}

			if(typeof caseSensitive === "undefined" || caseSensitive === null){
				caseSensitive = true;
			}

			var chars = 'abcdefghijklmnopqrstuvwxyz';
			var upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			var randomString = '';

			if(caseSensitive){
				chars += upperChars;
			}

			for(var i = 0; i < length; i++){
				var idx = Math.floor(Math.random() * chars.length);
				randomString += chars.substring(idx, idx + 1);
			}

			return randomString;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * check if the url is valid
		 *
		 * @param {String} url string
		 * @return {Boolean} true if valid, else false
		 */
		validUrl: function(url){
			if(typeof url === "undefined" || url === null){
				return false;
			}

			var regexHttp = /^((http|https|ftp):\/\/)?([a-zA-Z0-9]+:[a-zA-Z0-9]+\@)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?$/g;

			return regexHttp.test(url);
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * check if the given mail is valid
		 *
		 * @param {String} mail string
		 * @return {Boolean} true if valid, else false
		 */
		validMail: function(mail){
			if(typeof mail === "undefined" || mail === null){
				return false;
			}

			var regexMail = /^(mailto:)?([a-zA-Z0-9_.+~])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/g;

			return regexMail.test(mail);
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * check if ip adress is confirm with version 4
		 *
		 * @param {String} ip adress
		 * @return {Boolean} true if valid, else false
		 */
		validIpV4: function(ip){
			if(typeof ip === "undefined" || ip == null){
				return false;
			}

			var regexIp4 = /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4]{0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4]{0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4]{0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4]{0-9]|25[0-5])$/g;

			return regexIp4.test(ip);
		},

		/**
		 * @author Marcel Liebgott
		 * @since 1.00
		 *
		 * check if ip adress is confirm with version 6
		 *
		 * @param {String} ip adress
		 * @return {Boolean} true if valie, else false
		 */
		validIpV6: function(ip){
			if(typeof ip === "undefined" || ip === null){
				return false;
			}

			var regexIp6 = /^([a-f0-9]{4}:){7}([a-f0-9]{4}){1}$/g;

			return regexIp6.test(ip);
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.1ß
		 *
		 * check if string starts with an substring
		 *
		 * @param {String} heystack
		 * @param {String} needle
		 * @return {Boolean} true if starts with, else false
		 */
		startsWith: function(str, substr){
			if(typeof substr === "undefined" || substr === null || typeof str === "undefined" || str === null){
				return false;
			}

			return str.substr(0, substr.length) === substr;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * check if string ends with an substring
		 *
		 * @param {String} heystack
		 * @param {String} needle
		 * @return {Boolean} true if starts with, else false
		 */
		endsWith: function(str, substr){
			if(typeof str === "undefined" || str === null || typeof substr === "undefined" || substr === null){
				return false;
			}

			return str.substr(str.length - substr.length, str.length) === substr;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.10
		 *
		 * this function parsed your text and find all defined keywords which you defined here and insert a link around this one
		 *
		 * @param {String} input text
		 * @param {String} categorie
		 * @return {String} replaced Text
		 */
		linkKeywords: function(text, cat){
			if(typeof text === "undefined" || text === null || typeof cat === "undefined" || cat === null){
				return null;
			}

			var keywords = [];
			keywords["php"] = {
				link: 'http://www.php.net',
				keywords: [
					'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class', 'clone', 'const', 'continue', 'declare', 
					'default', 'die', 'do', 'echo', 'else', 'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 
					'endwhile', 'eval', 'exit', 'extends', 'final', 'for', 'foreach', 'function', 'global', 'goto', 'if', 'implements', 'include', 
					'include_once', 'instanceof', 'insteadof', 'interface', 'isset', 'list', 'namespace', 'new', 'or', 'print', 'private', 
					'protected', 'public', 'require', 'require_once', 'return', 'static', 'switch', 'throw', 'trait', 'try', 'unset', 'use', 
					'var', 'while', 'xor'
				]
			};

			var _keywords = null;
			var _url = null;

			// 
			switch(cat){
				case "php":
						_keywords = keywords["php"].keywords;
						_url = keywords["php"].link;
					break;
			}

			var stringArray = text.split(/(?:\(|\)|\}|\{|\;|\s)+/g);

			$.each(stringArray, function(key, value){
				if($.inArray(value, _keywords) !== -1){
					text = text.replace(value, '<a href="' + _url + '/' + value + '" target="_blank">' + value + '</a>');
				}
			});

			return text;
		}
	};
})(jQuery);