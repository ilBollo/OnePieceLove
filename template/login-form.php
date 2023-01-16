<section class="row login gap-4 gap-md-5">
    <header class="col-6 text-center p-0">
        <h1 class="m-0">WELCOME!</h1>
    </header>
    <form action="#" method="POST" class="col-10 col-md-8 col-lg-6 needs-validation white-column-container px-4 py-5 p-md-5 px-lg-4 inputs" novalidate>
        <?php if (isset($templateParams["errorelogin"])) : ?>
            <div class="col-10 p-0 err-msg d-flex justify-content-center">
                <p class="m-0 p-0" tabindex="-1"><?php echo $templateParams["errorelogin"]; ?></p>
            </div>
        <?php endif; ?>
        <div class="col-12 vstack fields p-0">
            <div class="col-12 d-sm-flex">
                <label for="validationEmail" class="col-sm-2 col-form-label form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="validationEmail" name="EmailUser" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required aria-labelledby="invalid-feedback-email">
                    <div class="invalid-feedback" id="invalid-feedback-email">
                        Inserire una indirizzo email valido
                    </div>
                </div>
            </div>
            <div class="col-12 d-sm-flex">
                <label for="validationPassword" class="col-sm-2 col-form-label form-label">Password</label>
                <div class="col-sm-10">
                    <input class="form-control" type="password" id="validationPassword" name="PasswordUser" required aria-labelledby="invalid-feedback-password">
                    <div class="invalid-feedback" id="invalid-feedback-password">
                        Completa il campo
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 d-sm-flex gap-2 mt-5">
            <input class="form-check-input" type="checkbox" name="remember" id="rememberMe">
            <label class="form-check-label" for="rememberMe">
                Ricordami
            </label>
        </div>
        <button class="col-6 col-sm-3 btn btn-primary mt-4 align-self-center" type="submit">Login</button>
        <div class="col-12 mt-4 d-flex justify-content-between align-items-center flex-wrap gap-3 text-center text-sm-start fw-lighter fst-italic fs-6">
            <div class="col-12 col-sm-5 p-0">
                <a href="login.php?action=registrazione-utente" class="text-decoration-none text-reset">Registrati come utente</a>
            </div>
            <div class="col-12 col-sm-5 p-0 text-sm-end">
                <a href="login.php?action=login-azienda" class="text-decoration-none text-reset">Sei un'azienda? Clicca qui</a>
            </div>
        </div>
    </form>
</section>