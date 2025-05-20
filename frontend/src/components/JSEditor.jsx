import { useState } from 'react';
import AceEditor from 'react-ace';
import { FormControlLabel, Switch, Box } from '@mui/material';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/keybinding-vim';

function JSEditor({ onChange, value })
{
    // State to control Vim mode
    const [isVimModeEnabled, setIsVimModeEnabled] = useState(false);

    // Function to toggle Vim mode
    function handleVimModeToggle(event)
    {
        setIsVimModeEnabled(event.target.checked);
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <h3>Edit your code here:</h3>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isVimModeEnabled}
                            onChange={handleVimModeToggle}
                            name="vimModeToggle"
                            color="primary"
                        />
                    }
                    label="Vim Mode"
                />
            </Box>
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
                keyboardHandler={isVimModeEnabled ? "vim" : null}
            />
        </>
    );
}

export default JSEditor;
