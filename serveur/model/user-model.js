/**
 * Created by Houssem on 08/01/2018.
 */
let params ={
    recruterPrix :20,
    producteur_prix : 20,
    plan_construction_prix:20,
    transfert_connaissance_prix:20,
    constructeur_prix:20,
    coefficient:1.4
};
/**
 * Definir l'objet de mappage des données pour la base de données
 * @param user objet qui contient les informations à ajouter à la base de données
 * @param addDefaultParams boolean si il est vrai on ajoute les valeurs par defaut de la varibale params
 * @constructor
 */
module.exports.UserDBMapper = function (user,addDefaultParams=false){
    if(user.id != undefined)
        this.id = user.id;
    if(user.username != undefined)
        this.username = user.username;
    if(user.password != undefined)
        this.password = user.password;
    if(user.cosmogole != undefined)
        this.cosmogole = user.cosmogole;
    if(user.recruterActive != undefined)
        this.is_recruter = user.recruterActive ?1:0;
    if(user.planConstructionActive != undefined)
        this.is_plan_construction = user.planConstructionActive?1:0;;
    if(user.transfertConnaissanceActive != undefined)
        this.is_transfert_connaissance = user.transfertConnaissanceActive?1:0;;
    if(user.universiteActive != undefined)
        this.is_universite = user.universiteActive?1:0;
    if(user.producteur_prix != undefined)
        this.producteur_prix = user.producteur_prix;
    if(user.producteur_count != undefined)
        this.producteur_count = user.producteur_count;
    if(user.constructeur_prix != undefined)
            this.constructeur_prix = user.constructeur_prix;
    if(user.constructeur_count != undefined)
        this.constructeur_count = user.constructeur_count;
    if(user.last_update != undefined)
        this.last_update = user.last_update;

    if(addDefaultParams){
        this.recruter_prix = params.recruterPrix;
        this.producteur_prix = params.producteur_prix;
        this.plan_construction_prix = params.plan_construction_prix;
        this.transfert_connaissance_prix = params.transfert_connaissance_prix;
        this.constructeur_prix = params.constructeur_prix;
        this.coefficient = params.coefficient;
    }
};

module.exports.UserRespMapper = function (data) {



    this.id = data.id;
    this.username = data["username"];
    this.password = data["password"];
    this.params = {
        cosmogole : data['cosmogole'],
        recruterActive : (data['is_recruter']>0),
        planConstructionActive : (data['is_plan_construction']>0),
        transfertConnaissanceActive : (data['is_transfert_connaissance']>0),
        universiteActive : (data['is_universite']>0),
        timerInterval : data['timer_interval'],
        coefficient : data['coefficient'],
        lastUpdate : data['last_update']
    };
    this.recruter = {
        prix : data['recruter_prix']
    };
    this.planConstruction = {
        prix : data['plan_construction_prix']
    };
    this.producteur = {
        count : data['producteur_count'],
        interval : data['producteur_interval'],
        prix : data['producteur_prix']
    };
    this.transfertConnaissance = {
        prix : data['transfert_connaissance_prix']
    };
    this.constructeur = {
        count : data['constructeur_count'],
        interval : data['constructeur_interval'],
        prix : data['constructeur_prix']
    };
};


/*function UserModelDb(id,username,password,cosmogole) {

}
x={
    id:1,
        username : "houssem",
    password:"houssem",
    params:{
        cosmogole:100,
        recruterActive:false,
        planConstructionActive:false,
        transfertConnaissanceActive:false,
        universiteActive:false,
        efficacitePompesActive:false,
        universiteActive:false,
        efficacitePompesActive:false,
        steoidesActive:false,
        cosmogolesValueChangeActive:false,

},
    recruter:{
        prix:20,
    }
};*/