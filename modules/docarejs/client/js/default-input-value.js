$("[data-default-value]").each(function() {
    var $this = $(this);
    var text = $this.val();

    $this.change(function() {
        var prefix = "DC-";
        if (this.value.substring(0, prefix.length) !== prefix) {
            $(this).val(prefix);
        }
    });
});
