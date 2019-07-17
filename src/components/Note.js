import React, { Component }  from 'react';
import 'antd/dist/antd.css';
import { Icon, Button, Card, Popover, Tag } from 'antd';
import './note.css';
import moment from 'moment';


class Note extends Component {
	constructor(props) {
		super(props)

	}
	
	render() {
		const popoverContent = (
			<div>				
				<Button 
					type="link"
					onClick={() => this.props.store.dispatch({
						type: 'DELETE_NOTE',
						id: this.props.id
					})}					
				>Удалить
				</Button><br />
				<Button 
					type="link"
					onClick={() => this.props.store.dispatch({
						type: 'EDIT_NOTE',
						id: this.props.id
					})}
				>
					Редактировать
				</Button>
			</div>
		);
		
		return (
			<div style={{ marginBottom: '10px' }}>				
				<Card
					title={this.props.header} 
					style={{ wordWrap: 'break-word' }}
					extra={
						<Popover 
							content={popoverContent} 
							placement="bottom"
						>
							<Icon 
								type="more" 
								style={{ fontSize: '2em'}} 
								rotate="90"
								className="moreIcon"
							/>
						</Popover>
					} 					
				>
			    	<p>{this.props.message}</p>
			    	{this.props.tag.map(tag => (<Tag color="red">{tag}</Tag>))}
			      	<span className="date">{moment(this.props.date).format('LTS')}</span>
			    </Card>
			</div>
		)
	}
}

export default Note