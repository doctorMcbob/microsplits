// frontend tracker
window.onload = () => {
    
    const splits = document.getElementById("splits")
    let live = false
    let timer = 0
    
    function getSplits () {
	const json = {}
	const split_list = splits.getElementsByTagName("input")
	for (const split of split_list) {
	    json[split.value] = 0
	}
	return json
    }

    function getInput () {
	return {
	    game : document.getElementById("game").value,
	    category : document.getElementById("category").value,
	    splits : getSplits()
	}
    }
    
    document.getElementById("addsplit").onclick = (e) => {
	const li = document.createElement("li")
	const input = document.createElement("input")
	input.setAttribute("type", "text")
	li.appendChild(input)
	splits.appendChild(li)
    }

    document.getElementById("removesplit").onclick = (e) => {
	const split_list = splits.getElementsByTagName("li")
	const last = split_list[split_list.length - 1]
	last.parentNode.removeChild(last)
    }

    document.getElementById("reset").onclick = async function (e) {
	timer = 0
	live = false
	document.getElementById("timer").innerHTML = timer
    }

    document.getElementById("start").onclick = async function (e) {
	live = true
	const response = await axios.post("/tracker/new", getInput)
    }
}
