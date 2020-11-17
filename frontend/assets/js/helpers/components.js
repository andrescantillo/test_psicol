import { AsyncGetApi } from './api.js'
import { urlAPi, addEventEditCustomer, addEventGenerateInvoice, addEventShowDetailEvent } from '../app.js'


export const formLogin = () => {
    return `<div class="row">
                <div class="col-12 d-flex justify-content-center mt-5">
                    <div class="card">
                        <h5 class="card-header">Inciar session</h5>
                        <div class="card-body">
                            <form id="formLogin">
                                <div class="form-group">
                                <label for="email">Correo</label>
                                <input type="email" class="form-control" id="email">
                                <small id="emailHelp" class="form-text text-muted"></small>
                                </div>
                                <div class="form-group mb-0">
                                <label for="password">Contraseña</label>
                                <input type="password" class="form-control" id="password">
                                </div>
                                <div id="transaction-status" class="error text-danger p-2 text-center">

                                </div>
                                <div class="d-flex justify-content-center">
                                    <button type="submit" form="formLogin" id="loadLogin" class="btn btn-primary">Iniciar</button>
                                </div>
                            </form>  
                        </div>
                    </div>         
                </div>
            </div>`
    ;
}

export const listCustomer = async () => {

    AsyncGetApi(`${urlAPi}/customers`)
    .then(response => response.text())
    .then(response => {

        if (JSON.parse(response).success == true) {
        
            JSON.parse(response).data.map((customer) => {
                document.getElementById('MainCustomerList').innerHTML +=`
                <div class="card-customer d-flex justify-content-between my-2">
                    <div class="customer-number">
                        ${customer.id}
                    </div>
                    <div class="customer-id text-center">
                        ${customer.identification}
                    </div>
                    <div class="customer-name text-center">
                        ${customer.name}
                    </div>
                    <div class="customer-phone text-center">
                        ${customer.phone}
                    </div>
                    <div class="customer-email text-center">
                        ${customer.email}
                    </div>
                    <div class="customer-options text-center">
                        <span class="badge badge-primary p-2 editCustomer" 
                            data-id="${customer.id}" 
                            data-identification="${customer.identification}" 
                            data-name="${customer.name}" 
                            data-phone="${customer.phone}"
                            data-email="${customer.email}">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                        <span class="badge badge-success p-2 generateInvoice"
                            data-id="${customer.id}" 
                            data-identification="${customer.identification}" 
                            data-name="${customer.name}" 
                            data-phone="${customer.phone}"
                            data-email="${customer.email}">
                        <i class="fas fa-money-bill-wave"></i>
                        </span>
                    </div>
                </div>
                `;
            })

            addEventEditCustomer();
            addEventGenerateInvoice();
        }
    })
    .catch(error => console.log('error', error));

}

const viewCountInvoicesSold = (invoices) => {
    let data = ([...invoices].map((invoice) => {
         return `<span class="badge badge-warning w-75">${ [...invoice.invoices].length == 0 ? 0 : [...invoice.invoices].reduce((sum,item) => { return sum.quantity + item.quantity }) }</span>`;
    }).join(''));

    return data;
}

const viewCountInvoicesAvailables = (invoices) => {
    let data = ([...invoices].map((invoice) => {
         return `<span class="badge badge-success w-75">${ invoice.available_tickets - ([...invoice.invoices].length == 0 ? 0 : [...invoice.invoices].reduce((sum,item) => { return sum.quantity + item.quantity })) }</span>`;
    }).join(''));

    return data;
}

export const listEvent = async () => {
    AsyncGetApi(`${urlAPi}/events`)
    .then(response => response.text())
    .then(response => {

        if (JSON.parse(response).success == true) {
        
            JSON.parse(response).data.map((events) => {
                document.getElementById('MainEventList').innerHTML +=`
                <div class="card-events d-flex justify-content-between my-2">
                    <div class="event-number text-center my-auto">
                        ${events.id}
                    </div>
                    <div class="event-name text-center my-auto">
                        ${events.name}
                    </div>
                    <div class="event-ticket-type text-center my-auto">
                        ${[...events.tickets].map(ticket => { return `<span class="badge badge-primary w-100">${ticket.ticket_type.description}</span>` }).join('')}
                    </div>
                    <div class="event-ticket-sold text-center my-auto">
                        ${viewCountInvoicesSold(events.tickets)}
                    </div>
                    <div class="event-ticket-available text-center my-auto">
                        ${viewCountInvoicesAvailables(events.tickets)}
                    </div>
                </div>
                `;
            })

            addEventShowDetailEvent();
        }
    })
    .catch(error => console.log('error', error));
}

