<!DOCTYPE html>
<html lang="id" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Kode Verifikasi - Mega Press</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; padding: 16px !important; }
            .content-box { padding: 20px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';">

    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #ffffff; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Here is your Mega Press authentication code: {{ $otp }}
    </div>

    <!-- Main wrapper -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff;">
        <tr>
            <td align="center" style="padding: 40px 16px;">

                <!-- Container -->
                <table role="presentation" class="container" cellpadding="0" cellspacing="0" border="0" width="540" style="max-width: 540px; background-color: #ffffff;">
                    
                    <!-- Logo Area -->
                    <tr>
                        <td align="center" style="padding-bottom: 24px;">
                            <img src="{{ $message->embed(public_path('images/logo.png')) }}" alt="Mega Press Logo" width="48" height="48" style="display: block; width: 48px; height: auto;">
                        </td>
                    </tr>

                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding-bottom: 24px;">
                            <h2 style="margin: 0; font-size: 24px; font-weight: 400; color: #24292f;">
                                Please verify your identity, <strong style="font-weight: 600;">{{ $userName }}</strong>
                            </h2>
                        </td>
                    </tr>

                    <!-- Body Content Box -->
                    <tr>
                        <td class="content-box" style="padding: 24px; border: 1px solid #d0d7de; border-radius: 6px; background-color: #ffffff;">
                            
                            <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5; color: #24292f;">
                                Here is your Mega Press authentication code:
                            </p>

                            <!-- OTP Code -->
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 16px 0 24px 0;">
                                        <div style="font-size: 28px; font-weight: 600; letter-spacing: 8px; color: #24292f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
                                            {{ $otp }}
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5; color: #24292f;">
                                This code is valid for <strong>{{ $expiryMinutes }} minutes</strong> and can only be used once.
                            </p>

                            <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.5; color: #24292f;">
                                Please don't share this code with anyone; we'll never ask for it on the phone or via email.
                            </p>

                            <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #24292f;">
                                Thanks,<br>
                                The Mega Press Team
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding-top: 32px;">
                            <p style="margin: 0 0 16px 0; font-size: 12px; line-height: 1.5; color: #6e7781; text-align: center;">
                                You're receiving this email because a verification code was requested for your Mega Press account. If this wasn't you, please ignore this email.
                            </p>
                            <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #6e7781; text-align: center;">
                                Mega Press Inc. &bull; Indonesia
                            </p>
                        </td>
                    </tr>

                </table>
                <!-- /Container -->

            </td>
        </tr>
    </table>
    <!-- /Main wrapper -->

</body>
</html>
