<?php

namespace App\Services;

use App\Repository\TagRepository;
use App\Entity\Tag;

class FindOrAddTag {

    private $tagRepository;

    public function __construct(TagRepository $tagRepository) {
        $this->tagRepository = $tagRepository;
    }

    public function findOrAddTag($postData) {
        $tag = $this->tagRepository->findOneBy([
            'name' => $postData->getName()
        ]);

        if(is_null($tag)) {
            $tag = new Tag();
            $tag->setName($postData->getName());
        } 

        return $tag;
    }
}