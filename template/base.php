<!DOCTYPE html>
<html lang="it">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["titolo"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
</head>
<body>
    <header>
        <h1>Il mondo di One Piece</h1>
    </header>
    <nav>
        <ul>
            <li><a href="index.php">Home</a></li><li><a href="Amici.html">Amici</a></li><li><a href="login.html">Login</a></li>
        </ul>
    </nav>
    <main>
    <?php
        require($templateParams["nome"]);
    ?>
    </main><aside>
        <section>

        </section>
    </aside>
    <footer>
        <p>Io credo in me</p>
    </footer>
</body>
</html>