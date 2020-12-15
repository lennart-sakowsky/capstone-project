<?php

namespace App\Services;

use App\Repository\PlaceRepository;

class FindAllPlacesRelatedToTag {

    private $placeRepository;

    public function __construct(PlaceRepository $placeRepository) {
        $this->placeRepository = $placeRepository;
    }

    public function findAllPlacesRelatedToTag($tag) {
        $places = $tag->getPlaces();
        $relatedPlaces = [];

        foreach ($places as $place) {
            $relatedPlaces[] = $place;
        }

        return $relatedPlaces;
    }
}