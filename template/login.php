<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it" lang="it">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><?php echo $templateParams["titolo"]; ?></title>
        <link rel="icon" href="<?php echo UPLOAD_DIR.'logo.png'?>">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"/>
        <link rel="stylesheet" href="css/style.css" />
    </head>
    <body>
        <div class="container">
            <div class="row align-items-center ">
                <div class="col-10 col-md-6 mx-auto">
                    <div class="text-center">
                        <?php
                        echo '
                        <img id="profile-img" class="rounded-circle" src="'.UPLOAD_DIR.'logo.png" alt=""></img>
                        '
                        ?>
                        <h1>One Piece Love</h1>
                    </div>
                    <div class="p-3 mb-2 bg-warning text-dark">
                        <div class="login-wrap p-2 p-md-4">
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
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>