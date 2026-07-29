<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Packing Slip - {{ $order->invoice_number }}</title>
    <style>
        body { font-family: sans-serif; font-size: 14px; color: #000; }
        .header { border-bottom: 3px solid #000; padding-bottom: 15px; margin-bottom: 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; letter-spacing: 2px; }
        .doc-title { font-size: 16px; font-weight: bold; margin-top: 10px; text-transform: uppercase; letter-spacing: 5px; }
        .info-section { width: 100%; margin-bottom: 30px; }
        .info-section td { width: 50%; vertical-align: top; padding: 10px; border: 1px solid #000; }
        .section-title { font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase; font-size: 12px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .table th, .table td { border: 1px solid #000; padding: 12px 10px; text-align: left; }
        .table th { background-color: #f0f0f0; font-weight: bold; text-transform: uppercase; font-size: 12px; }
        .text-center { text-align: center !important; }
        .font-bold { font-weight: bold; }
        .barcode-box { text-align: center; margin-top: 40px; border: 1px dashed #000; padding: 20px; }
    </style>
</head>
<body>

    <div class="header">
        <div class="logo">MEGA PRESS</div>
        <div class="doc-title">PACKING SLIP</div>
    </div>

    <table class="info-section">
        <tr>
            <td>
                <div class="section-title">PENGIRIM</div>
                <strong>Mega Press</strong><br>
                Jl. Percetakan Negara No.1<br>
                Jakarta Pusat, 10560<br>
                Telp: 021-1234567
            </td>
            <td>
                <div class="section-title">PENERIMA</div>
                <strong>{{ $order->shippingAddress->recipient_name ?? $order->user->name }}</strong><br>
                @if($order->shippingAddress)
                    {{ $order->shippingAddress->address }}<br>
                    {{ $order->shippingAddress->subdistrict_name }}, {{ $order->shippingAddress->city_name }}<br>
                    {{ $order->shippingAddress->province_name }} {{ $order->shippingAddress->postal_code }}<br>
                    <strong>Telp: {{ $order->shippingAddress->phone }}</strong>
                @else
                    Pick up di toko
                @endif
            </td>
        </tr>
    </table>

    <table class="info-section" style="margin-bottom: 20px;">
        <tr>
            <td>
                <strong>No. Order:</strong> {{ $order->invoice_number }}<br>
                <strong>Tanggal:</strong> {{ $order->created_at->format('d/m/Y') }}<br>
            </td>
            <td>
                <strong>Kurir:</strong> {{ $order->shipping_courier ?? 'Pick Up' }} {{ $order->shipping_service ? '- ' . $order->shipping_service : '' }}<br>
                <strong>No. Resi:</strong> {{ $order->shipment->tracking_number ?? '.....................................' }}
            </td>
        </tr>
    </table>

    <table class="table">
        <thead>
            <tr>
                <th width="10%" class="text-center">No</th>
                <th width="75%">Nama Produk</th>
                <th width="15%" class="text-center">Qty</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $index => $item)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>{{ $item->book->title ?? 'Buku Tidak Diketahui' }}</td>
                <td class="text-center font-bold" style="font-size: 16px;">{{ $item->quantity }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="barcode-box">
        <p style="margin: 0; font-size: 12px; margin-bottom: 5px;">Tanda Tangan Picker / Packer</p>
        <br><br><br>
        <p style="margin: 0; font-size: 12px; border-top: 1px solid #000; display: inline-block; padding-top: 5px; width: 200px;">( .................................................. )</p>
    </div>

</body>
</html>
