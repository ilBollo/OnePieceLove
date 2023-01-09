<!DOCTYPE html>
<html lang="it">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["titolo"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
</head>
<body>
    <header>
        <h1>Il mondo di Naruto</h1>
    </header>

   <main>
   <div class="container">
        <div class="tab">
            <button class="tablink active" onclick="openTab(event,'signin')" id="link1">Login</button>
            <button class="tablink" onclick="openTab(event,'signup')" id="link2">Sign Up</button>
        </div>        
    </div>

    </main><aside>
        <section>
        <img src="upload/accessibility.jpg"/>
        </section>
    </aside>
    <footer>
        <p>-La differenza tra la stupidità e il genio è che il genio ha i suoi limiti: Neji Hyuuga.
        </p>
    </footer>
</body>
</html>