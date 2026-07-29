<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Download Invoice as PDF.
     */
    public function downloadInvoice(string $id)
    {
        $order = Order::with(['items.book', 'user', 'shippingAddress', 'payment'])
            ->findOrFail($id);

        $pdf = Pdf::loadView('pdf.invoice', compact('order'));
        
        return $pdf->download("invoice-{$order->invoice_number}.pdf");
    }

    /**
     * Download Packing Slip as PDF.
     */
    public function downloadPackingSlip(string $id)
    {
        $order = Order::with(['items.book', 'user', 'shippingAddress', 'shipment'])
            ->findOrFail($id);

        $pdf = Pdf::loadView('pdf.packing-slip', compact('order'));
        
        return $pdf->download("packing-slip-{$order->invoice_number}.pdf");
    }
}
