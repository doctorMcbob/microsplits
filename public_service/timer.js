const InputEvent = require('input-event')
const input = new InputEvent('/dev/input/event4') // My keyboard 
const keyboard = new InputEvent.Keyboard(input)

class Timer {
    constructor(keyboard, split_key, reset_key) {
	this.milliseconds = 0,
	this.play = false,
	this.interval = setInterval(() => {
	    if (this.play) {
		this.milliseconds += 100
	    }
	}, 100),
	this.keyboard =  keyboard,
	this.split_key = split_key
	this.reset_key = reset_key
	this.keyboard.on('keydown', (event) => {
	    if (event.code == this.split_key) {
		this.play = true
		this.split()
	    }
	    if (event.code == this.reset_key) {
		this.play = false
		this.milliseconds = 0
	    }
	})
	this.splits = null
	this.split_idx = 0
    }

    set_splits (json) {
	this.splits = json
    }

    on_split (func) {
	this._on_split = func
    }

    _on_split(json) {}

    split () {
	if (this.splits == null) { return false }
	
	var json = {
	    run   : this.splits.run,
	    name  : this.splits.split_names[this.split_idx],
	    order : this.split_idx,
	    time  : this.milliseconds
	}
	this.split_idx += 1
	this._on_split(json)

	
	if (this.split_idx <= this.splits.split_names.length) {
	    this.play = false
	}
    }
}

module.exports = new Timer(keyboard, 111, 109)

