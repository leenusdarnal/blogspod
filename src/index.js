import React from 'react';
import ReactDOM from 'react-dom';
import Main from './component/Main';

import 'alloyeditor/dist/alloy-editor/assets/alloy-editor-atlas-min.css';
import './styles/styles.scss';

// window.ALLOYEDITOR_BASEPATH = 'alloyeditor/';
// window.CKEDITOR_BASEPATH = 'alloyeditor/';

ReactDOM.render(<Main />, document.getElementById('root'));
