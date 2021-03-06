import React from 'react';
import axios from 'axios';

import Select from './component/Select';

class App extends React.Component {

	state = {
		react_url: '',
		server_url: '',
		currentPage: 'Logo',
		user_info: null, // { name, email, ... }
		user_type: null  // 'none', 'host', 'target'
	};

	set_user = (user_info, user_type) => {
		if (user_type != 'target')
		user_info.level = 1;
		user_info.score = 4;
		this.setState({
			user_info: user_info,
			user_type: user_type
		});
	}

	update_target = (target_number, target) => {
		let user_info = this.state.user_info;
		if (target_number == 1) user_info.target1 = target;
		if (target_number == 2) user_info.target2 = target;
		this.setState({
			user_info: user_info
		});
	}

	goto = (page = 'prev') => {
		let prevPages = {
			'Logo': 'Logo',
			'Start': 'Logo',
			'Popup': 'Start',
			'Login': 'Start',
			'RegisterHost': 'Start',
			'ManageTarget': 'Start',
			'Home': 'Start',
			'Game': 'Home'
		};
		let currentPage = 'Logo';
		let prevPage = 'Logo';

		if (prevPages[page]) {
			currentPage = page;
			prevPage = prevPages[page];
		} else if (prevPages[this.state.currentPage]) {
			currentPage = prevPages[this.state.currentPage];
			prevPage = prevPages[prevPages[this.state.currentPage]];
		}

		this.setState({
			currentPage: currentPage,
		});
	}

	componentDidMount() {
		let react_url  = 'http://' + window.location.hostname + ':3000';
		let server_url = 'http://' + window.location.hostname + ':5000';
		axios.post(server_url + '/id' + window.location.pathname).then(response => {
			let jsondata = JSON.parse(response.data.target);
			let user_type;
			console.log(jsondata);
			if (jsondata == null) {
				jsondata = {
					name: 'user' + String('0000' + Math.floor(Math.random() * 9999)).substr(-4),
					level: 1,
					score: 4,
					hashed: 'unknown'
				};
				user_type = 'none';
			} else {
				user_type = 'target';
			}
			console.log('user type is ' + user_type);
			this.setState({
				react_url: react_url,
				server_url: server_url,
				user_info: jsondata,
				user_type: user_type
			});
		});
	}
	render() {
		if (this.state.user_type == null)
			return null;
		return (
			<div className = "component">
				<Select
				react_url = {this.state.react_url}
				server_url = {this.state.server_url}
				currentPage = {this.state.currentPage}
				goto = {this.goto.bind(this)}
				set_user = {this.set_user.bind(this)}
				update_target = {this.update_target.bind(this)}
				user_info = {this.state.user_info}
				user_type = {this.state.user_type}
				/>
			</div>
		);
	}
}

export default App;