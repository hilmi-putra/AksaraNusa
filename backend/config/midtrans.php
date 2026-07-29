<?php

return [
    'server_key' => env('MIDTRANS_SERVER_KEY', ''),
    'client_key' => env('MIDTRANS_CLIENT_KEY', ''),
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
    'snap_url' => env('MIDTRANS_SNAP_URL', 'https://app.sandbox.midtrans.com/snap/snap.js'),

    // Enabled payment methods for Snap
    'enabled_payments' => [
        'credit_card',
        'bca_va',
        'bni_va',
        'bri_va',
        'echannel', // Mandiri Bill
        'gopay',
        'shopeepay',
        'qris',
        'indomaret',
        'alfamart',
    ],

    // Credit card settings
    'credit_card' => [
        'secure' => true, // 3DS enabled
    ],
];
