<?php

namespace App\Services;

use App\Repository\PlaceRepository;
use App\Serializer\PlaceSerializer;

class FindOrAddPlace {

    private $placeRepository;
    private $placeSerializer;

    public function __construct(PlaceRepository $placeRepository, PlaceSerializer $placeSerializer) {
        $this->placeRepository = $placeRepository;
        $this->placeSerializer = $placeSerializer;
    }

    public function findOrAddPlace($postData, $user) {
        $place = null;
        $userPlaces = $user->getPlaces();
        foreach($userPlaces as $userPlace) {
            if ($userPlace->getName() === $postData->getPlaces()[0]->getName() &&
                $userPlace->getStreet() === $postData->getPlaces()[0]->getStreet() && 
                $userPlace->getZipcode() === $postData->getPlaces()[0]->getZipcode()) {
                $place = $userPlace;
            }
        }

        if (is_null($place)) {
            $place = $this->placeSerializer->deserialize($postData->getPlaces()[0]);
            $place->setUser($user);
            $this->placeRepository->save($place);
        }

        return $place;
    }
}