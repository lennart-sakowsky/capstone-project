<?php

namespace App\Serializer;

use App\Entity\User;
use App\Entity\Token;

class UserDataSerializer {

    private $attributesIntoArray = [];

    private function intoArray($attribute, $newToken): object {
        $places = $attribute->getPlaces();
        
        $placesArray = [];

        foreach($places as $place) {
            $tags = $place->getTags();
            $tagsArray = [];
        foreach($tags as $tag) {
            $tagsArray[] = [
                'id' => $tag->getId(),
                'name' => $tag->getName()
            ];
        } 
        $placesArray[] = [
            'id' => $place->getId(),
            'name' => $place->getName(),
            'street' => $place->getStreet(),
            'zipcode' => $place->getZipcode(),
            'latitude' => $place->getLatitude(),
            'longitude' => $place->getLongitude(),
            'tags' => $tagsArray
        ];   
        }

        $token = (object) [
            'value' => $newToken->getValue(),
            'validUntil' => $newToken->getValidUntil(),
            'user' => $newToken->getUser()->getId()
          ];

        $this->attributesIntoArray[] = $token;
        $this->attributesIntoArray[] = $placesArray;
        
        return($this);
    }

    public function serialize($attributes, $newToken) {
        if(is_array($attributes)) {
            foreach($attributes as $attribute) {
                $this->intoArray($attribute, $newToken);
            }
        } else {
            $this->intoArray($attributes, $newToken);
        }

        return \json_encode($this->attributesIntoArray);
    }
}