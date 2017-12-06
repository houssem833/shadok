"use strict"

let producteur = {
    tag : "div",
    classArray : ["panel"],
    attributesArray : {id : "producteur"},
    chileds:[
        {
            tag : "div",
            classArray : ["panel_title"],
            attributesArray : {},
            content : "Pompeurs : 10",
            chileds:[]
        },
        {
            tag : "div",
            classArray : ["panel_content"],
            attributesArray : {},
            chileds:[
                {
                    tag : "div",
                    classArray : ["progress"],
                    attributesArray : {},
                    chileds:[
                        {
                            tag : "div",
                            classArray : ["progress-bar"],
                            attributesArray : {},
                            chileds:[
                                {
                                    tag : "p",
                                    classArray : [],
                                    attributesArray : {},
                                    content:"+1.6k",
                                    chileds:[]
                                }
                            ]
                        }
                    ]
                },
                {
                    tag : "span",
                    classArray : [],
                    attributesArray : {},
                    content:"Prix : 766&cent;",
                    chileds:[]
                },
                {
                    tag : "a",
                    classArray : ["btn-right"],
                    attributesArray : {href:"#"},
                    content:"Acheter",
                    chileds:[]
                }
            ]
        }
    ]
};

class Game{
	constructor(model,view,controleur,balanceValue){
		this.model = new model();
		this.view = new view();
		this.controleur = new controleur();
		this.pompeEvent = new Event("pompe")
		this.balance = this.view.getXMLNode("#balance>span");
		this.init();
		this.start();
	}

	init(){
		this.model.laodUser();
		this.balance.setData(this.model.user.getBalanceValue());
	}

	start(){

		let pomperBtn = this.view.getElement("#pomperBtn");
		let balancer = this.view.getXMLNode("#balance>span");

		pomperBtn.addEventListener("click",this.controleur.pomper.bind(null,this.model.user,balancer,this.pompeEvent));
		document.addEventListener("pompe",this.controleur.pomped.bind(null,this.model.user,this.view));
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
	pomper(user,balancer,pompEvt,e){
		e.preventDefault();
		let value = user.getBalanceValue()+1;
		user.setBalanceValue(value);
		balancer.setData(value);
		document.dispatchEvent(pompEvt);
	}
	pomped(user,view){
		if (user.getBalanceValue() == user.getShadokPrix()) {
			let producerNode = view.createElement(producteur);
			view.appendTo(producerNode,"#zone_gauche");
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
	appendTo(element,selector){
		let selectorNode = this.getElement(selector);
		selectorNode.appendChild(element);
	}
	createElement(element){
		let elementNode = document.createElement(element.tag);
		if(element.content != undefined)
			elementNode.innerText = element.content;
		this.addClass(elementNode,element.classArray);
		this.addAttributes(elementNode,element.attributesArray)
		element.chileds.forEach(
			chiled => {
                let chiledNode = this.createElement(chiled);
                elementNode.appendChild(chiledNode);
            }
		);
		return elementNode;
	}
	addClass(element,classArray){
		classArray.forEach(className => element.classList.add(className) );
		return element;
	}
	addAttributes(element,attributesArray){
        Object.keys(attributesArray).forEach(attributeKey => element[attributeKey]=attributesArray[attributeKey] );
        return element;
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
class User{
	constructor(){
		this.parametres = {
			balance : 0,
			shadokPrix: 20
		}
	}
    setBalanceValue(value){
        this.parametres.balance = value;
    }
    getBalanceValue(){
        return this.parametres.balance;
    }
    setShadokPrix(prix){
    	this.parametres.shadokPrix = prix;
	}
	getShadokPrix(){
    	return this.parametres.shadokPrix;
	}
}
class Model{
	constructor(){
		this.laodUser();
	}

	fulsh(){
		console.log("envoyer la requête");
	}
	laodUser(){
		this.user = new User();
	}
}

let gameImp = new Game(Model,view,Controleur);

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
