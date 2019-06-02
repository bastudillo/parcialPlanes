<?php

if(isset($_GET["codigo"])){
    $datosMaterias = file_get_contents('materias.json');
    $f = (string)$_REQUEST['codigo'];
    $data = "{$f}.json";
	if(file_exists($data)){
        $json = file_get_contents($data);
        $info = json_decode($json);
	}
	else{
        file_put_contents("{$f}.json", $datosMaterias); 
        $info = json_decode($datosMaterias);
        
    } 
    echo json_encode($info);
}

if(isset($_POST["codMateria"])){
    $n = (string)$_REQUEST['codMateria'];
    $c = (string)$_REQUEST['codigo'];
    $e = (bool)$_REQUEST['estado'];
    $data = "{$c}.json";
    print $n;
    print $c;
    print $e;
    print $data;
    $json = file_get_contents($data);
    $info = json_decode($json);

    foreach ($info as $key) {
        foreach ($key = $info->materias as $key => $mat)
        {
            if ($mat['codigo'] == $c) {
                $info[$key]['estado'] = $e;
            }
        }
    }
    $modificado = json_encode($info);
    file_put_contents("{$f}.json", $modificado); 
}
?>

