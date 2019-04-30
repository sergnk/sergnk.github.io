<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$reply = array ('status' => 1, 'str' => 'Success');
if (!isset($_POST)) {
	$reply['status'] = 0; $reply['str'] = 'Invalid request: 1910';
	print json_encode($reply);
	exit;
}

$config = array ();
# setup target emails
$config['target_emails'] = array (
'scott@vodxs.com',
'alex@vodxs.com',
);

# setup from email
$config['from_email'] = 'website@vodxs.com';
$config['from_name'] = 'VODXS';

# subjects
$config['subject'] = 'VODXS - Visual on demand experience solution';

# catcha variable (default: g-recaptcha-response)
$config['google_recaptcha_variable'] = 'g_recaptcha_response';

# captcha check GOOGLE secret
$config['google_recaptcha_secret'] = '6Lf5lV4UAAAAABwJxjIrQf1eq7G8HPGMmOyJDX-X';

# configure variables to send (and visual names)
$config['variables'] = array (
'name'	=>	'Name',
'email'	=>	'Email',
'phone'	=>	'Phone',
'website'	=>	'Website',
'number' => 'Number'
);


# check captcha
if (!recaptcha_validate (isset($_REQUEST[$config['google_recaptcha_variable']]) ? $_REQUEST[$config['google_recaptcha_variable']] : '')) {
    $reply['status'] = 0; $reply['str'] = 'Invalid request: 1911';
    print json_encode($reply);
    exit;
}

# mail body start
$mailbody = '
<table width="99%" border="0" cellpadding="1" cellspacing="0" bgcolor="#EAEAEA">
	<tr>
		<td>
      <table width="100%" border="0" cellpadding="5" cellspacing="0" bgcolor="#FFFFFF">
';

// loop variables and build reply
foreach ($config['variables'] as $k => $v) {
    $var = empty($_REQUEST[$k]) ? '' : trim ($_REQUEST[$k]);
    $mailbody .= '
			<tr bgcolor="#EAF2FA">
		          <td colspan="2">
		          	<font style="font-family: sans-serif; font-size:12px;"><strong>'.$v.'</strong></font>
		          </td>
	    		</tr>
		        <tr bgcolor="#FFFFFF">
		          <td width="20">&nbsp;</td>
		          <td>
		              <font style="font-family: sans-serif; font-size:12px;">'.htmlentities($var).'</font>
		          </td>
		        </tr>';
    
}

#mailbody end
$mailbody .= '
        </table>
      </td>
   </tr>
</table>
</body></html>
';

$mailer = new PHPMailer;
$mailer->isSMTP();
$mailer->Port = 25;
$mailer->SMTPSecure = false;
$mailer->SMTPAutoTLS = false;
$mailer->CharSet = 'utf-8';
$mailer->Encoding = '7bit';
$mailer->XMailer = 'OBITX Mailer v1.0';
$mailer->setFrom($config['from_email'], $config['from_name']);
$mailer->Subject = $config['subject'];


// send mail
foreach ($config['target_emails'] as $memail) {
    $mailer->msgHTML($mailbody);
    $mailer->AddAddress($memail);
    $mailer->IsHTML(true);

    if (!$mailer->Send()) {
	$reply['status'] = 0; $reply['str'] = 'Invalid request: 1900';
    }

    $mailer->clearAddresses();
    $mailer->clearAttachments();

}



//$reply['status'] = 0; $reply['str'] = 'Invalid request: 1900';
print json_encode($reply);
exit;


    // validate recaptcha
    function recaptcha_validate ($token = '') {
        global $config;
        if (empty($token))
            return 0;
        // connect to google
        $fp = @fsockopen('ssl://'.'www.google.com', 443, $errno, $errstr, 5);
        if (!$fp) return 0;
        $data = 'secret='.$config['google_recaptcha_secret'].'&response='.$token;
        // send request
        $msg = 'POST /recaptcha/api/siteverify HTTP/1.1'."\r\n";
        $msg .= 'Content-Type: application/x-www-form-urlencoded' . "\r\n";
        $msg .= 'Content-Length: ' . strlen($data) . "\r\n";
        $msg .= 'Host: www.google.com' . "\r\n";
        $msg .= 'Connection: close' . "\r\n\r\n";
        $msg .= $data;
        fwrite($fp, $msg);
        // read reply
        $resp = '';
        $gh = 0;
        while ( !feof($fp) ) {
            // skip headers
            $l = fgets($fp, 1024);
            if (trim($l) == '') $gh = 1;
            if ($gh)
                $resp .= $l;
        }
        // close it
        fclose($fp);
        // POST:  https://www.google.com/recaptcha/api/siteverify
        // secret=$config['google_recaptcha_secret']
        // response=$token
        $resp = json_decode ($resp);
        if ($resp->success)
            return 1;
        return 0;
    }