export const listEventSelect = async () => {
    
    AsyncGetApi(`${urlAPi}/events`)
    .then(response => response.text())
    .then(response => {

        if (JSON.parse(response).success == true) {
            document.getElementById('event_id').innerHTML +=  [...JSON.parse(response).data].map(event => {
                return `<option value="${event.id}">${event.name}</option>`
            }).join('');
        }
        $('.selectpicker').selectpicker('refresh');
    })
    .catch(error => console.log('error', error));
}

const listPaymentMethod = async () => {
    
    AsyncGetApi(`${urlAPi}/list-payment-methods`)
    .then(response => response.text())
    .then(response => {

        if (JSON.parse(response).success == true) {
            document.getElementById('payment_method_id').innerHTML +=  [...JSON.parse(response).data].map(event => {
                return `<option value="${event.id}">${event.description}</option>`
            }).join('');
        }
        $('.selectpicker').selectpicker('refresh');
    })
    .catch(error => console.log('error', error));
}

export const showMainPanel = () => {
    return `
        <div class="row mt-5 fade-in">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <a class="btn btn-primary-outline" data-toggle="collapse" href="#events" role="button" aria-expanded="false" aria-controls="events">
                            Eventos
                        </a>
                    </div>
                    <div class="collapse" id="events">
                        <div class="card card-body">
                            <div class="header-titles d-flex justify-content-between">
                                <div class="event-number text-center">
                                    #
                                </div>
                                <div class="event-name text-center">
                                    Evento
                                </div>
                                <div class="event-ticket-type text-center">
                                    Tipo de boleta
                                </div>
                                <div class="event-ticket-sold text-center">
                                    Vendidas
                                </div>
                                <div class="event-ticket-available text-center">
                                    Disponibles
                                </div>
                            </div>
                            <div class="main-content-events" id="MainEventList">
                                
                            </div>
                        </div>
                      </div>
                </div>
            </div>
            <div class="col-12 mt-3">
                <div class="card">
                    <div class="card-body d-flex justify-content-between">
                        <a class="btn btn-primary-outline" data-toggle="collapse" href="#customers" role="button" aria-expanded="false" aria-controls="customers">
                            Compradores
                        </a>
                        <a class="btn btn-primary-outline" id="showFormCreateCustomer">
                            Crear comprador
                        </a>
                    </div>
                    <div class="collapse" id="customers">
                        <div class="card card-body">
                            <div class="header-titles d-flex justify-content-between">
                                <div class="customer-number text-center">
                                    #
                                </div>
                                <div class="customer-id text-center">
                                    Cedula
                                </div>
                                <div class="customer-name text-center">
                                    Nombre
                                </div>
                                <div class="customer-phone text-center">
                                    Telefono
                                </div>
                                <div class="customer-email text-center">
                                    Correo
                                </div>
                                <div class="customer-options text-center">
                                    Opciones
                                </div>
                            </div>
                            <div class="main-content-customers" id="MainCustomerList">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export const showFormCreateCustomer = () => {
    return `
        <form class="form-row" id="formStoreCustomer">
            <div class="col-6">
                <label for="name" class="col-form-label float-left">Nombre: </label>
            </div>
            <div class="col-6 mb-2">
                <input type="text" class="form-control w-100" id="name" name="name" placeholder="Nombre">
            </div>
            <div class="col-6">
                <label for="identification" class="col-form-label float-left">Identificación: </label>
            </div>
            <div class="col-6 mb-2">
                <input type="text" class="form-control w-100" id="identification" name="identification" placeholder="Identificación">
            </div>
            <div class="col-6">
                <label for="email" class="col-form-label float-left">Correo: </label>
            </div>
            <div class="col-6 mb-2">
                <input type="email" class="form-control w-100" id="email" name="email" placeholder="Correo">
            </div>
            <div class="col-6">
                <label for="phonee" class="col-form-label float-left">Celular: </label>
            </div>
            <div class="col-6 mb-2">
                <input type="text" class="form-control w-100" id="phone" name="phone" placeholder="Celular">
            </div>
            <div id="transaction-status" class="error text-danger p-2 text-center">

            </div>
        </form>
    `;
}

export const showFormEditCustomer = (data = []) => {
    return `
        <form class="form-row" action="" id="formUpdateCustomer">
            <div class="col-6">
                <label for="name" class="col-form-label float-left">Nombre: </label>
            </div>
            <div class="col-6 mb-2">
                <input type="text" class="form-control w-100" id="name" name="name" placeholder="Nombre" value="${data.dataset.name}">
            </div>
            <div class="col-6">
                <label for="identification" class="col-form-label float-left">Identificación: </label>
            </div>
            <div class="col-6 mb-2">
                <input type="text" class="form-control w-100" id="identification"  name="identification" placeholder="Identificación" value="${data.dataset.identification}">
            </div>
            <div class="col-6">
                <label for="email" class="col-form-label float-left">Correo: </label>
            </div>
            <div class="col-6 mb-2">
                <input type="email" class="form-control w-100" id="email" name="email" placeholder="Correo" value="${data.dataset.email}">
            </div>
            <div class="col-6">
                <label for="phonee" class="col-form-label float-left">Celular: </label>
            </div>
            <div class="col-6 mb-2">
                <input type="text" class="form-control w-100" id="phone" name="phone" placeholder="Celular" value="${data.dataset.phone}">
            </div>
            <div id="transaction-status" class="error text-danger p-2 text-center">

            </div>
        </form>
    `;
}

export const showModalDetailEvent = (data = []) => {
    return `
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Boletas compradas</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
            </tr>
            </tbody>
        </table>
    `;
}

export const showModalFormInvoice = (data = []) => {
    return `
    <p class="font-weight-bold"><span class="badge badge-info">Información del comprador</span></p>
    <div class="row">
        <div class="col-12 col-md-6 d-flex justify-content-start">
            <div>
                <p class="font-weight-normal pr-2"><span class="badge badge-warning">Identificacion:</span> </p>
            </div>
            <div>
                <p class="font-weight-light">${data.dataset.identification}</p>
            </div>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-start">
            <div>
                <p class="font-weight-normal pr-2"><span class="badge badge-warning">Nombre:</span> </p>
            </div>
            <div>
                <p class="font-weight-light">${data.dataset.name}</p>
            </div>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-start">
            <div>
                <p class="font-weight-normal pr-2"><span class="badge badge-warning">Telefono o celular:</span> </p>
            </div>
            <div>
                <p class="font-weight-light">${data.dataset.phone}</p>
            </div>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-start">
            <div>
                <p class="font-weight-normal pr-2"><span class="badge badge-warning">Correo:</span> </p>
            </div>
            <div>
                <p class="font-weight-light">${data.dataset.email}</p>
            </div>
        </div>
    </div>
    <p class="font-weight-bold"><span class="badge badge-info">Información de la compra</span></p>
    <form id="formStoreInvoice" name="formStoreInvoice">
    <input type="hidden" class="form-control" id="customer_id" name="customer_id" value="${data.dataset.id}">
    <input type="hidden" class="form-control" id="valueTicket" name="valueTicket">
        <div class="row">
            <div class="form-group col-6 d-block">
                <label class="text-secondary" for="event_id"><span class="badge badge-warning">Lista de eventos:</span></label>
                <select class="selectpicker form-control" id="event_id" name="event_id">
                    <option value="" disabled selected>Seleccione el evento</option>
                    ${listEventSelect()}
                </select>
            </div>
            <div class="form-group col-6 d-block">
                <label class="text-secondary" for="ticket_id"><span class="badge badge-warning">Tipo de boleta:</span></label>
                <select class="form-control" id="ticket_id" name="ticket_id">
                    <option value="" disabled selected>Seleccione la boleta</option>
                </select>
            </div>
            <div class="form-group col-6 d-block">
                <label class="text-secondary" for="payment_method_id"><span class="badge badge-warning">Metodo de pago:</span></label>
                <select class="selectpicker form-control" id="payment_method_id" name="payment_method_id">
                    <option value="" disabled selected>Seleccione el tipo de pago</option>
                    ${listPaymentMethod()}
                </select>
            </div>
            <div class="form-group col-6">
                <label class="text-secondary" for="quantity"><span class="badge badge-warning">Cantidad:</span></label>
                <input type="number" class="form-control" id="quantity" name="quantity">
            </div>
            <div class="form-group col-6 d-flex justify-content-end">
                <p class="font-weight-bold my-auto text-muted">Valor de la boleta:</p>
            </div>
            <div class="form-group col-6 d-flex justify-content-start">
            <h4 class="float-left my-auto text-secondary" id="showTicketValue">$0</h4>
            </div>
            <div class="form-group col-6 d-flex justify-content-end">
                <p class="font-weight-bold my-auto text-muted">Total de la compra</p>
            </div>
            <div class="form-group col-6 d-flex justify-content-start">
                <h2 class="float-left my-auto text-secondary" id="totalInvoice">$0</h2>
                <input type="hidden" class="form-control" id="total" name="total"> 
            </div>
        </div>
    </form>
    `;
}