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
        'latitude' => $attribute->getLatitude(),
        'longitude' => $attribute->getLongitude()
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

    public function deserialize($postData) {
        $placeObject = new Place();
        $placeObject->setName($postData->getName());
        $placeObject->setStreet($postData->getStreet());
        $placeObject->setZipcode($postData->getZipcode());
        $placeObject->setLatitude($postData->getLatitude());
        $placeObject->setLongitude($postData->getLongitude());

        return $placeObject;
    }
}