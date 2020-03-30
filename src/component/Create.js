import React from 'react';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './Tools';

export default class Create extends React.Component {
    state = {
        // data:"i am the best"
    }
    // async handleSave() {
    //     const savedData = await this.editorInstance.save();
    // }
    render() {
        return (
            <div>
                this is the create tab
                {/* <EditorJs holder="customEditor" tools={EDITOR_JS_TOOLS} > */}
                <EditorJs
                    autofocus
                    // holder="editorjs-container"
                    excludeDefaultTools={['header']}
                    onChange={() => console.log('Something is changing!!')}
                    onData={(data) => console.log(data)}
                    tools={EDITOR_JS_TOOLS}
                    // customTools={{
                    //     header: "CustomHeader"
                    // }}
                    onReady={() => console.log('Start!')}
                    data={{
                        "time": 1554920381017,
                        // "blocks": [
                        //     {
                        //         "type": "header",
                        //         "data": {
                        //             "text": "Hello Editor.js",
                        //             "level": 2
                        //         }
                        //     },
                        // ],
                        "version": "2.12.4"
                    }}
                />
                {/* <div id="customEditor" /> */}
                {/* </EditorJs> */}
                the button
            </div >
        )
    }
}