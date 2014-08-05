/*
code secrets. copy to secrets.js, modify values, but don't commit.
*/
function secrets(){

	var secrets = { 
		db_name : "audio_collector",
		port: 1340,
		prod_port : 1340
	};

	return secrets;

}

module.exports.secrets = secrets;