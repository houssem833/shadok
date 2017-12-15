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
        //this.model.loadUserData(this.init())
        this.init();
    }
    init(){
        let pompeBtn = this.view.getElement("#pomperBtn");

        this.start(pompeBtn);
    }

    start(pompeBtn){
        pompeBtn.addEventListener("click",this.controller.pomper);
    }


}

/**
 *
 */
class Controller{
    constructor(){

    }

    /**
     * augmenter le nombre des cosmogole +1 à chaque clique sur le bouton pomper
     */
    pomper(){
        console.log("Pmper");
    }

    /**
     * activer l'evenement des pompeur
     */
    recruter(){

    }

    /**
     * activer la permission d'achat des nouveaux pompeurs
     */
    planConstruction(){

    }

    /**
     * activer l'evenement de constrution des nouvelles pompes
     */
    transfertConnaissance(){

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

    /**
     * declancher chague fois où le nombre des cosmogoles change
     */
    cosmogolesValueChange(){

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
        let url = "";
        let complete;
        complete = (res) => {
            this.user = res.response;
            calback();
        };
        this.loadData("get",url,{complete});
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
}

let game = new Game(Model,View,Controller);