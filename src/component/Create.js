import React , {Component} from "react";
import {EditorState , RichUtils} from "draft-js";
import Editor from "draft-js-plugins-editor"
import createhighlightPlugin from "./highlightPlugin" 
import "../styles/component/create.css"

const highlightPlugin = createhighlightPlugin();

class Create extends Component{
    constructor(props){
        super(props);
        this.state = {
            editorState : EditorState.createEmpty()
        };

        this.plugins = [ highlightPlugin,
        ];
    }
    onChange = (editorState) => {
        this.setState({
            editorState
        })
    }
    
    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState,command);

        if(newState){
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';

    } 

    onItalicClick = () =>{
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }
    onBoldClick = () =>{
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    onUnderlineClick = () =>{
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    onHighlightClick = () =>{
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'));
    }
    
    render(){

        return(
        <div className="editorContainer">
            <button className="styleBtn" onClick= {this.onItalicClick}>    <em>I</em>  </button>
            <button className="styleBtn" onClick= {this.onBoldClick}>      <em>B</em>  </button>
            <button className="styleBtn" onClick= {this.onUnderlineClick}> <em>U</em>  </button>
            <button className="styleBtn" onClick= {this.onHighlightClick}> <em>H</em>  </button>
            <div className="editor">
                <Editor
                    editorState = {this.state.editorState}
                    handleKeyCommand = {this.handleKeyCommand}
                    onChange = { this.onChange}
                    plugins = {this.plugins}
                />
            </div>
        </div>)
    }
}
export default Create;