<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\PlaceSerializer;
use App\Serializer\TagSerializer;
use App\Repository\PlaceRepository;
use App\Services\FindPlace;
use App\Services\FindSortTags;

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
    public function find(Request $request, PlaceSerializer $placeSerializer, TagSerializer $tagSerializer, FindPlace $findPlace, FindSortTags $findSortTags): JsonResponse {
        $postData = $placeSerializer->deserialize($request->getContent());
        
        $place = $findPlace->findRequestedPlace($postData);

        if(is_null($place)) {
            return $this->json([]);
        }

        $relatedTags = $findSortTags->findSortRelatedTags($place);

        return new JsonResponse(
            $tagSerializer->serialize($relatedTags),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
