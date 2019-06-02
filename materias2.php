<?php

    $n = (string)$_REQUEST['codMateria'];
    $c = (string)$_REQUEST['codigo'];
    $e = (bool)$_REQUEST['estado'];
    $data = "{$c}.json";

    $json = file_get_contents($data);
    $archivoAmodificar = json_decode($json, true);

    
    foreach ($archivoAmodificar as $key => $entry) {
        
        foreach($entry['materias'] as $key2 => $entry2)
        {
                if ($entry2['estado']==false) {
                    $e=true;
                }
                else
                {

                    $e=false;
                }
            if ($entry2['codigo'] == $n) {
                $archivoAmodificar[$key]['materias'][$key2]['estado']=$e;
            }
        }
    }
    $modificado = json_encode($archivoAmodificar, JSON_PRETTY_PRINT);
    file_put_contents("{$c}.json", $modificado); 
?>

