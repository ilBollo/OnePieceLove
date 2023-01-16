<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Bootstrap CSS -->
           <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="css/style.css" />

    <?php
    if (isset($templateParams["js"])) :
        foreach ($templateParams["js"] as $script) :
            ?>
            <script src="<?php echo $script; ?>"></script>
            <?php
        endforeach;
    endif;
    ?>
    <title>Naruto Social World</title>
    

</head>
<body class="text-center">
    <div class="container-fluid">
    <div class="col-12">
            <header class="col-12">
        <h1 >Il mondo di Naruto</h1>
    </header>

   <main>
   <?php
    if(isset($templateParams["nome"])){
        require($templateParams["nome"]);
    }
    ?>

    </main>
        <section>
            <img src="upload/accessibility.jpg"/>
        </section>
        <footer>
        <p>-La differenza tra la stupidità e il genio è che il genio ha i suoi limiti: Neji Hyuuga.
        </p>
    </footer>
</div>
    </div>
</body>
</html>