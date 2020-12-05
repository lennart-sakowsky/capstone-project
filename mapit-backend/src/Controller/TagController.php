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
use App\Entity\Tag;

class TagController extends AbstractController
{
    /**
     * @Route("/tag", methods={"GET"})
     */
    public function index(TagRepository $tagRepository, TagSerializer $tagSerializer): JsonResponse
    {
        $tags = $tagRepository->findAll();

        return new JsonResponse(
            $tagSerializer->serialize($tags),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag"), methods={"POST"}
     */
    public function create(Request $request, TagRepository $tagRepository, TagSerializer $tagSerializer): JsonResponse {
        $tag = $tagSerializer->deserialize($request->getContent());
        $tagRepository->save($tag); 

        return new JsonResponse(
            $tagSerializer->serialize($tag),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag/add"), methods={"POST"}
     */
    public function add(Request $request, TagRepository $tagRepository, PlaceRepository $placeRepository, TagSerializer $tagSerializer, PlaceSerializer $placeSerializer): JsonResponse {
        $postData = $tagSerializer->deserialize($request->getContent());

        $tag = $tagRepository->findOneBy([
            'name' => $postData->getName()
        ]);

        if(!($tag)) {
            $tag = new Tag();
            $tag->setName($postData->getName());
        } 

        $place = $placeRepository->findOneBy([
            'name' => $postData->getPlaces()[0]->getName(),
            'street' => $postData->getPlaces()[0]->getStreet(),
            'zipcode' => $postData->getPlaces()[0]->getZipcode()
            ]
        );

        if(!($place)) {
            $place = $placeSerializer->deserializeFromOutside($postData->getPlaces()[0]);
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
     * @Route("/tag/find"), methods={"POST"}
     */
    public function find(Request $request, TagRepository $tagRepository, PlaceRepository $placeRepository, TagSerializer $tagSerializer, PlaceSerializer $placeSerializer): JsonResponse {
        $postData = $tagSerializer->deserializeTagOnly($request->getContent());
        
        $tag = $tagRepository->findOneBy([
            'name' => $postData->getName()
        ]);
        
        if(!($tag)) {
            return $this->json([]);
        }

        $places = $tag->getPlaces();
        foreach ($places as $place) {
            $placeNames[] = $place->getName();
        }

        sort($placeNames);
        $relatedPlaces = [];
        foreach ($placeNames as $placeName) {
            $place = $placeRepository->findBy(
                [
                    'name' => $placeName
                ]
            );
            $relatedPlaces[] = $place[0];
        }

        return new JsonResponse(
            $placeSerializer->serialize($relatedPlaces),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag/{tagId}/place/{placeId}"), methods={"POST"}
     */
    public function remove($tagId, $placeId, TagRepository $tagRepository, PlaceRepository $placeRepository): JsonResponse {
        $em = $this->getDoctrine()->getManager();
        $tag = $tagRepository->find($tagId);

        if (!$tag) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }

        $place = $placeRepository->find($placeId);
        
        if (!$place) {
            return new JsonResponse(['success' => false], JsonResponse::HTTP_NOT_FOUND);
        }
        
        $relatedPlaces = $tag->getPlaces();
        $related = false;
        foreach ($relatedPlaces as $relatedPlace) {
            if ($placeId == $relatedPlace->getId()) {
                $related = true;
            }
        }
        
        if (!$related) {
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
