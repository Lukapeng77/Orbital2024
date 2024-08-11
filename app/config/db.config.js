module.exports = {
	url: process.env.MONGODB_URI || 'mongodb+srv://pziyi86:20020805@cluster0.cfe5q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
	//'mongodb://localhost:27017/suppeer1'
	};

	/*const mongoose = require("mongoose");
	const config = require("dotenv").config();
	
	async function connect() {
	  const dbUri = process.env.MONGODB_URI || "mongodb+srv://Luka:Pzy20020805%24@atlascluster.tzw9tmr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
	
	  try {
		await mongoose.connect(dbUri);
		console.log("DB Connect");
	  } catch (error) {
		console.log(error);
		process.exit(1);
	  }
	}
	
	module.exports = connect;*/
	