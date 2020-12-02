<?php

namespace App\Serializer;

use App\Entity\Tag;
use App\Entity\Place;

class TagSerializer {

    private $attributesIntoArray = [];

    private function intoArray($attribute): object {

        $this->attributesIntoArray[] = [
            'id' => $attribute->getId(),
            'name' => $attribute->getName(),
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

        $tagObject = new Tag();
        $tagObject->setName($postData->name);
        
        $taggedPlace = $postData->taggedPlace;
        
        $placeObject = new Place();
        $placeObject->setName($taggedPlace->name);
        $placeObject->setStreet($taggedPlace->street);
        $placeObject->setZipcode($taggedPlace->zipcode);
        $placeObject->setLatitude($taggedPlace->latitude);
        $placeObject->setLongitude($taggedPlace->longitude);
        $tagObject->addPlace($placeObject);

        return $tagObject;
    }
}