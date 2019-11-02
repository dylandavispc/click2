import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import DimensionsProvider from './DimensionsProvider';
import SoundfontProvider from './SoundfontProvider';


class InteractiveDemo extends React.Component {
  state = {
    inputList: [],
    config: {
      instrumentName: 'ocarina',
      noteRange: {
        first: MidiNumbers.fromNote('c4'),
        last: MidiNumbers.fromNote('f5'),
      },
      keyboardShortcutOffset: 0,
    },
  };

  resetNotesInput = () => {
    this.setState({
        inputList: []
    });
  }

  finishSong = () => {
    alert("SONG COMPLETE")
    this.resetNotesInput();
  };

  wrongKey = () => {
    alert("INCORRECT NOTE")
    this.resetNotesInput();
  }

  // Note Handler Function
  onStopNoteInput = midiNumber => {
    let key = this.state.inputList
    let songIndex = this.props.song
    key.push(midiNumber)

    for (let i=0; i < key.length; i++) {
        // Function upon Song Completion
        if (key[i] === songIndex[i] && key.length === songIndex.length) {
            this.finishSong();
            break;
        }
        // Function upon Correct Note
        else if (key[i] === songIndex[i]) {
            console.log(key)
        } 
        // Function upon Incorrect Note
        else {
            this.wrongKey();
            break;
        }
    }
  };

  render() {
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: this.state.config.noteRange.first + this.state.config.keyboardShortcutOffset,
      lastNote: this.state.config.noteRange.last + this.state.config.keyboardShortcutOffset,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
      <SoundfontProvider
        audioContext={this.props.audioContext}
        instrumentName={"ocarina"}
        hostname={this.props.soundfontHostname}
        render={({ isLoading, playNote, stopNote, stopAllNotes }) => (
          <div>
            <div className="text-center">
              <p className="">Play by clicking notes or using keyboard:</p>

            </div>
            <div className="mt-4">
              <DimensionsProvider>
                {({ containerWidth }) => (
                  <Piano
                    noteRange={this.state.config.noteRange}
                    keyboardShortcuts={keyboardShortcuts}
                    playNote={playNote}
                    stopNote={stopNote}
                    disabled={isLoading}
                    width={containerWidth}
                    onStopNoteInput={this.onStopNoteInput}
                  />
                )}
              </DimensionsProvider>
            </div>
            <div className="row mt-5">
            </div>
          </div>
        )}
      />
    );
  }
}

export default InteractiveDemo;