<?php

namespace App\Serializer;

use App\Entity\Place;

class PlaceSerializer {

    private $attributesIntoArray = [];

    private function intoArray($attribute): object {
        $tags = $attribute->getTags();
        $tagsArray = [];
        foreach($tags as $tag) {
            $tagsArray[] = [
                'id' => $tag->getId(),
                'name' => $tag->getName()
            ];
        }

        $this->attributesIntoArray[] = [
            'id' => $attribute->getId(),
            'name' => $attribute->getName(),
            'street' => $attribute->getStreet(),
            'zipcode' => $attribute->getZipcode(),
            'latitude' => $attribute->getLatitude(),
            'longitude' => $attribute->getLongitude(),
            'active' => $attribute->getActive(),
            'related' => $attribute->getRelated(),
            'tags' => $tagsArray
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
        $placeObject->setActive(false);
        $placeObject->setRelated(false);

        return $placeObject;
    }
}