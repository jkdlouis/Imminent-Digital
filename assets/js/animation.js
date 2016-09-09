// since there are a too many dots, they are grouped into 3 sets, all 3 will closely animate simultaneously 

var dots_g1 = [];
var dots_g2 = [];
var dots_g3 = [];

var lines_init = [];
var lines_upper = [];
var lines_lower = [];

var d1 = document.getElementById('nd_g1');
var d2 = document.getElementById('nd_g2');
var d3 = document.getElementById('nd_g3');

var nLines_init = document.getElementById('nLines_init');
var nLines_upper = document.getElementById('nLines_upper');
var nLines_lower = document.getElementById('nLines_lower');

function startAnimate(){
	sortElems(d1, dots_g1);
	sortElems(d2, dots_g2);
	sortElems(d3, dots_g3);
	sortElems(nLines_init, lines_init);
	sortElems(nLines_upper, lines_upper);
	sortElems(nLines_lower, lines_lower);

	revertLines(lines_init);
	revertLines(lines_upper);
	revertLines(lines_lower);

	TweenMax.delayedCall(.2, animateLines, [lines_init, nLines_init, .01]);
	TweenMax.delayedCall(.4, animateLines, [lines_upper, nLines_upper, .01]);
	TweenMax.delayedCall(.3, animateLines, [lines_lower, nLines_lower, .01]);

	TweenMax.delayedCall(.1, animateDots, [dots_g1, d1]);
	TweenMax.delayedCall(.1, animateDots, [dots_g2, d2]);
	TweenMax.delayedCall(.1, animateDots, [dots_g3, d3]);

}

function revertLines(_lines){
	for(var i = 0; i < _lines.length; i ++){
		TweenMax.set(_lines[i], {drawSVG:"0%"});
	}
}


function animateLines(_lines, _holder, _m){
	TweenMax.set(_holder, {display:'block'});
	for(var i = 0; i < _lines.length; i ++){
		TweenMax.set(_lines[i], {alpha:1});
		TweenMax.to(_lines[i], .4, {drawSVG:"0% 100%", ease:Linear.easeNone, delay:i * _m});
	}
}

function animateDots(_dots, _holder){
	TweenMax.set(_holder, {display:'block'});
	for(var i = 0; i < _dots.length; i ++){
		TweenMax.to(_dots[i], .3, {alpha:1, ease:Cubic.easeInOut, delay:i * .01});
	}

}


function sortElems(_group, _container){

	for(var a = 0; a < _group.children.length; a ++){
		TweenMax.set(_group.children[a], {alpha:0});
		_container[a] = _group.children[a];
	}
}

startAnimate();