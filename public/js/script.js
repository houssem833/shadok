/**
 * Created by Houssem on 15/12/2017.
 */
"use strict"

/**
 * class Game
 * Représente l'objet qui gere le jeu
 */






class Game{
    constructor(Model,View,Controller){
        this.model = new Model();
        this.view = new View();
        this.controller = new Controller();
        this.model.loadUserData(this.init.bind(this))
    }
    init(){
        //definition des elements
        let pompeBtn = this.view.getElement("#pomperBtn");
        let deconectionLink = this.view.getElement("#deconectionLink");
        // appliquer les fonction
        this.controller.updateData(this.model,this.start.bind(this,pompeBtn,deconectionLink))
    }

    start(pompeBtn,deconectionLink){
        window.addEventListener('beforeunload',this.controller.saveChange.bind(this.controller,this.model));
        window.addEventListener('unload',this.controller.saveChange.bind(this.controller,this.model));
        deconectionLink.addEventListener('click',this.controller.disconnect.bind(this.controller,this.model));
        pompeBtn.addEventListener("click",this.controller.pomper.bind(this.controller,this.model));
        document.addEventListener("pompe",this.controller.cosmogoleValueChange.bind(this.controller,this.model,this.view));
        document.dispatchEvent(this.controller.pompeEvent);
    }


}

/**
 *
 */
class Controller{
    constructor(){
        this.pompeEvent = new Event("pompe");
    }
    saveChange(model,callback){
        let complite = (res)=>{
            if(callback != undefined)
                callback();
        }
        let data = "cosmogole="+model.user.params.cosmogole;
        if(model.user.params.planConstructionActive){
            data+="&producteur_count="+model.user.producteur.count;
            if(model.user.params.transfertConnaissanceActive)
                data+="&constructeur_count="+model.user.constructeur.count;
            if(model.user.params.universiteActive)
                data+="&universite_count="+model.user.universite.count;
        }

        model.loadData("post",'/update',{data,complite});
    }
    updateData(model,callback){
        let deffTime = new Date(model.user.params.currentDate).getTime()- new Date(model.user.params.lastUpdate).getTime();
        if(model.user.params.universiteActive){
            let constructeurCount = Math.ceil((deffTime*model.user.universite.count)/model.user.universite.interval);
            model.user.constructeur.count += constructeurCount;
        }
        if(model.user.params.transfertConnaissanceActive){
            let producteurCount = Math.ceil((deffTime*model.user.constructeur.count)/model.user.constructeur.interval);
            model.user.producteur.count += producteurCount;
        }
        if(model.user.params.recruterActive){
            let cosmogoleCount = Math.ceil((deffTime*model.user.producteur.count)/model.user.producteur.interval);
            model.user.params.cosmogole += cosmogoleCount;
        }
        this.saveChange(model);
        callback();
    }
    disconnect(model,evt){
        evt.preventDefault();
        let done = ()=> window.location.href=evt.target.href;
        this.saveChange(model,done);

    }
    /**
     * augmenter le nombre des cosmogole +1 à chaque clique sur le bouton pomper
     */
    pomper(model){
        model.user.params.cosmogole= Number.parseInt(model.user.params.cosmogole)+1;
        document.dispatchEvent(this.pompeEvent);
    }
    /**
     * declancher chague fois où le nombre des cosmogoles change
     */
    cosmogoleValueChange(model, view){
        let dataUser = model.user;

            view.setCosmogole(dataUser.params.cosmogole);
       if(
           dataUser.params.recruterActive== false &&
           dataUser.recruter.prix <= dataUser.params.cosmogole &&
           dataUser.params.recruterNotif == undefined
       ){
           dataUser.params.recruterNotif = true;
           this.afficherRecruter(model,view)
       }
       if(dataUser.params.recruterActive==true){
           // charger la panel du producteur et activer le producteur
           if(dataUser.params.isAfficherRecruterAcquis == undefined){
               this.afficherRecruterAcquis(model,view);
               dataUser.params.isAfficherRecruterAcquis = true;
           }
           if(dataUser.params.isProducteurAffiche == undefined){
               this.afficherProducteur(model,view);
               dataUser.params.isProducteurAffiche = true;
           }
           if(dataUser.params.timer == undefined)
               this.activerTimer(model,view)
           if(
               dataUser.params.planConstructionActive== false &&
               dataUser.planConstruction.prix <= dataUser.params.cosmogole &&
               dataUser.params.planConstructionNotif == undefined
           ){
               this.afficherPlanConstructionNotif(model,view);
               dataUser.params.planConstructionNotif = true;
           }
           if( dataUser.params.planConstructionActive==true){
               if(model.user.params.isAfficherPlanConstructionAcquis == undefined){
                   this.afficherPlanConstructionAcquis(model,view);
                   dataUser.params.isAfficherPlanConstructionAcquis = true;
               }
               if(
                   dataUser.params.transfertConnaissanceActive == false &&
                   dataUser.params.cosmogole >= dataUser.transfertConnaissance.prix &&
                   dataUser.transfertConnaissance.object == undefined
               ){
                   this.afficherTransfertConnaissancePanel(model,view);
               }

               if(
                   dataUser.params.transfertConnaissanceActive == false &&
                   dataUser.params.cosmogole < dataUser.transfertConnaissance.prix &&
                   dataUser.transfertConnaissance.object != undefined
               ){
                   dataUser.transfertConnaissance.object.remove();
                   delete dataUser.transfertConnaissance.object;
               }
               if( dataUser.params.transfertConnaissanceActive==true){
                   if(dataUser.params.isAfficherTransfertConnaissanceAcquis == undefined){
                       this.afficherTransfertConnaissanceAcquisPanel(model,view);
                       dataUser.params.isAfficherTransfertConnaissanceAcquis = true;
                   }
                   /**************************************************************************/

                   if(
                       dataUser.params.universiteActive == false &&
                       dataUser.params.cosmogole >= dataUser.universite.prix &&
                       dataUser.universite.object == undefined
                   ){
                       this.afficherUniversiteShadokPanel(model,view);
                   }

                   if(
                       dataUser.params.universiteActive == false &&
                       dataUser.params.cosmogole < dataUser.universite.prix &&
                       dataUser.universite.object != undefined
                   ){
                       dataUser.universite.object.remove();
                       delete dataUser.universite.object;
                   }
                   if( dataUser.params.universiteActive==true){
                       if(dataUser.params.isAfficherUniversiteShadokAcquis == undefined){
                           this.afficherUniversiteShadokAcquisPanel(model,view);
                           dataUser.params.isAfficherUniversiteShadokAcquis = true;
                       }

                   }
                   /**************************************************************************/
               }
           }
       }
    }

