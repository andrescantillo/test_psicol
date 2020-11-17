<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/validate-token','Api\LoginApiController@validateToken');

Route::prefix('/user')->group( function () {
    Route::post('/login', 'Api\LoginApiController@login');
}); 

Route::prefix('/user')->group( function () {
    Route::post('/login', 'Api\LoginApiController@login');
}); 

Route::middleware('auth:api')->resource('customers', 'CustomerController');
Route::middleware('auth:api')->resource('events', 'EventController');
Route::middleware('auth:api')->resource('invoices', 'InvoiceController');
Route::middleware('auth:api')->resource('tickets', 'TicketController');
Route::middleware('auth:api')->get('list-event-types', 'EventController@listEventTypes');
Route::middleware('auth:api')->get('list-ticket-types', 'TicketController@listTicketTypes');
Route::middleware('auth:api')->get('list-payment-methods', 'InvoiceController@listPaymentMethods');
Route::middleware('auth:api')->get('list-tickets-by-event/{id}', 'TicketController@listTicketByEvent');