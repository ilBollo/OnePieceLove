        <?php 
            $post = $templateParams["post"]; 
            $azione = getAction($templateParams["azione"])
        ?>
        <form action="processa-post.php" method="POST" enctype="multipart/form-data">
            <h2>Gestisci post</h2>
            <?php if($post==null): ?>
            <p>post non trovato</p>
            <?php else: ?>
            <ul>
                <li>
                    <label for="titolopost">Titolo:</label><input type="text" id="titolopost" name="titolopost" value="<?php echo $post["titolopost"]; ?>" />
                </li>
                <li>
                    <label for="testopost">Testo post:</label><textarea id="testopost" name="testopost"><?php echo $post["testopost"]; ?></textarea>
                </li>
                <li>
                    <label for="anteprimapost">Anteprima post:</label><textarea id="anteprimapost" name="anteprimapost"><?php echo $post["anteprimapost"]; ?></textarea>
                </li>
                <li>
                    <?php if($templateParams["azione"]!=3): ?>
                    <label for="imgpost">Immagine post</label><input type="file" name="imgpost" id="imgpost" />
                    <?php endif; ?>
                    <?php if($templateParams["azione"]!=1): ?>
                    <img src="<?php echo UPLOAD_DIR.$post["imgpost"]; ?>" alt="" />
                    <?php endif; ?>
                </li>
                <li>
                    <input type="submit" name="submit" value="<?php echo $azione; ?> post" />
                    <a href="index.php">Annulla</a>
                </li>
            </ul>
                <?php if($templateParams["azione"]!=1): ?>
                <input type="hidden" name="idpost" value="<?php echo $post["idpost"]; ?>" />
                <input type="hidden" name="oldimg" value="<?php echo $post["imgpost"]; ?>" />
                <?php endif;?>

                <input type="hidden" name="action" value="<?php echo $templateParams["azione"]; ?>" />
            <?php endif;?>
        </form>