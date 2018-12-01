function editForm() {
    let buttons = document.querySelectorAll('[aria-label=edit]');

    buttons.forEach(function(btn) {
        let id = btn.getAttribute('data-id');
        btn.addEventListener('click', function() {
            updateForm(id);
        });
    });
}

function updateForm(id) {
    let url = '/move/' + id;
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            let data = JSON.parse(req.responseText);
            updateValues(data, id);
        }
    });

    req.send();
}

function updateValues(data, id) {
    let url = '/move/' + id + '?_method=PUT';
    document.getElementById('edit-form').setAttribute('ACTION', url);
    document.getElementById('edit-title').innerText = 'Edit ' + data.name;
    document.getElementById('edit-name').value      = data.name;
    document.getElementById('edit-pp').value        = data.pp;
    document.getElementById('edit-power').value     = data.power || "";
    document.getElementById('edit-accuracy').value  = data.accuracy || "";
    document.getElementById('edit-flavor').value    = data.flavor;

    // Deselect all types
    let select = document.getElementById('edit-type');
    let options = select.querySelectorAll('option');

    for (let i = 0; i < options.length; i++)
    {
        if (options[i].value == data.type)
        {
            select.selectedIndex = i;
        }
    }
}

function fireWhenReady(func) {
    document.addEventListener('DOMContentLoaded', func);
}

fireWhenReady(editForm);