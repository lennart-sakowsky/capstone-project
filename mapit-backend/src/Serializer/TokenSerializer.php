<?php

namespace App\Serializer;

use App\Entity\Token;

class TokenSerializer {

    public function serialize($token) {

        return \json_encode([
            'value' => $token->getValue(),
            'validUntil' => $token->getValidUntil(),
            'user' => $token->getUser()->getId()
        ]);
    }

    public function deserialize($content) {
        $postDate = $postData = \json_decode($content);
            
        $tokenObject = new Token();
        $tokenObject->setValue($postData->value);
     
        return $tokenObject;
    }
}