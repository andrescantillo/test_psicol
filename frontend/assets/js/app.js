import { AsyncPostApi, AsyncGetApi, loginApi } from './helpers/api.js'
import { showMainPanel, showFormCreateCustomer, showFormEditCustomer, showModalDetailEvent, showModalFormInvoice, listCustomer, listEvent, formLogin, listEventSelect } from './helpers/components.js'

export const urlAPi = "http://127.0.0.1:8000/api"

const loader = () => {
    return `<div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
    `;
}

const login = (form) => {

    document.getElementById('transaction-status').innerHTML = loader();

    let formRequest = {
        email : form.email.value,
        password : form.password.value
    }

    loginApi(`${urlAPi}/user/login`,formRequest)
    .then(response => {

        document.getElementById('transaction-status').innerHTML = "";

        if (response.status !== 200) {

            response.json().then((data) => {
                document.getElementById('transaction-status').innerText = data.message;
            });

            return;
        }

        response.json().then((object) => {
            localStorage.setItem('user_status','true');
            localStorage.setItem('access_token',JSON.stringify(object.data.access_token));
            document.getElementById('principalContent').innerHTML = showMainPanel();
        });
    
    }); 
}

const createCustomer = () => {
    return Swal.fire({
        title: `
            <label class="d-block">Guardar nuevo comprador</label>
        `,
        icon: 'warning',
        html: showFormCreateCustomer(),
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText:`Guardar`,
        cancelButtonText:`Cancelar`,
        preConfirm: async () => {

                Swal.showLoading();
                let data = document.getElementById('formStoreCustomer');

                let formRequest = {
                    identification : data.identification.value,
                    name : data.name.value,
                    email : data.email.value,
                    phone : data.phone.value
                }

                AsyncPostApi(`${urlAPi}/customers`,'POST',formRequest)
                .then(response => {

                    if (JSON.parse(response).success != true) {

                        response.json().then((data) => {
                            
                        });
            
                        return;

                    }

                    Swal.fire({
                        icon: 'success',
                        title: '¡Comprador creado correctamente!',
                        showConfirmButton: false,
                        timer: 1500
                    }) 
                    
                    listCustomer();
                
                })
    
        }
    }).then((result) => {
        if (result.isConfirmed) {

        }
    })
}

const editCustomer = (customerInfo) => {

    Swal.fire({
        title: `
            <label class="d-block">Editar información de: ${customerInfo.dataset.name}</label>
        `,
        icon: 'warning',
        html: showFormEditCustomer(customerInfo),
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText:`Actualizar`,
        cancelButtonText:`Cancelar`,
        preConfirm: async () => {

                Swal.showLoading();
                let data = document.getElementById('formUpdateCustomer');

                let formRequest = {
                    identification : data.identification.value,
                    name : data.name.value,
                    email : data.email.value,
                    phone : data.phone.value
                }

                AsyncPostApi(`${urlAPi}/customers`,'POST',formRequest)
                .then(response => {



                    if (response.status !== 200) {

                        response.json().then((data) => {

                        });
            
                        return;

                    }

                    Swal.fire({
                        icon: 'success',
                        title: '¡Comprador actualizado correctamente!',
                        showConfirmButton: false,
                        timer: 1500
                    }) 
                
                })
    
        }
    }).then((result) => {
        if (result.isConfirmed) {

        }
    })
}

const showDetailEvent = (event) => {
    return showModalDetailEvent(event);
}

const generateInvoice = (data) => {
    return showModalFormInvoice(data);
}

const addEventLogin = () => {
    document.getElementById('loadLogin').addEventListener('click', (event) => {
        
        event.preventDefault();
        login(document.getElementById('formLogin'));

    })
}

export const addEventEditCustomer = () => {
    [...document.querySelectorAll('.editCustomer')].map((button) => {
        button.addEventListener('click',(event) => {

            editCustomer((event.target.dataset.id != undefined) ? event.target : event.target.parentElement );
        })
    })
}

const calculateTotalValue = () => {
    document.getElementById('quantity').addEventListener('keyup',(event) => {
        console.log(Math.trunc(document.getElementById('valueTicket').value) * event.target.value);
        document.getElementById('totalInvoice').innerText = `$ ${Math.trunc(document.getElementById('valueTicket').value) * event.target.value}`;
        document.getElementById('total').value = Math.trunc(document.getElementById('valueTicket').value) * event.target.value;
    })
}

