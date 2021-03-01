<?php

namespace App\Services;

use App\Entity\Tag;

class FindOrAddTag {

    public function findOrAddTag($postData, $user) {
        $tag = null;
        $userTags = $user->getTags();
        foreach($userTags as $userTag) {
            if ($userTag->getName() === $postData->getName()) {
                $tag = $userTag;
            }
        }

        if (is_null($tag)) {
            $tag = new Tag();
            $tag->setName($postData->getName());
            $tag->setUser($user);
        }  

        return $tag;
    }

    public function findTagById($user, $tagId) {
        $tag = null;
        $userTags = $user->getTags();
        
        foreach($userTags as $userTag) {
            if ($userTag->getId() === $tagId) {
                $tag = $userTag;
            }
        }  

        return $tag;
    }
}