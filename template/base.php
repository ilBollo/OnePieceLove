<!DOCTYPE html>
<html lang="it">
  <head>
      <meta charset="utf-8" />
      <title><?php echo $templateParams["titolo"]; ?></title>
      <link rel="icon" href="<?php echo UPLOAD_DIR.'logo.png'?>"/>
      <link rel="stylesheet" type="text/css" href="./css/style.css" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"/>
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e" crossorigin="anonymous">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Un social network per i fans di One Piece"/>
  </head>

  <body>
      <header class="p-3 mb-3 sticky-top border-bottom bg-warning">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <?php
            echo '
              <img id="toolbar-img" class="rounded-circle" src="'.UPLOAD_DIR.'logo.png" alt=""></img>
              '
          ?>
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li class="nav-item"> <a class="nav-link" href="homepage.php">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="profilo.php">Profilo</a></li>
            <li class="nav-item"> <a class="nav-link" href="logout.php">Logout</a></li>
          </ul>
          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" class="form-control" id="nome_utente" placeholder="Search..." aria-label="Search">
            <div id="risultati_ricerca"></div>
          </form>
        </div>
      </div>
    </header>
    <script>
      function utentiFilter(post){
        let result ="";
        if (post.length > 0) {
          result += `<ul class="list-group position-absolute dropdown-menu" style="width:40%; background-color: transparent;">`;
          for(let i=0; i < post.length; i++){
            result +=`
            <li class="list-group-item border-0">
              <a href="#">${post[i]["nome"]} ${post[i]["cognome"]} ${post[i]["linkImmagine"]}</a>
            </li>`;
          }
          result += `</ul>`;
        }
        return result;
      }

      document.querySelector('#nome_utente').addEventListener('input', function() {
        const nomeUtente = this.value;
        axios.get('api-ricerca.php', {
          params: {
            nome_utente: nomeUtente
          }
        })
        .then(function(response) {
          let risRicerca = utentiFilter(response.data);
          document.querySelector('#risultati_ricerca').innerHTML = risRicerca;
        });
      });

      //se clicco su qualsiasi altro punto cancello la risRicerca
      window.addEventListener('click', function(event) {
        if (!event.target.matches('#nome_utente')) {
          document.querySelector('#risultati_ricerca').innerHTML = '';
        }
      });
    </script>

    <main>
      <?php
        if(isset($templateParams["js"])):
          foreach($templateParams["js"] as $script):
      ?>
      <script src="<?php echo $script; ?>"></script>
      <?php
          endforeach;
        endif;
      ?>
    </main>
  </body>
</html>
