<?php
    include 'autenticazione.php';
    if (controlloAutenticazione()){
        header('Location: home.php');
        exit;
    }

    if (!empty($_POST["username"]) && !empty($_POST["password"])){

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $query = "SELECT * FROM utenti WHERE username = '".$username."'";

        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
        
        if (mysqli_num_rows($res) > 0) {
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $entry['password'])){

                $_SESSION["varSessioneUsername"] = $entry['username'];
                $_SESSION["varSessioneIdUtente"] = $entry['id'];
                header("Location: home.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        $error = "Username e/o password errati.";
    }
    else if (isset($_POST["username"]) || isset($_POST["password"])){
        $error = "Inserisci username e password.";
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login1.css" />
    <title>Login</title>
</head>
<body>
    <section id="sezioneLogin">
        <div id="riquadroLogin">
            <div id="immagineLogo">
                <img src="Images/logo_starcomics_2021.png"/>
            </div>
            <h2>Effettua il login</h2>
            <?php
                if (isset($error)){
                    echo "<p class='error'>$error</p>";
                }  
            ?>
            <form name="form_login" action="login.php" method="post">
                <div id="username">
                    <input type='text' name='username' placeholder="Username" <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>>
                </div>
                <div id="password">    
                    <input type='password' name='password' placeholder="Password" <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>>
                </div>
                <button type='submit' name='login'>Accedi</button>
            </form>
            <p>Non hai un account?</p>
            <a href="registrazione.php"><button type="submit" name="registrazione">Registrati</button></a>
        </div>
    </section>
    <section id="immagineSfondo"></section>
</body>
</html>