var fixHelper = function (e, ui) {
    ui.children().each(function () {
        $(this).width($(this).width());
    });
    return ui;
};

$(window).on('load', function () {
    loadSettings(0);
});

$(document).on('click', '.delete-arow', function () {
    $(this).closest("tr").remove();
});

$(document).on('click', '#addTile', function () {
    var number = Math.floor((Math.random() * 1000) + 100);
    var tile = "<tr><td class='sort-handle'><img class='move' src='./img/move.png' alt='Move'/></td><td class='select-img'><select class='form-select selectImg" + number + "'><option class='one.png' value='/img/one.png' data-imagesrc='/img/one.png'></option><option class='two.png' value='/img/two.png' data-imagesrc='/img/two.png'></option><option class='three.png' value='/img/three.png' data-imagesrc='/img/three.png'></option><option class='four.png' value='/img/four.png' data-imagesrc='/img/four.png'></option><option class='five.png' value='/img/five.png' data-imagesrc='/img/five.png'></option><option class='six.png' value='/img/six.png' data-imagesrc='/img/six.png'></option></select></td><td><input class='form-control' type='text' id='text' name='text' value=''></td><td><input class='form-control' type='text' id='link' name='link' value=''></td><td><select class='form-select select" + number + "'><option class='self' value='self'>Same tab</option><option class='blank' value='blank'>New tab</option></select></td><td class='delete-row'><img src='./img/remove.png' alt='Remove' onclick='delete_row($(this))'/></td></tr>";
    $(tile).appendTo("#sortable");
    $(".select" + number).ddslick({
        width: 100
    });

    $(".selectImg" + number).ddslick({
        width: 50
    });
});

$(document).on('change', '#load-switch', function () {
    if ($(this).prop('checked') == true) {
        $(".tiles-visible-box .form-switch").addClass("open-switch");
        $(".tiles-visible-box .tiles-visible").slideDown();
    } else {
        $(".tiles-visible-box .form-switch").removeClass("open-switch");
        $(".tiles-visible-box .tiles-visible").slideUp();
    }
})

$(document).on('click', '.open-modal', function () {
    loadTable();
});

$(document).on('click', '#updateData', function () {
    $('.open-modal').animate({
        opacity: 0
    }, 'fast');

    var myRows = [];
    $('table tbody tr').each(function () {
        var obj = {}
        obj["img"] = $(this).find("td:eq(1) .dd-option-selected input").val();
        obj["text"] = $(this).find("td:eq(2) input").val();
        obj["link"] = $(this).find("td:eq(3) input").val();
        obj["target"] = $(this).find("td:eq(4) .dd-option-selected input").val();
        myRows.push(obj)
    });

    var myObj1 = {
        "title": $("#title").val(),
        "subtitle": $("#subtitle").val(),
        "visible": $("#visible").val(),
        "display": $(".display").find(".dd-option-selected input").val(),
        "loadall": $("#load-switch").prop('checked'),
    };

    var myObj2 = {
        "tiles": myRows
    };

    var data = $.extend({}, myObj1, myObj2);

    $.post("dataSave.php", {
        json: JSON.stringify(data)
    });

    $('#settings-modal').modal('hide');

    loadSettings(700);

});

function loadSettings(time) {

    $('#tiles').fadeOut(time, function () {
        var tiles = '';
        $(this).empty().show();
        $.getJSON("data.json", function (data) {
            $(".get-inspired").text(data.title);
            $(".extra-text").text(data.subtitle);
            var counter = 0;
            var tileSet;
            $.each(data.tiles, function (i, f) {
                //console.log(i);
                if ((data.loadall == false) || (i <= data.visible - 1)) {
                    if (data.display == 2) {
                        if (counter == 4) {
                            counter = 0
                        }
                        if (counter == 0 || counter == 1) {
                            tileSet = "col-12 col-sm-6 col-md-3";
                            counter = counter + 1;
                        } else if (counter == 2 || counter == 3) {
                            tileSet = "col-12 col-sm-12 col-md-6";
                            counter = counter + 1;
                        }
                    } else {
                        tileSet = "col-12 col-sm-6 col-md-4";
                    }
                    tiles = tiles + "<div class='" + tileSet + "'><a href='" + f.link + "' target='_" + f.target + "'><div class='square'><h2 class='tile-title'>" + f.text + "</h2><img src='" + f.img + "' /></div></a></div>"
                }
            });
            $(tiles).appendTo("#tiles").hide().fadeIn(700);
        });
    });

    $('.open-modal').delay(time).animate({
        opacity: 1
    }, 'fast');

};

function loadTable() {
    $("#sortable").empty();

    $.getJSON("data.json", function (data) {
        $("#title").val(data.title);
        $("#subtitle").val(data.subtitle);
        $("#visible").val(data.visible);
        $('#load-switch').attr('checked', data.loadall);
        $(".display-select .display" + data.display + "").attr("selected", true);
        $(".display-select").ddslick({
            width: 170
        });

        if (data.loadall == true) {
            $(".tiles-visible-box .form-switch").addClass("open-switch");
            $(".tiles-visible-box .tiles-visible").slideDown();
        } else {
            $(".tiles-visible-box .form-switch").removeClass("open-switch");
            $(".tiles-visible-box .tiles-visible").slideUp();
        }

        $.each(data.tiles, function (i, f) {

            var tiles = "<tr><td class='sort-handle'><img class='move' src='./img/move.png' alt='Move'/></td><td class='select-img'><select class='form-select selectImg" + i + "'><option class='one.png' value='/img/one.png' data-imagesrc='/img/one.png'></option><option class='two.png' value='/img/two.png' data-imagesrc='/img/two.png'></option><option class='three.png' value='/img/three.png' data-imagesrc='/img/three.png'></option><option class='four.png' value='/img/four.png' data-imagesrc='/img/four.png'></option><option class='five.png' value='/img/five.png' data-imagesrc='/img/five.png'></option><option class='six.png' value='/img/six.png' data-imagesrc='/img/six.png'></option></select></td><td><input class='form-control' type='text' id='text' name='text' value='" + f.text + "'></td><td><input class='form-control' type='text' id='link' name='link' value='" + f.link + "'></td><td><select class='form-select select" + i + "'><option class='self' value='self'>Same tab</option><option class='blank' value='blank'>New tab</option></select></td><td class='delete-row'><img src='./img/remove.png' alt='Remove' onclick='delete_row($(this))'/></td></tr>";
            $(tiles).appendTo("#sortable");
            $(".select" + i + " ." + f.target + "").attr("selected", true);
            $(".select" + i).ddslick({
                width: 100
            });
            $(".selectImg" + i + " option[value='" + f.img + "']").attr("selected", true);
            $(".selectImg" + i).ddslick({
                width: 50
            });
        });
    });

    $("#sortable").sortable({
        helper: fixHelper,
        handle: '.sort-handle',
    }).disableSelection();

};

function delete_row(row) {
    row.closest('tr').remove();
}
