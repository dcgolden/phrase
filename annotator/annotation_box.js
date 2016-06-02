var type = "";
//return an object encompassing what the user highlighted (if it exists)
function getSelectedRange() {
	if (typeof window.getSelection != "undefined") return window.getSelection();
	return null;
}
//show annotation box
function box(e) {
	var sel = getSelectedRange();
	if (sel.toString()) { //check if selection is text
		var x = e.clientX, y = e.clientY; //get x and y coordinates of mouse position
		//set coordinates of box to coordinates of mouseclick
		var div = document.getElementById("marker");
		div.style.left = x;
		div.style.top = y;
		//if the highlighted text is already stylized, make the background of the corresponding buttons darker
		type = sel.anchorNode.parentNode.className;
		document.getElementById("b_button").style.backgroundColor = (sel.anchorNode.parentNode.className.indexOf("bold")==-1?"transparent":"#C8C8C8");
		document.getElementById("i_button").style.backgroundColor = (sel.anchorNode.parentNode.className.indexOf("italics")==-1?"transparent":"#C8C8C8");
		document.getElementById("u_button").style.backgroundColor = (sel.anchorNode.parentNode.className.indexOf("underline")==-1?"transparent":"#C8C8C8");
		document.getElementById("h_button").style.backgroundColor = (sel.anchorNode.parentNode.className.indexOf("highlight")==-1?"transparent":"#C8C8C8");
		div.style.display = "inherit"; //make box visible
	}
	else document.getElementById("marker").style.display = "none"; //if selection isn't text, hide box
}
//add style annotation to text
function stylize(newtype) { //newtype is what kind of style (bold, italics, underline, highlight)
	var sel = getSelectedRange();
	var node = sel.anchorNode.parentNode; //sel's anchorNode is a Text object, so we use .parentNode to get the <span> it's in
	var range = sel.getRangeAt(0);
	/* If the text isn't already stylized:
	- Create 3 dummy nodes: 1 for the text before the highlight, 1 for the highlighted text, 1 for the text after the highlight
	- Add appropriate substrings from the parent span's innerHTML to the spans
	- Make the before and after spans stylized if the highlighted portion is already stylized, otherwise make the highlighted portion stylized
	- Replace the parent span with the "after" span, then add the "mid" span before that and the "before" span before that
	Otherwise:
	- Remove the style from the node
	- Check bordering nodes to see if they're stylized similarly, and remove the style if they are
	*/
	if (type.indexOf(newtype)==-1) {
		var before = document.createElement("span");
		before.innerHTML = node.innerHTML.substring(0,range.startOffset);
		var mid = document.createElement("span");
		mid.innerHTML = node.innerHTML.substring(range.startOffset,range.endOffset);
		var after = document.createElement("span");
		after.innerHTML = node.innerHTML.substring(range.endOffset);
		mid.className = (type==""?"":type+" ")+newtype;
		before.className = after.className = type;
		var stuff = node.parentNode;
		stuff.replaceChild(after,node);
		stuff.insertBefore(mid,after);
		stuff.insertBefore(before,mid);
	}
	else {
		removeFormat(node, newtype);
		removeFormatNeighbor(node, newtype, true);
		removeFormatNeighbor(node, newtype, false);
	}
	document.getElementById("marker").style.display = "none"; //hide box
}
function addComment() {
	var commentBox = document.getElementById("commentBox");
	var annotBox = document.getElementById("marker");
	commentBox.style.top = annotBox.style.top;
	commentBox.style.left = annotBox.style.left;
	annotBox.style.display = "none";
	commentBox.style.display = "inherit";
}
function removeFormat(node, newtype) {
	node.className = node.className.substring(0,node.className.indexOf(newtype)) + node.className.substring(node.className.indexOf(newtype)+newtype.length);
}
function removeFormatNeighbor(node, newtype, prev) {
	if (prev) {
		if (node.previousSibling.className.indexOf(newtype)!=-1) {
			removeFormat(node.previousSibling, newtype);
			removeFormatNeighbor(node.previousSibling, newtype, prev);
		}
	}
	else {
		if (node.nextSibling.className.indexOf(newtype)!=-1) {
			removeFormat(node.nextSibling, newtype);
			removeFormatNeighbor(node.nextSibling, newtype, prev);
		}
	}
}
document.onmouseup = box; //every time the user mousedowns, run the box() method on mouseup