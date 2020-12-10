<?php

namespace App\Services;

use App\Repository\PlaceRepository;
use App\Serializer\PlaceSerializer;

class FindOrAddPlace {

    private $placeRepository;

    public function __construct(PlaceRepository $placeRepository, PlaceSerializer $placeSerializer) {
        $this->placeRepository = $placeRepository;
        $this->placeSerializer = $placeSerializer;
    }

    public function findOrAddPlace($postData) {
        $place = $this->placeRepository->findOneBy([
            'name' => $postData->getPlaces()[0]->getName(),
            'street' => $postData->getPlaces()[0]->getStreet(),
            'zipcode' => $postData->getPlaces()[0]->getZipcode()
            ]
        );
        
        if(is_null($place)) {
            $place = $this->placeSerializer->deserializeFromOutside($postData->getPlaces()[0]);
            $this->placeRepository->save($place);
        }

        return $place;
    }
}