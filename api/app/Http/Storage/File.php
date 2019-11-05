<?php
namespace App\Http\Storage;

class File
{
    /**
    * Decodifica y sube la imagen en una carpeta específica.
    *
    * @param blob $imagen
    * @param string $carpeta
    * 
    * @return string $rutaFinal
    */
    public static function subirImagen($imagen, $carpeta)
    {
        if(strpos($imagen, ';')){
            $data = explode(',', $imagen);
            $extData = explode('/', $data[0]);
            if(strpos($extData[1], 'jpeg') !== false) {
                $extension = '.jpg';
            } else if(strpos($extData[1], 'png') !== false) {
                $extension = '.png';
            }else{
                return null;
            }

            $imageData = base64_decode($data[1]);
            
            $imageName = time() . $extension;
            file_put_contents('../public/imgs/'.$carpeta.'/' . $imageName, $imageData);

            /*$path = $imageData->store('/public/imgs/usuarios');
            $path = explode('/',$path);
            $rutaFinal = $path[3];*/

            $rutaFinal = 'imgs/'.$carpeta.'/'.$imageName;
        }else{
            $rutaFinal = $imagen;
        }
        
        return $rutaFinal;
    }
}
