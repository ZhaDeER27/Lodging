function index(req, res){
    if(req.session.loggedin == true ){
    req.getConnection((err, conn) => {
            conn.query('SELECT * FROM habitacion', (err, habitacion) => {
              if(err) {
                res.json(err);
              }
              res.render('tasks/index', { habitacion, Nombre: req.session.Nombre });
            });
          });
    } else {
        res.redirect('/')
    }
    
    }

function create(req, res){
    if(req.session.loggedin == true ){
        res.render('tasks/create' , {Nombre: req.session.Nombre});
    } else {
        res.redirect('/')
    }
}

function destroy(req, res) {
    const id = req.body.IdHabitacion;
  
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM habitacion WHERE IdHabitacion = ?', [id], (err, rows) => {
        res.redirect('/tasks');
      });
    })
  }

  function edit(req, res) {
    const id = req.params.id;
  
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM tasks WHERE id = ?', [id], (err, tasks) => {
        if(err) {
          res.json(err);
        }
        res.render('tasks/edit', { tasks });
      });
    });
  }
  
  function update(req, res) {
    const id = req.params.IdHabitacion;
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE habitacion SET ? WHERE id = ?', [data, id], (err, rows) => {
          res.redirect('/tasks');
        });
      });
    }
    


function Agregar(req, res){
    const data = req.body;

    req.getConnection((err, conn)=>{
                conn.query('INSERT INTO habitacion SET ?',[data], (err, rows) => {
                    res.redirect('/tasks');
                        });
                    });

            }


            
module.exports = {
    index: index,
    create: create,
    Agregar: Agregar,
    destroy: destroy,
    edit: edit,
    update: update,
}
