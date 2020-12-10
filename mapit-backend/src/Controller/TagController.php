<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\TagSerializer;
use App\Serializer\PlaceSerializer;
use App\Repository\TagRepository;
use App\Repository\PlaceRepository;
use App\Services\FindOrAddTag;
use App\Services\FindOrAddPlace;
use App\Services\FindAllPlacesRelatedToTag;

class TagController extends AbstractController
{
    /**
     * @Route("/tag"), methods={"POST"}
     */
    public function add(Request $request, TagRepository $tagRepository, TagSerializer $tagSerializer, FindOrAddTag $findOrAddTag, FindOrAddPlace $findOrAddPlace): JsonResponse {
        $postData = $tagSerializer->deserialize($request->getContent());

        $tag = $findOrAddTag->findOrAddTag($postData);

        $place = $findOrAddPlace->findOrAddPlace($postData);

        $tag->addPlace($place);

        $tagRepository->save($tag);

        return new JsonResponse(
            $tagSerializer->serialize($tag),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag"), methods={"PUT"}
     */
    public function find(Request $request, TagRepository $tagRepository, TagSerializer $tagSerializer, PlaceSerializer $placeSerializer, FindAllPlacesRelatedToTag $findAllPlacesRelatedToTag): JsonResponse {
        $postData = $tagSerializer->deserializeTagOnly($request->getContent());
        
        $tag = $tagRepository->findOneBy([
            'name' => $postData->getName()
        ]);
        
        if(is_null($tag)) {
            return $this->json([]);
        }

        $relatedPlaces = $findAllPlacesRelatedToTag->findAllPlacesRelatedToTag($tag);

        return new JsonResponse(
            $placeSerializer->serialize($relatedPlaces),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag/{tagId}/place/{placeId}"), methods={"DELETE"}
     */
    public function remove($tagId, $placeId, TagRepository $tagRepository, PlaceRepository $placeRepository): JsonResponse {
        $em = $this->getDoctrine()->getManager();
        $tag = $tagRepository->find($tagId);

        if (is_null($tag)) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }

        $place = $placeRepository->find($placeId);
        
        if (is_null($place)) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }
        
        $relatedPlaces = $tag->getPlaces();
        $related = false;
        foreach ($relatedPlaces as $relatedPlace) {
            if ($placeId == $relatedPlace->getId()) {
                $related = true;
            }
        }
        
        if (is_null($related)) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }

        $numberOfPlacesRelatedToTag = $tag->getPlaces()->count();
        $numberOfTagsRelatedToPlace = $place->getTags()->count();
        $tag->removePlace($place);

        if ($numberOfPlacesRelatedToTag == 1 && $numberOfTagsRelatedToPlace == 1) {
            $placeRepository->delete($place);
            $tagRepository->delete($tag);
        } else if ($numberOfPlacesRelatedToTag == 1) {
            $tagRepository->delete($tag);
        } else if ($numberOfTagsRelatedToPlace == 1) {
            $placeRepository->delete($place);
        } else {
            $em->persist($tag);
            $em->flush();
        }

        return new JsonResponse(['success' => true]);
    }
}
