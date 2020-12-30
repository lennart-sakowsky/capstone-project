<?php

namespace App\Services;

use App\Repository\TagRepository;
use App\Repository\PlaceRepository;

class CutRelationDeleteTagPlaceIfOnlyThisRelation {

    private $tagRepository;
    private $placeRepository;

    public function __construct(TagRepository $tagRepository, PlaceRepository $placeRepository) {
        $this->tagRepository = $tagRepository;
        $this->placeRepository = $placeRepository;
    }
    

    public function cutRelationDeleteTagPlaceIfOnlyThisRelation($tag, $place, $em): bool {
        $success = false;
        $numberOfPlacesRelatedToTag = $tag->getPlaces()->count();
        $numberOfTagsRelatedToPlace = $place->getTags()->count();
        $tag->removePlace($place);

        if ($numberOfPlacesRelatedToTag == 1 && $numberOfTagsRelatedToPlace == 1) {
            $this->tagRepository->delete($tag);
            $this->placeRepository->delete($place);
            $success = true;
        } else if ($numberOfPlacesRelatedToTag == 1) {
            $this->tagRepository->delete($tag);
            $success = true;
        } else if ($numberOfTagsRelatedToPlace == 1) {
            $this->placeRepository->delete($place);
            $success = true;
        } else {
            $em->persist($tag);
            $em->flush();
            $success = true;
        }

        return $success;
    }

}