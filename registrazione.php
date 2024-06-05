<?php 
require_once 'autenticazione.php';

if (controlloAutenticazione()) {
    header("Location: home.php");
    exit;
}

if (!empty($_POST["username"]) && !empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["confermaPassword"]) && !empty($_POST["accettaCondizioni"])) {
    $error = array();
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    if (!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
        $error[] = "Username non valido";
    } else {
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $query = "SELECT username FROM utenti WHERE username = '$username'";
        $res = mysqli_query($conn, $query);
        if (mysqli_num_rows($res) > 0) {
            $error[] = "Username già utilizzato";
        }
    }

    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $error[] = "Email non valida";
    } else {
        $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
        $query = "SELECT email FROM utenti WHERE email = '$email'";
        $res = mysqli_query($conn, $query);
        if (mysqli_num_rows($res) > 0) {
            $error[] = "Email già utilizzata";
        }
    }

    if (strlen($_POST["password"]) < 8) {
        $error[] = "Caratteri password insufficienti";
    } 

    if ($_POST["password"] !== $_POST["confermaPassword"]) {
        $error[] = "Le password non coincidono";
    }

    if (count($error) == 0) {
        $password = mysqli_real_escape_string($conn, $_POST['password']);
        $password = password_hash($password, PASSWORD_BCRYPT);

        $query = "INSERT INTO utenti(username, email, password) VALUES ('$username', '$email', '$password')";

        if (mysqli_query($conn, $query)) {
            session_start();
            $_SESSION["varSessioneUsername"] = $_POST["username"];
            $_SESSION["varSessioneIdUtente"] = mysqli_insert_id($conn);
            mysqli_close($conn);
            header("Location: home.php");
            exit;
        } else {
            $error[] = "Errore connessione database";
        }
    }

    mysqli_close($conn);
} else if (isset($_POST["username"])) {
    $error = array("Riempi tutti i campi");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="registrazione1.css" />
    <script src="registrazione.js" defer></script>
    <title>Registrazione</title>
</head>
<body>
    <section id="sezioneRegistrazione">
        <div id="riquadroRegistrazione">
            <div id="immagineLogo">
                <img src="Images/logo_starcomics_2021_red.png"/>
            </div>
            <h2>Registrati subito</h2>
            <form name="form_registrazione" method="post">
                <div id="username">
                    <input type='text' name='username' placeholder="Username" <?php if(isset($_POST["username"])) { echo "value=".$_POST["username"];} ?>>
                    <div class="messaggiErrore"><strong>*</strong> Nome utente non disponibile</div>
                </div>
                <div id="email">    
                    <input type='text' name='email' placeholder="Email" <?php if(isset($_POST["email"])) { echo "value=".$_POST["email"];} ?>>
                    <div class="messaggiErrore"><strong>*</strong> Email non valida</span></div>
                </div>    
                <div id="password">
                    <input type='password' name='password' placeholder="Password" <?php if(isset($_POST["password"])) { echo "value=".$_POST["password"];} ?>>
                    <div class="messaggiErrore"><strong>*</strong> Inserisci almeno 8 caratteri</div>
                </div>    
                <div id="confermaPassword">    
                    <input type='password' name='confermaPassword' placeholder="Conferma password" <?php if(isset($_POST["confermaPassword"])) { echo "value=".$_POST["confermaPassword"];} ?>>
                    <div class="messaggiErrore"><strong>*</strong> Le password non coincidono</div>
                </div>    
                <div id="accettaCondizioni"> 
                    <input id="spunta" type='checkbox' name='accettaCondizioni' value="1" <?php if(isset($_POST["accettaCondizioni"])) { echo "checked";} ?>>
                    <label for='accettaCondizioni'>Accetto i termini e le condizioni d'uso di StarComics.</label>
                </div>
                <button type='submit' name='registrazione'>Registrati</button>
            </form>
            <?php if(isset($error)) {
                foreach($error as $err) {
                    echo "<div class='errors'><strong>*</strong>".$err."</div>";
                }
            } ?>
            <p>Hai già un account?</p>
            <a href="login.php"><button type="submit" name="login">Effettua il login</button></a>
        </div>
    </section>
</body>
</html>
