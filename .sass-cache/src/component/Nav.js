import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';

class Nav extends React.Component {
	render() {
		return (
			<div className="Nav">
				<div className="navi">
					<img src="/img/title.png" alt="title"/>
				</div>
				<Bfore
					//renderState = {this.props.renderState}
					//backPage = {this.props.backPage.bind(this)}
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>
			</div>
		);
	}
}

Nav.propTypes = {
	//renderState: PropTypes.number.isRequired,
	//backPage: PropTypes.func.isRequired
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired
};

export default Nav;