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
use App\Services\AuthenticationService;
use App\Entity\Tag;


class TagController extends AbstractController
{
    /**
     * @Route("/tag", methods={"POST"})
     */
    public function add(Request $request, TagRepository $tagRepository, TagSerializer $tagSerializer, FindOrAddTag $findOrAddTag, FindOrAddPlace $findOrAddPlace, AuthenticationService $authenticationService, PlaceRepository $placeRepository, PlaceSerializer $placeSerializer): JsonResponse {
        $postData = $tagSerializer->deserialize($request->getContent());

        $user = $authenticationService->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

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

        $place = null;
        $userPlaces = $user->getPlaces();
        foreach($userPlaces as $userPlace) {
            if ($userPlace->getName() === $postData->getPlaces()[0]->getName() &&
                $userPlace->getStreet() === $postData->getPlaces()[0]->getStreet() && 
                $userPlace->getZipcode() === $postData->getPlaces()[0]->getZipcode()) {
                $place = $userPlace;
            }
        }

        if (is_null($place)) {
            $place = $placeSerializer->deserializeFromOutside($postData->getPlaces()[0]);
            $place->setUser($user);
            $placeRepository->save($place);
        }

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
     * @Route("/tag/{tagId}/place/{placeId}", methods={"DELETE"})
     */
    public function remove(int $tagId, int $placeId, Request $request, TagRepository $tagRepository, PlaceRepository $placeRepository, CheckForTagPlaceRelation $checkForTagPlaceRelation, CutRelationDeleteTagPlaceIfOnlyThisRelation $cutRelationDeleteTagPlaceIfOnlyThisRelation, AuthenticationService $authenticationService): JsonResponse {
        $em = $this->getDoctrine()->getManager();

        $user = $authenticationService->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $tag = null;
        $userTags = $user->getTags();
        
        foreach($userTags as $userTag) {
            if ($userTag->getId() === $tagId) {
                $tag = $userTag;
            }
        }

        if (is_null($tag)) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }

        $place = null;
        $userPlaces = $user->getPlaces();
        foreach($userPlaces as $userPlace) {
            if ($userPlace->getId() === $placeId) {
                $place = $userPlace;
            }
        }
        
        if (is_null($place)) {
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
