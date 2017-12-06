"use strict"
class BalanceValue{
	constructor(value){
		this.value = value;
	}
	getValue(){
		return this.value;
	}
	incrimente(){
		return ++this.value;
	}
}
class Game{
	constructor(model,view,controleur,balanceValue){
		this.model = new model(1);
		this.view = new view();
		this.controleur = new controleur();
		this.pompeEvent = new Event("pompe")
		this.balance = this.view.getXMLNode("#balance>span");
		this.balanceValue = new balanceValue(0);
		this.init();
		this.start();
	}

	init(){
		this.balance.setData(this.balanceValue.getValue());
		this.shadok = this.model.getShadok();
	}

	start(){

		let pomperBtn = this.view.getElement("#pomperBtn");
		let balancer = this.view.getXMLNode("#balance>span");

		pomperBtn.addEventListener("click",this.controleur.pomper.bind(null,this.balance,this.balanceValue,this.pompeEvent));
		document.addEventListener("pompe",this.controleur.pomped.bind(null,this.balanceValue,this.shadok));
	}
	/*destroy(){
		let pomperBtn = this.view.getElement("#pomperBtn");
		//pomperBtn.unbind("click",this.controleur.pomper.bind(this));
		//document.unbind("pompe",this.controleur.pomped);
	}*/
}

class Controleur{
	constructor(){
	}
	pomper(balancer,balanceValue,pompEvt,e){
		e.preventDefault();
		let value = balanceValue.incrimente();
		balancer.setData(value);
		document.dispatchEvent(pompEvt);
	}
	pomped(balanceValue,shadok){
		if (balanceValue.getValue() == shadok.prix) {
			console.log("prix sahadok atteint");
		}
		
	}
}
class view{
	constructor(){}
	getElement(element){
		return document.querySelector(element);
	}
	getXMLNode(element){
		return new XMLNode(element);
	}
}
class XMLNode{
	constructor(element){
		let elem = document.querySelector(element);
		this.node = elem["childNodes"][0];
	}
	getData(){
		return this.node.data;
	}
	setData(data){
		this.node.data = data;
	}
}
class Model{
	constructor(niveau){
		this.niveau = niveau;
	}
	getShadok(){
		return new Shadok(this.niveau*20);
	}
}
class Shadok{
	constructor(prix){
		this.prix = prix;
	}
}
let gameImp = new Game(Model,view,Controleur,BalanceValue);

gameImp.init();
/*
let pompbtn = document.querySelector("#pompbtn");

pompbtn.addeventListener("click" , controleur.pompaction)


class controleur{
	pompaction(elemPompBtn){
		elemPompBtn
	}
}


class game {
	constructor(modelClass, viewClass, controleurClass){
		this.model = new modelClass()
		this.view = new viewClass()
		this.controleur = new 
	}
	init(){
		this.controleur = nex
	}

}*/

/*class mapper{
	constructor(prop){
		this.element = document.querySelector("["+prop+"]");
		//controleur.log(this.constructor.name)
	}
	set(value){
		this.element.value = value;
	}
	get(){
		return this.element.value;
	}
}

let x = new mapper("k");

let pomper = ()=>{
	let f = parseInt(x.get())
	if(!Number.isInteger(f)){
		console.log("f is a NaN !!");
		f=0;
	}
	console.log(f);
	f++;
	x.set(f)
}

let pomperBtn = document.querySelector("#pomperBtn");

pomperBtn.addEventListener("click",pomper)



/*let i = "";

function changerI() {
	console.log("i est changer");
}

i.addeventListener("change",changerI);*/
