console.log('TOC folding script loaded')

document.querySelector("#collapseAll").onclick = function collapseAllButFirstLevel() {
    let lists = document.querySelectorAll('ul');
    console.log(lists);
	for (let i = 1; i < lists.length; i++) {
        lists[i].style.display = 'none';
	}
}

let listItems = document.querySelectorAll('li');

for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', function() {
        expandChildren(this);
    })
}

function expandChildren(el) {
	let lists = el.getElementsByTagName('ul');
    for (let i = 0; i < lists.length; i++) {
		lists[i].style.display = 'block';
	}
}

document.querySelector("#expandAll").onclick = function expandAll() {
	let lists = document.querySelectorAll('ul');
	for (let i = 0; i < lists.length; i++) {
		lists[i].style.display = 'block';
	}
}