const storeInvoice = () => {
    document.getElementById('btnGenerateInvoice').addEventListener('click',(event) => {
        event.preventDefault();

        let formRequest = {
            ticket_id : event.target.form.ticket_id.value,
            customer_id : event.target.form.customer_id.value,
            payment_method_id : event.target.form.payment_method_id.value,
            quantity : event.target.form.quantity.value,
            total : event.target.form.total.value
        }

        AsyncPostApi(`${urlAPi}/invoices`,'POST',formRequest)
        .then(response => {

            if (JSON.parse(response).success != true) {

                response.json().then((data) => {
                    Swal.fire(
                        'Ups!',
                        'Ocurrió un error',
                        'error'
                    )
                    throw new Error(data.message)
                });

            }

            $('#generateInvoice').modal('hide');

            Swal.fire({
                icon: 'success',
                title: '¡Factura generada correctamente!',
                showConfirmButton: false,
                timer: 1500
            }) 
        
        })
    })
}

export const addEventGenerateInvoice = () => {
    [...document.querySelectorAll('.generateInvoice')].map((button) => {
        button.addEventListener('click',(event) => {
            $('#generateInvoice').modal('show');
            document.getElementById('modalContentGenerateInvoice').innerHTML = generateInvoice((event.target.dataset.id != undefined) ? event.target : event.target.parentElement);
            $('.selectpicker').selectpicker();
            $('.selectpicker').selectpicker('refresh');
            searchTypeTicket();
            getValueTicket();
            calculateTotalValue();
            storeInvoice();
        })
    })
}

export const addEventShowDetailEvent = () => {
    [...document.querySelectorAll('.showDetailEvent')].map((button) => {
        button.addEventListener('click',(event) => {

            $('#detailEvent').modal('show');
            document.getElementById('modalContentEventDetail').innerHTML = showDetailEvent((event.target.dataset.id != undefined) ? event.target : event.target.parentElement);  
        })
    })
}

const searchTypeTicket = () => {
    if(document.body.contains(document.getElementById('event_id'))){
        document.getElementById('event_id').addEventListener('change', (event) => {
            AsyncGetApi(`${urlAPi}/list-tickets-by-event/${event.target.value}`)
            .then(response => response.text())
            .then(response => {
                if (JSON.parse(response).success == true) {
                    document.getElementById('ticket_id').innerHTML = '';
                    document.getElementById('ticket_id').innerHTML = ` <option value="" disabled selected>Seleccione la boleta</option>`;
                    document.getElementById('ticket_id').innerHTML +=  [...JSON.parse(response).data].map(ticket => {
                        return `<option value="${ticket.id}" data-val="${ticket.value}">${ticket.ticket_type.description}</option>`
                    }).join('');
                }
                $('.selectpicker').selectpicker('refresh');
            })

        })
    }
}

const getValueTicket = () => {
    if(document.body.contains(document.getElementById('ticket_id'))){
        document.getElementById('ticket_id').addEventListener('change', (event) => {
            [...event.target.children].map(select => {
                if(select.value == event.target.value){
                    document.getElementById('valueTicket').value = select.dataset.val;
                    document.getElementById('showTicketValue').innerText = `$ ${select.dataset.val}`;
                }
            });
            
        })
    }
}

const showModalCreateCustomer = () => {
    document.getElementById('showFormCreateCustomer').addEventListener('click', (event) => {
        createCustomer();
    })
}

window.onload = () => {

    if (localStorage.getItem("user_status") !== null) { 
        AsyncGetApi(`${urlAPi}/validate-token`)
        .then(response => response.text())
        .then(response => {
            if (JSON.parse(response).success != true) {

                return localStorage.setItem('user_status','false');

            }

            return localStorage.setItem('user_status','true');
        })

        if(localStorage.getItem('user_status') == "true"){
            document.getElementById('principalContent').innerHTML = showMainPanel();
            listCustomer();
            listEvent();
            showModalCreateCustomer();
        }else{
            document.getElementById('principalContent').innerHTML = formLogin();
            addEventLogin
        }
    } 

}

if(document.body.contains(document.getElementById('showFormCreateCustomer'))){
    document.getElementById('showFormCreateCustomer').addEventListener('click', (event) => {
        createCustomer();
    })
}

