<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Customer;
use App\Helpers\HandleResponse;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::all();

        return HandleResponse::sendResponse($customers->toArray(), 'Datos de los compradores cargada correctamente');
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
            'identification' => 'required|unique:customers|integer',
            'name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email|unique:customers'
        ];
    
        $customMessages = [
            'identification.required' => 'La cedula es necesria',
            'identification.unique' => 'Esta cedula ya se encuetra registrada',
            'identification.integer' => 'La cedula debe ser un entero',
            'name.required' => 'EL nombre es necesario',
            'phone.required' => 'El numero de contacto es necesario',
            'email.required' => 'El correo es necesaris',
            'email.email' => 'Este no es un correo valido',
            'email.unique' => 'Este correo ya se encuentra registrado',
        ];

        $validate =  Validator::make($request->all(), $rules, $customMessages);

        if($validate->fails()){
            return HandleResponse::sendError('Error  de validacion.', $validate->errors());       
        }

        $customer = Customer::updateOrCreate( 
            [
                'identification' => $request->identification
            ],
            [
                'identification' => $request->identification,
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email
            ]
        );

        if($customer){
            return HandleResponse::sendResponse($customer->toArray(), 'Comprador creado correctamente');
        }else{
            return HandleResponse::sendError($customer->toArray(), 'Error al guardar el comprador',400);
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
        $customer = Customer::find($id);

        if (is_null($customer)) {
            return HandleResponse::sendError('Comprador no encontrado');
        }

        return HandleResponse::sendResponse($customer->toArray(), 'Comprador cargado correctamente');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {

        $validate =  Validator::make($request->all(), [
            'identification' => 'required|unique:customers|integer|max:255',
            'name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email|unique:customers'
        ]);

        if($validate->fails()){
            return HandleResponse::sendError('Validation Error.', $validate->errors());       
        }

        $$customer->name = $request->name;
        $$customer->phone = $request->phone;
        $$customer->email = $request->email;
        $$customer->save();

        return HandleResponse::sendResponse($product->toArray(), 'Comprador actualizado correctamente');
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
}