    /**
     * afficher l'amelioration de recrutement dans les ameliorations
     */
    afficherRecruter(model,view){
        let complite=(res)=>{
            let recruter = JSON.parse(res.response);
            let recruterNode = view.createElement(recruter);
            view.appendTo(recruterNode,"#disponible .content");
            let recruterPrix = view.getElement("#recruter .panel_content span");
            view.addHtml(recruterPrix,"Prix : "+view.simpleValue(model.user.recruter.prix)+"&cent;")
            recruterNode.addEventListener("click",this.recruter.bind(this,model,recruterNode));

        }
        model.loadData("get","/recruter",{complite})
    }
    /**
     * afficher l'amelioration de recrutement dans les ameliorations
     */
    afficherRecruterAcquis(model,view){
        let complite=(res)=>{
            let recruter = JSON.parse(res.response);
            let recruterNode = view.createElement(recruter);
            view.appendTo(recruterNode,"#aquie .content");
            let recruterPrix = view.getElement("#recruter .panel_content span");
            view.addHtml(recruterPrix,"Prix : "+view.simpleValue(model.user.recruter.prix)+"&cent;")
            recruterNode.setAttribute("disabled", "disabled");

        }
        model.loadData("get","/recruter",{complite})
    }
    /**
     * activer l'evenement des pompeur
     */
    recruter(model,recruterNode){
        model.user.params.recruterActive=true;
        model.user.params.cosmogole = model.user.params.cosmogole - model.user.recruter.prix;
        recruterNode.removeEventListener("click",this.recruter);
        recruterNode.remove();
        let complite = (res)=>{
            document.dispatchEvent(this.pompeEvent);
        }
        let data = "cosmogole="+model.user.params.cosmogole+"&recruterActive=true";
        model.loadData("post",'/update',{data,complite});

    }

