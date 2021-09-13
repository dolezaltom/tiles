<?php

$data = $_POST['json'];
file_put_contents("data.json", $data);

?>