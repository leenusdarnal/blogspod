import { RichUtils } from 'draft-js'

export default () =>{
    return {
        customStyleMap :{
            HIGHLIGHT : {
                background : "#fffe0d"
            }
        },
        keyBindingFn :  e =>{
            if(e.ctrlKey && e.key === 'h'){
                return "highlight";
            }
        },

        handleKeyCommand : (command ,editorState ,_eventTimeStamp,{setEditorState}) =>{
            
            if(command === "highlight"){
                setEditorState(RichUtils.toggleInlineStyle(editorState,"HIGHLIGHT"));
                return true;
            }
        }
    };
} ;