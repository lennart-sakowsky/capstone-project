<?php

namespace App\Serializer;

use App\Entity\Place;

class PlaceSerializer {

    private $attributesIntoArray = [];

    private function intoArray($attribute): object {

    $this->attributesIntoArray[] = [
        'id' => $attribute->getId(),
        'name' => $attribute->getName(),
        'street' => $attribute->getStreet(),
        'zipcode' => $attribute->getZipcode(),
        'latitude' => $attribute->getLat(),
        'longitude' => $attribute->getLng()
    ];

    return($this);
    }

    public function serialize($attributes) {
        if(is_array($attributes)) {
            foreach($attributes as $attribute) {
                $this->intoArray($attribute);
            }
        } else {
            $this->intoArray($attributes);
        }

        return \json_encode($this->attributesIntoArray);
    }

    public function deserialize($content) {
        $postData = \json_decode($content);

        $placeObject = new Place();
        $placeObject->setName($postData->name);
        $placeObject->setStreet($postData->street);
        $placeObject->setZipcode($postData->zipcode);
        $placeObject->setLat($postData->lat);
        $placeObject->setLng($postData->lng);

        return $placeObject;
    }
}