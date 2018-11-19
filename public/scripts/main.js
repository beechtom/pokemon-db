$(document).ready(function() {

    $("#showModal").click(function() {
        $(".modal").addClass("is-active");  
      });

      $("#showMove").click(function() {
        $("[aria-label=move]").addClass("is-active");  
      });

      $("#showRegion").click(function() {
        $("[aria-label=region]").addClass("is-active");  
      });
      
      $("[aria-label=close], .modal-background").click(function() {
         $(".modal").removeClass("is-active");
      });

      $("[data-target=navbar]").click(function() {
          $("#navbar").toggleClass("is-active");
      });

});