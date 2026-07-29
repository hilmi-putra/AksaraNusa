<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice - {{ $order->invoice_number }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { border-bottom: 2px solid #DB8B00; padding-bottom: 10px; margin-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #171512; }
        .invoice-title { font-size: 20px; font-weight: bold; color: #DB8B00; text-transform: uppercase; float: right; }
        .info-section { width: 100%; margin-bottom: 20px; }
        .info-section td { width: 50%; vertical-align: top; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background-color: #f8f9fa; font-weight: bold; color: #171512; }
        .text-right { text-align: right !important; }
        .font-bold { font-weight: bold; }
        .totals { width: 50%; float: right; }
        .totals table { width: 100%; border-collapse: collapse; }
        .totals td { padding: 5px; }
        .totals-label { text-align: right; color: #555; }
        .totals-value { text-align: right; font-weight: bold; }
        .grand-total { font-size: 14px; color: #DB8B00; border-top: 1px solid #ddd; padding-top: 5px; mt-5; }
        .footer { text-align: center; color: #888; font-size: 10px; margin-top: 50px; border-top: 1px solid #eee; padding-top: 10px; clear: both; }
    </style>
</head>
<body>

    <div class="header">
        <span class="logo">MEGA PRESS</span>
        <span class="invoice-title">INVOICE</span>
    </div>

    <table class="info-section">
        <tr>
            <td>
                <strong>Diterbitkan oleh:</strong><br>
                Mega Press<br>
                Jl. Percetakan Negara No.1<br>
                Jakarta Pusat, 10560<br>
                admin@megapress.com
            </td>
            <td>
                <strong>Untuk:</strong><br>
                {{ $order->shippingAddress->recipient_name ?? $order->user->name }}<br>
                @if($order->shippingAddress)
                    {{ $order->shippingAddress->address }}<br>
                    {{ $order->shippingAddress->subdistrict_name }}, {{ $order->shippingAddress->city_name }}<br>
                    {{ $order->shippingAddress->province_name }} {{ $order->shippingAddress->postal_code }}<br>
                    Telp: {{ $order->shippingAddress->phone }}
                @else
                    Pick up di toko
                @endif
            </td>
        </tr>
    </table>

    <table class="info-section">
        <tr>
            <td>
                <strong>Nomor Invoice:</strong> {{ $order->invoice_number }}<br>
                <strong>Tanggal Transaksi:</strong> {{ $order->created_at->format('d M Y H:i') }}<br>
                <strong>Status Pembayaran:</strong> {{ strtoupper($order->payment->status ?? 'UNPAID') }}
            </td>
            <td>
                <strong>Metode Pembayaran:</strong> {{ $order->payment_method ?? '-' }}<br>
                <strong>Kurir Pengiriman:</strong> {{ $order->shipping_courier ?? 'Pick Up' }} {{ $order->shipping_service ? '- ' . $order->shipping_service : '' }}
            </td>
        </tr>
    </table>

    <table class="table">
        <thead>
            <tr>
                <th>Produk</th>
                <th class="text-right">Harga</th>
                <th class="text-right">Kuantitas</th>
                <th class="text-right">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $item)
            <tr>
                <td>{{ $item->book->title ?? 'Buku Tidak Diketahui' }}</td>
                <td class="text-right">Rp {{ number_format($item->price, 0, ',', '.') }}</td>
                <td class="text-right">{{ $item->quantity }}</td>
                <td class="text-right">Rp {{ number_format($item->price * $item->quantity, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals">
        <table>
            <tr>
                <td class="totals-label">Subtotal Produk:</td>
                <td class="totals-value">Rp {{ number_format($order->subtotal, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="totals-label">Ongkos Kirim:</td>
                <td class="totals-value">Rp {{ number_format($order->shipping_fee ?? 0, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="totals-label">Asuransi:</td>
                <td class="totals-value">Rp {{ number_format($order->insurance_fee ?? 0, 0, ',', '.') }}</td>
            </tr>
            @if($order->discount > 0)
            <tr>
                <td class="totals-label">Diskon:</td>
                <td class="totals-value" style="color: red;">- Rp {{ number_format($order->discount, 0, ',', '.') }}</td>
            </tr>
            @endif
            <tr>
                <td class="totals-label grand-total font-bold">Total Pembayaran:</td>
                <td class="totals-value grand-total font-bold">Rp {{ number_format($order->grand_total, 0, ',', '.') }}</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Terima kasih telah berbelanja di Mega Press.<br>
        Invoice ini sah dan diproses oleh komputer. Silakan simpan sebagai bukti pembelian Anda.
    </div>

</body>
</html>
