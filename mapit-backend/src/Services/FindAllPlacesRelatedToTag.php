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
        foreach ($places as $place) {
            $placeNames[] = $place->getName();
        }

        sort($placeNames);
        $relatedPlaces = [];
        foreach ($placeNames as $placeName) {
            $place = $this->placeRepository->findBy(
                [
                    'name' => $placeName
                ]
            );
            $relatedPlaces[] = $place[0];
        }
        return $relatedPlaces;
    }
}