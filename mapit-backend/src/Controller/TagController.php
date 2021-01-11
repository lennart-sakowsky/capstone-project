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
    public function add(Request $request, TagRepository $tagRepository, TagSerializer $tagSerializer, FindOrAddTag $findOrAddTag, FindOrAddPlace $findOrAddPlace, AuthenticationService $authentication, PlaceRepository $placeRepository, PlaceSerializer $placeSerializer): JsonResponse {
        $postData = $tagSerializer->deserialize($request->getContent());

        $user = $authentication->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        /* $tag = $findOrAddTag->findOrAddTag($postData); */

        $tags = $user->getTags();
        $tag = $tags->filter(function($requestedTag) {
            return $requestedTag->getName() === $postData->getName();
        });
        var_dump($tag);
        if($tag->isEmpty() === true) {
            $tag = new Tag();
            $tag->setName($postData->getName());
            $tag->setUser($user);
        } 
        var_dump($tag); 

        /* $place = $findOrAddPlace->findOrAddPlace($postData); */

        $places = $user->getPlaces();
        $place = $places->filter(function($requestedPlace) {
            return $requestedPlace->getStreet() === $postData->getPlaces()[0]->getStreet();
        });

        if($place->isEmpty() === true) {
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
     * @Route("/tag", methods={"PUT"})
     */
    public function find(Request $request, TagRepository $tagRepository, TagSerializer $tagSerializer, PlaceSerializer $placeSerializer, FindAllPlacesRelatedToTag $findAllPlacesRelatedToTag, AuthenticationService $authentication): JsonResponse {
        $postData = $tagSerializer->deserializeTagOnly($request->getContent());

        $user = $authentication->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        
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
    public function remove($tagId, $placeId, TagRepository $tagRepository, PlaceRepository $placeRepository, CheckForTagPlaceRelation $checkForTagPlaceRelation, CutRelationDeleteTagPlaceIfOnlyThisRelation $cutRelationDeleteTagPlaceIfOnlyThisRelation, AuthenticationService $authentication): JsonResponse {
        $em = $this->getDoctrine()->getManager();

        $user = $authentication->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

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
