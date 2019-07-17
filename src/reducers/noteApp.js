const noteApp = (state = {notes: [], editing: false, editingNote: null, searching: false, filteredData: []}, action) => {
	switch(action.type) {
		case 'ADD_NOTE':
			return {
				...state,
				notes: [action.note, ...state.notes]
			}
		case 'DELETE_NOTE':			
			return  {
				...state,
				notes: deleteNote(state.notes, action.id)
			}
		case 'EDIT_NOTE':
			return { 
				...state,
				editing: true, 
				editingNote: state.notes.find(note => note.id === action.id)
			}
		case 'ADD_EDITED_NOTE':
			return {
				...state, 
				notes: [action.note, ...deleteNote(state.notes, action.note.id)], 
				editing: false
			}
		case 'SEARCH':
			return {
				...state, 
				searching: !!action.str, //приведение к типу boolean
				filteredData: filterData(state.notes, action.str)
			}
		default: 
			return state;
	}
}

function deleteNote(notes, id) {
  if(!notes) {
    return undefined;
  }
  const foundElement = notes.find(note => note.id === id);
  if(foundElement === undefined) {
    return notes;    
  } 
  let newNotes = [...notes];
  const indexOfFoundElement = newNotes.indexOf(foundElement);
  newNotes.splice(indexOfFoundElement, 1);
  return newNotes;
}

function filterData(notes, str) {
	if(str) {
		const filteredNotes = notes.filter((note) => {
            return note.header.indexOf(str) >= 0 
            || note.noteText.indexOf(str) >= 0 
            || note.tags.filter((tag) => tag.indexOf(str) >= 0).length > 0;
        })
        return filteredNotes;
	} else return notes;
}


export default noteApp 

