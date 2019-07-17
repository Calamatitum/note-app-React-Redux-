import React, { Component }  from 'react';
import 'antd/dist/antd.css';
import { Tag, Input, Tooltip, Icon, Button } from 'antd';
import './noteForm.css';

class EditForm extends Component {
	constructor(props) {
		super(props);

		const state = this.props.store.getState();
		this.state = {
	        header: state.editingNote.header,
	        noteText: state.editingNote.noteText,
	    	tags: state.editingNote.tags,
	    	id: state.editingNote.id,
	    	inputVisible: false,
	    	inputValue: '',
	    	editing: true,
	    	headerIsInvalid: false,
  		};
	}

	handleClose = removedTag => {
    	const tags = this.state.tags.filter(tag => tag !== removedTag);
    	console.log(tags);
    	this.setState({ tags });
  	};

  	showInput = () => {
    	this.setState({ inputVisible: true }, () => this.input.focus());
  	};

  	handleInputChange = e => {
    	this.setState({ inputValue: e.target.value });
  	};

  	handleInputConfirm = () => {
    	const { inputValue } = this.state;
    	let { tags } = this.state;
    	if (inputValue && tags.indexOf(inputValue) === -1) {
      		tags = [...tags, inputValue];
    	}
    	console.log(tags);
    	this.setState({
	      	tags,
	      	inputVisible: false,
	      	inputValue: '',
    	});
  	};

    handleEdit() {
    	let noSpaces = this.state.header.replace(/\s/g, '');

    	if(!noSpaces) { //если не строка, т.е. пустая строка, не имеет символов
      		this.setState({headerIsInvalid: true});
    	} else {
        	this.props.store.dispatch({
		        type: 'ADD_EDITED_NOTE',
		        note: {
			        header: this.state.header,
			        noteText: this.state.noteText,
			        tags: this.state.tags,
			        id: this.state.id, 
			        date: new Date()
	        	}
        	});
	        this.setState({
			    header: '', 
			    noteText: '', 
			    tags: [],
	      	});
   		}
    }

	render() {
		const { TextArea } = Input;    
		const { tags, inputVisible, inputValue } = this.state;
		return (
			<div style={{ marginBottom: "30px"}}>
				<Input 
			        onChange={(e) => this.setState({header: e.target.value})}
			        allowClear 
			        style={{ margin: "5px 0"}}
          			className={this.state.headerIsInvalid && "inputHeaderIsInvalid"}
			        value={this.state.header}
			        name="header"
        		/>
				<TextArea 
		            rows={4}
		            onChange={(e) => this.setState({noteText: e.target.value})}
		            className="noteFormElement"
		            value={this.state.noteText}
		            name="noteText"
        		/>
				<div className="noteFormElement">
		        	{tags.map((tag, index) => {
		          		const isLongTag = tag.length > 20;
		          		const tagElem = (
            				<Tag 
				                key={tag} 
				                closable={index !== 0} 
				                onClose={() => this.handleClose(tag)}
              				>
              					{isLongTag ? `${tag.slice(0, 20)}...` : tag}
            				</Tag>
          				);
          				return isLongTag ? (
            				<Tooltip 
				                title={tag} 
				                key={tag}
              				>
              					{tagElem}
            				</Tooltip>
          				) : (
            				tagElem
          				);
        			})}
        			{inputVisible && (
          				<Input
              				ref={input => this.input = input}
					        type="text"
					        size="small"
					        style={{ width: 78 }}
					        value={inputValue}
					        onChange={this.handleInputChange}
					        onBlur={this.handleInputConfirm}
					        onPressEnter={this.handleInputConfirm}
            			/>
        			)}
        			{!inputVisible && (
          				<Tag 
              				onClick={this.showInput} 
              				style={{ background: '#fff', borderStyle: 'dashed' }}
            			>
            				<Icon type="plus" /> Новый тэг
          				</Tag>
        			)}
      			</div>
      			<Button 
         			type="primary" 
          			size="large" 
          			className="noteFormElement"
          			onClick={this.handleEdit.bind(this)}
        		>
          			Сохранить изменения
        		</Button>
			</div>
		)
	}
}

export default EditForm