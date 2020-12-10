<?php

namespace App\Services;

use App\Repository\PlaceRepository;

class FindPlace {

    private $placeRepository;

    public function __construct(PlaceRepository $placeRepository) {
        $this->placeRepository = $placeRepository;
    }

    public function findRequestedPlace($postData) {
        $place = $this->placeRepository->findOneBy([
            'name' => $postData->getName(),
            'street' => $postData->getStreet(),
            'zipcode' => $postData->getZipcode()
            ]
        );

        return $place;
    }
}