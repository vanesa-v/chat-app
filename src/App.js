import { Component } from "react";
import React from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input"


function randomAnimal() {
	const animals = [
		"bear",
		"cat",
		"chicken",
		"dog",
		"fish",
		"fox",
		"giraffe",
		"koala",
		"meerkat",
		"panda",
		"rabbit",
		"seal",
		"snake",
		"wolf"
	];

	const animal = animals[Math.floor(Math.random() * animals.length)];
	return animal;
}

function randomName(animal) {
	const adjectives = [
		"autumn",
		"hidden",
		"bitter",
		"misty",
		"silent",
		"empty",
		"dry",
		"dark",
		"summer",
		"icy",
		"delicate",
		"quiet",
		"white",
		"cool",
		"spring",
		"winter",
		"patient",
		"twilight",
		"dawn",
		"crimson",
		"wispy",
		"weathered",
		"blue",
		"billowing",
		"broken",
		"cold",
		"damp",
		"falling",
		"frosty",
		"green",
		"long",
		"late",
		"lingering",
		"bold",
		"little",
		"morning",
		"muddy",
		"old",
		"red",
		"rough",
		"still",
		"small",
		"sparkling",
		"throbbing",
		"shy",
		"wandering",
		"withered",
		"wild",
		"black",
		"young",
		"holy",
		"solitary",
		"fragrant",
		"aged",
		"snowy",
		"proud",
		"floral",
		"restless",
		"divine",
		"polished",
		"ancient",
		"purple",
		"lively",
		"nameless",
	];

	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	return adjective + animal;
}

class App extends Component {
	randomAnimal = randomAnimal();
	state = {
		messages: [],
		member: {
			username: randomName(this.randomAnimal),
			animalAvatar: this.randomAnimal
		}
	}

	constructor() {
		super();
		this.drone = new window.Scaledrone("JdvGvSLfZ02HbvSW", {
			data: this.state.member
		});
		this.drone.on("open", error => {
			if (error) {
				return console.error(error);
			}
			const member = { ...this.state.member };
			member.id = this.drone.clientId;
			this.setState({ member });
		});

		const room = this.drone.subscribe("observable-room");

		room.on("data", (data, member) => {
			const messages = this.state.messages;
			messages.push({ member, text: data });
			this.setState({ messages });
		});
	}

	onSendMessage = (message) => {
		this.drone.publish({
			room: "observable-room",
			message
		});
	}

	render() {
		return (
			<div className="App">
				<h1>Chit-Chat App</h1>
				<Messages
					messages={this.state.messages}
					currentMember={this.state.member}
				/>
				<Input
					onSendMessage={this.onSendMessage}
				/>
			</div>
		);
	}
};

export default App;