    afficherProducteur(model,view){
        let complite=(res)=>{
            let producteur = JSON.parse(res.response);
            let producteurNode = view.createElement(producteur);
            view.appendTo(producteurNode,"#zone_gauche");
            let producteurTitle = view.getElement("#producteur .panel_title");
            view.addText(producteurTitle,"Pompeurs : "+view.simpleValue(model.user.producteur.count));
        }
        model.loadData("get","/producteur",{complite})
    }

    activerTimer(model,view){
        model.user.params.timer  = setInterval(this.timerCallback.bind(this,model,view),model.user.params.timerInterval);
    }
    timerCallback(model,view){
        if(model.user.params.recruterActive){

            if(model.user.params.transfertConnaissanceActive){

                if(model.user.params.universiteActive){
                    let universiteProgressBar = view.getElement("#universite .progress .progress-bar");
                    if(model.user.universite.value == undefined){
                        model.user.universite.value = 0;
                        universiteProgressBar.style["width"]= "0%";
                    }
                    model.user.universite.value += (model.user.params.timerInterval * model.user.universite.count) /model.user.universite.interval;
                    if (model.user.universite.value >1){
                        let deffUniversite = Number.parseInt(model.user.universite.value);
                        model.user.universite.value -= deffUniversite;
                        model.user.constructeur.count+=deffUniversite;
                        let constructeurTitle = view.getElement("#constructeur .panel_title");
                        view.addText(constructeurTitle,"Constructeurs : "+view.simpleValue(model.user.constructeur.count));
                    }
                    universiteProgressBar.style["width"]= (model.user.universite.value*100)+"%";
                }

                let constructeurProgressBar = view.getElement("#constructeur .progress .progress-bar");
                if(model.user.constructeur.value == undefined){
                    model.user.constructeur.value = 0;
                    constructeurProgressBar.style["width"]= "0%";
                }
                model.user.constructeur.value += (model.user.params.timerInterval * model.user.constructeur.count) /model.user.constructeur.interval;
                if (model.user.constructeur.value >1){
                    let deffConstructeur = Number.parseInt(model.user.constructeur.value);
                    model.user.constructeur.value -= deffConstructeur;
                    model.user.producteur.count+=deffConstructeur;
                    let producteurTitle = view.getElement("#producteur .panel_title");
                    view.addText(producteurTitle,"Pompeurs : "+view.simpleValue(model.user.producteur.count));
                }
                constructeurProgressBar.style["width"]= (model.user.producteur.value*100)+"%";
            }
            let producteurProgressBar = view.getElement("#producteur .progress .progress-bar");
            if(model.user.producteur.value == undefined){
                model.user.producteur.value = 0;
                producteurProgressBar.style["width"]= "0%";
            }

            model.user.producteur.value += (model.user.params.timerInterval * model.user.producteur.count) /model.user.producteur.interval;
            if (model.user.producteur.value >1){
                let deffProducteur = Number.parseInt(model.user.producteur.value)
                model.user.producteur.value -= deffProducteur;
                model.user.params.cosmogole+=deffProducteur;
                document.dispatchEvent(this.pompeEvent);
            }

            producteurProgressBar.style["width"]= (model.user.producteur.value*100)+"%";

        }
    }

