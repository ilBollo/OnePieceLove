<section class="row registration gap-4 gap-md-5">
    <header class="col-10 col-md-8 col-lg-6 text-center">
        <h1 class="m-0 p-0">REGISTRATI ORA!</h1>
    </header>
    <form action="processa-modifiche.php?action=ins-new-utente" method="POST" class="col-10 col-md-8 col-lg-6 needs-validation white-column-container px-3 inputs" novalidate>
        <?php if (isset($_GET["err-msg"])) : ?>
            <div class="col-10 err-msg">
                <p class="m-0 p-0 text-center" tabindex="-1"><?php echo $_GET["err-msg"]; ?></p>
            </div>
        <?php endif; ?>
        <div class="col-12 vstack fields p-0">
            <fieldset class="col-12 vstack">
                <div class="col-12">
                    <label for="validationFullName" class="col-form-label form-label">Nome Completo <span class="text-danger" aria-hidden="true">*</span></label>
                    <div>
                        <input type="text" class="form-control" id="validationFullName" placeholder="Mario Rossi" name="NomeCompleto" required aria-describedby="invalid-feedback-name">
                        <div class="invalid-feedback" id="invalid-feedback-name">
                            Completare il campo
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <label for="validationPhoneNum" class="col-form-label form-label">Numero di telefono</label>
                    <div>
                        <input type="tel" class="form-control" id="validationPhoneNum" name="NumeroTelefono" pattern="\d{3}[\s-]?\d{3}[\s-]?\d{4}" aria-describedby="invalid-feedback-phone_num">
                        <div class="invalid-feedback" id="invalid-feedback-phone_num">
                            Il numero di telefono deve contenere 10 numeri, può essere suddifivo in gruppi da 3-3-4 cifre separati da 'spazio' o '-'
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <label for="validationEmail" class="col-form-label form-label">Email <span class="text-danger" aria-hidden="true">*</span></label>
                    <div>
                        <input type="email" class="form-control" id="validationEmail" placeholder="esempio@gmail.com" name="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" aria-describedby="invalid-feedback-email">
                        <div class="invalid-feedback" id="invalid-feedback-email">
                            L'indirizzo email deve seguire l'ordine: caratteri@caratteri.dominio; il dominio deve contenere almeno 2 lettere dalla 'a' alla 'z'
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <label for="validationPassword" class="col-form-label form-label">Password <span class="text-danger" aria-hidden="true">*</span></label>
                    <div>
                        <input class="form-control" type="password" id="validationPassword" name="Password" required pattern="(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" aria-describedby="invalid-feedback-password">
                        <div class="invalid-feedback" id="invalid-feedback-password">
                            La password deve contenere almeno un numero, una lettera maiuscola, una lettera minuscola, un carattere speciale, e deve essere almeno lunga 8 caratteri
                        </div>
                    </div>
                </div>
            </fieldset>

        </div>
        <p class="text-danger text-center mt-4 w-100" aria-hidden="true">i campi evidenziati sono obbligatori</p>
        <button class="col-4 col-lg-3 mt-4 btn btn-primary align-self-center" type="submit">Continue</button>
    </form>
</section>