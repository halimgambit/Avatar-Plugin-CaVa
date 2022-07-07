exports.action = function(data, callback){

	let client = setClient(data);

	info("CaVa from:", data.client, "To:", client);
	cava (data, client);
	callback();

}

function cava (data, client) {

	Avatar.askme("je vais bien, et vous?|Ca va bien, et vous ?|Comme d'habitude, et vous ?", data.client, {
	'comme d\'habitude': 'good',
	'ca vas': 'good',
	'Moi je vais bien, merci': 'good',
	'tranquille': 'good',
	'je ne suis pas de bon humeur': 'bad',
	'Moi je ne vais pas bien': 'bad',
	'pas très bien': 'bad',
	'ca va pas': 'bad',
	'terminer': 'done'
	},0, function (answer,end) {
	end(data.client, true);

	if (!answer) {
	end(client);
	return Avatar.speak("Recommence je n'ai rien entendue", data.client, function(){
	cava (data, client);
	});
}
	switch(answer) {
	case "good":
	Avatar.speak('Je suis content pour vous|Ah super pour vous|Ah Super, n\'hésitez pas à soliciter mon aide', data.client,function(){
	end(data.client, true);
	});
	break;
	case "bad":
	Avatar.speak('Je suis désolé pour vous|dommage pour vous|Ah mince, n\'hésitez pas à soliciter mon aide', data.client,function(){
	end(data.client, true);
	});
	break;
	case "done":
    default:
    Avatar.speak("Terminé, a bientot", data.client, function(){
    end(data.client, true);
    });
}
	});
}

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}