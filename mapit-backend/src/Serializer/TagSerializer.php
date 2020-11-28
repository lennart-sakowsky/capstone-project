<?php

namespace App\Serializer;

use App\Entity\Tag;

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
        
        return $tagObject;
    }
}