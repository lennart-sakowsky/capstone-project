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
use App\Services\CheckForTagPlaceRelation;
use App\Services\CutRelationDeleteTagPlaceIfOnlyThisRelation;

class TagController extends AbstractController
{
    /**
     * @Route("/tag", methods={"POST"})
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
     * @Route("/tag", methods={"PUT"})
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
     * @Route("/tag/{tagId}/place/{placeId}", methods={"DELETE"})
     */
    public function remove($tagId, $placeId, TagRepository $tagRepository, PlaceRepository $placeRepository, CheckForTagPlaceRelation $checkForTagPlaceRelation, CutRelationDeleteTagPlaceIfOnlyThisRelation $cutRelationDeleteTagPlaceIfOnlyThisRelation): JsonResponse {
        $em = $this->getDoctrine()->getManager();
        $tag = $tagRepository->find($tagId);

        if (is_null($tag)) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }

        $place = $placeRepository->find($placeId);
        
        if (is_null($place)) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }
        
        if ($checkForTagPlaceRelation->checkForTagPlaceRelation($tag, $placeId) === false) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }

        $success = $cutRelationDeleteTagPlaceIfOnlyThisRelation->cutRelationDeleteTagPlaceIfOnlyThisRelation($tag, $place, $em);

        if ($success === false) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }

        if ($success === true) {
            return new JsonResponse(
                json_encode(['success' => true]),
                JsonResponse::HTTP_OK,
                [],
                true
            );
        }
    }
}
