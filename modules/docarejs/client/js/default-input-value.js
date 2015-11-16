Router.onAfterAction(function() {
    window.setTimeout(function() {
        $("[data-default-value]").each(function() {
            var $defaultVal = $(this).val();
            $(this).keydown(function(e) {
                var oldvalue = $(this).val();
                var field = this;
                setTimeout(function() {
                    if (field.value.indexOf($defaultVal) !== 0) {
                        $(field).val(oldvalue);
                    }
                }, 1);
            });
        });
    }, 0);
});
