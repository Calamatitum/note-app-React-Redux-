import React, { Component }  from 'react';
import 'antd/dist/antd.css';
import { Divider, Input } from 'antd';

class Search extends Component {
	constructor(props) {
		super(props)

		this.state = {
			searchValue: '',
		}
	}

	handleChange(e) {
		this.setState({
			searchValue: e.target.value
		});
		this.props.store.dispatch({
        	type: 'SEARCH',        
          	str: e.target.value,
   		})
	}


	render() {
		const { Search } = Input;

		return (
			<div>
				<Search
			      	placeholder="Поиск"
			      	value={this.state.searchValue}
			      	size="large"
					onChange={this.handleChange.bind(this)}
			      	style={{
			      		width: '40%', 
			      		float: 'right', 
			      		marginBottom: '10px', 
			      		marginTop: '10px' 
			      	}}
			    />
			    <Divider />
		    </div>
		)
	}
}

export default Search

