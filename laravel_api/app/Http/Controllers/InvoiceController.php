<?php

namespace App\Http\Controllers;

use App\Model\PaymentMethod;
use Illuminate\Http\Request;
use App\Helpers\HandleResponse;
use App\Model\Invoice;
use Illuminate\Support\Facades\Validator;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $invoices = Invoice::all();

        return HandleResponse::sendResponse($invoices->toArray(), 'Facturas cargadas correctamente');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'ticket_id' => 'required',
            'payment_method_id' => 'required',
            'customer_id' => 'required',
            'quantity' => 'required|integer',
            'total' => 'required'
        ];
    
        $customMessages = [
            'ticket_id' => 'Selecciona el ticket',
            'payment_method_id' => 'Selecciona el metodo de pago',
            'quantity' => 'Ingrese la cantidad de boletas',
        ];

        $validate =  Validator::make($request->all(), $rules, $customMessages);

        if($validate->fails()){
            return HandleResponse::sendError('Error  de validacion.', $validate->errors());       
        }

        $invoice = Invoice::create($request->all());

        if($invoice){
            return HandleResponse::sendResponse($invoice->toArray(), 'Factura creado correctamente');
        }else{
            return HandleResponse::sendError($invoice->toArray(), 'Error al generar la factura',400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function listPaymentMethods(){
        $paymentMethods = PaymentMethod::all();

        return HandleResponse::sendResponse($paymentMethods->toArray(), 'Datos de los tipos de metodos de pago cargados correctamente');
    }
}
