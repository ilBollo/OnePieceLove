<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it" lang="it">
  <head>
      <meta charset="utf-8" />
      <title><?php echo $templateParams["titolo"]; ?></title>
      <link rel="icon" href="<?php echo UPLOAD_DIR.'logo.png'?>"/>
      <link rel="stylesheet" type="text/css" href="./css/style.css" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
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
          <div class="dropdown">
            <button id="notifiche" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-bell-fill"></i>
              <span class="badge badge-secondary" id="nNotifiche"><?php echo $templateParams["notifiche"] ?></span>
            </button>
              <ul id="elenco-notifiche" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <script>
                        function closeNotifica(follower,followed) {
                          let form_data = new FormData();
                          form_data.append("follower", follower);
                          form_data.append("followed", followed);
                          axios.post('api-notifiche.php', form_data)
                          .then(response =>{
                           let nNotif = document.getElementById('nNotifiche');
                           let numero = parseInt(nNotif.innerText);
                           nNotif.innerText = numero -1;
                          });
                        }
                </script>
                <?php if(empty($templateParams["notificheDescr"])): ?>
                  <li>non ci sono notifiche aperte</li>
                <?php else: ?>
                  <?php foreach($templateParams["notificheDescr"] as $notificaDescr): ?>
                    <li>
                      <?php echo $notificaDescr["nickname"];?> ha inizia a seguirti
                      <div class="text-end">
                      <button type="button" class="btn btn-danger" onclick="closeNotifica('<?php echo $notificaDescr["follower"]; ?>','<?php echo $notificaDescr["followed"]; ?>')">X</button>
                      </div>
                    </li>
                  <?php endforeach; ?>
                <?php endif; ?>
              </ul>
          </div>
          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" class="form-control" id="nome_utente" placeholder="Search..." aria-label="Search">
            <div id="risultati_ricerca"></div>
          </form>
        </div>
      </div>
    </header>

    <script 
    src="js/ricercaUtenti.js">

 /* $(document).ready(function() {
    $(".elimina-notifica").click(function() {
      var notificaId = $(this).data("notifica-id");

      $("#elenco-notifiche").load("carica_notifiche.php");

      // Aggiorna il contatore delle notifiche
      var nNotifiche = parseInt($("#nNotifiche").text());
      $("#nNotifiche").text(nNotifiche - 1);
    });
  });*/
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

