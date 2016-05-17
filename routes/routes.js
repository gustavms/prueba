module.exports = function(app){

  var Votacion=require ('../votaciones');


  //get



findAllVotacion = function(req, res) {
    console.log("GET - /votaciones");
  	return Votacion.find(function(err, votaciones) {
  		if(!err) {
          console.log("encontro votaciones");
  			return res.send(votaciones);
  		} else {
        res.statusCode = 500;
  			console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
  		}
  	});
  };

  findById = function(req, res) {
    console.log("GET - /tshirt/:id");
    return Votacion.findById(req.params.id, function(err, votacion) {
      if(!votacion) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        // Send { status:OK, tshirt { tshirt values }}
        return res.send({ status: 'OK', votacion:votacion });
        // Send {tshirt values}
        // return res.send(tshirt);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  addVotacion= function(req, res) {
    console.log('POST - /Votaciones');
    console.log(req.body);

    var votacion = new Votacion({
      nombre:    req.body.nombre,
      edad :  req.body.edad,
      pais:    req.body.pais,
      ciudad :    req.body.ciudad,
      voto:   req.body.voto

    });
    console.log(votacion);
    votacion.save(function(err) {
      if(!err) {
        console.log("Votacion created");
        return res.send({ status: 'OK', votacion:votacion });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });

    res.send(votacion);
  };

  //PUT - Update a register already exists
updateVotacion = function(req, res) {
      console.log("PUT - /votacion/:id");
      console.log(req.body);
      return votacion.findById(req.params.id, function(err, votacion) {
        if(!votacion) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
        }

        if (req.body.model != null) votacion.model = req.body.model;
        if (req.body.price != null) votacion.price = req.body.price;
        if (req.body.images != null) votacion.images = req.body.images;
        if (req.body.style != null) votacion.style = req.body.style;
        if (req.body.size != null) votacion.size  = req.body.size;
        if (req.body.colour != null) votacion.colour = req.body.colour;
        if (req.body.summary != null) votacion.summary = req.body.summary;

        return votacion.save(function(err) {
          if(!err) {
            console.log('Updated votacion');
            return res.send({ status: 'OK', votacion:votacion });
          } else {
            if(err.name == 'ValidationError') {
              res.statusCode = 400;
              res.send({ error: 'Validation error' });
            } else {
              res.statusCode = 500;
              res.send({ error: 'Server error' });
            }
            console.log('Internal error(%d): %s',res.statusCode,err.message);
          }

          res.send(votacion);
        });
      });
}

deleteVotacion = function(req, res) {
  console.log("DELETE - /tshirt/:id");
  return Votacion.findById(req.params.id, function(err, votacion) {
    if(!votacion) {
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }

    return votacion.remove(function(err) {
      if(!err) {
        console.log('Removed votacion');
        return res.send({ status: 'OK' });
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    })
  });
}

//Link routes and functions
 app.get('/votaciones', findAllVotacion);
 app.get('/votacion/:id', findById);
 app.post('/votacion', addVotacion);
 app.put('/votacion/:id', updateVotacion);
 app.delete('/votacion/:id', deleteVotacion);



}