    afficherPlanConstructionNotif(model,view){
        let complite=(res)=>{
            let planConstruction = JSON.parse(res.response);
            let planConstructionNode = view.createElement(planConstruction);
            view.appendTo(planConstructionNode,"#disponible .content");
            let planConstructionPrix = view.getElement("#plan_construction .panel_content span");
            view.addHtml(planConstructionPrix,"Prix : "+view.simpleValue(model.user.producteur.prix)+"&cent;")
            planConstructionNode.addEventListener("click",this.planConstruction.bind(this,model,planConstructionNode));

        }
        model.loadData("get","/plan_construction",{complite})
    }
    afficherPlanConstructionAcquis(model,view){
        let complite=(res)=>{
            let planConstruction = JSON.parse(res.response);
            let planConstructionNode = view.createElement(planConstruction);
            view.appendTo(planConstructionNode,"#aquie .content");
            let planConstructionPrix = view.getElement("#plan_construction .panel_content span");
            view.addHtml(planConstructionPrix,"Prix : "+view.simpleValue(model.user.planConstruction.prix)+"&cent;");
            planConstructionNode.setAttribute("disabled", "disabled");
            this.afficherAchatProducteurBtn(model,view);

        }
        model.loadData("get","/plan_construction",{complite})
    }
    /**
     * activer la permission d'achat des nouveaux pompeurs
     */
    planConstruction(model,planConstructionNode){
        model.user.params.planConstructionActive=true;
        model.user.params.cosmogole = model.user.params.cosmogole - model.user.planConstruction.prix;
        planConstructionNode.removeEventListener("click",this.planConstruction);
        planConstructionNode.remove();
        let complite = (res)=>{
            document.dispatchEvent(this.pompeEvent);
        }
        let data = "cosmogole="+model.user.params.cosmogole+"&planConstructionActive=true";
        model.loadData("post",'/update',{data,complite});
    }
    afficherAchatProducteurBtn(model,view){
        let producteurContent = view.getElement("#producteur .panel_content");
        let spanNode = document.createElement("span");
        view.addHtml(spanNode,"Prix : "+view.simpleValue(model.user.producteur.prix)+"&cent;");
        let linkNode = document.createElement("a");
        linkNode.setAttribute("href","#");
        linkNode.setAttribute("id","producteuBtn");
        linkNode.classList.add("btn-right");
        view.addText(linkNode,"Acheter");
        producteurContent.appendChild(spanNode);
        producteurContent.appendChild(linkNode);
        linkNode.addEventListener("click",this.acheterProducteur.bind(this,model,view,spanNode));
    }
    acheterProducteur(model,view,spanNode,evt){
        evt.preventDefault();
        if(model.user.params.cosmogole>=model.user.producteur.prix){
            model.user.params.cosmogole-= model.user.producteur.prix;
            model.user.producteur.prix = Math.ceil(model.user.producteur.prix * model.user.params.coefficient);
            model.user.producteur.count++;
            let complite = (res)=>{
                if(res.response){
                    let producteurTitle = view.getElement("#producteur .panel_title");
                    view.addText(producteurTitle,"Pompeurs : "+view.simpleValue(model.user.producteur.count));
                    view.addHtml(spanNode,"Prix : "+view.simpleValue(model.user.producteur.prix)+"&cent;");
                    document.dispatchEvent(this.pompeEvent);
                }

            }
            let data = "cosmogole="+model.user.params.cosmogole+"&producteur_prix="+model.user.producteur.prix+"&producteur_count="+model.user.producteur.count;
            model.loadData("post",'/update',{data,complite});
        }
    }

    afficherTransfertConnaissancePanel(model,view){
        let complite=(res)=>{
            let transfertConnaissance = JSON.parse(res.response);
            let transfertConnaissanceNode = view.createElement(transfertConnaissance);
            view.appendTo(transfertConnaissanceNode,"#disponible .content");
            let transfertConnaissancePrix = view.getElement("#transfert_connaissance .panel_content span");
            view.addHtml(transfertConnaissancePrix,"Prix : "+view.simpleValue(model.user.transfertConnaissance.prix)+"&cent;")
            transfertConnaissanceNode.addEventListener("click",this.transfertConnaissance.bind(this,model,transfertConnaissanceNode));
            model.user.transfertConnaissance.object = transfertConnaissanceNode;


        }
        model.loadData("get","/transfert_connaissance",{complite});
    }

    afficherTransfertConnaissanceAcquisPanel(model,view){
        let complite=(res)=>{
            let transfertConnaissance = JSON.parse(res.response);
            let transfertConnaissanceNode = view.createElement(transfertConnaissance);
            view.appendTo(transfertConnaissanceNode,"#aquie .content");
            let transfertConnaissancePrix = view.getElement("#transfert_connaissance .panel_content span");
            view.addHtml(transfertConnaissancePrix,"Prix : "+view.simpleValue(model.user.transfertConnaissance.prix)+"&cent;");
            transfertConnaissanceNode.setAttribute("disabled", "disabled");
            this.afficherConstructeurPanel(model,view);

        }
        model.loadData("get","/transfert_connaissance",{complite})
    }

    afficherConstructeurPanel(model,view){
        let complite=(res)=>{
            let constructeur = JSON.parse(res.response);
            let constructeurNode = view.createElement(constructeur);
            view.appendTo(constructeurNode,"#zone_gauche");
            let titleNode = view.getElement("#constructeur .panel_title");
            view.addText(titleNode,"Constructeurs : "+view.simpleValue(model.user.constructeur.count));
            let spanNode = view.getElement(".constructeur_notif");
            view.addHtml(spanNode,"Prix : "+view.simpleValue(model.user.constructeur.prix)+"&cent;");
            let constructeurBtn = view.getElement("#constructeur_btn");
            constructeurBtn.addEventListener("click",this.acheterConstructeur.bind(this,model,view,spanNode,titleNode));
        }
        model.loadData("get","/constructeur",{complite})
    }

