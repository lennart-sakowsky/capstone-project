<?php

namespace App\Services;

class CheckForTagPlaceRelation {

    public function checkForTagPlaceRelation($tag, $placeId): bool {
        $relatedPlaces = $tag->getPlaces();
        $related = false;
        foreach ($relatedPlaces as $relatedPlace) {
            if ($placeId == $relatedPlace->getId()) {
                $related = true;
            }
        }
        var_dump($related); 
        return $related;
    }
}