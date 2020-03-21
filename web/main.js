
function add_record(){

    url = $('#url').val().replace("#", "");
    ip = $('#ip').val().replace("#", "");
    desc = $('#desc').val().replace("#", "");

    if(url === ''){
        toastr.warning('URL cannot be empty');
        return 0;
    }
    if(ip === ''){
        toastr.warning('IP cannot be empty');
        return 0;
    }

    eel.get_data()(function(response){
        length = response.length
        response[length] = [length,'#'+ip+' '+url+' # '+desc];
        console.log(response);
        eel.save(response)();
        show_data(response)

    });

    $('#url').val('')
    $('#ip').val('')
    $('#desc').val('')

}

function delete_record(obj) {
    number = $(obj).attr('data-number');

    eel.get_data()(function(response){

        response.splice(number, 1);

        eel.save(response)();
        show_data(response)

    });

}

function changeStatus(obj){
    status = $(obj).prop('checked');
    number = $(obj).attr('data-number');

    eel.get_data()(function(response){

        $(response).each(function( index, el) {
            if(el[0] === parseInt(number)){
                str = el[1].replace(/\s+/g, ' ');
                if(status === 'true'){
                    str = str.slice(1);
                    $('.card_number_'+number).removeClass('alert-warning');
                    $('.card_number_'+number).addClass('alert-success');
                }
                if(status === 'false'){
                    str = '#'+str;
                    $('.card_number_'+number).removeClass('alert-success');
                    $('.card_number_'+number).addClass('alert-warning');
                }
                el[1] = str;
            }

        });

        eel.save(response)()
        show_data(response)

    });


}



function updateInfo(obj) {

    number = $(obj).attr('data-number');

    url = $('#url-'+number).val().replace("#", " ");
    ip = $('#ip-'+number).val().replace("#", " ");
    description = $('#desc-'+number).val().replace("#", " ");

    if(url === ''){
        url = 'localhost'
    }
    if(ip === ''){
        ip = '127.0.0.1'
    }


    eel.get_data()(function(response){

        $(response).each(function( index, el) {
            if(el[0] === parseInt(number)){
                str = el[1].replace(/\s+/g, ' ');
                array = str.split(' ');
                desc = str.split('#');
                str = '';
                if(array[0][0] === '#')
                {
                    ip = '#'+ip;
                }
                array[0] = ip;
                array[1] = url;
                array.splice(2, array.length);
                array[2] = '# '+description;

                $(array).each(function( index, el) {
                    str += el+' '
                });

                el[1] = str;

            }

        });

        eel.save(response)();
        show_data(response)

    });

}

function show_data(response) {
    $('.record').remove();
    $(response).each(function( index, el) {
        if(el[1] !== ''){

            desc = el[1].replace(/\s+/g, ' ').split(' ').slice(2);
            address = el[1].replace(/\s+/g, ' ').split(' ').slice(1);
            ip = el[1].replace(/\s+/g, ' ').split(' ');

            status = ip[0][0];
            if(status === '#'){
                status = '';
                block_style = 'warning';
                ip = ip[0].slice(1);
            }else{
                status = 'checked';
                block_style = 'success';
                ip = ip[0];
            }
            description = '';
            desc[0] = '';
            $(desc).each(function( index, el ) {

                if(el !== ' '){
                    description = description+' '+el
                }

            });
            description = description.replace(/(^\s*)|(\s*)$/g, '');
            $('.ips_list').append(
                '<div class="record card_number_'+el[0]+' card m-2 alert-'+block_style+' br-0">' +
                '<div class="card-body p-1 d-flex justify-content-between px-5">' +
                '<div class="custom-control custom-switch">' +
                '<input data-number="'+el[0]+'" onchange="changeStatus(this)" '+status+' type="checkbox" class="custom-control-input" id="customSwitches-'+index+'">' +
                '<label class="custom-control-label" for="customSwitches-'+index+'"></label>' +
                '</div>' +
                '<div class="w-25 dropright">' +
                '<p data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="m-0 c-p">'+address[0]+'</p>' +
                '<div class="dropdown-menu">' +
                '<div class="md-form m-0">' +
                '<input placeholder="Url" value="'+address[0]+'" type="text" id="url-'+el[0]+'" class="form-control">' +
                '<input placeholder="Ip"  value="'+ip+'" type="text" id="ip-'+el[0]+'" class="form-control">' +
                '<input placeholder="Description" value="'+description+'" type="text" id="desc-'+el[0]+'" class="form-control">' +
                '<div>' +
                '<button data-number="'+el[0]+'" onclick="updateInfo(this)" type="button" class="d-block save-button btn btn-primary btn-sm">Сохранить</button>' +
                '<button data-number="'+el[0]+'" onclick="delete_record(this)" type="button" class="d-block save-button btn btn-danger btn-sm">Удалить</button>' +
                '</div>'+
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="w-25">' +
                '<p class="m-0">'+ip+'</p>' +
                '</div>' +
                '<div class="w-25">' +
                '<p class="m-0">'+description+'</p>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
    });

}

$(document).ready(function() {
    function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };
    $(document).on("keydown", disableF5);

    $(document).keydown(function (event) {
        if (event.keyCode == 123) { // Prevent F12
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I
            return false;
        }
    });
    
    eel.get_data()(function(response){

        show_data(response)

    });


});