    acheterConstructeur(model,view,spanNode,titleNode,evt){
        evt.preventDefault();
        if(model.user.params.cosmogole>=model.user.constructeur.prix){
            model.user.params.cosmogole-= model.user.constructeur.prix;
            model.user.constructeur.prix = Math.ceil(model.user.constructeur.prix * model.user.params.coefficient);
            model.user.constructeur.count++;
            let complite = (res)=>{
                if(res.response){
                    view.addText(titleNode,"Constructeurs : "+view.simpleValue(model.user.constructeur.count));
                    view.addHtml(spanNode,"Prix : "+view.simpleValue(model.user.constructeur.prix)+"&cent;");
                    document.dispatchEvent(this.pompeEvent);
                }

            }
            let data = "cosmogole="+model.user.params.cosmogole+"&constructeur_prix="+model.user.constructeur.prix+"&constructeur_count="+model.user.constructeur.count;
            model.loadData("post",'/update',{data,complite});
        }
    }
    /**
     * activer l'evenement de constrution des nouvelles pompes
     */
    transfertConnaissance(model,transfertConnaissanceNode){
        model.user.params.transfertConnaissanceActive=true;
        model.user.params.cosmogole = model.user.params.cosmogole - model.user.transfertConnaissance.prix;
        transfertConnaissanceNode.removeEventListener("click",this.transfertConnaissance);
        transfertConnaissanceNode.remove();
        let complite = (res)=>{
            document.dispatchEvent(this.pompeEvent);
        }
        let data = "cosmogole="+model.user.params.cosmogole+"&transfertConnaissanceActive=true";
        model.loadData("post",'/update',{data,complite});
    }


    afficherUniversiteShadokPanel(model,view){
        let complite=(res)=>{
            let universiteShadokPanel = JSON.parse(res.response);
            let universiteShadokPanelNode = view.createElement(universiteShadokPanel);
            view.appendTo(universiteShadokPanelNode,"#disponible .content");
            let universiteShadokPrix = view.getElement("#universite_shadok .panel_content span");
            view.addHtml(universiteShadokPrix,"Prix : "+view.simpleValue(model.user.universiteShadok.prix)+"&cent;")
            universiteShadokPanelNode.addEventListener("click",this.universiteShadok.bind(this,model,universiteShadokPanelNode));
            model.user.universite.object = universiteShadokPanelNode;


        }
        model.loadData("get","/universite_shadok",{complite});
    }
    afficherUniversiteShadokAcquisPanel(model,view){
        let complite=(res)=>{
            let universiteShadokPanel = JSON.parse(res.response);
            let universiteShadokPanelNode = view.createElement(universiteShadokPanel);
            view.appendTo(universiteShadokPanelNode,"#aquie .content");
            let universiteShadokPrix = view.getElement("#universite_shadok .panel_content span");
            view.addHtml(universiteShadokPrix,"Prix : "+view.simpleValue(model.user.universiteShadok.prix)+"&cent;");
            universiteShadokPanelNode.setAttribute("disabled", "disabled");
            this.afficherUniversitePanel(model,view);

        }
        model.loadData("get","/universite_shadok",{complite})
    }
    afficherUniversitePanel(model,view){
        let complite=(res)=>{
            let universite = JSON.parse(res.response);
            let universiteNode = view.createElement(universite);
            view.appendTo(universiteNode,"#zone_gauche");
            let titleNode = view.getElement("#universite .panel_title");
            view.addText(titleNode,"Universites : "+view.simpleValue(model.user.universite.count));
            let spanNode = view.getElement(".universite_notif");
            view.addHtml(spanNode,"Prix : "+view.simpleValue(model.user.universite.prix)+"&cent;");
            let universiteBtn = view.getElement("#universite_btn");
            universiteBtn.addEventListener("click",this.acheterUniversite.bind(this,model,view,spanNode,titleNode));
        }
        model.loadData("get","/universite",{complite})
    }

