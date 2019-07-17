import React, { Component }  from 'react';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Search from './components/Search';
import EditForm from './components/EditForm';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';



class App extends Component {
	constructor(props) {
		super(props)
	}	
	componentDidMount() {
    	const { store } = this.props;
    	this.unsubscribe = store.subscribe(() =>
      		this.forceUpdate(),
    	);
  	}
  
  	componentWillUnmount() {
    	this.unsubscribe();  
  	}

	render() {
		const state = this.props.store.getState();
		let data;
		if(state.searching) {
			data = state.filteredData;
		} else data = state.notes;

		return (
			<div>
				<Row>
      				<Col span={8} offset={8}>
      					<Search store={this.props.store} />
      					{state.editing ? 
      						(<EditForm store={this.props.store} />) : 
      						(<NoteForm store={this.props.store} />)
      					}
      					<Row type="flex" justify="space-between">
  							{data.length < 1 ? 
  								<h3>Нет заметок</h3> : 
  								(data.map(note =>							
									<Col span={11}>
										<Note 
											header={note.header} 
											message={note.noteText} 
											tag={note.tags} 
											id={note.id}
											key={note.id}
											date={note.date}
											store={this.props.store}
										/>
									</Col>
								))
							}  							 
      					</Row>		
					</Col>
    			</Row>				
			</div>
		)
	}
}

export default App