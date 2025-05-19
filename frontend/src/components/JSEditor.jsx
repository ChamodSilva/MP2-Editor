;import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript'; // Import language mode
import 'ace-builds/src-noconflict/theme-monokai'; // Import theme
import 'ace-builds/src-noconflict/ext-language_tools'; // Optional: for autocompletion

function JSEditor({ onChange, value}) {
    const [code, setCode] = useState('');

    const onChange = (newValue) => {
        setCode(newValue);
        console.log('Current code:', newValue);
    };

    return (
        <>
            <h3>Edit your code here:</h3>
            <AceEditor
                mode="javascript"
                theme="monokai"
                onChange={onChange}
                value={value}
                fontSize={14}
                width="100%"
                height="300px"
                showPrintMargin={false}
                enableLiveAutocompletion={true}
            />
        </>
    );
}

export default JSEditor;