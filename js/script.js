$(document).ready(function(){
	var sourceText = $('#source').html();

	var replacedText = $.Stringhelper.parseTextReplaceUrlToLink(sourceText);
	replacedText = $.Stringhelper.parseTextReplaceMailToLink(replacedText);

	var countWords = $.Stringhelper.countWords(sourceText);
	var averageWordLength = $.Stringhelper.averageWordLength(sourceText);
	var random = $.Stringhelper.getIntRandom(15);
	var getIntStringRandom = $.Stringhelper.getIntStringRandom(15);
	var getStringRandom = $.Stringhelper.getStringRandom(15);
	var checkUrl1 = $.Stringhelper.validUrl("www.google.de");
	var checkUrl2 = $.Stringhelper.validUrl("bla@google.de");
	var checkMail1 = $.Stringhelper.validMail("marcel@mliebgott.de");
	var checkMail2 = $.Stringhelper.validMail("test@.de");
	var checkIp4_1 = $.Stringhelper.validIpV4("192.168.0.1");
	var checkIp4_2 = $.Stringhelper.validIpV4("256.192.260.300");
	var checkIp6_1 = $.Stringhelper.validIpV6("2001:0db8:85a3:08d3:1319:8a2e:0370:7344");
	var checkIp6_2 = $.Stringhelper.validIpV6("2001:0gb8:85a3:08d3:1319:8a2e:0370:7344");
	var startswith1 = $.Stringhelper.startsWith("Marcel Liebgott", "Marcel");
	var startswith2 = $.Stringhelper.startsWith("Marcel Liebgott", "test");
	var endswith1 = $.Stringhelper.endsWith("Marcel Liebgott", "Liebgott");
	var endswith2 = $.Stringhelper.endsWith("Marcel Liebgott", "test");
	var linkKeywords = $.Stringhelper.linkKeywords("echo 'test'; if($test == 'test') break", "php");

	$('#target').html(replacedText);
	$('#statCountWords').html(countWords);
	$('#statAverageWordLength').html(averageWordLength);
	$('#random').html(random);
	$('#randomIntString').html(getIntStringRandom);
	$('#randomString').html(getStringRandom);
	$('#validUrl1').html(checkUrl1 ? "true" : "false");
	$('#validUrl2').html(checkUrl2 ? "true" : "false");
	$('#validMail1').html(checkMail1 ? "true" : "false");
	$('#validMail2').html(checkMail2 ? "true" : "false");
	$('#validIp4_1').html(checkIp4_1 ? "true" : "false");
	$('#validIp4_2').html(checkIp4_2 ? "true" : "false");
	$('#validIp6_1').html(checkIp6_1 ? "true" : "false");
	$('#validIp6_2').html(checkIp6_2 ? "true" : "false");
	$('#startswith1').html(startswith1 ? "true" : "false");
	$('#startswith2').html(startswith2 ? "true" : "false");
	$('#endswith1').html(endswith1 ? "true" : "false");
	$('#endswith2').html(endswith2 ? "true" : "false");
	$('#linkKeywords').html(linkKeywords);
});