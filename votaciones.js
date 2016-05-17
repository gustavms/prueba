var mongoose = require ('mongoose');
 Schema=mongoose.Schema;

 var votacion = new Schema ({
         nombre: String,
         edad:Number,
         pais: String,
         ciudad:String,
         voto: String




 });

 var db= mongoose.createConnection('mongodb://gus:gus@ds017231.mlab.com:17231/votacionesperu',
 function(err,res){
    if(err) console.log ('error: coenctado a la bd :'+ err);
    else console.log('conexion a la bd realizada');

 });
//module.exports =mongoose.model('Votacion',votacion,'votacion');

module.exports = db.model('votaciones',votacion);
