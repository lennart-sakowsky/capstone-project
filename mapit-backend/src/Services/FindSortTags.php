<?php

namespace App\Services;

use App\Repository\TagRepository;

class FindSortTags {

    private $tagRepository;

    public function __construct(TagRepository $tagRepository) {
        $this->tagRepository = $tagRepository;
    }

    public function findSortRelatedTags($place) {
        $tags = $place->getTags();
        foreach ($tags as $tag) {
            $tagsNames[] = $tag->getName();
        }

        sort($tagsNames);
        $relatedTags = [];
        foreach ($tagsNames as $tagName) {
            $tag = $this->tagRepository->findBy(
                [
                    'name' => $tagName
                ]
            );
            $relatedTags[] = $tag[0];
        }

        return $relatedTags;
    }
}