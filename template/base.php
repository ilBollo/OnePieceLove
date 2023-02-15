<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8" />
    <title><?php echo $templateParams["titolo"]; ?></title>
    <link rel="icon" href="<?php echo UPLOAD_DIR.'logo.png'?>">
      <link rel="stylesheet" type="text/css" href="./css/style.css" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Un social network per i fans di One Piece"/>
</head>

<body>
<header>
        <h1>One Piece Love</h1>
    </header>
<nav class="nav justify-content-center bg-warning">
  <a class="nav-link" href="homepage.php">Home</a>
  <a class="nav-link" href="profilo.php">Profilo</a>
  <a class="nav-link" href="cerca.php">Cerca</a>
  <a class="nav-link" href="logout.php">Logout</a>
</nav>
<main>
                <?php
                if(isset($templateParams["formmsg"])):
                    echo $templateParams["formmsg"];
                endif;
                ?>
</main>
    <?php
        if(isset($templateParams["js"])):
            foreach($templateParams["js"] as $script):
        ?>
            <script src="<?php echo $script; ?>"></script>
        <?php
            endforeach;
        endif;
    ?>
</body>
</html>