    acheterUniversite(model,view,spanNode,titleNode,evt){
        evt.preventDefault();
        if(model.user.params.cosmogole>=model.user.universite.prix){
            model.user.params.cosmogole-= model.user.universite.prix;
            model.user.universite.prix = Math.ceil(model.user.universite.prix * model.user.params.coefficient);
            model.user.universite.count++;
            let complite = (res)=>{
                if(res.response){
                    view.addText(titleNode,"Universites : "+view.simpleValue(model.user.universite.count));
                    view.addHtml(spanNode,"Prix : "+view.simpleValue(model.user.universite.prix)+"&cent;");
                    document.dispatchEvent(this.pompeEvent);
                }

            }
            let data = "cosmogole="+model.user.params.cosmogole+"&universite_prix="+model.user.universite.prix+"&universite_count="+model.user.universite.count;
            model.loadData("post",'/update',{data,complite});
        }
    }
    universiteShadok(model,universiteShadokPanelNode){
        model.user.params.universiteActive=true;
        model.user.params.cosmogole = model.user.params.cosmogole - model.user.universiteShadok.prix;
        universiteShadokPanelNode.removeEventListener("click",this.universiteShadok);
        universiteShadokPanelNode.remove();
        let complite = (res)=>{
            document.dispatchEvent(this.pompeEvent);
        }
        let data = "cosmogole="+model.user.params.cosmogole+"&universiteActive=true";
        model.loadData("post",'/update',{data,complite});
    }

    /**
     * activer l'evenement de former des nouveaux constructeurs
     */
    universite(){

    }

    /**
     * agmenter le nombre des cosmogoles produits
     */
    efficacitePompes(){

    }

    /**
     * deminuer la durée necissaire pour chaque pompe
     */
    steoides(){

    }

}
/**
 *
 */
class Model{
    loadData(methode,url,last={})
    {
        let req = new XMLHttpRequest()

        req.open(methode,url)

        if (methode=="post" && last.data != undefined) {
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.send(last.data);
        }
        else{
            req.send(null);
        }


        req.onreadystatechange = (event)=> {

            let response = event.target;
            if (response.readyState === XMLHttpRequest.DONE) { // XMLHttpRequest.DONE === 4
                if (response.status === 200 || response.status === 304) {
                    if (last.complite != undefined) {
                        last.complite(response)
                    }
                } else  {

                    if (last.erreur != undefined) {
                        last.erreur(response.status,response.statusText)
                    }
                }
            }
        }
    }
    /**
     * charge les données reliée au joueur
     * @param calback : la fonction à appeler après la fin du chargement des données
     */
    loadUserData(calback){
        let url = "/user";
        let complite;


        complite = (res) => {
            this.user = JSON.parse(res.response);
            calback();
        };
        this.loadData("get",url,{complite});
    }
    getRecruterUpadatePanel(){

    }
    getPompeurPanel(){

    }

    getPlanConstructionUpdatePanel(){

    }
    getTransfertConnaissanceUpdatePanel(){

    }
    getConstructeurPanel(){

    }
    getUniversiteUpdatePanel(){

    }
    getUnisersitePanel(){

    }
    getEfficacitePompeUpdatePanel(){

    }
    getsteoideUpdatePanel(){

    }
}
/**
 *
 */
class View{
    getElement(element){
        return document.querySelector(element);
    }
    setCosmogole(value){
        let cosmogole = this.getElement("#balance span");
        cosmogole.innerText =  this.simpleValue(value);
    }
    simpleValue(value){
        let mid = Number.parseInt(value/1000);
        if(mid > 0){
            value = mid;
            mid = Number.parseInt(value/1000);
            if(mid > 0){
                value = mid;
                value+="M";
            }
            else{
                value+="K";
            }
        }
        return value
    }
    createElement(element){
        let elementNode = document.createElement(element.tag);
        if(element.content != undefined)
            elementNode.innerText = element.content;
        if(element.classArray != undefined)
            this.addClass(elementNode,element.classArray);
        if(element.attributesArray != undefined)
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
    appendTo(node,parent){
        let parentNode = this.getElement(parent);
        parentNode.appendChild(node);
    }
    addText(ElementNode,text){
        ElementNode.innerText = text;
    }
    addHtml(ElementNode,text){
        ElementNode.innerHTML = text;
    }
}

let game = new Game(Model,View,Controller);