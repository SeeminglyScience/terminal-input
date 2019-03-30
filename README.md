# Terminal Input

A very simple VSCode extension for setting key bindings that send custom input to the active terminal.

## Motivation

The main shell I use is PowerShell. The default key binding in PowerShell to add a new line to the prompt
without completing the command is <kbd>shift</kbd> + <kbd>enter</kbd>. In VSCode, this doesn't work and
the <kbd>shift</kbd> modifier is lost.

So the entire point of this extension is so that I can rebind <kbd>shift</kbd> + <kbd>enter</kbd> to
some other input that the integrated terminal *can* accept, and then handle it within [PSReadLine][1].

[1]: https://github.com/lzybkr/PSReadLine

## Fixing shift+enter for PowerShell

1. Add this to your [settings.json][2] file.

    ```json
    "terminal.integrated.commandsToSkipShell": [ "terminalInput.sendCustomInput" ],
    "terminalInput.customInputs": { "heartEmojiWithAlt": "\u001b\u2665" },
    ```

1. Add this to your [keybindings.json][3] file.

    ```json
    {
        "key": "shift+enter",
        "command": "terminalInput.sendCustomInput",
        "args": [ "heartEmojiWithAlt" ],
        "when": "terminalFocus"
    }
    ```

1. Add this to your [$profile.CurrentUserAllHosts][4] file.

    ```powershell
    if ($env:TERM_PROGRAM -eq 'vscode') {
        Set-PSReadLineKeyHandler -Chord "alt+$([char]0x2665)" -Function AddLine
    }
    ```

[2]: https://code.visualstudio.com/docs/getstarted/settings
[3]: https://code.visualstudio.com/docs/getstarted/keybindings
[4]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles
