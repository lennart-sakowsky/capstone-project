<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\PlaceSerializer;
use App\Serializer\TagSerializer;
use App\Repository\PlaceRepository;
use App\Repository\TagRepository;

class PlaceController extends AbstractController
{
    /**
     * @Route("/place", methods={"GET"})
     */
    public function index(PlaceRepository $placeRepository, PlaceSerializer $placeSerializer): JsonResponse
    {
        $places = $placeRepository->findAll();

        return new JsonResponse(
            $placeSerializer->serialize($places),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/place"), methods={"POST"}
     */
    public function create(Request $request, PlaceRepository $placeRepository, PlaceSerializer $placeSerializer): JsonResponse {
        $place = $placeSerializer->deserialize($request->getContent());
        $placeRepository->save($place);

        return new JsonResponse(
            $placeSerializer->serialize($place),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/place/find"), methods={"POST"}
     */
    public function find(Request $request, PlaceRepository $placeRepository, TagRepository $tagRepository, PlaceSerializer $placeSerializer, TagSerializer $tagSerializer): JsonResponse {
        $postData = $placeSerializer->deserialize($request->getContent());
        
        $place = $placeRepository->findOneBy([
            'name' => $postData->getName(),
            'street' => $postData->getStreet(),
            'zipcode' => $postData->getZipcode()
            ]
        );

        if(is_null($place)) {
            return $this->json([]);
        }

        $tags = $place->getTags();
        foreach ($tags as $tag) {
            $tagsNames[] = $tag->getName();
        }

        sort($tagsNames);
        $relatedTags = [];
        foreach ($tagsNames as $tagName) {
            $tag = $tagRepository->findBy(
                [
                    'name' => $tagName
                ]
            );
            $relatedTags[] = $tag[0];
        }

        return new JsonResponse(
            $tagSerializer->serialize($relatedTags),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
