$(document).ready(function () {
  ("use strict");

  $("input, textarea").on("input", (element) => {
    // rimuovo tutti gli spazi iniziali dagli input
    if (element.target.value.trim().length == 0) {
      element.target.value = "";
    }
    // nascondo il messaggio di errore se il campo è stato completato correttamente
    if (element.target.checkValidity()) {
      $("input:valid + .invalid-feedback, textarea:valid + .invalid-feedback").hide();
    }
  });

  // Loop over them and prevent submission
  $(".needs-validation").submit(function (event) {
    Array.prototype.slice.call($(".needs-validation")).forEach(function (form) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        $(form).find(".invalid-feedback").hide();
        $(form).find("input:invalid, textarea:invalid").first().focus();
        $(form)
          .find("input:invalid + .invalid-feedback, textarea:invalid + .invalid-feedback")
          .first()
          .show();
      } else if ($(form).hasClass("needs-confermation")) {
        $("#confirmForm").modal("show");
        event.preventDefault();
      }
      $(form).addClass("was-validated");
    });
  });

  $("#confirmForm .btn-confirm").click(() => {
    $(".was-validated").removeClass("needs-confermation");
    $(".was-validated").removeClass("needs-validation");
    $(".was-validated").trigger("submit");
  });
});
