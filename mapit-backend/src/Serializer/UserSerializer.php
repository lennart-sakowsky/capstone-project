<?php 

namespace App\Serializer;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\User;


class UserSerializer {
    
    private $attributesIntoArray = [];

    private function intoArray($attribute): object {
       
        $this->attributesIntoArray[] = [
            'id' => $attribute->getId(),
            'firstName' => $attribute->getFirstName(),
            'lastName' => $attribute->getLastName(),
            'email' => $attribute->getEmail()
        ];       
        return($this);
    }

    public function serialize($attributes) {
        if (is_array($attributes)) {
            foreach($attributes as $attribute) {
                $this->intoArray($attribute);
            }
        } else {
            $this->intoArray($attributes);
        }
        
        return \json_encode($this->attributesIntoArray);
    }
    
    public function deserialize($content): object {
            
            $postData = \json_decode($content);
            
            $userObject = new User();
            $userObject->setFirstName($postData->firstName);
            $userObject->setLastName($postData->lastName);
            $userObject->setEmail($postData->email);
            $userObject->setPassword($postData->password);
         
            return $userObject;
    }
}