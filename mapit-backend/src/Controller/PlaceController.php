<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\PlaceSerializer;
use App\Repository\PlaceRepository;

class PlaceController extends AbstractController
{
    /**
     * @Route("/place", methods={"GET"})
     */
    public function index(Request $request, PlaceRepository $placeRepository, PlaceSerializer $placeSerializer): JsonResponse
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
}
